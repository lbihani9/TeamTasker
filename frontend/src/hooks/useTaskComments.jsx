import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';

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
      const res = await axios.get(`/api/v1/tasks/${taskId}/comments`);
      setComments(res.data.data ?? []);
    } catch (error) {
      console.log(error);
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

      const res = await axios.post(`/api/v1/task-comments`, body);
      setComments((prev) => [...prev, { ...res.data.data }]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateComment = useCallback(async (body, commentId) => {
    try {
      setLoading(true);
      const res = await axios.patch(`/api/v1/task-comments/${commentId}`, body);
      setComments((prev) =>
        prev.map((p) => (p.id === commentId ? { ...res.data.data } : p))
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteComment = useCallback(async (commentId) => {
    try {
      setLoading(true);
      const res = await axios.delete(`/api/v1/task-comments/${commentId}`);
      setComments((prev) => prev.filter((p) => p.id !== commentId));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  return { comments, loading, postComment, updateComment, deleteComment };
};

export default useTaskComments;
