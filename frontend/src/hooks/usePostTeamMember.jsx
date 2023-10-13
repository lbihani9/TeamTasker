import axios from 'axios';
import { useCallback, useState } from 'react';

const usePostTeamMember = () => {
  const [loading, setLoading] = useState(false);

  const postTeamMember = useCallback(async (body) => {
    try {
      setLoading(true);
      const res = await axios.post(`/api/v1/team-members`, body);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  });

  return { loading, postTeamMember };
};

export default usePostTeamMember;
