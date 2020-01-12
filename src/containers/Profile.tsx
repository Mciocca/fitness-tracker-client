import React, { useState } from 'react';
import { updateUser } from '../actions/userActions';
import { User, Store } from '../reducers/types';
import {
  Typography,
  makeStyles,
  createStyles,
  Theme,
  Container,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Grid
} from '@material-ui/core';
import { connect } from 'react-redux';
import LoadingButton from '../components/common/LoadingButton';

interface ProfileProps {
  user: User,
  loading: boolean
  updateUser: (user: User) => void
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    gridContainer: {
      marginBottom: theme.spacing(3)
    },
    baseTopMargin: {
      marginTop: theme.spacing(3)
    },
    pageTitle: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3)
    }
  })
);

const Profile: React.FC<ProfileProps> = ({ user, updateUser, loading }) => {
  const classes = useStyles();
  const [userInputs, setUser] = useState({ ...user });
  const [profileInputs, setProfile] = useState({ ...user.profile })

  const updateUserFields = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setUser({...userInputs, [event.target.name]: event.target.value });
  }

  const updateProfile = (event: React.ChangeEvent<any>): void => {
    setProfile({...profileInputs, [event.target.name]: event.target.value });
  }

  const onSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const userData = { ...userInputs, profile: { ...profileInputs } };
    updateUser(userData);
  }

  const genderOptions = () => user.profile.options.gender.map((value: string, index: number) => <MenuItem value={value} key={index}>{value}</MenuItem>);
  const goalOptions = () => user.profile.options.goals.map((value: string, index: number) => <MenuItem value={value} key={index}>{value}</MenuItem>);

  return (
    <Container maxWidth="lg">
      <Typography className={classes.pageTitle} component="h1" variant="h4" align="center">
        Update Your Profile
      </Typography>
      <form onSubmit={onSubmit}>
        <Grid container spacing={3} className={classes.gridContainer}>
          <Grid container item direction="column" xs={12} sm={6}>
            <TextField
              label="First Name"
              name="firstName"
              value={userInputs.firstName}
              onChange={updateUserFields} />
            <TextField
              className={classes.baseTopMargin}
              label="Last Name"
              name="lastName"
              value={userInputs.lastName}
              onChange={updateUserFields} />
            <TextField
              className={classes.baseTopMargin}
              label="Email"
              name="email"
              value={userInputs.email}
              onChange={updateUserFields} />
            <TextField
              className={classes.baseTopMargin}
              label="Age"
              name="age"
              type="number"
              value={profileInputs.age || ''}
              onChange={updateProfile} />
          </Grid>
          <Grid container item direction="column" xs={12} sm={6}>
            <TextField
              label="Starting weight in pounds"
              name="startingWeight"
              type="number"
              onChange={updateProfile}
              value={profileInputs.startingWeight || ''} />
            <TextField
              className={classes.baseTopMargin}
              label="Height in inches"
              name="height"
              type="number"
              onChange={updateProfile}
              value={profileInputs.height || ''}/>
            <FormControl className={classes.baseTopMargin}>
              <InputLabel id="profile-fitness-goal">Fitness Goal</InputLabel>
              <Select labelId="profile-fitness-goal" onChange={updateProfile} name="goal" defaultValue={user.profile.options.goals[0]} value={profileInputs.goal}>
                {goalOptions()}
              </Select>
            </FormControl>
            <FormControl className={classes.baseTopMargin}>
              <InputLabel id="profile-gender">Gender</InputLabel>
              <Select labelId="profile-gender" name="gender" value={profileInputs.gender} onChange={updateProfile} defaultValue={user.profile.options.gender[0]}>
                {genderOptions()}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <LoadingButton showLoading={loading} color="primary">
          Submit
        </LoadingButton>
      </form>
    </Container>
  )
}


const mapStateToProps = (state: Store) => ({
  user: state.user,
  loading: state.ui.showLoading
});

const mapDispatchToProps = {
  updateUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
