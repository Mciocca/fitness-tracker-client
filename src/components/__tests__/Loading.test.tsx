import React from 'react';
import { shallow } from 'enzyme';
import Loading from '../Loading';
import LinearProgress from '@material-ui/core/LinearProgress';

describe('loading', () => {
  it('is visible when loading is > 0', () => {
    const wrapper = shallow(<Loading loading={1} />);
    expect(wrapper.find(LinearProgress).length).toEqual(1);
  });

  it('is not visible when loading === 0', () => {
    const wrapper = shallow(<Loading loading={0} />);
    expect(wrapper.find(LinearProgress).length).toEqual(0);
  });
});
