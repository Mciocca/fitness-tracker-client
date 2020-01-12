import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Typography } from '@material-ui/core';

const NavBarTitle = () => {
  return (
    <span>
      <Switch>
        <Route path="/dashboard/profile">
          <Typography variant="h6">Profile</Typography>
        </Route>
        <Route path="/dashboard">
          <Typography variant="h6">Dashboard</Typography>
        </Route>
      </Switch>
    </span>
  )
}


export default NavBarTitle;
