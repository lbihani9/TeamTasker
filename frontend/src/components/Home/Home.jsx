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

  const handleLogout = () => {
    axios.get('/auth/logout')
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    })
  }

  return (
    <div>
      Home
      <button
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  )
}

export default Home