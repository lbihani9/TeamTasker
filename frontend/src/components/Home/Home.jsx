import React, { useEffect } from 'react'
import axios from 'axios';

function Home() {
  useEffect(() => {
    axios.get('/api/v1/users')
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    })
  }, []);

  return (
    <div>Home</div>
  )
}

export default Home