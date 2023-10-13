import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTeams } from '../store/slices/teamSlice';

const useTeams = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const currentOrganization = useSelector(
    (state) => state.organizations.current
  );

  useEffect(() => {
    getTeams();
    return () => {};
  }, []);

  const getTeams = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `/api/v1/organizations/${currentOrganization?.id}/teams`
      );
      dispatch(
        setTeams({
          organizationId: currentOrganization?.id,
          teams: res.data?.data ?? [],
        })
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const patchTeam = useCallback(async () => {
    try {
      setLoading(true);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, patchTeam };
};

export default useTeams;
