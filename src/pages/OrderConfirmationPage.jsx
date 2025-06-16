import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../redux/slices/cartSlice';

const OrderConfirmationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { checkout } = useSelector((state) => state.checkout);

  useEffect(() => {
    if (checkout && checkout._id) {
      dispatch(clearCart());
      localStorage.removeItem("cart");
    } else {
      navigate("/my-orders");
    }
  }, [checkout, dispatch, navigate]);

  const calculateEstimatedDelivery = (createdAt) => {
    const orderDate = new Date(createdAt);
    orderDate.setDate(orderDate.getDate() + 10);
    return orderDate.toLocaleDateString();
  };

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-emerald-600 mb-8">
          Thank You For Your Order!
        </h1>

        {checkout && (
          <div className="space-y-12">
            {/* Header Info */}
            <div className="flex flex-col md:flex-row justify-between gap-6 border-b pb-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  Order ID: <span className="text-gray-600">{checkout._id}</span>
                </h2>
                <p className="text-sm text-gray-500">
                  Placed on {new Date(checkout.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-700 font-medium">
                  Estimated Delivery:
                </p>
                <p className="text-emerald-600 font-semibold">
                  {calculateEstimatedDelivery(checkout.createdAt)}
                </p>
              </div>
            </div>

            {/* Items */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Items Ordered</h3>
              <div className="space-y-4">
                {checkout.checkoutItems.map((item) => (
                  <div
                    key={item.productId}
                    className="flex items-center justify-between border rounded-lg p-4 bg-gray-50"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div>
                        <h4 className="text-md font-medium">{item.name}</h4>
                        <p className="text-sm text-gray-500">{item.color} | {item.size}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-md font-semibold">${item.price}</p>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment & Delivery */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t">
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">Payment Method</h4>
                <p className="text-gray-600">PayPal</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">Shipping To</h4>
                <p className="text-gray-600">
                  {checkout.shippingAddress.city}, {checkout.shippingAddress.country}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
