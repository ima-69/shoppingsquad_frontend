import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { fetchOrderDetails } from '../../redux/slices/orderSlice';

const OrderDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { orderDetails, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrderDetails(id));
  }, [dispatch, id]);

  if (loading) return <p className="text-center py-10 text-gray-600">Loading...</p>;
  if (error) return <p className="text-center py-10 text-red-500">Error: {error}</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Order Details</h2>

      {!orderDetails ? (
        <p className="text-gray-600">No order details found.</p>
      ) : (
        <div className="bg-white shadow-lg rounded-2xl p-6 sm:p-8 space-y-10">
          {/* Order Info */}
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                Order ID: <span className="text-gray-600">#{orderDetails._id}</span>
              </h3>
              <p className="text-sm text-gray-500">
                Placed on {new Date(orderDetails.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="flex flex-col items-start sm:items-end gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${orderDetails.isPaid ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
                {orderDetails.isPaid ? "Approved" : "Pending"}
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${orderDetails.isDelivered ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                {orderDetails.isDelivered ? "Delivered" : "Pending Delivery"}
              </span>
            </div>
          </div>

          {/* Payment & Shipping Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-1">Payment Info</h4>
              <p className="text-gray-600 text-sm">Method: {orderDetails.paymentMethod}</p>
              <p className="text-gray-600 text-sm">Status: {orderDetails.isPaid ? "Paid" : "Unpaid"}</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-1">Shipping Info</h4>
              <p className="text-gray-600 text-sm">Method: {orderDetails.shippingMethod}</p>
              <p className="text-gray-600 text-sm">
                Address: {orderDetails.shippingAddress.city}, {orderDetails.shippingAddress.country}
              </p>
            </div>
          </div>

          {/* Product List */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Products</h4>
            <div className="overflow-x-auto border border-gray-200 rounded-lg">
              <table className="min-w-full bg-white text-sm">
                <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                  <tr>
                    <th className="p-4 text-left">Product</th>
                    <th className="p-4 text-left">Price</th>
                    <th className="p-4 text-left">Qty</th>
                    <th className="p-4 text-left">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {orderDetails.orderItems.map((item) => (
                    <tr
                      key={item.productId}
                      className="border-b last:border-none hover:bg-gray-50 transition"
                    >
                      <td className="p-4 flex items-center gap-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded-md border"
                        />
                        <Link
                          to={`/product/${item.productId}`}
                          className="text-blue-600 hover:underline font-medium"
                        >
                          {item.name}
                        </Link>
                      </td>
                      <td className="p-4 text-gray-700">${item.price}</td>
                      <td className="p-4 text-gray-700">{item.quantity}</td>
                      <td className="p-4 font-semibold text-gray-800">
                        ${(item.price * item.quantity).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Back to Orders Button */}
          <div className="pt-6">
            <Link
              to="/my-orders"
              className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-indigo-700 transition"
            >
              ← Back to My Orders
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetailsPage;
