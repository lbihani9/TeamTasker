import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { dismissNotifications, notify } from '../utils';

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
      // notify('Loading...');
      const res = await axios.get(`/api/v1/@me/labels`);

      setLabels(res.data.data ?? []);

      // dismissNotifications();
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
      // notify('Loading...');
      const res = await axios.post(`/api/v1/labels`, body);
      setLabels((prev) => [...prev, { ...res.data.data }]);

      // dismissNotifications();
      notify('Lable created.', 'success');
    } catch (error) {
      console.log(error.response);
      const { errors } = error.response?.data;
      notify(errors[0].message, 'error');
    } finally {
      setLoading(false);
    }
  }, []);

  const updateLabel = useCallback(async (body, labelId) => {
    try {
      setLoading(true);
      // notify('Loading...');
      const res = await axios.patch(`/api/v1/labels/${labelId}`, body);
      setLabels((prev) =>
        prev.map((p) => (p.id === labelId ? { ...res.data.data } : p))
      );

      // dismissNotifications();
      notify('Label updated', 'success');
    } catch (error) {
      console.log(error.response);
      const { errors } = error.response?.data;
      notify(errors[0].message, 'error');
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteLabel = useCallback(async (labelId) => {
    try {
      setLoading(true);
      // notify('Loading...');
      const res = await axios.delete(`/api/v1/labels/${labelId}`);
      setLabels((prev) => prev.filter((p) => p.id !== labelId));

      // dismissNotifications();
      notify('Label deleted', 'success');
    } catch (error) {
      console.log(error.response);
      const { errors } = error.response?.data;
      notify(errors[0].message, 'error');
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, labels, updateLabel, deleteLabel, postLabel };
};

export default useLabels;
