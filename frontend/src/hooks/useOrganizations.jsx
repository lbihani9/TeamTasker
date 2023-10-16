import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  addOrganization,
  setOrganizations,
} from '../store/slices/organizationSlice';
import { dismissNotifications, notify } from '../utils';

const useOrganizations = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getOrganizations();
    return () => {};
  }, []);

  const getOrganizations = useCallback(async () => {
    try {
      setLoading(true);
      // notify('Loading...');

      const res = await axios.get(`/api/v1/@me/organizations`);
      dispatch(setOrganizations(res.data?.data ?? []));

      // dismissNotifications();
    } catch (error) {
      console.log(error.response);
      const { errors } = error.response?.data;
      notify(errors[0].message, 'error');
    } finally {
      setLoading(false);
    }
  }, []);

  const postOrganization = useCallback(async (body) => {
    try {
      setLoading(true);
      // notify('Loading...');

      const res = await axios.post(`/api/v1/organizations`, body);
      dispatch(addOrganization(res.data?.data ?? {}));

      // dismissNotifications();
      notify('Organization created successfully', 'success');
    } catch (error) {
      console.log(error.response);
      const { errors } = error.response?.data;
      notify(errors[0].message, 'error');
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, postOrganization };
};

export default useOrganizations;
