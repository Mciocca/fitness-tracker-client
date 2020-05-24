import React from 'react';
import { Container } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { Store } from '../../reducers/types';
import WorkoutForm from '../../components/workouts/WorkoutForm';
import { createWorkout } from '../../actions/workoutActions';
import AlertMessage from '../../components/AlertMessage';

const CreateWorkout: React.FC = () => {
  const dispatch = useDispatch();
  const { loading, createUrl, errors } = useSelector((state: Store) => ({
    loading: state.ui.loading,
    createUrl: state.config.links.workouts_url,
    errors: state.workouts.errors,
  }));
  const currentUser = useSelector((state: Store) => state.user);
  const submitWorkout = (workoutData: any) => {
    dispatch(createWorkout(workoutData, createUrl));
  };

  return (
    <Container maxWidth="md">
      <AlertMessage errors={errors} />
      <WorkoutForm
        onSubmit={submitWorkout}
        loading={loading}
        currentUser={currentUser}
      />
    </Container>
  );
};

export default CreateWorkout;
