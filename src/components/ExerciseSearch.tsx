import React, { useState, useEffect } from 'react';
import Request from '../utils/request';
import { useSelector } from 'react-redux';
import { Store, ExerciseSearchResult } from '../reducers/types';
import SelectInput from './SelectInput';
import { Grid, Button, CircularProgress, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import debounce from 'lodash/debounce';
interface ExerciseProps {
  onAddExercise: (exercise: ExerciseSearchResult) => void
};

const ExerciseSearch: React.FC<ExerciseProps> = ({ onAddExercise }) => {
  const searchLink = useSelector((state: Store) => state.config.links.exercise_url);
  const [searchTerm, updateSearchTerm] = useState<string>('');
  const [muscleGroups, setMuscleGroups] = useState<string[]>(['All'])
  const [selectedExercise, setSelectedExercise] = useState<ExerciseSearchResult | undefined>();
  const [showOptions, setShowOptions] = useState(false);
  const [options, setOptions] = useState<ExerciseSearchResult[]>([]);
  const [selectedMuscleGroup, setMuscleGroup] = useState<string>('All');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const { meta } = await Request.get(searchLink);
      if (muscleGroups.length === 1) {
        setMuscleGroups(['All', ...meta.options.muscleGroups]);
      }
    })();
  }, []); // eslint-disable-line

  useEffect(() => {
    let active = true;

    if(!active) return;

    (async () => {
      const muscleGroup = selectedMuscleGroup === 'All' ? '' : selectedMuscleGroup;
      const url = `${searchLink}?name=${searchTerm}&muscleGroup=${muscleGroup}`;
      setLoading(true);

      try {
        const { exercises }: { exercises: ExerciseSearchResult[] }  =  await Request.get(url);
        setOptions(exercises);
      } catch (e) {
        alert('Error retrieving exercises, please try again');
      } finally {
        setLoading(false);
      }
    })();

    return () => {
      active = false;
    };
  }, [searchTerm, selectedMuscleGroup, searchLink])

  const debouncedLoadOptions = debounce((_:any, search: string) => {
    updateSearchTerm(search);
  }, 500);

  return (
    <>
      <h4>Add exercises</h4>
      <Grid container item alignItems="center" spacing={3}>
        <Grid item xs={12} sm={5}>
          <SelectInput
            styles={{ width: '100%' }}
            selectorId="exercise-search__muscle-group"
            name="muscleGroup"
            label="Muscle Group"
            options={muscleGroups}
            value={selectedMuscleGroup}
            onChange={(event) => {
              setMuscleGroup(event.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Autocomplete
            id="exercise-search__search"
            style={{ width: 300 }}
            open={showOptions}
            onOpen={() => {
              setShowOptions(true);
            }}
            onClose={() => {
              setShowOptions(false);
            }}
            getOptionSelected={(option: ExerciseSearchResult, selected: ExerciseSearchResult) => option.id === selected.id }
            getOptionLabel={(option: ExerciseSearchResult) => option.name}
            options={options}
            onInputChange={debouncedLoadOptions}
            onChange={(_: any, value: any ) => { setSelectedExercise(value) }}
            loading={loading}
            renderInput={(params) => (
              <TextField
                {...params }
                label="Search for exercise"
                variant="outlined"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <React.Fragment>
                      {loading ? <CircularProgress color="inherit" size={20} /> : null}
                      {params.InputProps.endAdornment}
                    </React.Fragment>
                  ),
                }}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <Button
            variant="contained"
            className="exercise-search__add-button"
            disabled={!selectedExercise}
            onClick={() => onAddExercise(selectedExercise as ExerciseSearchResult)} >
            Add
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export default ExerciseSearch;
