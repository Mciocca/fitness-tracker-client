import React, { Component, FormEvent } from 'react';
import Request from '../../utils/request';
import AlertMessage from '../../components/common/AlertMessage';
import { RouteComponentProps } from 'react-router';

class Register extends Component<RouteComponentProps> {
  public state = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    errors: []
  }

  private onChange = (event: FormEvent<HTMLInputElement>) => {
    const target = event.currentTarget.name;
    const value = event.currentTarget.value;

    this.setState({ [target]: value });
  }

  public submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.setState({ errors: [] });

    const data = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password
    }

    try {
      await Request.post('/registration', data);
      this.props.history.push('/dashboard');
    } catch (error) {
      this.setState({ errors: error.errors });
    }
  }

  render() {
    return (
      <div>
        { this.state.errors.length > 0 &&
          <AlertMessage errors={this.state.errors} />
        }

        <form id="registration-form" onSubmit={this.submit}>
          <div className="form-item">
            <label htmlFor="firstName">First Name</label>
            <input type="text" id="firstName" onChange={this.onChange} name="firstName" value={this.state.firstName}/>
          </div>
          <div className="form-item">
            <label htmlFor="lastName">Last Name</label>
            <input type="text" id="lastName" onChange={this.onChange} name="lastName" value={this.state.lastName}/>
          </div>
          <div className="form-item">
            <label htmlFor="email">Email</label>
            <input type="text" id="email" onChange={this.onChange} name="email" value={this.state.email}/>
          </div>
          <div className="form-item">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" onChange={this.onChange} name="password" value={this.state.password}/>
          </div>

          <button>Submit</button>
        </form>
      </div>
    )
  }
}

export default Register;
