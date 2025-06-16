import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import login from "../assets/login.webp";
import { loginUser } from "../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { mergeCart } from "../redux/slices/cartSlice";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const passwordRef = useRef(null); // Reference to password input

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, guestId, loading } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);

  const redirect = new URLSearchParams(location.search).get("redirect") || "/";
  const isCheckoutRedirect = redirect.includes("checkout");

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

    // Input validation
    if (!email.trim() || !password.trim()) {
      setError("All fields are required.");
      return;
    }

    try {
      await dispatch(loginUser({ email, password })).unwrap();
      setError(null);
    } catch (err) {
      setError("Invalid email or password.");
    }
  };

  const handleEmailKeyDown = (e) => {
    if (e.key === "Enter" && passwordRef.current) {
      e.preventDefault();
      passwordRef.current.focus(); // Move focus to password field
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
      setError("Google login failed. Try again.");
    }
  };


  const handleGoogleError = () => {
    setError("Google login failed. Try again.");
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="w-full md:w-1/2 flex items-center justify-center px-6 py-10">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white p-10 rounded-xl shadow-md"
        >
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Welcome Back</h2>
          <p className="text-center text-sm text-gray-500 mb-6">Login to your account</p>

          {error && (
            <div className="bg-red-100 text-red-600 p-2 rounded mb-4 text-center">
              {error}
            </div>
          )}

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={handleEmailKeyDown}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              ref={passwordRef}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-lg font-semibold hover:bg-gray-800 transition"
          >
            {loading ? "Loading..." : "Sign In"}
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
            Don't have an account?{" "}
            <Link to={`/register?redirect=${encodeURIComponent(redirect)}`} className="text-blue-600 hover:underline">
              Register
            </Link>
          </p>
        </form>
      </div>

      <div className="hidden md:block w-1/2">
        <img src={login} alt="Login visual" className="h-screen w-full object-cover" />
      </div>
    </div>
  );
};

export default Login;
