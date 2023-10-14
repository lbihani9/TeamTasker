import axios from 'axios';
import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTeam } from '../store/slices/teamSlice';
import { dismissNotifications, notify } from '../utils';

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
      notify('Loading...');
      const res = await axios.post(`/api/v1/teams`, body);
      dispatch(
        addTeam({
          organizationId: currentOrganization?.id,
          team: res.data?.data ?? {},
        })
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

  return { loading, postTeam };
};

export default usePostTeam;
