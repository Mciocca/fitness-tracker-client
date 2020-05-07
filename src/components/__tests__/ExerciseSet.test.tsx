import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import ExerciseSets from '../ExerciseSets';

const exercises = [{ id: 12, name: 'pushup', muscleGroup: 'chest' }];
const [pushup] = exercises;
const set = {
  weight: 45,
  reps: 10,
  exerciseId: pushup.id,
  setId: 'some-uniq-string',
};
const exerciseSets = { pushup: [set] };
const updateExerciseSets = jest.fn();
const removeExerciseSets = jest.fn();

describe('ExceriseSets component', () => {
  it('displays the name of the passed in exericse', () => {
    render(
      <ExerciseSets
        exercises={exercises}
        exerciseSets={exerciseSets}
        updateExerciseSets={updateExerciseSets}
        removeExercise={removeExerciseSets}
      />
    );

    expect(screen.queryByText(pushup.name));
  });

  it('calls the updateExerciseSets function when the Add Set button is pressed', () => {
    render(
      <ExerciseSets
        exercises={exercises}
        exerciseSets={exerciseSets}
        updateExerciseSets={updateExerciseSets}
        removeExercise={removeExerciseSets}
      />
    );

    const button = screen.queryByText('Add Set') as HTMLButtonElement;
    fireEvent.click(button);

    expect(updateExerciseSets).toHaveBeenCalled();
  });

  it('calls the removeExercise function when the Delete Button is pressed', () => {
    const { container } = render(
      <ExerciseSets
        exercises={exercises}
        exerciseSets={exerciseSets}
        updateExerciseSets={updateExerciseSets}
        removeExercise={removeExerciseSets}
      />
    );

    const button = container.querySelector(
      '[aria-label="delete exercise"'
    ) as HTMLButtonElement;
    fireEvent.click(button);

    expect(removeExerciseSets).toHaveBeenCalled();
  });

  it('displays an exercise set', () => {
    render(
      <ExerciseSets
        exercises={exercises}
        exerciseSets={exerciseSets}
        updateExerciseSets={updateExerciseSets}
        removeExercise={removeExerciseSets}
      />
    );

    const weight = screen.queryByLabelText('Weight') as HTMLInputElement;
    expect(parseInt(weight.value, 10)).toEqual(set.weight);

    const reps = screen.queryByLabelText('Reps') as HTMLInputElement;
    expect(parseInt(reps.value, 10)).toEqual(set.reps);
  });
});
