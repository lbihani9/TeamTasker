import {
  Avatar,
  AvatarGroup,
  Chip,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import moment from 'moment';

export const getAssignees = (assignees) => {
  if ((assignees ?? []).length === 0) {
    return <></>;
  }

  return (
    <AvatarGroup
      max={4}
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
      }}
    >
      {assignees.map((assignee, index) => {
        return (
          <Tooltip title={assignee?.name ?? ''}>
            <Avatar
              key={index}
              src={
                assignee?.avatar ?? (
                  <span className='material-symbols-sharp'>account_circle</span>
                )
              }
            />
          </Tooltip>
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
      gap='0.4rem'
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
          color: 'blue',
        },
      }}
      onClick={taskHandler}
    >
      {name}
    </Typography>
  );
};
