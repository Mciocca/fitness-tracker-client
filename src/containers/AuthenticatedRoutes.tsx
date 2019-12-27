import { connect } from 'react-redux';
import { userAction } from '../actions/userActions';
import React from 'react';
import Request from '../utils/request';
import { Store, ConfigurationLinks } from '../reducers/types';
import Dashboard from './Dashboard';
import { showLoading, hideLoading } from '../actions/uiActions';
import { RouteComponentProps, withRouter } from 'react-router-dom';

interface AuthenticatedRoutesProps extends RouteComponentProps {
  links: ConfigurationLinks,
  showLoading: Function,
  hideLoading: Function,
  userAction: Function
}

export class AuthenticatedRoutes extends React.Component<AuthenticatedRoutesProps> {
  state = {
    userAuthenticated: false
  }

  async componentDidMount() {
    this.props.showLoading();

    try {
      debugger;
      const { user } = await Request.get(this.props.links.user_url);
      this.props.userAction(user);
      this.setState({ userAuthenticated: true })
    } catch(e) {
      debugger;
      this.props.history.push('/sign-in');
    }

    this.props.hideLoading();
  }

  render() {
    return (
      <>
        { this.state.userAuthenticated  &&
          <Dashboard />
        }
      </>
    )
  }
}

const mapStateToProps = (state: Store ) => ({
  links: state.config.links
});

const component = withRouter(AuthenticatedRoutes);
export default connect(mapStateToProps, { userAction, showLoading, hideLoading })(component)
