import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentTask, updateCurrentTask } from '../store/slices/tasksSlice';
import { dismissNotifications, notify } from '../utils';

const useDetailedTask = (taskId) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    getTask();
    return () => {};
  }, []);

  const getTask = async () => {
    try {
      setLoading(true);
      notify('Loading...');
      const res = await axios.get(`/api/v1/tasks/${taskId}`);
      dispatch(setCurrentTask(res.data?.data ?? {}));

      dismissNotifications();
    } catch (error) {
      console.log(error.response);
      const { errors } = error.response?.data;
      notify(errors[0].message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const updateTask = useCallback(async (body, taskId) => {
    try {
      setLoading(true);
      notify('Loading...');
      const res = await axios.patch(`/api/v1/tasks/${taskId}`, body);
      dispatch(updateCurrentTask(res.data?.data ?? {}));

      dismissNotifications();
    } catch (error) {
      console.log(error.response);
      const { errors } = error.response?.data;
      notify(errors[0].message, 'error');
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, updateTask };
};

export default useDetailedTask;
