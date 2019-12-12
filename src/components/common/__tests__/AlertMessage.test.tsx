import React from 'react';
import { shallow } from  'enzyme';
import AlertMessage from '../AlertMessage';

describe('AlertMessage component', () => {
  it('renders errors as expected', () => {
    const errors = ['you broke it', 'it was already broken'];
    const wrapper = shallow(<AlertMessage errors={errors} />)

    expect(wrapper.find('li')).toHaveLength(errors.length);
    expect(wrapper.find('li').at(0).text()).toMatch(errors[0]);
    expect(wrapper.find('li').at(1).text()).toMatch(errors[1]);
  });
});
