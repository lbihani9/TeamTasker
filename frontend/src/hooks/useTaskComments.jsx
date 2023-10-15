import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { dismissNotifications, notify } from '../utils';

const useTaskComments = (taskId) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  // TODO: Update the toaster if taskId is undefined or null.

  useEffect(() => {
    getComments();
    return () => {};
  }, []);

  const getComments = useCallback(async () => {
    try {
      setLoading(true);
      // notify('Loading...');
      const res = await axios.get(`/api/v1/tasks/${taskId}/comments`);
      setComments(res.data.data ?? []);

      // dismissNotifications();
    } catch (error) {
      console.log(error.response);
      const { errors } = error.response?.data;
      notify(errors[0].message, 'error');
    } finally {
      setLoading(false);
    }
  }, []);

  const postComment = useCallback(async (body) => {
    try {
      setLoading(true);
      body = {
        ...body,
        taskId,
      };

      // notify('Loading...');
      const res = await axios.post(`/api/v1/task-comments`, body);
      setComments((prev) => [...prev, { ...res.data.data }]);

      // dismissNotifications();
      notify('Comment created', 'success');
    } catch (error) {
      console.log(error.response);
      const { errors } = error.response?.data;
      notify(errors[0].message, 'error');
    } finally {
      setLoading(false);
    }
  }, []);

  const updateComment = useCallback(async (body, commentId) => {
    try {
      setLoading(true);
      // notify('Loading...');
      const res = await axios.patch(`/api/v1/task-comments/${commentId}`, body);
      setComments((prev) =>
        prev.map((p) => (p.id === commentId ? { ...res.data.data } : p))
      );

      // dismissNotifications();
      notify('Comment updated', 'success');
    } catch (error) {
      console.log(error.response);
      const { errors } = error.response?.data;
      notify(errors[0].message, 'error');
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteComment = useCallback(async (commentId) => {
    try {
      setLoading(true);
      // notify('Loading...');
      const res = await axios.delete(`/api/v1/task-comments/${commentId}`);
      setComments((prev) => prev.filter((p) => p.id !== commentId));

      // dismissNotifications();
      notify('Comment deleted successfully.', 'success');
    } catch (error) {
      console.log(error.response);
      const { errors } = error.response?.data;
      notify(errors[0].message, 'error');
    } finally {
      setLoading(false);
    }
  }, []);

  return { comments, loading, postComment, updateComment, deleteComment };
};

export default useTaskComments;
