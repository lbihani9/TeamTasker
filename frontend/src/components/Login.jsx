import React from 'react';
import axios from 'axios';


function Login() {
  const handleClick = (e) => {
    axios.get('/auth/login')
    .then(res => {
      window.location.href = res.data.url;
    })
    .catch(err => {
      console.log(err);
    })
  }

  return (
    <button
      onClick={handleClick}
    >
      Login
    </button>
  )
}

export default Login