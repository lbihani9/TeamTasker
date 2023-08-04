import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import { Stack, useTheme } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';

const ResponsiveHorizontalButtonGroup = (props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [options, setOptions] = useState([]);
  const [open, setOpen] = useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const { children } = props;
    const names = children.map(
      (child, index) => child.props?.name ?? `Option ${index + 1}`
    );

    setOptions(names);
    return () => {};
  }, []);

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      {!isMobile && (
        <Stack
          direction='row'
          spacing={1}
        >
          {props.children}
        </Stack>
      )}

      {isMobile && (
        <>
          <ButtonGroup
            variant='contained'
            ref={anchorRef}
            color='success'
          >
            {props.children[selectedIndex]}
            <Button
              size='small'
              onClick={handleToggle}
              color='success'
            >
              <ArrowDropDownIcon />
            </Button>
          </ButtonGroup>

          <Popper
            sx={{
              zIndex: 1,
            }}
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            transition
            disablePortal
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === 'bottom' ? 'center top' : 'center bottom',
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList
                      autoFocusItem
                    >
                      {options.map((option, index) => (
                        <MenuItem
                          key={option}
                          disabled={index === selectedIndex}
                          selected={index === selectedIndex}
                          onClick={(event) => handleMenuItemClick(event, index)}
                        >
                          {option}
                        </MenuItem>
                      ))}
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </>
      )}
    </>
  );
}

export default ResponsiveHorizontalButtonGroup;