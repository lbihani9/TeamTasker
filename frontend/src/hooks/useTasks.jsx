import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearTasks,
  setProjectTasks,
  setTasks,
} from '../store/slices/tasksSlice';
import { useParams } from 'react-router-dom';
import { setCurrentProject } from '../store/slices/projectsSlice';
import { dismissNotifications, notify } from '../utils';

const useTasks = () => {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const userInfo = useSelector((state) => state.auth.info);

  useEffect(() => {
    if (typeof projectId === 'undefined') {
      getTasks();
    } else {
      getProjectTasks(projectId);
    }

    return () => {
      dispatch(clearTasks());
    };
  }, []);

  const getProjectTasks = useCallback(async (projectId) => {
    try {
      setLoading(true);
      // notify('Loading...');
      const res = await axios.get(`/api/v1/projects/${projectId}/tasks`);
      const { tasks, project } = res.data.data ?? {};
      dispatch(
        setProjectTasks({
          projectId,
          tasks,
        })
      );
      dispatch(setCurrentProject(project));
      // dismissNotifications();
    } catch (error) {
      console.log(error.message);
      const { errors } = error.response?.data;
      notify(errors[0].message, 'error');
    } finally {
      setLoading(false);
    }
  }, []);

  const getTasks = useCallback(async () => {
    try {
      setLoading(true);
      // notify('Loading...');
      const res = await axios.get(`/api/v1/@me/tasks`);
      console.log('ran task');
      dispatch(
        setTasks({
          userId: userInfo.id,
          tasks: res.data.data ?? [],
        })
      );
      // dismissNotifications();
    } catch (error) {
      console.log(error.response);
      const { errors } = error.response?.data;
      notify(errors[0].message, 'error');
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading };
};

export default useTasks;
