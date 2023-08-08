import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Avatar,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
} from '@mui/material';
import { CorporateFareIcon } from '../Icons';
import NewOrganizationButton from './NewOrganizationButton';

const fetchMyOrganizations = async (setOrganizations) => {
  try {
    const res = await axios.get('/api/v1/@me/organizations');
    const { organizations } = res.data.data;
    setOrganizations(organizations);
  } catch (error) {
    console.log(error);
  }
};

const Organizations = (props) => {
  const [organizations, setOrganizations] = useState([]);

  useEffect(() => {
    const getOrganizations = async () => {
      await fetchMyOrganizations(setOrganizations);
    };

    getOrganizations();
    return () => {};
  }, []);

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

export default Organizations;
