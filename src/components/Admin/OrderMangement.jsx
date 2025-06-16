import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchAllOrders,
  updateOrderStatus,
} from "../../redux/slices/adminOrderSlice";

const OrderManagement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { orders, loading, error } = useSelector((state) => state.adminOrders);

  // State to track delivered orders from localStorage
  const [deliveredOrders, setDeliveredOrders] = useState(() => {
    const storedDeliveredOrders = localStorage.getItem("deliveredOrders");
    return storedDeliveredOrders ? JSON.parse(storedDeliveredOrders) : [];
  });

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/");
    } else {
      dispatch(fetchAllOrders());
    }
  }, [dispatch, user, navigate]);

  const handleStatusChange = (orderId, status) => {
    dispatch(updateOrderStatus({ id: orderId, status }));
    if (status === "Delivered") {
      setDeliveredOrders((prev) => {
        const updatedOrders = [...prev, orderId];
        localStorage.setItem("deliveredOrders", JSON.stringify(updatedOrders));
        return updatedOrders;
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-extrabold mb-8 text-gray-900">Order Management</h2>

      {loading && <p className="text-gray-500 text-center mb-4">Loading...</p>}
      {error && <p className="text-red-600 text-center mb-4">Error: {error}</p>}

      <div className="bg-white shadow rounded-lg p-6 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-gray-700">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide"
              >
                Order ID
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide"
              >
                Customer
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide"
              >
                Total Price
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr
                  key={order._id}
                  className="hover:bg-gray-50 transition cursor-pointer"
                >
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                    #{order._id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {order.user?.name || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">${order.totalPrice.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-indigo-500 focus:border-indigo-500 block p-2.5 transition"
                      aria-label={`Change status for order ${order._id}`}
                    >
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleStatusChange(order._id, "Delivered")}
                      className={`${
                        deliveredOrders.includes(order._id)
                          ? "bg-yellow-500"
                          : "bg-green-600 hover:bg-green-700"
                      } text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-green-500 transition`}
                      aria-label={`Mark order ${order._id} as delivered`}
                    >
                      Mark as Delivered
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-6 text-center text-gray-500">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderManagement;
