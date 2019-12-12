import React from 'react';
import { Switch, Route, Redirect } from 'react-router';
import SignIn from './containers/Accounts/SignIn';
import Register from './containers/Accounts/Register';
import Dashboard from './containers/Dashboard';

const App: React.FC = () => {
  return (
    <div className="App">
      <Switch>
        <Redirect exact from="/" to="/sign-in" />
        <Route path="/sign-in" component={SignIn} />
        <Route path="/register" component={Register} />
        <Route path="/dashboard" component={Dashboard} />
      </Switch>
    </div>
  );
}


export default App;
