import React, { Fragment, Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '../Menu';
import classes from './Topbar.module.scss';

class Topbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMenuOpen: false
    };
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  toggleMenu() {
    this.setState({
      isMenuOpen: !this.state.isMenuOpen
    });
  }

  render() {
    return (
      <Fragment>
        <AppBar position="fixed" color="default">
          <Toolbar variant="dense">
            <div className={classes.menuButton}>
              <IconButton
                color="inherit"
                aria-label="Menu"
                onClick={this.toggleMenu}
              >
                <MenuIcon />
              </IconButton>
            </div>
            <Typography
              variant="h6"
              color="inherit"
              className={classes.grow}
            >
              Audio Mixer
            </Typography>
          </Toolbar>
        </AppBar>
        <Menu
          isOpen={this.state.isMenuOpen}
          toggle={this.toggleMenu}
        />
      </Fragment>
    );
  }
}

export default Topbar;