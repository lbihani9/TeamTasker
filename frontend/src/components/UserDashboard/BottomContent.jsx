import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import TuneIcon from '@mui/icons-material/Tune';
import BackupTableIcon from '@mui/icons-material/BackupTable';
import FormatListBulletedSharpIcon from '@mui/icons-material/FormatListBulletedSharp';

const BottomContent = (props) => {
  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          height: '4.3vh',
          padding: '0 1em',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: 'white',
          fontFamily: 'Poppins',
        }}
      >
        <Typography
          sx={{
            height: 'inherit',
            fontFamily: 'inherit',
            color: 'black',
            fontWeight: 500,
            borderBottom: 'thick solid #2196f3',
            alignSelf: 'center',
            '&:hover': {
              cursor: 'pointer',
            },
          }}
        >
          Tasks
        </Typography>
        <Button
          variant='contained'
          size='small'
          sx={{
            fontFamily: 'inherit',
            color: 'black',
            backgroundColor: '#f5f5f5',
            borderRadius: '0.5em',
            '&:hover': {
              backgroundColor: '#f5f5f5',
            },
          }}
          startIcon={<AddIcon />}
        >
          New project
        </Button>
      </Box>

      <Box
        sx={{
          backgroundColor: '#fafafa',
          height: '100%',
          width: '100%',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1.5em 1em 1em 1em',
            fontFamily: 'Poppins',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              fontFamily: 'inherit',
              gap: '0.2em',
            }}
          >
            <BackupTableIcon />
            <Typography
              sx={{
                fontFamily: 'inherit',
              }}
            >
              Table
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              fontFamily: 'inherit',
              gap: '0.2em',
            }}
          >
            <TuneIcon />
            <Typography
              sx={{
                fontFamily: 'inherit',
              }}
            >
              Filter
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

BottomContent.propTypes = {};

export default BottomContent;
