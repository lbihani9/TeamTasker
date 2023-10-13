import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TaskActionItem from './TaskActionItem';
import TaskActionItemMenu from './TaskActionItemMenu';
import {
  Box,
  Button,
  Checkbox,
  Chip,
  Divider,
  MenuItem,
  MenuList,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import useLabelSearch from '../../../hooks/useLabelSearch';
import SearchIcon from '@mui/icons-material/Search';
import useTaskLabels from '../../../hooks/useTaskLabels';

const LabelAI = ({ task }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const {
    loading: searchLoading,
    searchText,
    setSearchText,
    foundLabels,
  } = useLabelSearch();
  const { patchTaskLabels } = useTaskLabels();
  const [newLabelIds, setNewLabelIds] = useState([]);
  const [deleteLabelIds, setDeleteLabelIds] = useState([]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    setAnchorEl(null);
    setNewLabelIds([]);
    setDeleteLabelIds([]);
  };

  const handleAddTaskLabel = (e, labelId) => {
    if (newLabelIds.includes(labelId)) {
      setNewLabelIds((prev) => prev.filter((p) => p !== labelId));
    } else {
      setNewLabelIds((prev) => [...prev, labelId]);
    }
  };

  const handleDeleteTaskLabel = (e, labelId) => {
    if (deleteLabelIds.includes(labelId)) {
      setDeleteLabelIds((prev) => prev.filter((p) => p !== labelId));
    } else {
      setDeleteLabelIds((prev) => [...prev, labelId]);
    }
  };

  const handleSave = async (e) => {
    const body = {};
    if (newLabelIds.length > 0) {
      body.create = newLabelIds;
    }

    if (deleteLabelIds.length > 0) {
      body.remove = deleteLabelIds;
    }

    await patchTaskLabels(body, task?.id);
    handleClose();
  };

  return (
    <>
      <TaskActionItem
        handleItemClick={handleClick}
        name='Label'
      >
        {task?.labels.map((label, index) => {
          return (
            <Chip
              label={label.name}
              size='small'
            />
          );
        })}
      </TaskActionItem>

      <TaskActionItemMenu
        anchorEl={anchorEl}
        handleItemMenuClose={handleClose}
      >
        <Stack
          spacing={1}
          p='1rem'
          sx={{
            maxHeight: '23rem',
          }}
        >
          <TextField
            autoFocus
            type='text'
            size='small'
            placeholder='Search label'
            variant='outlined'
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            InputProps={{
              startAdornment: <SearchIcon fontSize='small' />,
            }}
          />

          <MenuList
            sx={{
              overflowY: 'auto',
            }}
          >
            <Divider
              sx={{
                fontSize: 'small',
                display: task?.labels.length === 0 && 'none',
              }}
            >
              Selected
            </Divider>

            {task?.labels.map((label, index) => {
              return (
                <MenuItem
                  key={label.id}
                  onChange={(e) => handleDeleteTaskLabel(e, label.id)}
                >
                  <Box
                    display='flex'
                    alignItems='center'
                  >
                    <Checkbox
                      checked={!deleteLabelIds.includes(label.id)}
                      size='small'
                    />
                    <Typography
                      variant='body1'
                      component='p'
                    >
                      {label.name}
                    </Typography>
                  </Box>
                </MenuItem>
              );
            })}

            <Divider sx={{ fontSize: 'small' }}>Unselected</Divider>

            {foundLabels.map((label, index) => {
              return (
                <MenuItem
                  key={label.id}
                  onChange={(e) => handleAddTaskLabel(e, label.id)}
                >
                  <Box
                    display='flex'
                    alignItems='center'
                  >
                    <Checkbox
                      size='small'
                      checked={newLabelIds.includes(label.id)}
                    />
                    <Typography
                      variant='body1'
                      component='p'
                    >
                      {label.name}
                    </Typography>
                  </Box>
                </MenuItem>
              );
            })}

            {foundLabels.length === 0 && (
              <Typography
                variant='body2'
                color='GrayText'
                textAlign='center'
              >
                No labels found
              </Typography>
            )}
          </MenuList>

          <Box
            display='flex'
            justifyContent='flex-end'
            alignSelf='end'
          >
            <Button
              variant='contained'
              size='small'
              color='success'
              sx={{
                borderRadius: '0.5rem',
                fontFamily: 'Poppins',
              }}
              onClick={handleSave}
            >
              Save
            </Button>
          </Box>
        </Stack>
      </TaskActionItemMenu>
    </>
  );
};

LabelAI.propTypes = {};

export default LabelAI;
