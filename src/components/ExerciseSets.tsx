import React from 'react';
import { ExerciseSearchResult } from '../reducers/types';
import {
  Button,
  Grid,
  IconButton,
  makeStyles,
  createStyles,
  Theme,
} from '@material-ui/core';
import WorkoutSet from './WorkoutSet';
import DeleteIcon from '@material-ui/icons/Delete';

interface IExerciseSets {
  [key: string]: any;
}

interface ExerciseSetsComponentProps {
  exercises: ExerciseSearchResult[];
  exerciseSets: IExerciseSets;
  updateExerciseSets: (sets: any) => void;
  removeExercise: (name: string) => void;
}

interface ExerciseSet {
  weight: number;
  reps: number;
  exerciseId: number;
  setId: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    exerciseNameGrid: {
      marginTop: theme.spacing(3),
    },
    setlist: {
      paddingLeft: theme.spacing(1),
      listStyleType: 'none',
    },
    setItem: {
      marginTop: theme.spacing(2),
    },
  })
);

const ExerciseSets: React.FC<ExerciseSetsComponentProps> = ({
  exercises,
  exerciseSets,
  removeExercise,
  updateExerciseSets,
}) => {
  const classes = useStyles();

  const addSet = (exercise: ExerciseSearchResult) => {
    const newSet: ExerciseSet = {
      weight: 0,
      reps: 0,
      exerciseId: exercise.id,
      setId: `${exercise.name.replace(/\s/g, '_')}-${new Date().getTime()}`,
    };
    const sets = exerciseSets[exercise.name] ? exerciseSets[exercise.name] : [];
    updateExerciseSets({ ...exerciseSets, [exercise.name]: [...sets, newSet] });
  };

  const deleteSet = (setId: string, name: string) => {
    const existingSets = exerciseSets[name];
    const updatedSets = existingSets.filter(
      (set: ExerciseSet) => set.setId !== setId
    );
    updateExerciseSets({ ...exerciseSets, [name]: updatedSets });
  };

  const updateSet = (name: string, updatedSet: ExerciseSet) => {
    const targetSets = exerciseSets[name];
    const updatedSets = targetSets.map((set: ExerciseSet) =>
      set.setId === updatedSet.setId ? updatedSet : set
    );
    updateExerciseSets({ ...exerciseSets, [name]: updatedSets });
  };

  const renderSets = (name: string) => {
    const sets = exerciseSets[name];
    if (sets) {
      return sets.map((set: ExerciseSet) => (
        <li key={set.setId} className={classes.setItem}>
          <WorkoutSet
            updateSet={updateSet}
            set={set}
            exerciseName={name}
            deleteSet={deleteSet}
          />
        </li>
      ));
    }
  };

  const renderExercises = exercises.map((exercise: ExerciseSearchResult) => (
    <Grid
      className={classes.exerciseNameGrid}
      key={`${exercise.name}-${exercise.id}`}
      container
      spacing={3}
      justify="space-between"
    >
      <p>{exercise.name}</p>
      <Grid item style={{ padding: 0 }}>
        <Button onClick={() => addSet(exercise)}> Add Set </Button>
        <IconButton
          className="deleteExerciseButton"
          onClick={() => removeExercise(exercise.name)}
          aria-label="delete exercise"
        >
          <DeleteIcon />
        </IconButton>
      </Grid>
      <Grid container direction="column">
        <ul className={classes.setlist}>{renderSets(exercise.name)}</ul>
      </Grid>
    </Grid>
  ));

  return <>{renderExercises}</>;
};

export default ExerciseSets;
