import React from 'react';
import { shallow } from  'enzyme';
import LoadingButton from '../LoadingButton';
import { Button, CircularProgress } from '@material-ui/core';

describe('Loading button', () => {
  it('renders child text', () => {
    const wrapper = shallow(<LoadingButton color="primary" loading={0}>Submit</LoadingButton>);

    expect(wrapper.text()).toContain('Submit');
  });

  describe('when loading is > 0', () => {
    it('disables the button', () => {
      const wrapper = shallow(<LoadingButton color="primary" loading={1}>Submit</LoadingButton>);
      expect(wrapper.find(Button).prop('disabled')).toBeTruthy();
    });

    it('shows the circular progress component', () => {
      const wrapper = shallow(<LoadingButton color="primary" loading={2}>Submit</LoadingButton>);
      expect(wrapper.find(CircularProgress).length).toBe(1)
    });
  });
});
