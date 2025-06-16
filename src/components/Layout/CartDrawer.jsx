import React from "react";
import { HiX, HiShoppingCart } from "react-icons/hi";
import { FiCreditCard, FiShoppingCart } from "react-icons/fi";
import CartContent from "../Cart/CartContent";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const HEADER_HEIGHT = 108; 

const CartDrawer = ({ drawerOpen, toggleCartDrawer }) => {
  const navigate = useNavigate();
  const { user, guestId } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  const userId = user ? user._id : null;

  const handleCheckout = () => {
    toggleCartDrawer();
    if (!user) {
      navigate("/login?redirect=checkout");
    } else {
      navigate("/checkout");
    }
  };

  return (
    <div
      className={`fixed right-0 bg-white shadow-2xl w-4/5 sm:w-3/5 md:w-[28rem] flex flex-col transform transition-transform duration-300 z-50 ${
        drawerOpen ? "translate-x-0" : "translate-x-full"
      }`}
      role="dialog"
      aria-modal="true"
      aria-label="Shopping cart drawer"
      style={{
        top: HEADER_HEIGHT,
        height: `calc(100vh - ${HEADER_HEIGHT}px)`,
      }}
    >
      {/* Close Button */}
      <div className="flex justify-end p-5 border-b border-gray-200">
        <button
          onClick={toggleCartDrawer}
          aria-label="Close cart drawer"
          className="p-2 rounded-full hover:bg-gray-100 transition"
        >
          <HiX className="h-7 w-7 text-gray-700" />
        </button>
      </div>

      {/* Cart contents with scrollable area */}
      <div className="flex-grow overflow-y-auto p-6 space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <HiShoppingCart className="h-7 w-7 text-indigo-600" />
          Your Cart
        </h2>
        {cart && cart?.products?.length > 0 ? (
          <CartContent cart={cart} userId={userId} guestId={guestId} />
        ) : (
          <p className="text-gray-600 text-center italic flex items-center justify-center gap-2 mt-10">
            <FiShoppingCart className="h-6 w-6 text-gray-400" />
            Your cart is empty.
          </p>
        )}
      </div>

      {/* Checkout Button fixed at the bottom */}
      <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6">
        {cart && cart?.products?.length > 0 && (
          <>
            <button
              onClick={handleCheckout}
              className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 text-white py-3 rounded-lg font-semibold shadow-lg hover:from-indigo-700 hover:to-indigo-800 active:scale-[0.98] transition-transform flex items-center justify-center gap-2"
            >
              <FiCreditCard className="h-5 w-5" />
              Checkout
            </button>
            <p className="text-sm tracking-tight text-center mt-3 text-gray-500">
              Shipping, taxes & discounts calculated at checkout
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
