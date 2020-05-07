import React from 'react';
import {
  render,
  fireEvent,
  screen,
  waitFor,
  act,
} from '@testing-library/react';
import WorkoutForm from '../workouts/WorkoutForm';
import ExerciseSearchFixture from '../../test_helpers/fixtures/ExerciseSearchFixture';
import CurrentUser from '../../test_helpers/fixtures/UserFixture';
import { User } from '../../reducers/types';
import Request from '../../utils/request';

jest.mock('react-redux', () => ({
  useSelector: jest.fn().mockReturnValue('http://www.test.com'),
}));

jest.mock('../../utils/request', () => jest.fn());
jest.mock('lodash/debounce', () => {
  return jest.fn().mockImplementation((callback) => {
    return callback;
  });
});

describe('WorkoutForm component', () => {
  beforeEach(() => {
    Request.get = jest.fn(() => Promise.resolve(ExerciseSearchFixture));
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Adds and removes exercises and sets', async () => {
    await act(async () => {
      const onSubmit = jest.fn();
      let exercise: any;

      const { container } = render(
        <WorkoutForm
          currentUser={CurrentUser as User}
          loading={false}
          onSubmit={onSubmit}
        />
      );

      const exerciseSelect = screen.getByLabelText('Search for exercise');
      fireEvent.change(exerciseSelect, { target: { value: 'dumbbell' } });

      await waitFor(() => {
        exercise = screen.getByText('Dumbbell Bench Press');
      });

      fireEvent.click(exercise);
      fireEvent.click(screen.getByText('Add'));

      fireEvent.click(screen.getByText('Add Set'));
      fireEvent.click(screen.getByText('Add Set'));

      expect(screen.queryAllByLabelText('Weight')).toHaveLength(2);
      expect(screen.queryAllByLabelText('Reps')).toHaveLength(2);

      const deleteSetButton = container.querySelector(
        '[aria-label="delete set"]'
      ) as HTMLButtonElement;
      fireEvent.click(deleteSetButton);

      expect(screen.queryAllByLabelText('Weight')).toHaveLength(1);
      expect(screen.queryAllByLabelText('Reps')).toHaveLength(1);

      const deleteExerciseButton = container.querySelector(
        '[aria-label="delete exercise"'
      ) as HTMLButtonElement;
      fireEvent.click(deleteExerciseButton);

      expect(screen.queryAllByLabelText('Weight')).toHaveLength(0);
      expect(screen.queryAllByLabelText('Reps')).toHaveLength(0);
    });
  });

  it('calls the onSubmit button to save a workout', async () => {
    await act(async () => {
      const onSubmit = jest.fn();
      let exercise: any;

      render(
        <WorkoutForm
          currentUser={CurrentUser as User}
          loading={false}
          onSubmit={onSubmit}
        />
      );

      const exerciseSelect = screen.getByLabelText('Search for exercise');
      fireEvent.change(exerciseSelect, { target: { value: 'dumbbell' } });

      await waitFor(() => {
        exercise = screen.getByText('Dumbbell Bench Press');
      });

      fireEvent.click(exercise);
      fireEvent.click(screen.getByText('Add'));

      fireEvent.click(screen.getByText('Add Set'));
      fireEvent.click(screen.getByText('Add Set'));

      fireEvent.click(screen.getByText('Save Workout'));

      expect(onSubmit).toHaveBeenCalled();
    });
  });
});
