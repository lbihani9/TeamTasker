import { useDispatch } from 'react-redux';
import { clearInfo } from '../store/slices/userSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { notify } from '../utils';

const { useCallback, useState } = require('react');

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = useCallback(async () => {
    try {
      const { data } = await axios.get(`/auth/login`);
      window.location.href = data.data.url;
    } catch (err) {
      console.log(err);
      notify('Login failed.', 'error');
      navigate('/login');
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/auth/logout`);
      dispatch(clearInfo());
    } catch (error) {
      console.log(error);
    } finally {
      navigate(`/login`);
    }
  }, []);

  return { login, logout, loading };
};

export default useLogin;
