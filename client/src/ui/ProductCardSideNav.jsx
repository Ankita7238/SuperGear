import { FaRegEye, FaRegStar, FaStar } from "react-icons/fa";
import { LuArrowLeftRight } from "react-icons/lu";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToFavorite } from "../lib/storeSlice.js"; // import your action
import toast from "react-hot-toast";

const ProductCardSideNav = ({ product }) => {
  const dispatch = useDispatch();
  const favoriteProduct = useSelector((state) => state.store.favoriteProduct); // Ensure it's an array
  const [existingProduct, setExistingProduct] = useState(null);

  useEffect(() => {
    const availableItem = favoriteProduct.find(
      (item) => item?._id === product?._id
    );
    setExistingProduct(availableItem || null);
  }, [product, favoriteProduct]);

  const handleFavorite = () => {
    console.log('clicked');
    console.log(product);
  
    if (product) {
      console.log('after if');
      dispatch(addToFavorite(product));
  
      // Show a toast notification based on whether the product was already in favorites or not
      toast.success(
        existingProduct
          ? `${product?.name.substring(0, 10)} removed successfully!`
          : `${product?.name.substring(0, 10)} added successfully!`
      );
    }
  };

  return (
    <div className="absolute right-1 top-1 flex flex-col gap-1 transition translate-x-12 group-hover:translate-x-0 duration-300">
      <span
        onClick={handleFavorite}
        className="w-11 h-11 inline-flex text-black text-lg items-center justify-center rounded-full hover:text-white hover:bg-black duration-200"
      >
        {existingProduct ? <FaStar /> : <FaRegStar />}
      </span>
      <span className="w-11 h-11 inline-flex text-black text-lg items-center justify-center rounded-full hover:text-white hover:bg-black duration-200">
        <LuArrowLeftRight />
      </span>
      <span className="w-11 h-11 inline-flex text-black text-lg items-center justify-center rounded-full hover:text-white hover:bg-black duration-200">
        <FaRegEye />
      </span>
    </div>
  );
};

export default ProductCardSideNav;
