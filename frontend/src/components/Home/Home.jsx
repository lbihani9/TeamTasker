import React, { useEffect, useState } from 'react';
import TeamTaskerLogo from '../../assets/TeamTasker-logos_transparent.png';
import Grid from '@mui/material/Grid';
import Login from './LoginBoard/LoginBoard';
import { Stack, useMediaQuery, useTheme } from '@mui/material';

const Home = (props) => {
  const [randomBgColor, setRandomBgColor] = useState('#F5C5BE');
  const theme = useTheme();
  const isAboveLG = useMediaQuery(theme.breakpoints.up('lg'));

  useEffect(() => {
    const colors = ['#000000', '#00008B', '#34282C', '#FFC0CB'];

    const interval = setInterval(() => {
      const index = Math.floor(Math.random() * colors.length);
      setRandomBgColor(colors[index]);
    }, 6000); // 6 seconds

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
        width: '100vw',
        margin: 0,
        overflow: 'hidden',
      }}
    >
      <Grid
        item
        sm={7}
        xs={12}
        width='100%'
      >
        <Stack
          justifyContent='center'
          alignItems='center'
          sx={{
            width: '100%',
            height: isAboveLG ? '80%' : '100%',
          }}
        >
          <img
            src={TeamTaskerLogo}
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              alignSelf: 'center',
            }}
          />
        </Stack>
      </Grid>

      <Login />
    </Grid>
  );
};

Home.propTypes = {};

export default Home;
