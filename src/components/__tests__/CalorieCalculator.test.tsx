import React from 'react';
import CalorieCalculator from '../CalorieCalculator';
import { Profile } from '../../reducers/types';
import { createMount } from '@material-ui/core/test-utils';

const profile: Profile = {
  age: 25,
  startingWeight: 155,
  height: 70,
  gender: 'Male',
  goal: 'Maintain weight',
  options: {
    gender: ["Male", "Female"],
    goals: ["Lose weight", "Maintain weight", "Gain weight"]
  }
}

// TODO: Figure out the correct way to stub useState once to test activityLevels effect on calories
describe('CalorieCalculator component', () => {
  let muiMount: any;

  beforeAll(() => {
    muiMount = createMount();
  });

  it('can do a basic calculation', () => {
    const wrapper = muiMount(<CalorieCalculator profile={profile} />)
    expect(wrapper.find('.calorie-table__bmr').first().text()).toContain('1694');
    expect(wrapper.find('.calorie-table__tdee').first().text()).toContain('1863');
    expect(wrapper.find('.calorie-table__goal').first().text()).toContain('1863');
  });

  it('gender changes calorie output', () => {
    const femaleProfile = { ...profile, gender: "Female" };
    const wrapper = muiMount(<CalorieCalculator profile={femaleProfile} />)

    expect(wrapper.find('.calorie-table__bmr').first().text()).toContain('1528');
    expect(wrapper.find('.calorie-table__tdee').first().text()).toContain('1681');
    expect(wrapper.find('.calorie-table__goal').first().text()).toContain('1681');
  });

  it('weight changes calorie output', () => {
    const lighterProfile = { ...profile, startingWeight: 130 };
    const wrapper = muiMount(<CalorieCalculator profile={lighterProfile} />)

    expect(wrapper.find('.calorie-table__bmr').first().text()).toContain('1581');
    expect(wrapper.find('.calorie-table__tdee').first().text()).toContain('1739');
    expect(wrapper.find('.calorie-table__goal').first().text()).toContain('1739');
  });

  it('height changes calorie output', () => {
    const shorterProfile = { ...profile, height: 60 };
    const wrapper = muiMount(<CalorieCalculator profile={shorterProfile} />)

    expect(wrapper.find('.calorie-table__bmr').first().text()).toContain('1536');
    expect(wrapper.find('.calorie-table__tdee').first().text()).toContain('1690');
    expect(wrapper.find('.calorie-table__goal').first().text()).toContain('1690');
  });

  it('age changes calorie output', () => {
    const olderProfile = { ...profile, age: 60 };
    const wrapper = muiMount(<CalorieCalculator profile={olderProfile} />)

    expect(wrapper.find('.calorie-table__bmr').first().text()).toContain('1519');
    expect(wrapper.find('.calorie-table__tdee').first().text()).toContain('1671');
    expect(wrapper.find('.calorie-table__goal').first().text()).toContain('1671');
  });

  it('goal changes calorie output', () => {
    const jackedProfile = { ...profile, goal: "Gain weight" };
    const wrapper = muiMount(<CalorieCalculator profile={jackedProfile} />)

    expect(wrapper.find('.calorie-table__bmr').first().text()).toContain('1694');
    expect(wrapper.find('.calorie-table__tdee').first().text()).toContain('1863');
    expect(wrapper.find('.calorie-table__goal').first().text()).toContain('2163');
  });
});
