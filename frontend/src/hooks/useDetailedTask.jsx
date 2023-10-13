import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentTask, updateCurrentTask } from '../store/slices/tasksSlice';

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
      const res = await axios.get(`/api/v1/tasks/${taskId}`);
      dispatch(setCurrentTask(res.data?.data ?? {}));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const updateTask = useCallback(async (body, taskId) => {
    try {
      setLoading(true);
      const res = await axios.patch(`/api/v1/tasks/${taskId}`, body);
      dispatch(updateCurrentTask(res.data?.data ?? {}));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, updateTask };
};

export default useDetailedTask;
