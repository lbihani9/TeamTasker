import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { dismissNotifications, notify } from '../utils';

const useLabelSearch = () => {
  const { taskId } = useParams();
  const [searchText, setSearchText] = useState('');
  const [foundLabels, setFoundLabels] = useState([]);
  const [loading, setLoading] = useState(false);
  const currentTask = useSelector((state) => state.tasks.current);

  useEffect(() => {
    searchLabels(searchText, taskId);
    return () => {};
  }, [searchText, currentTask?.labels]);

  const searchLabels = useCallback(async (searchText, taskId) => {
    const queryParams = [
      `text=${searchText}`,
      'fields=id,name,color',
      `taskId=${taskId}`,
    ];
    const queryString = queryParams.join('&');

    try {
      setLoading(true);
      notify('Loading...');

      const res = await axios.get(
        `/api/v1/search/labels/action-items?${queryString}`
      );
      setFoundLabels(res.data.data ?? []);

      dismissNotifications();
    } catch (error) {
      console.log(error.response);
      const { errors } = error.response?.data;
      notify(errors[0].message, 'error');
    } finally {
      setLoading(false);
    }
  }, []);

  return { searchText, setSearchText, foundLabels, loading };
};

export default useLabelSearch;
