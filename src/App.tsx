import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import SignIn from './containers/Accounts/SignIn';
import Register from './containers/Accounts/Register';
import AuthenticatedRoutes from './containers/AuthenticatedRoutes';
import { setConfiguration } from './actions/configurationActions';

interface AppProps {
  config: any,
  setConfiguration: Function
}

const App: React.FC<AppProps> = ({ setConfiguration, config }) => {
  useEffect(() => {
    setConfiguration(config);
  }, [config, setConfiguration])

  return (
    <div className="App">
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

export default connect(null, { setConfiguration })(App);
