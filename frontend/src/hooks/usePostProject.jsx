import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProject, addTeamProject } from '../store/slices/projectsSlice';
import axios from 'axios';

const usePostProject = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const postProject = useCallback(async (body, projectableType) => {
    try {
      setLoading(true);
      const res = await axios.post(`/api/v1/projects`, body);
      if (!projectableType) {
        dispatch(addProject({ ...res.data.data }));
      } else {
        dispatch(addTeamProject({ ...res.data.data }));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  return { postProject, loading };
};

export default usePostProject;
