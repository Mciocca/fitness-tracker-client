import React, { useState } from 'react';
import {
  makeStyles,
  createStyles,
  TextField,
  Grid,
  Theme
 } from '@material-ui/core';
import { Profile, FitnessGoals, Gender } from '../reducers/types';
import SelectInput from '../components/SelectInput';
import CalorieTable from './CalorieTable';

interface CalorieCalculatorProps {
 profile: Profile
}

type ActivityLevels = 'Sedentary' | 'Moderately Active' | 'Very Active';
interface FormState {
  goal: FitnessGoals,
  weight: number | '',
  height: number | '',
  age: number | '',
  activityLevel: ActivityLevels,
  gender: Gender
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    baseTopMargin: {
      marginTop: theme.spacing(3)
    },
  })
);

const activityLevels = {
  'Sedentary': 1.1,
  'Moderately Active': 1.3,
  'Active': 1.5,
  'Very Active': 2.0
};

const goalModifiers = {
  'Lose weight': -500,
  'Maintain weight': 0,
  'Gain weight': 300
}

const CalorieCalculator: React.FC<CalorieCalculatorProps> = ({ profile }) => {
  const classes = useStyles();
  const [form, updateFormInputs ] = useState<FormState>({
    goal: profile.goal || 'Maintain weight',
    weight: profile.startingWeight || '',
    height: profile.height || '',
    age: profile.age || '',
    activityLevel: 'Sedentary',
    gender: profile.gender || 'Male'
  });
  const weightInKilos = form.weight as number * 0.4535924;
  const heightInCentimeters = form.height as number * 2.54;
  const BMRModifier = form.gender === 'Male' ? 5 : -161;
  const age = form.age as number;
  const BMR = Math.round((10 * weightInKilos) + (6.25 * heightInCentimeters) - (5 * age) + BMRModifier);
  const TDEE = Math.round(BMR * activityLevels[form.activityLevel]);
  const goalCalories = TDEE + goalModifiers[form.goal];

  const onFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateFormInputs({...form, [event.target.name]: event.target.value});
  }

  return (
    <div>
      <form>
        <Grid container item spacing={4}>
          <Grid container item direction="column" xs={12} sm={6}>
            <TextField
              label="Weight in pounds"
              type="number"
              name="weight"
              value={form.weight}
              onChange={onFormChange}/>
            <TextField
              className={classes.baseTopMargin}
              label="Height in inches"
              name="height"
              type="number"
              value={form.height}
              onChange={onFormChange}/>
            <TextField
              className={classes.baseTopMargin}
              label="age"
              name="age"
              type="number"
              value={form.age}
              onChange={onFormChange}/>
            <SelectInput
              label="Fitness Goal"
              className={classes.baseTopMargin}
              onChange={onFormChange}
              selectorId="calorie-calculator-fitness-goal"
              name="goal"
              options={profile.options.goals}
              value={form.goal as string} />
            <SelectInput
              label="Gender"
              className={classes.baseTopMargin}
              onChange={onFormChange}
              selectorId="calorie-calculator-gender"
              name="gender"
              options={profile.options.gender}
              value={form.gender as string} />
            <SelectInput
              label="Activity Level"
              className={classes.baseTopMargin}
              value={form.activityLevel}
              options={Object.keys(activityLevels)}
              selectorId="calculator-activity-level"
              onChange={onFormChange}
              name="activityLevel" />
          </Grid>
          <Grid container item direction="column" xs={12} sm={6}>
            <CalorieTable BMR={BMR} TDEE={TDEE} goalCalories={goalCalories}/>
          </Grid>
        </Grid>
      </form>

    </div>
  )
}

export default CalorieCalculator;

