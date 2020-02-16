import React from 'react';
import { shallow } from  'enzyme';
import SelectInput from '../SelectInput';
import { Select } from '@material-ui/core';
import { createShallow } from '@material-ui/core/test-utils';

describe('SelectInput component', () => {
  test('it displays the current value', () => {
    const onChangeStub = jest.fn();
    const options = ['hello', 'world'];
    const wrapper = shallow(
      <SelectInput
        onChange={onChangeStub}
        options={options}
        selectorId="thisisanid"
        value='hello'
        name='test'
        label='test' />
    );

    expect(wrapper.text()).toContain('hello');
  });

  test('it displays the current value', () => {
    const muiShallow = createShallow();
    const onChangeStub = jest.fn();
    const options = ['hello', 'world'];
    const wrapper = muiShallow(
      <SelectInput
        onChange={onChangeStub}
        options={options}
        selectorId="thisisanid"
        value='hello'
        name='test'
        label='test' />
    );

    const select = wrapper.find(Select);
    select.simulate('change');

    expect(onChangeStub).toHaveBeenCalled();
  });
});
