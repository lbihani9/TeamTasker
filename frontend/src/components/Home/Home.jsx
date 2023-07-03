import React, { useEffect, useState } from 'react';
import TeamTaskerLogo from '../../assets/TeamTasker-4.png';
import Grid from '@mui/material/Grid';
import { Paper } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';

const Home = props => {
  const [randomBgColor, setRandomBgColor] = useState('#F5C5BE');

  useEffect(() => {
    const colors = ['#F5C5BE', '#539D8B', '#53679D', '#9B539D', '#9D6153'];

    const interval = setInterval(() => {
      const index = Math.floor(Math.random() * colors.length);
      setRandomBgColor(colors[index]);
    }, 200000); // 20 seconds

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
        md={8}
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

      <Grid
        item
        md={4}
      >
        <Paper
          elevation={2}
          sx={{
            height: 'fit-content',
            width: '24rem',
            padding: '1.5rem',
            position: 'absolute',
            top: '40vh',
            left: '70vw',
            borderRadius: '6px',
            borderRadius: '2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'sans-serif',
            fontSize: '1.125rem',
            '&:hover': {
              cursor: 'pointer',
              transition: 'transform 0.4s',
              transform: 'scale(1.01)',
            },
          }}
        >
          <GoogleIcon color='error' /> &nbsp; Continue with Google
        </Paper>
      </Grid>
    </Grid>
  );
};

Home.propTypes = {};

export default Home;
