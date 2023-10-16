import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import useTasks from '../../../hooks/useTasks';
import {
  getAssignees,
  getDeadline,
  getLabels,
  getName,
  getStatus,
  getTaskable,
} from './taskUtils';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import TTBackdrop from '../../Templates/TTBackdrop';
import { styled } from '@mui/material/styles';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  borderRight: '1px solid #e0e0e0',
  textAlign: 'center',
}));

const headers = [
  'id',
  'Task name',
  'Project name',
  'Deadline',
  // 'Status',
  'Labels',
  'Assignees',
];

export const TaskTable = () => {
  const theme = useTheme();
  const { projectId } = useParams();
  const { loading } = useTasks();
  const currentProject = useSelector((state) => state.projects.current);
  const taskItems = useSelector((state) => state.tasks.items);
  const tasks =
    (projectId ? taskItems.project[projectId] : taskItems.other[1]) ?? [];
  const navigate = useNavigate();

  const openTask = (id) => navigate(`/tasks/${id}`);

  return (
    <Box
      display='flex'
      justifyContent='center'
      alignContent='center'
      mt='4em'
    >
      <TTBackdrop open={loading} />

      {!loading && tasks.length === 0 && (
        <Typography
          variant='body1'
          component='p'
        >
          No tasks found
        </Typography>
      )}

      <TableContainer
        component={Paper}
        sx={{
          [theme.breakpoints.down('md')]: {
            width: '75vw',
          },
          [theme.breakpoints.up('md')]: {
            width: '90vw',
          },
          display: (loading || tasks.length === 0) && 'none',
          borderRadius: '0.8rem',
        }}
      >
        <Table
          sx={{
            width: '100%',
          }}
          size='medium'
        >
          <TableHead>
            <TableRow>
              {headers.map((header, index) => {
                return (
                  <TableCell>
                    <Typography
                      variant='body1'
                      component='p'
                      sx={{
                        fontWeight: '200',
                        textAlign: 'center',
                      }}
                    >
                      {header}
                    </Typography>
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>

          <TableBody>
            {tasks?.map((task, index) => {
              const {
                name,
                id,
                deadline,
                status,
                assignees,
                taskableType,
                taskable = currentProject,
                labels,
              } = task;

              return (
                <StyledTableRow key={index}>
                  <StyledTableCell>
                    <Typography textAlign='center'>{id}</Typography>
                  </StyledTableCell>

                  <StyledTableCell>
                    {getName(name, () => openTask(id))}
                  </StyledTableCell>

                  <StyledTableCell>
                    {getTaskable(taskableType, taskable)}
                  </StyledTableCell>

                  <StyledTableCell>{getDeadline(deadline)}</StyledTableCell>
                  {/* <StyledTableCell>{getStatus(status)}</StyledTableCell> */}

                  <StyledTableCell>{getLabels(labels)}</StyledTableCell>

                  <StyledTableCell>{getAssignees(assignees)}</StyledTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
