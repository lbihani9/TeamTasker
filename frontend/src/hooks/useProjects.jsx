import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { setProjects, updateStoreProject } from '../store/slices/projectsSlice';
import { useDispatch } from 'react-redux';

const useProjects = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getProjects();
    return () => {};
  }, []);

  const getProjects = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/v1/@me/projects`);
      dispatch(
        setProjects({
          userId: 1,
          projects: res.data?.data ?? [],
        })
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateProject = useCallback(async (body, projectId) => {
    try {
      setLoading(true);
      const res = await axios.patch(`/api/v1/projects/${projectId}`, body);

      dispatch(
        updateStoreProject({
          userId: 1,
          project: res.data.data ?? {},
        })
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  return { updateProject, loading };
};

export default useProjects;
