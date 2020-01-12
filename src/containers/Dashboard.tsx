import React  from 'react';
import NavBar from '../components/NavBar';
import { withRouter, Route, RouteComponentProps, Switch } from 'react-router-dom';
import Loading from '../components/Loading';
import { Store } from '../reducers/types';
import { connect, ConnectedProps } from 'react-redux';
import Profile from './Profile';

const mapStateToProps = (state: Store) => ({
  user: state.user,
  showLoading: state.ui.showLoading
});

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux & RouteComponentProps

const Dashboard: React.FC<Props> = ({ user, showLoading }) => {
  return (
    <div>
      <NavBar />
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
