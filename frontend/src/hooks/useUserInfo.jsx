import axios from 'axios';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearInfo,
  setLoginStatus,
  setUserInfo,
} from '../store/slices/userSlice';
import { notify } from '../utils';
import { useNavigate } from 'react-router-dom';

const useUserInfo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const getLoginStatus = useCallback(async () => {
    try {
      const { data } = await axios.get(`/auth/login-status`);
      const { status = false } = data.data;

      dispatch(setLoginStatus(status));
      if (status) {
        navigate('/@me/tasks');
      }
    } catch (err) {
      console.log(err);
      if (err?.response?.status[0] == 4) {
        notify('Session expired.', 'error');
        navigate('/login');
      }
    }
  }, []);

  const login = useCallback(async () => {
    try {
      const { data } = await axios.get(`/auth/login`);
      window.location.href = data.data.url;
    } catch (err) {
      console.log(err);
      notify('Login failed.', 'error');
      navigate('/login');
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      const res = await axios.get(`/auth/logout`);
      dispatch(clearInfo());
    } catch (error) {
      console.log(error);
    } finally {
      navigate(`/login`);
    }
  }, []);

  const getUserProfile = useCallback(async () => {
    try {
      const res = await axios.get(`api/v1/@me/profile`);
      dispatch(setUserInfo(res.data.data));
      dispatch(setLoginStatus(true));
    } catch (error) {
      console.log(error);
      notify('An error occured while fetching user info.', 'error');
      navigate('/login');
    }
  }, []);

  return { getLoginStatus, getUserProfile, login, logout };
};

export default useUserInfo;
