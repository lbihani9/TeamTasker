import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  clearTasks,
  setProjectTasks,
  setTasks,
} from '../store/slices/tasksSlice';
import { useParams } from 'react-router-dom';
import { setCurrentProject } from '../store/slices/projectsSlice';

const useTasks = () => {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

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
      const res = await axios.get(`/api/v1/projects/${projectId}/tasks`);
      const { tasks, project } = res.data.data ?? {};
      dispatch(
        setProjectTasks({
          projectId,
          tasks,
        })
      );
      dispatch(setCurrentProject(project));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const getTasks = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/v1/@me/tasks`);
      dispatch(
        setTasks({
          userId: 1,
          tasks: res.data.data ?? [],
        })
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading };
};

export default useTasks;
