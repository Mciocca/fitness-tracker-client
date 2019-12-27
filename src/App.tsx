import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router';
import SignIn from './containers/Accounts/SignIn';
import Register from './containers/Accounts/Register';
import Loading from './components/Loading';
import { Store, ConfigurationLinks } from './reducers/types';
import { loadConfiguration } from './actions/bootstrapActions';
import AuthenticatedRoutes from './containers/AuthenticatedRoutes';

interface AppProps {
  showLoading: boolean
  links: ConfigurationLinks,
  loadConfiguration: Function
}

const App: React.FC<AppProps> = ({ showLoading, links, loadConfiguration}) => {

  useEffect(() => {
    loadConfiguration();
  }, [])

  const renderRoutes = () => {
    if (links.authentication_url !== '') {
      return (
        <React.Fragment>
          <Route path="/sign-in" component={() =>
            <SignIn authenticationLink={links.authentication_url} />
          }/>
          <Route path="/register" component={ () =>
            <Register registrationLink={links.registration_url} />
          }/>
          <Route path="/dashboard" component={AuthenticatedRoutes} />
        </React.Fragment>
      )
    }
  }

  return (
    <div className="App">
      <Loading showLoading={showLoading} />
      <Switch>
        <Redirect exact from="/" to="/sign-in" />
        {/* TODO: Look into a better way of making sure links exist before rendering these components */}
        { renderRoutes() }
      </Switch>
    </div>
  );
}

const mapStateToProps = (state: Store ) => ({
  showLoading: state.ui.showLoading,
  links: state.config.links
});

export default connect(mapStateToProps, { loadConfiguration })(App);
