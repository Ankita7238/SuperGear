import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CheckoutBtn = ({ products }) => {
  const currentUser = useSelector((state) => state.store.currentUser);
  const navigate = useNavigate();

  const handleCheckout = () => {
    console.log("click checkout");
    navigate("/success");
  };

  return (
    <div className="mt-6">
      {currentUser ? (
        <button
          type="submit"
          className="w-full rounded-md border border-transparent bg-gray-800 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-black focus:outline-none focus:ring-2 focus:ring-skyText focus:ring-offset-2 focus:ring-offset-gray-50 duration-200"
          onClick={handleCheckout}  // Attach handleCheckout to this button
        >
          Checkout
        </button>
      ) : (
        <button
          className="w-full text-base text-white text-center rounded-md border border-transparent bg-gray-500 px-4 py-3 cursor-not-allowed"
        >
          Checkout
        </button>
      )}
      {!currentUser && (
        <p className="mt-2 text-sm font-medium text-red-500 text-center">
          Need to sign in to make checkout
        </p>
      )}
    </div>
  );
};

export default CheckoutBtn;
