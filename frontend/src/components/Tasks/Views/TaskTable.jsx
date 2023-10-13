import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';
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
  const tasks = projectId ? taskItems.project[projectId] : taskItems.other[1];
  const navigate = useNavigate();

  const openTask = (id) => navigate(`/tasks/${id}`);

  return (
    <Box
      display='flex'
      justifyContent='center'
      alignContent='center'
      mt='4em'
    >
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
          <TableHead>
            <TableRow>
              {headers.map((header, index) => {
                return <TableCell>{header}</TableCell>;
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
                <TableRow
                  key={index}
                  sx={{
                    '&:last-child td, &:last-child th': {
                      border: 0,
                    },
                  }}
                >
                  <TableCell>{id}</TableCell>
                  <TableCell>{getName(name, () => openTask(id))}</TableCell>
                  <TableCell>{getTaskable(taskableType, taskable)}</TableCell>
                  <TableCell>{getDeadline(deadline)}</TableCell>
                  {/* <TableCell>{getStatus(status)}</TableCell> */}
                  <TableCell>{getLabels(labels)}</TableCell>
                  <TableCell
                    sx={{
                      display: 'flex',
                      justifyContent: 'flex-start',
                    }}
                  >
                    {getAssignees(assignees)}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
