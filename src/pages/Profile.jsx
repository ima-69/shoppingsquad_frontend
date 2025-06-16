// frontend/src/pages/Profile.jsx

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/slices/authSlice';
import { clearCart } from '../redux/slices/cartSlice';
import MyOrdersPage from './MyOrdersPage';

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Accessing the logged-in user from Redux store
  const { user } = useSelector((state) => state.auth);
  
  // If user is not logged in, redirect to login page
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  // Handle logout action
  const handleLogout = () => {
    dispatch(logout());  // Dispatch the logout action to clear the state
    dispatch(clearCart());  // Clear the cart items
    navigate("/login");  // Redirect to login page
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow container mx-auto p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">
          {/* Left Section - User Info */}
          <div className="w-full md:w-1/3 lg:w-1/4 shadow-md rounded-lg p-6">
            <h1 className="text-2xl md:text-3xl font-bold mb-4">{user?.name}</h1>
            <p className="text-lg text-gray-600 mb-4">{user?.email}</p>
            <button
              onClick={handleLogout}
              className="w-full bg-squad-dark-light-blue text-white py-2 px-4 rounded cursor-pointer hover:bg-squad-navy-blue"
            >
              Logout
            </button>
          </div>

          {/* Right Section - Orders Table */}
          <div className="w-full md:w-2/3 lg:w-3/4">
            <MyOrdersPage />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
