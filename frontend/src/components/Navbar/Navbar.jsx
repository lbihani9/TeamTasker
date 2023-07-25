import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Grid } from '@mui/material';
import contents from './NavbarContent';
import NavbarItem from './NavbarItem';
import TeamTaskerLogo from '../../assets/TeamTasker-1.png';
import Logout from '../Logout';

const Navbar = props => {
  return (
    <Grid
      item
      md={0.5}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'start',
        borderRight: 'thin solid #e0e0e0',
        backgroundColor: '#FFFFFF',
      }}
    >
      <img
        src={TeamTaskerLogo}
        style={{
          marginTop: '1em',
          width: '4em',
          height: '4em',
          backgroundColor: 'white',
          borderRadius: '50%',
        }}
      />

      <Box
        sx={{
          height: 'fit-content',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
        }}
      >
        {contents.map((content, index) => {
          return (
            <NavbarItem
              {...{
                ...content,
                index,
                activeIndex: props.activeIndex,
                key: index + 1,
                handleItemClick: e => props.setActiveIndex(index),
              }}
            />
          );
        })}
      </Box>

      <Logout />
    </Grid>
  );
};

Navbar.propTypes = {
  activeIndex: PropTypes.number,
  setActiveIndex: PropTypes.func,
};

export default Navbar;
