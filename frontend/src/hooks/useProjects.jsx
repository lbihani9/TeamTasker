import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { setProjects, updateStoreProject } from '../store/slices/projectsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { dismissNotifications, notify } from '../utils';

const useProjects = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const userInfo = useSelector((state) => state.auth.info);

  useEffect(() => {
    getProjects();
    return () => {};
  }, []);

  const getProjects = useCallback(async () => {
    try {
      setLoading(true);
      // notify('Loading...');
      const res = await axios.get(`/api/v1/@me/projects`);
      dispatch(
        setProjects({
          userId: userInfo.id,
          projects: res.data?.data ?? [],
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

  const updateProject = useCallback(async (body, projectId) => {
    try {
      setLoading(true);
      // notify('Loading...');
      const res = await axios.patch(`/api/v1/projects/${projectId}`, body);

      dispatch(
        updateStoreProject({
          userId: userInfo.id,
          project: res.data.data ?? {},
        })
      );

      // dismissNotifications();
      notify('Project updated.', 'success');
    } catch (error) {
      console.log(error.response);
      const { errors } = error.response?.data;
      notify(errors[0].message, 'error');
    } finally {
      setLoading(false);
    }
  }, []);

  return { updateProject, loading };
};

export default useProjects;
