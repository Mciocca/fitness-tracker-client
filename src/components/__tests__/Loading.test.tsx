import React from 'react';
import { shallow } from 'enzyme';
import Loading from '../Loading';
import LinearProgress from '@material-ui/core/LinearProgress';


describe('loading', () => {
  it('is visible when showLoading is true', () => {
    const wrapper = shallow(<Loading showLoading={true} />);
    expect(wrapper.find(LinearProgress).length).toEqual(1);
  });

  it('is not visible when showLoading is false', () => {
    const wrapper = shallow(<Loading showLoading={false} />);
    expect(wrapper.find(LinearProgress).length).toEqual(0);
  });
});
