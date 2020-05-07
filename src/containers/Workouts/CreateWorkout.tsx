import React from 'react';
import { Container } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { Store } from '../../reducers/types';
import WorkoutForm from '../../components/workouts/WorkoutForm';
import { createWorkout } from '../../actions/workoutActions';

const CreateWorkout: React.FC = () => {
  const dispatch = useDispatch();
  const { loading, createUrl } = useSelector((state: Store) => ({
    loading: state.ui.loading,
    createUrl: state.config.links.workouts_url,
  }));
  const currentUser = useSelector((state: Store) => state.user);
  const submitWorkout = (workoutData: any) => {
    dispatch(createWorkout(workoutData, createUrl));
  };

  return (
    <Container maxWidth="md">
      <WorkoutForm
        onSubmit={submitWorkout}
        loading={loading}
        currentUser={currentUser}
      />
    </Container>
  );
};

export default CreateWorkout;
