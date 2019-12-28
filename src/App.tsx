import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router';
import SignIn from './containers/Accounts/SignIn';
import Register from './containers/Accounts/Register';
import Loading from './components/Loading';
import { Store, ConfigurationLinks } from './reducers/types';
import AuthenticatedRoutes from './containers/AuthenticatedRoutes';
import { setConfiguration } from './actions/configurationActions';

interface AppProps {
  showLoading: boolean
  links: ConfigurationLinks,
  config: any,
  setConfiguration: Function
}

const App: React.FC<AppProps> = ({ showLoading, setConfiguration, config, links}) => {
  useEffect(() => {
    setConfiguration(config);
  }, [])

  return (
    <div className="App">
      <Loading showLoading={showLoading} />
      <Switch>
        <Redirect exact from="/" to="/sign-in" />
        <Route path="/sign-in">
          <SignIn authenticationLink={config.links.authentication_url} />
        </Route>
        <Route path="/register">
          <Register registrationLink={config.links.registration_url} />
        </Route>
        <Route path="/dashboard">
          <AuthenticatedRoutes userUrl={config.links.user_url}/>
        </Route>
      </Switch>
    </div>
  );
}

const mapStateToProps = (state: Store ) => ({
  showLoading: state.ui.showLoading,
  links: state.config.links
});

export default connect(mapStateToProps, { setConfiguration })(App);
