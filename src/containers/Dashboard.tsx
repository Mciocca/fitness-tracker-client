import React  from 'react';
import NavBar from '../components/NavBar';
import { withRouter, Route, RouteComponentProps, Switch } from 'react-router-dom';
import Loading from '../components/Loading';
import { Store } from '../reducers/types';
import { hideNotification } from '../actions/uiActions';
import { connect, ConnectedProps } from 'react-redux';
import Profile from './Profile';
import Notification from '../components/common/Notification';

const mapStateToProps = (state: Store) => ({
  user: state.user,
  showLoading: state.ui.showLoading,
  notification: { ...state.ui.notification, showNotification: state.ui.showNotification }
});

const mapDispatchToProps = {
  hideNotification
}

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux & RouteComponentProps

const Dashboard: React.FC<Props> = ({ user, showLoading, notification, hideNotification }) => {
  return (
    <div>
      <NavBar />
      <Notification
        hideNotification={hideNotification}
        message={notification.message}
        severity={notification.severity}
        open={notification.showNotification} />
      <Loading showLoading={showLoading} />
      <Switch>
        <Route path="/dashboard/profile">
          <Profile />
        </Route>
        <Route path="/dashboard">
          <h1>Hello {user.name}</h1>
        </Route>
      </Switch>
    </div>
  );
}

export default withRouter(connector(Dashboard));
