import axios from 'axios';
import { useCallback, useState } from 'react';
import { dismissNotifications, notify } from '../utils';

const usePostTeamMember = () => {
  const [loading, setLoading] = useState(false);

  const postTeamMember = useCallback(async (body) => {
    try {
      setLoading(true);
      // notify('Loading...');

      const res = await axios.post(`/api/v1/team-members`, body);

      // dismissNotifications();
      notify('Successfully added user to the team.', 'success');
    } catch (error) {
      console.log(error.response);
      const { errors } = error.response?.data;
      notify(errors[0].message, 'error');
    } finally {
      setLoading(false);
    }
  });

  return { loading, postTeamMember };
};

export default usePostTeamMember;
