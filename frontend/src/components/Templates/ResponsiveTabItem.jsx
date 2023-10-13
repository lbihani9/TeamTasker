import React from 'react';
import PropTypes from 'prop-types';
import { Button, Typography, useMediaQuery, useTheme } from '@mui/material';

const ResponsiveTabItem = ({
  name,
  handler,
  isSelected,
  style = {},
  index,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      {!isMobile && (
        <Typography
          sx={{
            height: 'inherit',
            fontFamily: 'inherit',
            color: 'black',
            fontWeight: 500,
            borderBottom: isSelected && 'thick solid #2196f3',
            '&:hover': {
              cursor: 'pointer',
            },
            ...style,
          }}
          onClick={(e) => handler(e, index)}
        >
          {name}
        </Typography>
      )}

      {isMobile && (
        <Button
          variant='contained'
          size='small'
          sx={{
            fontFamily: 'inherit',
            borderRadius: '0.5em',
          }}
        >
          {name}
        </Button>
      )}
    </>
  );
};

ResponsiveTabItem.propTypes = {};

export default ResponsiveTabItem;
