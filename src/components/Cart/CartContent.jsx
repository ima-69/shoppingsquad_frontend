import React from 'react'
import { HiMinusSm, HiOutlinePlusSm } from 'react-icons/hi'
import { RiDeleteBin3Line } from 'react-icons/ri'
import { useDispatch } from 'react-redux'
import {
  updateCartItemQuantity,
  removeFromCart,
} from '../../redux/slices/cartSlice'

const CartContent = ({ cart, userId, guestId }) => {
  const dispatch = useDispatch()

  const handleAddToCart = (productId, delta, quantity, size, color) => {
    const newQuantity = quantity + delta
    if (newQuantity >= 1) {
      dispatch(
        updateCartItemQuantity({
          productId,
          quantity: newQuantity,
          guestId,
          userId,
          size,
          color,
        })
      )
    }
  }

  const handleRemoveFromCart = (productId, size, color) => {
    dispatch(removeFromCart({ productId, guestId, userId, size, color }))
  }

  return (
    <div className="space-y-6">
      {cart.products.map((product, index) => {
        const totalPrice = (product.price * product.quantity).toFixed(2)
        return (
          <div
            key={index}
            className="flex items-start justify-between gap-6 border-b border-gray-200 pb-6"
          >
            {/* Image & Details */}
            <div className="flex gap-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-24 h-28 object-cover rounded-lg shadow-sm"
              />
              <div className="flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Size: {product.size} | Color: {product.color}
                  </p>
                </div>
                {/* Quantity Controls */}
                <div className="flex items-center mt-4 gap-3">
                  <button
                    onClick={() =>
                      handleAddToCart(
                        product.productId,
                        -1,
                        product.quantity,
                        product.size,
                        product.color
                      )
                    }
                    disabled={product.quantity <= 1}
                    className={`p-2 rounded-md border transition ${
                      product.quantity <= 1
                        ? 'border-gray-300 text-gray-300 cursor-not-allowed'
                        : 'border-gray-400 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <HiMinusSm className="h-5 w-5" />
                  </button>
                  <span className="font-medium text-gray-800">
                    {product.quantity}
                  </span>
                  <button
                    onClick={() =>
                      handleAddToCart(
                        product.productId,
                        1,
                        product.quantity,
                        product.size,
                        product.color
                      )
                    }
                    className="p-2 rounded-md border border-gray-400 text-gray-700 hover:bg-gray-100 transition"
                  >
                    <HiOutlinePlusSm className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Price & Remove */}
            <div className="flex flex-col items-end justify-between h-full">
              <p className="text-lg font-semibold text-gray-800">
                ${totalPrice}
              </p>
              <button
                onClick={() =>
                  handleRemoveFromCart(
                    product.productId,
                    product.size,
                    product.color
                  )
                }
                className="text-red-600 hover:text-red-700 mt-4 transition"
                aria-label="Remove item"
              >
                <RiDeleteBin3Line className="h-6 w-6" />
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default CartContent
