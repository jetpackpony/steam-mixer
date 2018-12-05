import React from 'react';
import { Menu, MenuItem } from '@material-ui/core';
import { compose } from 'ramda';

const ContextMenu = ({ coords, actions, isOpen, toggle }) => {
  return (
    <Menu
      anchorReference="anchorPosition"
      anchorPosition={{
        left: coords.x,
        top: coords.y,
      }}
      open={isOpen}
      onClose={toggle}
    >
      {
        actions.map(({ title, onClick }) => (
          <MenuItem
            key={title}
            onClick={compose(onClick, toggle)}
          >
            {title}
          </MenuItem>
        ))
      }
    </Menu>
  );
};

export default ContextMenu;