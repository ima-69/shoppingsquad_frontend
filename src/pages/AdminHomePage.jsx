import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAdminProducts } from "../redux/slices/adminProductSlice";
import { fetchAllOrders } from "../redux/slices/adminOrderSlice";

const AdminHomePage = () => {
  const dispatch = useDispatch();
  const {
    products,
    loading: productsLoading,
    error: productsError,
  } = useSelector((state) => state.adminProducts);
  const {
    orders,
    totalOrders,
    totalSales,
    loading: ordersLoading,
    error: ordersError,
  } = useSelector((state) => state.adminOrders);

  useEffect(() => {
    dispatch(fetchAdminProducts());
    dispatch(fetchAllOrders());
  }, [dispatch]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Admin Dashboard</h1>

      {productsLoading || ordersLoading ? (
        <div className="text-center text-gray-500 text-lg">Loading...</div>
      ) : productsError ? (
        <p className="text-red-500">Error fetching products: {productsError}</p>
      ) : ordersError ? (
        <p className="text-red-500">Error fetching orders: {ordersError}</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            <div className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition">
              <h2 className="text-lg font-semibold text-gray-700 mb-1">Revenue</h2>
              <p className="text-3xl font-bold text-indigo-600">${totalSales.toFixed(2)}</p>
            </div>
            <div className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition">
              <h2 className="text-lg font-semibold text-gray-700 mb-1">Total Orders</h2>
              <p className="text-3xl font-bold text-indigo-600">{totalOrders}</p>
              <Link to="/admin/orders" className="text-indigo-500 hover:underline text-sm mt-2 inline-block">
                Manage Orders
              </Link>
            </div>
            <div className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition">
              <h2 className="text-lg font-semibold text-gray-700 mb-1">Total Products</h2>
              <p className="text-3xl font-bold text-indigo-600">{products.length}</p>
              <Link to="/admin/products" className="text-indigo-500 hover:underline text-sm mt-2 inline-block">
                Manage Products
              </Link>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md mt-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Recent Orders</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 text-sm text-gray-700">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left font-medium uppercase tracking-wider">Order ID</th>
                    <th className="px-6 py-3 text-left font-medium uppercase tracking-wider">User</th>
                    <th className="px-6 py-3 text-left font-medium uppercase tracking-wider">Total Price</th>
                    <th className="px-6 py-3 text-left font-medium uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {orders.length > 0 ? (
                    orders.map((order) => (
                      <tr key={order._id} className="hover:bg-gray-50 transition">
                        <td className="px-6 py-4">{order._id}</td>
                        <td className="px-6 py-4">{order.user?.name || 'N/A'}</td>
                        <td className="px-6 py-4">${order.totalPrice.toFixed(2)}</td>
                        <td className="px-6 py-4">{order.status}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="px-6 py-6 text-center text-gray-500">
                        No recent orders found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminHomePage;
