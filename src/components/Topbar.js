import React, { Fragment, Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuContainer from './MenuContainer';
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
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar>
              <div className={classes.menuButton}>
                <IconButton color="inherit" aria-label="Menu" onClick={this.toggleMenu}>
                  <MenuIcon />
                </IconButton>
              </div>
              <Typography variant="title" color="inherit" className={classes.grow}>
                Stream Mixer
              </Typography>
            </Toolbar>
          </AppBar>
        </div>
        <MenuContainer
          isOpen={this.state.isMenuOpen}
          toggle={this.toggleMenu}
        />
      </Fragment>
    );
  }
}

export default Topbar;