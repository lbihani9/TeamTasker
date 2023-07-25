import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Grid } from '@mui/material';
import contents from './NavbarContent';
import NavbarItem from './NavbarItem';
import TeamTaskerLogo from '../../assets/TeamTasker-1.png';
import Logout from '../Logout';
import { useSelector } from 'react-redux';

const Navbar = (props) => {
  const layout = useSelector((state) => state.layouts.layout);

  return (
    <Grid
      item
      {...layout.primaryNavbar}
    >
      <div className='primary-navbar'>
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
                  handleItemClick: (e) =>
                    props.selectPrimaryNavbarItem(e, index),
                }}
              />
            );
          })}
        </Box>

        <Logout />
      </div>
    </Grid>
  );
};

Navbar.propTypes = {
  activeIndex: PropTypes.number,
  selectPrimaryNavbarItem: PropTypes.func,
};

export default Navbar;
