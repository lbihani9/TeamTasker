import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProject, addTeamProject } from '../store/slices/projectsSlice';
import axios from 'axios';
import { dismissNotifications, notify } from '../utils';

const usePostProject = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const currentTeam = useSelector((state) => state.teams.current);

  const postProject = useCallback(async (body, projectableType) => {
    try {
      setLoading(true);
      // notify('Loading...');

      const res = await axios.post(`/api/v1/projects`, body);
      if (!projectableType) {
        dispatch(addProject({ userId: 1, project: { ...res.data.data } }));
      } else {
        dispatch(
          addTeamProject({
            teamId: currentTeam.id,
            project: { ...res.data.data },
          })
        );
      }

      // dismissNotifications();
      notify('Project created', 'success');
    } catch (error) {
      console.log(error.response);
      const { errors } = error.response?.data;
      notify(errors[0].message, 'error');
    } finally {
      setLoading(false);
    }
  }, []);

  return { postProject, loading };
};

export default usePostProject;
