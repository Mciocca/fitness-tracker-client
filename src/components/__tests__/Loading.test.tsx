import React from 'react';
import { shallow } from 'enzyme';
import Loading from '../Loading';


describe('loading', () => {
  it('is visible when showLoading is true', () => {
    const wrapper = shallow(<Loading showLoading={true} />);
    expect(wrapper.find('.loading-wrapper').length).toEqual(1);
  });

  it('is not visible when showLoading is false', () => {
    const wrapper = shallow(<Loading showLoading={false} />);
    expect(wrapper.find('.loading-wrapper').length).toEqual(0);
  });
});
