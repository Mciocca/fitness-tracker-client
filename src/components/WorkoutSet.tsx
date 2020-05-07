import React from "react";
import { Grid, TextField, IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

interface SetProps {
  updateSet: (name: string, set: any) => void;
  deleteSet: (set: string, name: string) => void;
  set: { weight: number; reps: number; setId: string };
  exerciseName: string;
}

const WorkoutSet: React.FC<SetProps> = ({
  exerciseName,
  updateSet,
  set,
  deleteSet,
}) => {
  const onChange = (event: any) => {
    const updatedSet = { ...set, [event.target.name]: event.target.value };
    updateSet(exerciseName, updatedSet);
  };

  return (
    <>
      <Grid container spacing={3} justify="space-between" alignItems="center">
        <Grid item xs={4}>
          <TextField
            id={`weight-${set.setId.replace(/\s/g, "_")}`}
            value={set.weight}
            onChange={onChange}
            label="Weight"
            type="number"
            name="weight"
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            id={`reps-${set.setId.replace(/\s/g, "_")}`}
            value={set.reps}
            onChange={onChange}
            label="Reps"
            type="number"
            name="reps"
          />
        </Grid>
        <Grid item style={{ marginLeft: "auto" }}>
          <IconButton
            onClick={() => deleteSet(set.setId, exerciseName)}
            aria-label="delete set"
          >
            <DeleteIcon />
          </IconButton>
        </Grid>
      </Grid>
    </>
  );
};

export default WorkoutSet;
