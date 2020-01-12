import React from 'react';
import { shallow } from  'enzyme';
import LoadingButton from '../LoadingButton';
import { Button, CircularProgress } from '@material-ui/core';

describe('Loading button', () => {
  it('renders child text', () => {
    const wrapper = shallow(<LoadingButton color="primary" showLoading={false}>Submit</LoadingButton>);

    expect(wrapper.text()).toContain('Submit');
  });

  describe('when showLoading is true', () => {
    it('disables the button', () => {
      const wrapper = shallow(<LoadingButton color="primary" showLoading={true}>Submit</LoadingButton>);
      expect(wrapper.find(Button).prop('disabled')).toBeTruthy();
    });

    it('shows the circular progress component', () => {
      const wrapper = shallow(<LoadingButton color="primary" showLoading={true}>Submit</LoadingButton>);
      expect(wrapper.find(CircularProgress).length).toBe(1)
    });
  });
});
