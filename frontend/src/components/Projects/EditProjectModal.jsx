import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Slide,
  Switch,
  TextField,
  useMediaQuery,
  useTheme,
} from '@mui/material';

const Transition = React.forwardRef((props, ref) => {
  return (
    <Slide
      direction='down'
      ref={ref}
      {...props}
    />
  );
});

const initialState = {
  name: '',
  description: '',
  isActive: true,
};

const EditProjectModal = ({
  project,
  updateProject,
  handleEditProject,
  projectableType = null,
  projectableId = null,
}) => {
  const [fields, setFields] = useState(initialState);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  useEffect(() => {
    const { name, description, isActive } = project;
    setFields({
      name,
      description,
      isActive,
    });
    return () => {};
  }, []);

  const hasAtleastOneEmptyField = () => {
    return fields.name === '';
  };

  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name === 'isActive') {
      value = e.target.checked;
    }
    setFields((prev) => ({ ...prev, [name]: value }));
  };

  const handleCancelClick = (e) => {
    handleEditProject();
  };

  const handleSaveClick = async (e) => {
    const body = { ...fields };
    if (body.description.length > 255) {
      alert('The limit for description is 255 characters.');
      return;
    }

    if (projectableType) {
      body.projectableType = projectableType;
      body.projectableId = projectableId;
    }

    await updateProject(body, project?.id);
    handleCancelClick(e);
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open
      onClose={handleCancelClick}
      TransitionComponent={Transition}
      fullWidth
      maxWidth='md'
    >
      <DialogTitle
        sx={{
          fontFamily: 'Poppins',
        }}
      >
        Update project
      </DialogTitle>

      <DialogContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1em',
        }}
      >
        <TextField
          label='Project name'
          variant='outlined'
          type='string'
          name='name'
          value={fields?.name}
          onChange={handleChange}
          required
        />

        <TextField
          {...(fields?.description && {
            helperText: `${255 - fields?.description?.length} characters left.`,
          })}
          label='Description'
          variant='outlined'
          placeholder='Description (optional). Max limit is 255 characters.'
          type='string'
          name='description'
          value={fields?.description}
          onChange={handleChange}
          multiline
          minRows={3}
        />

        <FormControlLabel
          control={
            <Switch
              checked={fields?.isActive}
              onChange={handleChange}
              name='isActive'
            />
          }
          label={fields?.isActive ? 'Active' : 'Inactive'}
        />
      </DialogContent>

      <DialogActions
        sx={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <Button
          size='small'
          onClick={handleCancelClick}
          disabled={hasAtleastOneEmptyField()}
          variant='outlined'
          color='error'
          sx={{
            gap: '1em',
            fontFamily: 'Poppins',
            borderRadius: '0.5em',
          }}
        >
          Cancel
        </Button>

        <Button
          size='small'
          onClick={handleSaveClick}
          disabled={hasAtleastOneEmptyField()}
          variant='contained'
          color='success'
          sx={{
            gap: '1em',
            fontFamily: 'Poppins',
            borderRadius: '0.5em',
          }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

EditProjectModal.propTypes = {
  project: PropTypes.object,
  updateProject: PropTypes.func,
  handleEditProject: PropTypes.func,
};

export default EditProjectModal;
