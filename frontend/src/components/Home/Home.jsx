import React, { useEffect, useState } from 'react';
import TeamTaskerLogo from '../../assets/TeamTasker-4.png';
import Grid from '@mui/material/Grid';
import Login from './LoginBoard/LoginBoard';

const Home = props => {
  const [randomBgColor, setRandomBgColor] = useState('#F5C5BE');

  useEffect(() => {
    const colors = ['#F5C5BE', '#539D8B', '#53679D', '#9B539D', '#9D6153'];

    const interval = setInterval(() => {
      const index = Math.floor(Math.random() * colors.length);
      setRandomBgColor(colors[index]);
    }, 10000); // 10 seconds

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Grid
      container
      sx={{
        transition: 'background-color 0.5s ease',
        backgroundColor: randomBgColor,
        height: '100vh',
        margin: 0,
        overflow: 'hidden',
      }}
    >
      <Grid
        item
        lg={8}
        sx={{
          position: 'relative',
          flexShrink: 3,
        }}
      >
        <img
          src={TeamTaskerLogo}
          style={{
            width: '60vw',
            paddingInlineStart: '2rem',
            position: 'absolute',
            left: '1.25rem',
            bottom: '1px',
          }}
        />
      </Grid>

      <Login />
    </Grid>
  );
};

Home.propTypes = {};

export default Home;
