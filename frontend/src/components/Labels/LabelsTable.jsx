import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, Stack, useTheme } from '@mui/material';
import LabelTableRow from './LabelTableRow';

const LabelsTable = ({ updateLabel, deleteLabel, labels }) => {
  const theme = useTheme();

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
        sx={{
          border: '1px solid black',
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
          borderRadius: '0.4rem',
          height: 'fit-content',
        }}
      >
        <Box
          sx={{
            width: 'inherit',
            padding: '0.7rem',
          }}
        >
          {labels.length} labels
        </Box>

        {labels.map((label) => {
          return (
            <LabelTableRow
              label={label}
              updateLabel={updateLabel}
              deleteLabel={deleteLabel}
            />
          );
        })}
      </Stack>
    </Grid>
  );
};

LabelsTable.propTypes = {
  labels: PropTypes.array,
  updateLabel: PropTypes.func,
  deleteLabel: PropTypes.func,
};

export default LabelsTable;
