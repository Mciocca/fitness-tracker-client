import React from 'react';
import { AppBar, Toolbar, IconButton } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Link } from 'react-router-dom';
import NavBarTitle from './NavBarTitle';

const useStyles = makeStyles(() =>
  createStyles({
    profileLink: {
      color: 'inherit',
      lineHeight: 0
    },
    actionIcons: {
      marginLeft: 'auto'
    }
  })
);

const NavBar: React.FC = () => {
  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" >
          <MenuIcon/>
        </IconButton>
        <NavBarTitle />
        <div className={classes.actionIcons}>
          <IconButton color="inherit">
            <Link to="/dashboard/profile" className={classes.profileLink}>
              <AccountCircle />
            </Link>
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default NavBar;
