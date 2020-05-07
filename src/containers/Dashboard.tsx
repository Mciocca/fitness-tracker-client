import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import {
  withRouter,
  Route,
  RouteComponentProps,
  Switch,
} from 'react-router-dom';
import Loading from '../components/Loading';
import { Store } from '../reducers/types';
import { hideNotification } from '../actions/uiActions';
import { connect, ConnectedProps } from 'react-redux';
import Profile from './Profile';
import Notification from '../components/Notification';
import SideDrawer from '../components/SideDrawer';
import Goals from './Goals';
import CreateWorkout from './Workouts/CreateWorkout';

const mapStateToProps = (state: Store) => ({
  user: state.user,
  loading: state.ui.loading,
  notification: state.ui.notification,
});

const mapDispatchToProps = {
  hideNotification,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux & RouteComponentProps;

const Dashboard: React.FC<Props> = ({
  user,
  loading,
  notification,
  hideNotification,
}) => {
  const [drawerOpen, updateDrawerOpen] = useState<boolean>(false);
  const toggleDrawer = () => updateDrawerOpen(!drawerOpen);

  return (
    <div>
      <NavBar toggleDrawer={toggleDrawer} />
      <SideDrawer open={drawerOpen} toggleClose={toggleDrawer} />
      <Notification
        hideNotification={hideNotification}
        message={notification.message}
        severity={notification.severity}
      />
      <Loading loading={loading} />
      <Switch>
        <Route path="/dashboard/workouts/new">
          <CreateWorkout />
        </Route>
        <Route path="/dashboard/profile">
          <Profile />
        </Route>
        <Route path="/dashboard/goals">
          <Goals />
        </Route>
        <Route path="/dashboard">
          <h1>Hello {user.name}</h1>
        </Route>
      </Switch>
    </div>
  );
};

export default withRouter(connector(Dashboard));
