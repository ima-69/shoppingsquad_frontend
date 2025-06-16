import React from "react";
import {
  MdPersonOutline,
  MdInventory2,
  MdOutlineAssignment,
  MdStorefront,
  MdLogout,
} from "react-icons/md";
import { useDispatch } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../redux/slices/authSlice";
import { clearCart } from "../../redux/slices/cartSlice";

const AdminSidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logout());
    dispatch(clearCart());
    navigate("/");
  };

  const linkClasses = ({ isActive }) =>
    isActive
      ? "bg-indigo-600 text-white py-3 px-5 rounded-lg flex items-center space-x-3 font-medium transition"
      : "text-gray-300 hover:bg-indigo-600 hover:text-white py-3 px-5 rounded-lg flex items-center space-x-3 transition";

  return (
    <div className="p-6 flex flex-col h-full overflow-y-auto">
      <div className="mb-8">
        <Link
          to="/admin"
          className="text-3xl font-bold tracking-widest text-indigo-600 hover:text-indigo-700 transition"
        >
          FASHION SQUAD
        </Link>
      </div>

      <h2 className="text-xl font-semibold mb-8 text-center text-gray-200 tracking-wide">
        Admin Dashboard
      </h2>

      <nav className="flex flex-col space-y-3">
        <NavLink to="/admin/users" className={linkClasses}>
          <MdPersonOutline size={22} />
          <span>Users</span>
        </NavLink>
        <NavLink to="/admin/products" className={linkClasses}>
          <MdInventory2 size={22} />
          <span>Products</span>
        </NavLink>
        <NavLink to="/admin/orders" className={linkClasses}>
          <MdOutlineAssignment size={22} />
          <span>Orders</span>
        </NavLink>
        <NavLink to="/" className={linkClasses}>
          <MdStorefront size={22} />
          <span>Shop</span>
        </NavLink>

        {/* Logout button placed directly below the Shop link */}
        <button
          onClick={handleLogOut}
          className="w-full flex items-center justify-center space-x-3 bg-red-600 hover:bg-red-700 focus:bg-red-700 text-white font-semibold py-3 rounded-lg shadow-md transition focus:outline-none focus:ring-2 focus:ring-red-400 mt-4"
          aria-label="Logout"
          type="button"
        >
          <MdLogout size={22} />
          <span>Logout</span>
        </button>
      </nav>
    </div>
  );
};

export default AdminSidebar;
