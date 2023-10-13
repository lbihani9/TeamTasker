import axios from 'axios';
import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTeam } from '../store/slices/teamSlice';

const usePostTeam = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const currentOrganization = useSelector(
    (state) => state.organizations.current
  );

  const postTeam = useCallback(async (body) => {
    body = {
      ...body,
      organizationId: currentOrganization?.id,
    };

    try {
      setLoading(true);
      const res = await axios.post(`/api/v1/teams`, body);
      dispatch(
        addTeam({
          organizationId: currentOrganization?.id,
          team: res.data?.data ?? {},
        })
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, postTeam };
};

export default usePostTeam;
