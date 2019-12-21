import React, { Component, FormEvent } from 'react';
import Request from '../../utils/request';
import AlertMessage from '../../components/common/AlertMessage';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { Button, Container, TextField, Typography, makeStyles } from '@material-ui/core';

class Register extends Component<RouteComponentProps> {
  public state = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    errors: []
  }

  private onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
    const formStyles = {
      marginBottom: '1rem'
    }

    return (
      <Container component="main" maxWidth="xs">
        { this.state.errors.length > 0 &&
          <AlertMessage errors={this.state.errors} />
        }
        <Typography component="h1" variant="h4" align="center">
          Register
        </Typography>

        <form onSubmit={this.submit} style={formStyles}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="registration-form__first-name"
            label="First Name"
            name="firstName"
            onChange={this.onChange}
            autoFocus/>

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="registration-form__last-name"
            label="Last Name"
            name="lastName"
            onChange={this.onChange}/>

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="registration-form__email"
            label="email"
            name="email"
            onChange={this.onChange}/>

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="registration-form__last-password"
            label="Password"
            name="password"
            type="password"
            onChange={this.onChange}/>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary">
              Submit
          </Button>
        </form>
        <Typography variant="body1">
          Already have an account? <Link to="/sign-in">Sign in</Link>
        </Typography>
      </Container>
    )
  }
}

export default Register;
