import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

const useLabels = () => {
  const [labels, setLabels] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getLabels();
    return () => {};
  }, []);

  const getLabels = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/v1/@me/labels`);

      setLabels(res.data.data ?? []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const postLabel = useCallback(async (body) => {
    try {
      setLoading(true);
      const res = await axios.post(`/api/v1/labels`, body);
      setLabels((prev) => [...prev, { ...res.data.data }]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateLabel = useCallback(async (body, labelId) => {
    try {
      setLoading(true);
      const res = await axios.patch(`/api/v1/labels/${labelId}`, body);
      setLabels((prev) =>
        prev.map((p) => (p.id === labelId ? { ...res.data.data } : p))
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteLabel = useCallback(async (labelId) => {
    try {
      setLoading(true);
      const res = await axios.delete(`/api/v1/labels/${labelId}`);
      setLabels((prev) => prev.filter((p) => p.id !== labelId));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, labels, updateLabel, deleteLabel, postLabel };
};

export default useLabels;
