import React from 'react';
import PropTypes from 'prop-types';
import { TableCell, TableHead, TableRow } from '@mui/material';

const TTTableHeader = ({ columns }) => {
  return (
    <TableHead>
      <TableRow>
        {columns.map((col, index) => {
          return (
            <TableCell
              key={index + 1}
              {...col.props}
            >
              {col.name}
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
};

TTTableHeader.propTypes = {
  columns: PropTypes.array,
};

export default TTTableHeader;
