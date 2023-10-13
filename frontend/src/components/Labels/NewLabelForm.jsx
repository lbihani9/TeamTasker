import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Chip, Stack, TextField } from '@mui/material';
import PaletteIcon from '@mui/icons-material/Palette';

const initialState = {
  name: null,
  description: null,
  color: null,
};

const NewLabelForm = ({ handleNewLabelClick, postLabel }) => {
  const [fields, setFields] = useState(initialState);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
  };

  const handleCancelClick = (e) => {
    handleNewLabelClick();
  };

  const handleSave = async (e) => {
    const body = { ...fields };
    await postLabel(body);
    handleCancelClick();
  };

  return (
    <Stack
      spacing={2}
      sx={{
        border: '1px solid black',
        borderRadius: '0.4rem',
        padding: '1rem',
      }}
    >
      <Box
        display='flex'
        justifyContent='flex-start'
        width='100%'
      >
        <Chip
          label={fields?.name ?? 'Label preview'}
          sx={{
            color: fields?.color ?? 'red',
            borderColor: fields?.color ?? 'red',
          }}
          variant='outlined'
        />
      </Box>

      <Box
        display='flex'
        justifyContent='space-between'
        flexWrap='wrap'
        width='100%'
        gap='1rem'
      >
        <Box
          display='flex'
          justifyContent='flex-start'
          flexWrap='wrap'
          gap='1rem'
        >
          <TextField
            label='Label name'
            type='text'
            size='small'
            variant='outlined'
            placeholder='Label name'
            name='name'
            value={fields?.name}
            onChange={handleChange}
            required
          />

          <TextField
            label='Description'
            type='text'
            size='small'
            variant='outlined'
            placeholder='Description (optional)'
            name='description'
            value={fields?.description}
            onChange={handleChange}
          />

          <TextField
            type='color'
            size='small'
            variant='outlined'
            name='color'
            sx={{
              cursor: 'pointer',
              width: "3rem"
            }}
            value={fields?.color}
            onChange={handleChange}
            required
          />
        </Box>

        <Box
          display='flex'
          flexWrap='wrap'
          columnGap='0.5em'
        >
          <Button
            variant='contained'
            size='small'
            color='secondary'
            sx={{
              fontFamily: 'inherit',
              borderRadius: '0.5em',
              fontFamily: 'Poppins',
              height: '2rem',
            }}
            onClick={handleCancelClick}
          >
            Cancel
          </Button>

          <Button
            variant='contained'
            size='small'
            color='success'
            sx={{
              fontFamily: 'inherit',
              borderRadius: '0.5em',
              fontFamily: 'Poppins',
              height: '2rem',
            }}
            onClick={handleSave}
          >
            Create label
          </Button>
        </Box>
      </Box>
    </Stack>
  );
};

NewLabelForm.propTypes = {
  handleNewLabelClick: PropTypes.func,
  postLabel: PropTypes.func,
};

export default NewLabelForm;
