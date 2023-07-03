import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

const UserDashboard = props => {
  useEffect(() => {
    axios.get(`/api/v1/users`)
    .then(res => console.log(res))
    .catch(err => console.log(err))  
  }, []);

  return (
    <div>UserDashboard</div>
  )
}

UserDashboard.propTypes = {}

export default UserDashboard