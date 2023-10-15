import axios from 'axios';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  addCurrentTaskLabel,
  removeCurrentTaskLabel,
  updateCurrentTask,
} from '../store/slices/tasksSlice';
import { dismissNotifications, notify } from '../utils';

const useTaskLabels = () => {
  const [loading, setLoading] = useState();
  const dispatch = useDispatch();

  const deleteTaskLabel = useCallback(async (taskLabelId) => {
    try {
      setLoading(true);
      // notify('Loading...');
      await axios.delete(`/api/v1/task-labels/${taskLabelId}`);

      dispatch(removeCurrentTaskLabel(taskLabelId));
      // dismissNotifications();
      notify('Deleted task label successfully.', 'success');
    } catch (error) {
      console.log(error.response);
      const { errors } = error.response?.data;
      notify(errors[0].message, 'error');
    } finally {
      setLoading(false);
    }
  }, []);

  const postTaskLabel = useCallback(async (body) => {
    try {
      setLoading(true);
      // notify('Loading...');
      const res = await axios.post(`/api/v1/task-labels`, body);
      dispatch(addCurrentTaskLabel(res.data?.data ?? {}));
      // dismissNotifications();
      notify('Created task label successfully.', 'success');
    } catch (error) {
      console.log(error.response);
      const { errors } = error.response?.data;
      notify(errors[0].message, 'error');
    } finally {
      setLoading(false);
    }
  }, []);

  const patchTaskLabels = useCallback(async (body, taskId) => {
    try {
      setLoading(true);
      // notify('Loading...');
      const res = await axios.patch(
        `/api/v1/tasks/${taskId}/task-labels/bulk`,
        body
      );

      dispatch(updateCurrentTask({ labels: res.data.data }));
      // dismissNotifications();
      notify('Updated task label successfully.', 'success');
    } catch (error) {
      console.log(error.response);
      const { errors } = error.response?.data;
      notify(errors[0].message, 'error');
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, deleteTaskLabel, postTaskLabel, patchTaskLabels };
};

export default useTaskLabels;
