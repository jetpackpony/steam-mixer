import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import classes from './Menu.module.scss';
import { compose } from 'ramda';

const Menu = ({ isOpen, toggle, actions }) => {
  const actionList = (
    <List className={classes.list}>
      {actions.map((action) => (
        <ListItem button key={action.title} onClick={compose(toggle, action.onClick)}>
          <ListItemIcon>{action.icon}</ListItemIcon>
          <ListItemText primary={action.title} />
        </ListItem>
      ))}
    </List>
  );

  return (
    <Drawer open={isOpen} onClose={toggle}>
      <div tabIndex={0} onKeyDown={toggle}>
        {actionList}
      </div>
    </Drawer>
  );
};

export default Menu;