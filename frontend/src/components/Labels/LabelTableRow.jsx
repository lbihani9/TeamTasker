import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Chip,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';

const LabelTableRow = ({ label, updateLabel, deleteLabel }) => {
  const theme = useTheme();
  const isBelowMedium = useMediaQuery(theme.breakpoints.down('md'));
  const [editRowId, setEditRowId] = useState(null);
  const [fields, setFields] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditClick = (e) => {
    setEditRowId(label?.id);
    setFields({
      name: label?.name,
      description: label?.description,
      color: label?.color,
    });
  };

  const handleCancelUpdate = (e) => {
    setEditRowId(null);
    setFields({});
  };

  const handleDeleteClick = (e) => {
    deleteLabel(label?.id);
  };

  const handleSaveClick = async (e) => {
    const body = { ...fields };
    await updateLabel(body, label?.id);
    handleCancelUpdate();
  };

  const shouldEdit = () => {
    return editRowId === label?.id;
  };

  return (
    <Stack
      sx={{
        borderTop: '1px solid black',
        padding: '1rem',
      }}
      spacing={1}
    >
      <Stack
        direction='row'
        justifyContent='space-between'
        flexWrap='wrap'
        gap='1rem'
        alignItems='center'
      >
        <Stack
          direction='row'
          columnGap='10rem'
          rowGap='1.5rem'
          width={!isBelowMedium ? (shouldEdit() ? '50%' : '80%') : '50%'}
        >
          <Box width={!isBelowMedium ? '20%' : '100%'}>
            <Chip
              size='small'
              label={shouldEdit() ? fields?.name : label?.name}
              sx={{
                color: shouldEdit() ? fields?.color : label?.color,
                borderColor: shouldEdit() ? fields.color : label?.color,
              }}
              variant='outlined'
            />
          </Box>

          {!isBelowMedium && !shouldEdit() && (
            <Box width='80%'>
              <Typography
                variant='body2'
                component='p'
              >
                {label?.description}
              </Typography>
            </Box>
          )}
        </Stack>

        <Stack
          direction='row'
          columnGap='0.5rem'
          justifyContent='flex-end'
        >
          <Button
            variant='outlined'
            size='small'
            sx={{
              fontFamily: 'inherit',
              borderRadius: '0.5em',
              fontFamily: 'Poppins',
              height: '1.8rem',
              color: 'black',
              borderColor: '#9e9e9e',
              backgroundColor: '#eeeeee',
              '&:hover': {
                color: '#616161',
                borderColor: '#9e9e9e',
                backgroundColor: '#bdbdbd',
              },
            }}
            onClick={(e) =>
              !shouldEdit() ? handleEditClick(e) : handleCancelUpdate(e)
            }
          >
            {!shouldEdit() ? 'Edit' : 'Cancel'}
          </Button>

          <Button
            variant={!shouldEdit() ? 'outlined' : 'contained'}
            size='small'
            color={!shouldEdit() ? 'error' : 'success'}
            sx={{
              fontFamily: 'inherit',
              borderRadius: '0.5em',
              fontFamily: 'Poppins',
              height: '1.8rem',
            }}
            onClick={(e) =>
              !shouldEdit() ? handleDeleteClick(e) : handleSaveClick(e)
            }
          >
            {!shouldEdit() ? 'Delete' : 'Save'}
          </Button>
        </Stack>
      </Stack>

      {shouldEdit() && (
        <Box
          display='flex'
          flexWrap='wrap'
          gap='1rem'
        >
          <TextField
            label='Label name'
            type='text'
            size='small'
            name='name'
            value={fields?.name}
            onChange={handleChange}
            required
          />

          <TextField
            label='Description'
            type='text'
            size='small'
            name='description'
            value={fields?.description}
            onChange={handleChange}
          />

          <TextField
            type='color'
            size='small'
            name='color'
            sx={{
              width: '3rem',
              cursor: 'pointer',
            }}
            value={fields?.value}
            onChange={handleChange}
          />
        </Box>
      )}
    </Stack>
  );
};

LabelTableRow.propTypes = {
  label: PropTypes.object,
  updateLabel: PropTypes.func,
  deleteLabel: PropTypes.func,
};

export default LabelTableRow;
