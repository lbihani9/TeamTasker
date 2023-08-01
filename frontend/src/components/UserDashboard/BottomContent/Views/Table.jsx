import axios from 'axios';
import React, { useEffect } from 'react'

export const Table = () => {
  useEffect(() => {
    getTasks();
    return () => {};
  }, []);

  const getTasks = async () => {
    try {
      const res = await axios.get(`/api/v1/@me/tasks`);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>Table</div>
  )
}
