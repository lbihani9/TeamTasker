import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Grid, Stack, useTheme } from '@mui/material';
import NewLabelForm from './NewLabelForm';

const NewLabel = ({ postLabel }) => {
  const theme = useTheme();
  const [shouldAdd, setShouldAdd] = useState(false);

  const handleNewLabelClick = (e) => {
    setShouldAdd((prev) => !prev);
  };

  return (
    <Grid
      item
      xs={12}
      sx={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Stack
        direction='column'
        sx={{
          [theme.breakpoints.down('sm')]: {
            width: '100%',
          },
          [theme.breakpoints.between('sm', 'md')]: {
            width: '30rem',
          },
          [theme.breakpoints.up('md')]: {
            width: '50rem',
          },
          [theme.breakpoints.up('lg')]: {
            width: '65rem',
          },
          [theme.breakpoints.up('xl')]: {
            width: '75rem',
          },
        }}
        spacing={2}
      >
        <Box
          sx={{
            width: 'inherit',
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <Button
            color='success'
            variant='contained'
            size='small'
            sx={{
              fontFamily: 'inherit',
              borderRadius: '0.5em',
              fontFamily: 'Poppins',
            }}
            onClick={handleNewLabelClick}
          >
            New label
          </Button>
        </Box>

        {shouldAdd && (
          <NewLabelForm
            postLabel={postLabel}
            handleNewLabelClick={handleNewLabelClick}
          />
        )}
      </Stack>
    </Grid>
  );
};

NewLabel.propTypes = {
  postLabel: PropTypes.func,
};

export default NewLabel;
