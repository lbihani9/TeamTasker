import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setTeamProjects,
  updateTeamStoreProject,
} from '../store/slices/projectsSlice';
import { dismissNotifications, notify } from '../utils';

const useTeamProjects = () => {
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const currentTeam = useSelector((state) => state.teams.current);
  const dispatch = useDispatch();

  useEffect(() => {
    getTeamProjects(searchText);
    return () => {};
  }, [searchText]);

  const getTeamProjects = useCallback(async (searchText) => {
    try {
      setLoading(true);
      // notify('Loading...');

      const res = await axios.get(
        `/api/v1/teams/${currentTeam?.id}/projects?text=${searchText}`
      );
      dispatch(
        setTeamProjects({
          teamId: currentTeam?.id,
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

  const patchTeamProject = useCallback(async (body, projectId) => {
    try {
      setLoading(true);
      // notify('Loading...');

      const res = await axios.patch(`/api/v1/projects/${projectId}`, body);

      dispatch(
        updateTeamStoreProject({
          teamId: currentTeam?.id,
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

  return { loading, searchText, setSearchText, patchTeamProject };
};

export default useTeamProjects;
