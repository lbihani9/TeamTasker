import React from 'react';
import PropTypes from 'prop-types';
import LabelsTable from './LabelsTable';
import { Grid } from '@mui/material';
import NewLabel from './NewLabel';
import useLabels from '../../hooks/useLabels';

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
      }}
      rowSpacing={2}
    >
      <NewLabel postLabel={postLabel} />

      <LabelsTable
        labels={labels}
        updateLabel={updateLabel}
        deleteLabel={deleteLabel}
      />
    </Grid>
  );
};

Labels.propTypes = {};

export default Labels;
