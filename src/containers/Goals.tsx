import React from 'react';
import { useSelector } from 'react-redux';
import { Store } from '../reducers/types';
import CalorieCalculator from '../components/CalorieCalculator';
import { Container } from '@material-ui/core';

const Goals: React.FC = () => {
  const user = useSelector((state: Store) => state.user)

  return(
    <Container maxWidth="lg">
      <h1>Goals</h1>
      <CalorieCalculator profile={user.profile} />
    </Container>
  )
}

export default Goals;
