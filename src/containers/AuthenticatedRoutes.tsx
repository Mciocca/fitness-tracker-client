import { connect } from 'react-redux';
import { userAction } from '../actions/userActions';
import React from 'react';
import Request from '../utils/request';
import Dashboard from './Dashboard';
import { showLoading, hideLoading } from '../actions/uiActions';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { User } from '../reducers/types';

interface AuthenticatedRoutesProps extends RouteComponentProps {
  showLoading: Function,
  hideLoading: Function,
  userAction: Function,
  userUrl: string
}

interface AuthenticatedRoutesState {
  user: User | null
}

export class AuthenticatedRoutes extends React.Component<AuthenticatedRoutesProps, AuthenticatedRoutesState> {
  state = {
    user: null
  }

  async componentDidMount() {
    this.props.showLoading();
    try {
      const { user } = await Request.get(this.props.userUrl);
      this.props.userAction(user);
      this.setState({ user });
    } catch(e) {
      this.props.history.push('/sign-in');
    } finally {
      this.props.hideLoading();
    }
  }

  render() {
    return (
      <React.Fragment>
        { this.state.user &&
          <Dashboard />
        }
      </React.Fragment>
    )
  }
}

const component = withRouter(AuthenticatedRoutes);
export default connect(null, { userAction, showLoading, hideLoading })(component)
