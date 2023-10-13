import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';

const useProjectSearch = () => {
  // TODO (Lokesh): Implement pagination.
  const [searchText, setSearchText] = useState('');
  const [foundProjects, setFoundProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    searchProjects(searchText);
    return () => {};
  }, [searchText]);

  const searchProjects = useCallback(async (searchText) => {
    const queryParams = [`text=${searchText}`, 'fields=id,name'];
    const queryString = queryParams.join('&');

    try {
      setLoading(true);
      const res = await axios.get(
        `/api/v1/search/projects/action-items?${queryString}`
      );

      setFoundProjects(res.data?.data ?? []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, searchText, setSearchText, foundProjects };
};

export default useProjectSearch;
