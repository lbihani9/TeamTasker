import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setLoginStatus, setUserInfo } from '../store/slices/userSlice';
import { notify } from '../utils';
import { useNavigate } from 'react-router-dom';

const useUserInfo = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    getUserProfile();

    return () => {};
  }, []);

  const getLoginStatus = useCallback(async () => {
    try {
      setLoading(true);
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
    } finally {
      setLoading(false);
    }
  }, []);

  const getUserProfile = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(`api/v1/@me/profile`);
      console.log('ran user');
      dispatch(setUserInfo(res.data.data));
      dispatch(setLoginStatus(true));
    } catch (error) {
      console.log(error);
      notify('An error occured while fetching user info.', 'error');
      navigate('/login');
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, getLoginStatus, getUserProfile };
};

export default useUserInfo;
