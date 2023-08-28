import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
} from '@mui/material';
import { CorporateFareIcon } from '../Icons';
import NewOrganizationButton from './NewOrganizationButton';
import {
  setCurrentOrganization,
  setMyOrganizations,
} from '../../store/slices/organizationSlice';
import { useNavigate } from 'react-router-dom';

const fetchMyOrganizations = async (setOrganizations) => {
  try {
    const res = await axios.get('/api/v1/@me/organizations');
    const { organizations } = res.data.data;
    setOrganizations(organizations);
  } catch (error) {
    console.log(error);
  }
};

const MyOrganizations = (props) => {
  const [organizations, setOrganizations] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const getOrganizations = async () => {
      await fetchMyOrganizations(setOrganizations);
    };

    getOrganizations();
    return () => {};
  }, []);

  useEffect(() => {
    dispatch(setMyOrganizations(organizations));
    return () => {};
  }, [organizations]);

  const selectOrganization = (org) => {
    dispatch(setCurrentOrganization(org));
    navigate(`/organizations/${org.username}`);
  };

  return (
    <Stack
      spacing={2}
      direction='column'
    >
      <NewOrganizationButton />

      <List>
        {organizations.map((org, index) => {
          return (
            <ListItem
              sx={{
                transition: 'background-color 0.2s ease-in-out',
                '&:hover': {
                  backgroundColor: '#eceff1',
                  cursor: 'pointer',
                },
                fontFamily: 'Poppins',
                fontSize: '1em',
              }}
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
          );
        })}
      </List>
    </Stack>
  );
};

export default MyOrganizations;
