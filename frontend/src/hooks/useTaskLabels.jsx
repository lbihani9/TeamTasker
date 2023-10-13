import axios from 'axios';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  addCurrentTaskLabel,
  removeCurrentTaskLabel,
  updateCurrentTask,
} from '../store/slices/tasksSlice';

const useTaskLabels = () => {
  const [loading, setLoading] = useState();
  const dispatch = useDispatch();

  const deleteTaskLabel = useCallback(async (taskLabelId) => {
    try {
      setLoading(true);
      await axios.delete(`/api/v1/task-labels/${taskLabelId}`);

      dispatch(removeCurrentTaskLabel(taskLabelId));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const postTaskLabel = useCallback(async (body) => {
    try {
      setLoading(true);
      const res = await axios.post(`/api/v1/task-labels`, body);
      dispatch(addCurrentTaskLabel(res.data?.data ?? {}));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const patchTaskLabels = useCallback(async (body, taskId) => {
    try {
      setLoading(true);
      const res = await axios.patch(
        `/api/v1/tasks/${taskId}/task-labels/bulk`,
        body
      );

      dispatch(updateCurrentTask({ labels: res.data.data }));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, deleteTaskLabel, postTaskLabel, patchTaskLabels };
};

export default useTaskLabels;
