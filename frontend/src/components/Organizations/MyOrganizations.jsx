import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Avatar,
  Collapse,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Tooltip,
} from '@mui/material';
import { CorporateFareIcon } from '../Icons';
import NewOrganizationButton from '../Organizations/NewOrganizationButton';
import { useNavigate } from 'react-router-dom';
import useOrganizations from '../../hooks/useOrganizations';
import { setCurrentOrganization } from '../../store/slices/organizationSlice';
import AddIcon from '@mui/icons-material/Add';
import Teams from '../Teams/Teams';
import NewTeamModal from '../Teams/NewTeamModal';

const MyOrganizations = (props) => {
  const { loading, postOrganization } = useOrganizations();
  const organizations = useSelector((state) => state.organizations.items);
  const [open, setOpen] = useState(false);
  const currentOrganization = useSelector(
    (state) => state.organizations.current
  );
  const dispatch = useDispatch();

  const selectOrganization = (org) => {
    if (org?.id === currentOrganization?.id) {
      dispatch(setCurrentOrganization(null));
    } else {
      dispatch(setCurrentOrganization(org));
    }
  };

  const handleNewTeamClick = (e, org) => {
    e.stopPropagation();
    dispatch(setCurrentOrganization(org));
    setOpen(true);
  };

  const handleClose = (e) => setOpen(false);

  return (
    <Stack
      spacing={2}
      direction='column'
      height='inherit'
    >
      <NewOrganizationButton postOrganization={postOrganization} />

      <List>
        {organizations.map((org, index) => {
          return (
            <>
              <ListItem
                key={index}
                sx={{
                  transition: 'background-color 0.2s ease-in-out',
                  '&:hover': {
                    backgroundColor: '#eceff1',
                    cursor: 'pointer',
                  },
                  fontFamily: 'Poppins',
                  fontSize: '1em',
                }}
                secondaryAction={
                  <Tooltip title='Add new team'>
                    <IconButton
                      size='small'
                      onClick={(e) => handleNewTeamClick(e, org)}
                    >
                      <AddIcon fontSize='small' />
                    </IconButton>
                  </Tooltip>
                }
                onClick={(e) => selectOrganization(org)}
              >
                <ListItemAvatar>
                  {!org.avatar ? (
                    <Avatar>
                      <CorporateFareIcon />
                    </Avatar>
                  ) : (
                    <Avatar
                      src={org.avatar}
                      sx={{
                        width: '2.8em',
                        height: '2.8em',
                        justifyContent: 'center',
                      }}
                    />
                  )}
                </ListItemAvatar>

                <ListItemText
                  primary={org.name}
                  disableTypography
                />
              </ListItem>

              {currentOrganization?.id === org?.id && (
                <Collapse
                  in={currentOrganization?.id === org?.id}
                  timeout='auto'
                  unmountOnExit
                >
                  <Teams />
                </Collapse>
              )}
            </>
          );
        })}
      </List>

      {open && <NewTeamModal handleClose={handleClose} />}
    </Stack>
  );
};

export default MyOrganizations;
