import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import register from "../assets/register.webp";
import { registerUser } from "../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { mergeCart } from "../redux/slices/cartSlice";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import {jwtDecode} from "jwt-decode";
import axios from 'axios';

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  const formRef = useRef(null);
  const [formHeight, setFormHeight] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, guestId, loading } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);

  const redirect = new URLSearchParams(location.search).get("redirect") || "/";
  const isCheckoutRedirect = redirect.includes("checkout");

  // Measure form container height on mount and resize
  useEffect(() => {
    const updateHeight = () => {
      if (formRef.current) {
        setFormHeight(formRef.current.offsetHeight);
      }
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  useEffect(() => {
    if (user) {
      if (cart?.products.length > 0 && guestId) {
        dispatch(mergeCart({ guestId, user })).then(() => {
          navigate(isCheckoutRedirect ? "/checkout" : "/");
        });
      } else {
        navigate(isCheckoutRedirect ? "/checkout" : "/");
      }
    }
  }, [user, guestId, cart, navigate, isCheckoutRedirect, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    try {
      await dispatch(registerUser({ name, email, password })).unwrap();
      setError(null);
    } catch (err) {
      setError("Registration failed. Try a different email.");
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);  // Decode the Google ID token
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/google-auth`,
        {
          token: credentialResponse.credential,  // Pass Google token
          email: decoded.email,  // Email decoded from Google ID token
          name: decoded.name,  // Name decoded from Google ID token
        }
      );

      localStorage.setItem('userInfo', JSON.stringify(response.data.user));  // Save user data
      localStorage.setItem('userToken', response.data.token);  // Save JWT token
      dispatch({ type: 'auth/loginSuccess', payload: response.data.user });  // Dispatch to Redux

      // Handle cart merging and redirect
      if (cart?.products.length > 0 && guestId) {
        dispatch(mergeCart({ guestId, user: response.data.user })).then(() => {
          navigate(isCheckoutRedirect ? '/checkout' : '/');
        });
      } else {
        navigate(isCheckoutRedirect ? '/checkout' : '/');
      }
    } catch (error) {
      setError("Google registration failed. Try again.");
    }
  };


  const handleGoogleError = () => {
    setError("Google registration failed.");
  };

  return (
    <div className="flex min-h-screen bg-gray-50 items-start">
      {/* Form Container */}
      <div
        ref={formRef}
        className="w-full md:w-1/2 flex items-start justify-center px-6 py-10"
      >
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white p-10 rounded-xl shadow-md"
        >
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
            Create Account
          </h2>
          <p className="text-center text-sm text-gray-500 mb-6">
            Join us and start shopping
          </p>

          {error && (
            <div className="bg-red-100 text-red-600 p-2 rounded mb-4 text-center">
              {error}
            </div>
          )}

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter your password"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Confirm your password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-lg font-semibold hover:bg-gray-800 transition"
          >
            {loading ? "Loading..." : "Sign Up"}
          </button>

          <div className="my-6 text-center text-gray-500">or</div>

          <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              text="continue_with"
              shape="rectangular"
              size="large"
              width="100%"
            />
          </GoogleOAuthProvider>

          <p className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              to={`/login?redirect=${encodeURIComponent(redirect)}`}
              className="text-blue-600 hover:underline"
            >
              Login
            </Link>
          </p>
        </form>
      </div>

      {/* Image Container */}
      <div
        className="hidden md:block w-1/2"
        style={{ height: formHeight ? `${formHeight}px` : "auto" }}
      >
        <div className="w-full h-full">
          <img
            src={register}
            alt="Register visual"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
