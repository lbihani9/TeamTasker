import React from 'react';
import PropTypes from 'prop-types';
import { TableBody, TableCell, TableRow } from '@mui/material';

const TTTableBody = ({ rows, columns }) => {
  return (
    <TableBody>
      {rows.map((row, index) => (
        <TableRow
          key={index + 1}
          sx={{
            '&:last-child td, &:last-child th': {
              border: 0,
            },
          }}
        >
          {Object.keys(row).map((k, i) => {
            const column = columns[i];
            const { name } = column;
            return (
              <TableCell
                {...(i === 0 && {
                  component: 'th',
                  scope: 'row',
                })}
                {...(i > 0 && {
                  align: 'right',
                })}
              >
                {row[name]}
              </TableCell>
            );
          })}
        </TableRow>
      ))}
    </TableBody>
  );
};

TTTableBody.propTypes = {
  rows: PropTypes.array,
  columns: PropTypes.array,
};

export default TTTableBody;
