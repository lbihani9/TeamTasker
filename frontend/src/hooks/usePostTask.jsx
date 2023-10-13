import axios from 'axios';
import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProjectTask, addTask } from '../store/slices/tasksSlice';

const usePostTask = () => {
  const [loading, setLoading] = useState(false);
  const currentProject = useSelector((state) => state.projects.current);
  const dispatch = useDispatch();

  const postTask = useCallback(async (body, taskableType) => {
    try {
      setLoading(true);
      const res = await axios.post(`/api/v1/tasks`, body);
      if (taskableType) {
        dispatch(
          addProjectTask({
            projectId: currentProject?.id,
            task: res.data?.data ?? {},
          })
        );
      } else {
        dispatch(
          addTask({
            userId: 1,
            task: res.data?.data ?? {},
          })
        );
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, postTask };
};

export default usePostTask;
