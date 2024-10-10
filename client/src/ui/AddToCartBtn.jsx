import { twMerge } from "tailwind-merge";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { FaMinus, FaPlus } from "react-icons/fa";
import PriceTag from "./PriceTag";
import { addToCart, decreaseQuantity } from "../lib/storeSlice"; // Import actions

const AddToCartBtn = ({ className, title, product, showPrice = true }) => {
  const [existingProduct, setExistingProduct] = useState(null);
  const dispatch = useDispatch();
  const cartProduct = useSelector((state) => state.store.cartProduct); // Select the cartProduct from the store

  useEffect(() => {
    const availableItem = cartProduct.find(
      (item) => item?._id === product?._id
    );

    setExistingProduct(availableItem || null);
  }, [product, cartProduct]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart(product));
      toast.success(`${product?.name.substring(0, 10)} added successfully!`);
    } else {
      toast.error("Product is undefined!");
    }
  };

  const handleDeleteProduct = () => {
    if (existingProduct) {
      if (existingProduct?.quantity > 1) {
        dispatch(decreaseQuantity(existingProduct?._id));
        toast.success(
          `${product?.name.substring(0, 10)} decreased successfully`
        );
      } else {
        toast.error("You cannot decrease less than 1");
      }
    }
  };

  const newClassName = twMerge(
    "bg-[#f7f7f7] uppercase text-xs py-3 text-center rounded-full font-semibold hover:bg-black hover:text-white hover:scale-105 duration-200 cursor-pointer",
    className
  );

  const getRegularPrice = () => {
    if (existingProduct) {
      return product?.regularPrice * existingProduct?.quantity;
    } else {
      return product?.regularPrice;
    }
  };

  const getDiscountedPrice = () => {
    if (existingProduct) {
      return product?.discountedPrice * product?.quantity;
    } else {
      return product?.discountedPrice;
    }
  };

  return (
    <>
      {showPrice && (
        <div>
          <PriceTag
            regularPrice={getRegularPrice()}
            discountedPrice={getDiscountedPrice()}
          />
        </div>
      )}
      {existingProduct ? (
        <div className="flex self-center items-center justify-center gap-2">
          <button
            onClick={handleDeleteProduct}
            className="bg-[#f7f7f7] text-black p-2 border-[1px] border-gray-200 hover:border-skyText rounded-full text-sm hover:bg-white duration-200 cursor-pointer"
          >
            <FaMinus />
          </button>
          <p className="text-base font-semibold w-10 text-center">
            {existingProduct?.quantity}
          </p>
          <button
            onClick={handleAddToCart}
            className="bg-[#f7f7f7] text-black p-2 border-[1px] border-gray-200 hover:border-skyText rounded-full text-sm hover:bg-white duration-200 cursor-pointer"
          >
            <FaPlus />
          </button>
        </div>
      ) : (
        <button onClick={handleAddToCart} className={newClassName}>
          {title ? title : "Add to cart"}
        </button>
      )}
    </>
  );
};

export default AddToCartBtn;
