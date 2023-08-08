import React from 'react';
import PropTypes from 'prop-types';
import { Table, TableContainer } from '@mui/material';
import TTTableHeader from './TTTableHeader';
import TTTableBody from './TTTableBody';

const TTTable = ({ rows, columns }) => {
  return (
    <TableContainer
      component={Paper}
      sx={{
        [theme.breakpoints.down('md')]: {
          width: '75vw',
        },
        [theme.breakpoints.up('md')]: {
          width: '90vw',
        },
      }}
    >
      <Table
        sx={{ width: '100%' }}
        size='medium'
      >
        <TTTableHeader columns={columns} />

        <TTTableBody
          rows={rows}
          columns={columns}
        />
      </Table>
    </TableContainer>
  );
};

TTTable.propTypes = {
  rows: PropTypes.array,
  columns: PropTypes.array,
};

export default TTTable;
