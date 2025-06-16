import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { googleLoginUser } from "../redux/slices/authSlice";


const GoogleCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    const user = JSON.parse(decodeURIComponent(params.get('user')));

    if (token && user) {
      localStorage.setItem('userInfo', JSON.stringify(user));
      localStorage.setItem('userToken', token);
      dispatch(googleAuth.fulfilled(user));
      navigate('/');
    } else {
      navigate('/login');
    }
  }, [location, navigate, dispatch]);

  return <div>Processing Google login...</div>;
};

export default GoogleCallback;