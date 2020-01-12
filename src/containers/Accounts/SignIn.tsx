import React from 'react';
import Request from '../../utils/request';
import AlertMessage from '../../components/common/AlertMessage';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

interface SignInProps extends RouteComponentProps {
  authenticationLink: string,
}

export class SignIn extends React.Component<SignInProps> {
  public state = {
    email: '',
    password: '',
    errors: []
  }

  private onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
    const formStyles = {
      marginBottom: '1rem'
    }

    return (
      <Container component="main" maxWidth="xs">
        { this.state.errors.length > 0 &&
          <AlertMessage errors={this.state.errors} />
        }
        <Typography component="h1" variant="h4" align="center" >
          Sign in
        </Typography>
        <form onSubmit={this.submit}  style={formStyles}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={this.onChange}
            autoFocus />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="password"
            type="password"
            label="Password"
            name="password"
            onChange={this.onChange} />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary">
            Submit
          </Button>
        </form>

        <Typography variant="body1">
          Don't have an account? <Link to="/register">Register</Link>
        </Typography>
      </Container>
    )
  }
}

export default  withRouter(SignIn);
