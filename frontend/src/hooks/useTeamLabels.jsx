import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { dismissNotifications, notify } from '../utils';

const useTeamLabels = () => {
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [labels, setLabels] = useState([]);
  const currentTeam = useSelector((state) => state.teams.current);

  useEffect(() => {
    getTeamLabels(searchText);
    return () => {};
  }, [searchText]);

  const getTeamLabels = useCallback(async (searchText) => {
    try {
      setLoading(true);
      notify('Loading...');
      const res = await axios.get(
        `/api/v1/teams/${currentTeam?.id}/labels?text=${searchText}`
      );
      setLabels(res.data?.data ?? []);

      dismissNotifications();
    } catch (error) {
      console.log(error.response);
      const { errors } = error.response?.data;
      notify(errors[0].message, 'error');
    } finally {
      setLoading(false);
    }
  }, []);

  const patchLabel = useCallback(async (body, labelId) => {
    try {
      setLoading(true);
      notify('Loading...');
      const res = await axios.patch(`/api/v1/labels/${labelId}`, body);

      setLabels((prev) =>
        prev.filter((p) => (p.id === labelId ? { ...res.data.data } : p))
      );

      dismissNotifications();
    } catch (error) {
      console.log(error.response);
      const { errors } = error.response?.data;
      notify(errors[0].message, 'error');
    } finally {
      setLoading(false);
    }
  }, []);

  const postLabel = useCallback(async (body) => {
    try {
      setLoading(true);
      notify('Loading...');
      const res = await axios.post(`/api/v1/labels`, body);
      setLabels((prev) => [...prev, { ...res.data.data }]);

      dismissNotifications();
    } catch (error) {
      console.log(error.response);
      const { errors } = error.response?.data;
      notify(errors[0].message, 'error');
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, searchText, setSearchText, patchLabel, labels, postLabel };
};

export default useTeamLabels;
