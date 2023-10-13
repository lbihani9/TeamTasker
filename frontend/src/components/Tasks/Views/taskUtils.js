// [
//   {
//     id: 3,
//     name: 'Task 1',
//     description: null,
//     taskableType: 'user',
//     taskableId: 1,
//     statusId: null,
//     deadline: null,
//     createdBy: 1,
//     createdAt: '2023-10-05T16:51:41.000Z',
//     updatedAt: '2023-10-05T16:51:41.000Z',
//     deletedAt: null,
//     assignees: [
//       {
//         id: 1,
//         name: 'Lokesh Bihani',
//         email: 'lokeshbihani99@gmail.com',
//         username: 'lbihani9',
//         avatar: null,
//       },
//     ],
//     labels: [],
//     status: null,
//     taskable: {
//       id: 1,
//       name: 'Lokesh Bihani',
//       username: 'lbihani9',
//       email: 'lokeshbihani99@gmail.com',
//       description: null,
//       avatar: null,
//       createdAt: '2023-10-04T17:27:28.000Z',
//       updatedAt: '2023-10-04T17:27:28.000Z',
//       deletedAt: null,
//     },
//   },
// ];

import { Avatar, AvatarGroup, Chip, Stack, Typography } from '@mui/material';
import moment from 'moment';

export const getAssignees = (assignees) => {
  if ((assignees ?? []).length === 0) {
    return <></>;
  }

  return (
    <AvatarGroup max={4}>
      {assignees.map((assignee, index) => {
        return (
          <Avatar
            src={<span className='material-symbols-sharp'>account_circle</span>}
          />
        );
      })}
    </AvatarGroup>
  );
};

export const getLabels = (labels) => {
  if ((labels ?? []).length === 0) {
    return <></>;
  }

  return (
    <Stack
      direction='row'
      spacing={0.2}
      width='inherit'
      flexWrap='wrap'
    >
      {labels.map((label, index) => {
        return (
          <Chip
            label={label.name}
            size='small'
            key={index}
            variant='outlined'
            sx={{
              color: label.color,
              borderColor: label.color,
            }}
          />
        );
      })}
    </Stack>
  );
};

export const getTaskable = (taskableType, taskable) => {
  if (taskableType === 'user') {
    return <></>;
  }

  return (
    <Typography
      variant='body2'
      sx={{ fontFamily: 'Poppins' }}
    >
      {taskable.name}
    </Typography>
  );
};

export const getDeadline = (deadline) => {
  if (!deadline) {
    return <></>;
  }

  return moment(deadline).format('MMM Mo YYYY');
};

export const getStatus = (status) => {
  if (!status) {
    return <></>;
  }

  return (
    <Chip
      label={status.name}
      variant='filled'
      size='small'
      sx={{
        color: status.color,
        backgroundColor: status.color,
      }}
    />
  );
};

export const getName = (name, taskHandler) => {
  if (!name) {
    return <></>;
  }

  return (
    <Typography
      variant='body2'
      sx={{
        cursor: 'pointer',
        fontFamily: 'Poppins',
        '&:hover': {
          textDecoration: 'underline',
          color: 'blue'
        } 
      }}
      onClick={taskHandler}
    >
      {name}
    </Typography>
  );
};
