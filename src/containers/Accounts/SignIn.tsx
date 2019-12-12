import React from 'react';
import Request from '../../utils/request';
import AlertMessage from '../../components/common/AlertMessage';
import { RouteComponentProps } from 'react-router';

class SignIn extends React.Component<RouteComponentProps> {
  public state = {
    email: '',
    password: '',
    errors: []
  }

  private onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const target = event.currentTarget.name;
    const value = event.currentTarget.value;

    this.setState({ [target]: value });
  }

  public submit = async (event: React.FormEvent) => {
    event.preventDefault();
    this.setState({ errors: [] });

    const body = {
      email: this.state.email,
      password: this.state.password
    }

    try {
      await Request.post('/login', body);
      this.props.history.push('/dashboard');
    } catch ({ errors }) {
      this.setState({ errors })
    }
  }

  render() {
    return (
      <div>
        { this.state.errors.length > 0 &&
          <AlertMessage errors={this.state.errors} />
        }
        <form>
          <div className="form-item">
             <label htmlFor="login-email">Email</label>
             <input id="login-email" onChange={this.onChange} name="email" type="text" value={this.state.email} />
          </div>
          <div className="form-item">
            <label htmlFor="login-password">Password</label>
            <input id="login-password" onChange={this.onChange} name="password" type="password" value={this.state.password}/>
          </div>

          <div className="form-item">
            <button onClick={this.submit}>Login</button>
          </div>
        </form>
      </div>
    )
  }
}

export default SignIn;
