import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './firebase';

// Custom storage for persisting state locally
const customStorage = {
  getItem: (name) => {
    const item = localStorage.getItem(name);
    return item ? JSON.parse(item) : null;
  },
  setItem: (name, value) => {
    localStorage.setItem(name, JSON.stringify(value));
  },
  removeItem: (name) => {
    localStorage.removeItem(name);
  },
};

// Load initial state from custom storage
const initialState = customStorage.getItem('supergear-storage') || {
  currentUser: null,
  isLoading: true,
  cartProduct: [],
  favoriteProduct: [],
};

const saveFavoritesToFirestore = async (uid, favorites) => {
  try {
    await setDoc(doc(db, 'favorites', uid), { favorites });
  } catch (error) {
    console.error('Error saving favorites to Firestore:', error);
  }
};

const saveCartToFirestore = async (uid, cart) => {
  try {
    await setDoc(doc(db, 'carts', uid), { cart });
  } catch (error) {
    console.error('Error saving cart to Firestore:', error);
  }
};

const loadCartFromFirestore = async (uid) => {
  try {
    const docRef = doc(db, 'carts', uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data().cart || [];
    } else {
      return [];
    }
  } catch (error) {
    console.error('Error loading cart from Firestore:', error);
    return [];
  }
};

const loadFavoritesFromFirestore = async (uid) => {
  try {
    const docRef = doc(db, 'favorites', uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data().favorites || [];
    } else {
      return [];
    }
  } catch (error) {
    console.error('Error loading favorites from Firestore:', error);
    return [];
  }
};

export const getUserInfo = createAsyncThunk(
  'store/getUserInfo',
  async (uid, { rejectWithValue }) => {
    if (!uid) return null;
    try {
      const docRef = doc(db, 'users', uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const userData = docSnap.data();
        const cart = await loadCartFromFirestore(uid);
        const favorites = await loadFavoritesFromFirestore(uid);
        return { ...userData, cart, favorites };
      } else {
        return rejectWithValue('No user found');
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const storeSlice = createSlice({
  name: 'store',
  initialState,
  reducers: {
    
    setLoading: (state, action) => {
      state.isLoading = action.payload;
      customStorage.setItem('supergear-storage', state);
    },
    setUser: (state, action) => {
      state.currentUser = action.payload;
      state.isLoading = false;
      customStorage.setItem('supergear-storage', state);
    },
    clearUserInfo: (state) => {
      state.currentUser = null;
      state.cartProduct = [];
      state.favoriteProduct = []; // Clear the favorites when the user logs out
      customStorage.removeItem('supergear-storage');
    },

    addToCart: (state, action) => {
      const product = action.payload;
      const existingProduct = state.cartProduct.find(p => p._id === product._id);
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.cartProduct.push({ ...product, quantity: 1 });
      }
      customStorage.setItem('supergear-storage', state);

      if (state.currentUser) {
        saveCartToFirestore(state.currentUser.id, state.cartProduct);
      }
    },
    decreaseQuantity: (state, action) => {
      const productId = action.payload;
      const existingProduct = state.cartProduct.find(p => p._id === productId);
      if (existingProduct && existingProduct.quantity > 1) {
        existingProduct.quantity -= 1;
      }
      customStorage.setItem('supergear-storage', state);
      if (state.currentUser) {
        saveCartToFirestore(state.currentUser.id, state.cartProduct);
      }
    },
    removeFromCart: (state, action) => {
      state.cartProduct = state.cartProduct.filter(item => item._id !== action.payload);
      customStorage.setItem('supergear-storage', state);

      if (state.currentUser) {
        saveCartToFirestore(state.currentUser.id, state.cartProduct);
      }
    },
    resetCart: (state) => {
      state.cartProduct = [];
      customStorage.setItem('supergear-storage', state);

      if (state.currentUser) {
        saveCartToFirestore(state.currentUser.id, state.cartProduct);
      }
    },

    addToFavorite: (state, action) => {
      const product = action.payload;
      const isFavorite = state.favoriteProduct.some(item => item._id === product._id);
      state.favoriteProduct = isFavorite
        ? state.favoriteProduct.filter(item => item._id !== product._id)
        : [...state.favoriteProduct, { ...product }];
      customStorage.setItem('supergear-storage', state);

      if (state.currentUser) {
        saveFavoritesToFirestore(state.currentUser.id, state.favoriteProduct);
      }
    },
    removeFromFavorite: (state, action) => {
      state.favoriteProduct = state.favoriteProduct.filter(item => item._id !== action.payload);
      customStorage.setItem('supergear-storage', state);

      if (state.currentUser) {
        saveFavoritesToFirestore(state.currentUser.id, state.favoriteProduct);
      }
    },
    resetFavorite: (state) => {
      state.favoriteProduct = [];
      customStorage.setItem('supergear-storage', state);

      if (state.currentUser) {
        saveFavoritesToFirestore(state.currentUser.id, state.favoriteProduct);
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getUserInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        const { cart, favorites, ...userData } = action.payload;
        state.currentUser = userData;
        state.cartProduct = cart || [];
        state.favoriteProduct = favorites || [];
        state.isLoading = false;
        customStorage.setItem('supergear-storage', state);
      })
      .addCase(getUserInfo.rejected, (state) => {
        state.currentUser = null;
        state.isLoading = false;
        customStorage.setItem('supergear-storage', state);
      });
  }
});

export const {
  clearUserInfo,
  setUser,
  setLoading,
  addToCart,
  decreaseQuantity,
  removeFromCart,
  resetCart,
  addToFavorite,
  removeFromFavorite,
  resetFavorite
} = storeSlice.actions;

export default storeSlice.reducer;







// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { doc, getDoc, setDoc } from 'firebase/firestore';
// import { db } from './firebase';

// // Custom storage for persisting state locally
// const customStorage = {
//   getItem: (name) => {
//     const item = localStorage.getItem(name);
//     return item ? JSON.parse(item) : null;
//   },
//   setItem: (name, value) => {
//     localStorage.setItem(name, JSON.stringify(value));
//   },
//   removeItem: (name) => {
//     localStorage.removeItem(name);
//   },
// };

// // Load initial state from custom storage
// const initialState = customStorage.getItem('supergear-storage') || {
//   currentUser: null,
//   isLoading: true,
//   cartProduct: [],
//   favoriteProduct: [],
// };

// const saveFavoritesToFirestore = async (uid, favorites) => {
//   try {
//     await setDoc(doc(db, 'favorites', uid), { favorites });
//   } catch (error) {
//     console.error('Error saving favorites to Firestore:', error);
//   }
// };


// // Helper function to save the cart to Firestore
// const saveCartToFirestore = async (uid, cart) => {
//   try {
//     await setDoc(doc(db, 'carts', uid), { cart });
//   } catch (error) {
//     console.error('Error saving cart to Firestore:', error);
//   }
// };

// // Helper function to load the cart from Firestore
// const loadCartFromFirestore = async (uid) => {
//   try {
//     const docRef = doc(db, 'carts', uid);
//     const docSnap = await getDoc(docRef);
//     if (docSnap.exists()) {
//       return docSnap.data().cart || [];
//     } else {
//       return [];
//     }
//   } catch (error) {
//     console.error('Error loading cart from Firestore:', error);
//     return [];
//   }
// };

// // Helper function to load favorites from Firestore
// const loadFavoritesFromFirestore = async (uid) => {
//   try {
//     const docRef = doc(db, 'favorites', uid);
//     const docSnap = await getDoc(docRef);
//     if (docSnap.exists()) {
//       return docSnap.data().favorites || [];
//     } else {
//       return [];
//     }
//   } catch (error) {
//     console.error('Error loading favorites from Firestore:', error);
//     return [];
//   }
// };

// // Async thunk for fetching user info along with the cart and favorites
// export const getUserInfo = createAsyncThunk(
//   'store/getUserInfo',
//   async (uid, { rejectWithValue }) => {
//     if (!uid) return null;
//     try {
//       const docRef = doc(db, 'users', uid);
//       const docSnap = await getDoc(docRef);
//       if (docSnap.exists()) {
//         const userData = docSnap.data();
//         const cart = await loadCartFromFirestore(uid);
//         const favorites = await loadFavoritesFromFirestore(uid);
//         return { ...userData, cart, favorites };
//       } else {
//         return rejectWithValue('No user found');
//       }
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// const storeSlice = createSlice({
//   name: 'store',
//   initialState,
//   reducers: {
//     setLoading: (state, action) => {
//       state.isLoading = action.payload;
//       customStorage.setItem('supergear-storage', state);
//     },
//     setUser: (state, action) => {
//       state.currentUser = action.payload;
//       state.isLoading = false;
//       customStorage.setItem('supergear-storage', state);
//     },
//     clearUserInfo: (state) => {
//       state.currentUser = null;
//       state.cartProduct = []; // Clear the cart when the user logs out
//       customStorage.removeItem('supergear-storage');
//     },
//     addToCart: (state, action) => {
//       const product = action.payload;
//       const existingProduct = state.cartProduct.find(p => p._id === product._id);
//       if (existingProduct) {
//         existingProduct.quantity += 1;
//       } else {
//         state.cartProduct.push({ ...product, quantity: 1 });
//       }
//       customStorage.setItem('supergear-storage', state);

//       // Save to Firestore
//       if (state.currentUser) {
//         saveCartToFirestore(state.currentUser.id, state.cartProduct);
//       }
//     },
//     decreaseQuantity: (state, action) => {
//       const productId = action.payload;
//       const existingProduct = state.cartProduct.find(p => p._id === productId);
//       if (existingProduct && existingProduct.quantity > 1) {
//         existingProduct.quantity -= 1;
//       }
//       customStorage.setItem('supergear-storage', state);

//       // Save to Firestore
//       if (state.currentUser) {
//         saveCartToFirestore(state.currentUser.id, state.cartProduct);
//       }
//     },
//     removeFromCart: (state, action) => {
//       state.cartProduct = state.cartProduct.filter(item => item._id !== action.payload);
//       customStorage.setItem('supergear-storage', state);

//       // Save to Firestore
//       if (state.currentUser) {
//         saveCartToFirestore(state.currentUser.id, state.cartProduct);
//       }
//     },
//     resetCart: (state) => {
//       state.cartProduct = [];
//       customStorage.setItem('supergear-storage', state);

//       // Save to Firestore
//       if (state.currentUser) {
//         saveCartToFirestore(state.currentUser.id, state.cartProduct);
//       }
//     },
//     addToFavorite: (state, action) => {
//       const product = action.payload;
//       const isFavorite = state.favoriteProduct.some(item => item._id === product._id);
//       state.favoriteProduct = isFavorite
//         ? state.favoriteProduct.filter(item => item._id !== product._id)
//         : [...state.favoriteProduct, { ...product }];
//       customStorage.setItem('supergear-storage', state);

//       if (state.currentUser) {
//         saveFavoritesToFirestore(state.currentUser.id, state.favoriteProduct);
//       }
//     },
//     removeFromFavorite: (state, action) => {
//       state.favoriteProduct = state.favoriteProduct.filter(item => item._id !== action.payload);
//       customStorage.setItem('supergear-storage', state);

//       if (state.currentUser) {
//         saveFavoritesToFirestore(state.currentUser.id, state.favoriteProduct);
//       }
//     },
//     resetFavorite: (state) => {
//       state.favoriteProduct = [];
//       customStorage.setItem('supergear-storage', state);

//       if (state.currentUser) {
//         saveFavoritesToFirestore(state.currentUser.id, state.favoriteProduct);
//       }
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(getUserInfo.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(getUserInfo.fulfilled, (state, action) => {
//         const { cart, ...userData } = action.payload;
//         state.currentUser = userData;
//         state.cartProduct = cart || []; // Load cart from Firestore
//         state.favoriteProduct = favorites || []; 
//         state.isLoading = false;
//         customStorage.setItem('supergear-storage', state);
//       })
//       .addCase(getUserInfo.rejected, (state) => {
//         state.currentUser = null;
//         state.isLoading = false;
//         customStorage.setItem('supergear-storage', state);
//       });
//   }
// });

// export const {
//   clearUserInfo,
//   setUser,
//   setLoading,
//   addToCart,
//   decreaseQuantity,
//   removeFromCart,
//   resetCart,
//   addToFavorite,
//   removeFromFavorite,
//   resetFavorite
// } = storeSlice.actions;

// export default storeSlice.reducer;
