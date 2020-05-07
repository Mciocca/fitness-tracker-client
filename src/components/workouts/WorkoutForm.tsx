import React, { useState } from 'react';
import {
  Grid,
  TextField,
  makeStyles,
  createStyles,
  Theme,
  Paper,
} from '@material-ui/core';
import LoadingButton from '../LoadingButton';
import { ExerciseSearchResult, User } from '../../reducers/types';
import ExerciseSearch from '../ExerciseSearch';
import ExerciseSets from '../ExerciseSets';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

interface Workout {
  date: Date | null;
  title: string;
  notes: string;
  weight?: number;
}

interface WorkOutFormProps {
  onSubmit: (workoutData: any) => void;
  workout?: Workout;
  loading: boolean;
  currentUser: User;
}

interface IExerciseSets {
  [key: string]: any;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    gridContainer: {
      marginBottom: theme.spacing(3),
    },
    baseTopMargin: {
      marginTop: theme.spacing(3),
    },
    pageTitle: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
    },
    paperContainer: {
      marginTop: theme.spacing(3),
      padding: theme.spacing(2),
    },
    spacerMargin: {
      marginTop: theme.spacing(5),
      marginBottom: 0,
    },
    exercisePadding: {
      padding: theme.spacing(2),
      paddingTop: 0,
    },
  })
);

const WorkoutForm: React.FC<WorkOutFormProps> = ({
  currentUser,
  onSubmit,
  workout,
  loading,
}) => {
  const classes = useStyles();
  const date = new Date();
  const [currentWorkout, setCurrentWorkout] = useState<Workout>({
    title: workout?.title || `Workout for ${date.toLocaleDateString()}`,
    weight: currentUser.profile.startingWeight || undefined,
    date: workout?.date || date,
    notes: '',
  });
  const [exerciseSets, updateExerciseSets] = useState<IExerciseSets>({});
  const [exercises, setExercises] = useState<ExerciseSearchResult[]>([]);

  const updateWorkout = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentWorkout({
      ...currentWorkout,
      [event.target.name]: event.target.value,
    });
  };

  const addExercise = (newExercise: ExerciseSearchResult) => {
    const alreadyIncluded = exercises.some(
      (exercise) => exercise.id === newExercise.id
    );
    if (!alreadyIncluded) {
      setExercises([...exercises, newExercise]);
    }
  };

  const removeExercise = (name: string) => {
    const updatedExercises = exercises.filter(
      (exercise) => exercise.name !== name
    );
    const clonedSets: any = { ...exerciseSets };
    delete clonedSets[name];
    setExercises(updatedExercises);
    updateExerciseSets(clonedSets);
  };

  const submitWorkout = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const sets: any = [];
    for (let key in exerciseSets) {
      sets.push(...exerciseSets[key]);
    }
    const workoutData = { ...currentWorkout, sets };
    onSubmit(workoutData);
  };

  return (
    <form onSubmit={submitWorkout}>
      <Grid container direction="column">
        <TextField
          className={classes.baseTopMargin}
          label="Title"
          name="title"
          value={currentWorkout.title}
          onChange={updateWorkout}
        />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            margin="normal"
            id="date-picker-dialog"
            label="Date"
            format="MM/dd/yyyy"
            value={currentWorkout.date}
            onChange={(date: Date | null) =>
              setCurrentWorkout({ ...currentWorkout, date })
            }
            KeyboardButtonProps={{
              'aria-label': 'update workout date',
            }}
          />
          <TextField
            className={classes.baseTopMargin}
            label="Today's weight (optional)"
            name="weight"
            value={currentWorkout.weight}
            onChange={updateWorkout}
          />
        </MuiPickersUtilsProvider>
        <Paper className={classes.paperContainer} elevation={3}>
          <ExerciseSearch onAddExercise={addExercise} />
          {exercises.length > 0 && <hr className={classes.spacerMargin} />}
          <div className={classes.exercisePadding}>
            <ExerciseSets
              exercises={exercises}
              exerciseSets={exerciseSets}
              updateExerciseSets={updateExerciseSets}
              removeExercise={removeExercise}
            />
          </div>
        </Paper>
        <TextField
          className={classes.baseTopMargin}
          label="Notes"
          name="notes"
          multiline={true}
          value={currentWorkout.notes}
          onChange={updateWorkout}
        />
        <LoadingButton loading={loading} color="primary">
          Save Workout
        </LoadingButton>
      </Grid>
    </form>
  );
};

export default WorkoutForm;
