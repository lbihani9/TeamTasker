import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  ButtonGroup,
  ClickAwayListener,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Stack,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const ResponsiveTabLayout = ({
  children,
  tabHandler = () => {},
  currentId,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [options, setOptions] = useState([]);
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(currentId || 0);

  useEffect(() => {
    setSelectedIndex(currentId);
    return () => {};
  }, [currentId]);

  useEffect(() => {
    const opts = children.map((child, index) => {
      if (!child.props.name) {
        return {
          name: `Option ${index + 1}`,
          id: index,
        };
      }
      return {
        name: child.props?.name,
        id: child.props.index,
      };
    });

    setOptions(opts);
    return () => {};
  }, []);

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    if (isMobile) {
      setOpen(false);
    }
    tabHandler(index);
  };

  const childrenWithSelectedState = React.Children.map(children, (child) => {
    return React.cloneElement(child, {
      isSelected: child.props.index === selectedIndex,
      handler: (e, index) => handleMenuItemClick(e, index),
    });
  });

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
          spacing={2}
          alignSelf='end'
          height='inherit'
        >
          {childrenWithSelectedState}
        </Stack>
      )}

      {isMobile && (
        <>
          <ButtonGroup
            variant='contained'
            ref={anchorRef}
          >
            {children[selectedIndex]}
            <Button
              size='small'
              onClick={handleToggle}
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
                    <MenuList autoFocusItem>
                      {options.map((option, index) => (
                        <MenuItem
                          key={option.id}
                          disabled={index === selectedIndex}
                          selected={index === selectedIndex}
                          onClick={(event) =>
                            handleMenuItemClick(event, option.id)
                          }
                        >
                          {option.name}
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
};

ResponsiveTabLayout.propTypes = {};

export default ResponsiveTabLayout;
