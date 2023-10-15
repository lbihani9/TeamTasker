import React from 'react';
import PropTypes from 'prop-types';
import LabelsTable from './LabelsTable';
import { Grid, Typography } from '@mui/material';
import NewLabel from './NewLabel';
import useLabels from '../../hooks/useLabels';
import TTBackdrop from '../Templates/TTBackdrop';

const Labels = (props) => {
  const { labels, updateLabel, loading, deleteLabel, postLabel } = useLabels();

  return (
    <Grid
      container
      sx={{
        padding: '1rem',
        paddingBottom: '2rem',
        overflowY: 'auto',
        height: 'inherit',
        alignContent: 'baseline',
        justifyContent: 'center',
      }}
      rowSpacing={2}
    >
      {loading && <TTBackdrop open={loading} />}

      <NewLabel postLabel={postLabel} />

      {labels.length === 0 && (
        <Typography
          variant='subtitle1'
          component='p'
        >
          No labels found.
        </Typography>
      )}

      {labels.length > 0 && (
        <LabelsTable
          labels={labels}
          updateLabel={updateLabel}
          deleteLabel={deleteLabel}
        />
      )}
    </Grid>
  );
};

Labels.propTypes = {};

export default Labels;
