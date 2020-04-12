import React from 'react';
import ExerciseSearch from '../ExerciseSearch';
import { createMount } from '@material-ui/core/test-utils';
import ExerciseSearchFixture from '../../test_helpers/fixtures/ExerciseSearchFixture';
import Request from '../../utils/request';
import { act } from 'react-dom/test-utils';
import SelectInput  from '../SelectInput';

const ENDPOINT_URL = 'http://www.test.com';

jest.mock('react-redux', () => ({
  // errors out when trying to use ENDPONINT_URL variable
  useSelector: jest.fn().mockReturnValue('http://www.test.com')
}));

jest.mock('../../utils/request', () => jest.fn());

describe('ExerciseSearch component', () => {
  let muiMount: any;
  let promise: any;

  beforeAll(() => {
    muiMount = createMount();
    promise = Promise.resolve(ExerciseSearchFixture);
  });

  afterAll(() => {
    muiMount.cleanUp();
    promise = undefined;
    jest.restoreAllMocks();
  });

  it('hits the exercise endpoint when mounted and populates the muscleGroup options', async () => {
    const onAddExercise = jest.fn();
    const getMock = jest.fn(() => promise );
    Request.get = getMock;
    const wrapper = muiMount(<ExerciseSearch onAddExercise={onAddExercise} />);

    await act((): any => promise );
    expect(getMock).toHaveBeenCalledWith(ENDPOINT_URL);

    wrapper.update();
    const select = wrapper.find(SelectInput);
    expect(select.props().options).toHaveLength(ExerciseSearchFixture.meta.options.muscleGroups.length + 1);
  });

  it('disables the Add button when there is not a selectedExercise', async () => {
    const onAddExercise = jest.fn();
    const getMock = jest.fn(() => promise );
    Request.get = getMock;
    const wrapper = muiMount(<ExerciseSearch onAddExercise={onAddExercise} />);

    await act((): any => promise );
    // unexpected behavior that forces hostNodes usage
    // https://github.com/enzymejs/enzyme/issues/836
    const addButton = wrapper.find('.exercise-search__add-button').hostNodes();
    expect(addButton.props().disabled).toBeTruthy();
  });

  // TODO: This should check that the option list gets populated after searching and that it calls the passed in addExercise
  // function when the button is clicked. This might have been easier to do with react-testing-library
  it.skip('passes the selected exercise to the addExercise function', async () => {
    const onAddExercise = jest.fn();
    const wrapper = muiMount(<ExerciseSearch onAddExercise={onAddExercise} />);
    await act((): any => promise );

    wrapper.update();
    const search = wrapper.find('.MuiAutocomplete-input');
    search.instance().value = 'test';
  });
});

