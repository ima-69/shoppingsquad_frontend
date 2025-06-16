import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserOrders } from '../redux/slices/orderSlice';

const MyOrdersPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  const handleRowClick = (orderId) => {
    navigate(`/order/${orderId}`);
  };

  if (loading) return <p className="text-center text-gray-600 py-10">Loading orders...</p>;
  if (error) return <p className="text-center text-red-500 py-10">Error: {error}</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">
        My Orders
      </h2>

      <div className="bg-white shadow-xl rounded-2xl overflow-hidden ring-1 ring-gray-200">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
              <th className="px-6 py-4">Image</th>
              <th className="px-6 py-4">Order ID</th>
              <th className="px-6 py-4">Created</th>
              <th className="px-6 py-4">Shipping Address</th>
              <th className="px-6 py-4">Items</th>
              <th className="px-6 py-4">Total</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr
                  key={order._id}
                  className="group hover:bg-gray-50 transition duration-200 cursor-pointer"
                  onClick={() => handleRowClick(order._id)} // Trigger the row click when any row is clicked
                >
                  <td className="px-6 py-4">
                    <img
                      src={order.orderItems[0].image}
                      alt={order.orderItems[0].name}
                      className="w-12 h-12 object-cover rounded-md border"
                    />
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-800">
                    #{order._id.slice(-8).toUpperCase()}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {new Date(order.createdAt).toLocaleDateString()}<br />
                    <span className="text-xs text-gray-400">
                      {new Date(order.createdAt).toLocaleTimeString()}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    {order.shippingAddress?.city}, {order.shippingAddress?.country}
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    {order.orderItems.length}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-800">
                    ${order.totalPrice}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        order.isPaid
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-red-100 text-red-600'
                      }`}
                    >
                      {order.isPaid ? 'Paid' : 'Pending'}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center py-10 text-gray-400">
                  You have no orders yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrdersPage;
