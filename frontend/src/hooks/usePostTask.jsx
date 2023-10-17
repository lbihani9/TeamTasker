import axios from 'axios';
import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProjectTask, addTask } from '../store/slices/tasksSlice';
import { dismissNotifications, notify } from '../utils';

const usePostTask = () => {
  const [loading, setLoading] = useState(false);
  const currentProject = useSelector((state) => state.projects.current);
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.auth.info);

  const postTask = useCallback(async (body, taskableType) => {
    try {
      setLoading(true);
      // notify('Loading...');

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
            userId: userInfo.id,
            task: res.data?.data ?? {},
          })
        );
      }

      // dismissNotifications();
      notify('Task created successfully', 'success');
    } catch (error) {
      console.log(error.message);
      const { errors } = error.response?.data;
      notify(errors[0].message, 'error');
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, postTask };
};

export default usePostTask;
