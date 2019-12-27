import React from 'react';
import { shallow } from 'enzyme';
import AlertMessage from '../../../components/common/AlertMessage';
import { SignIn } from '../SignIn';

describe('SignIn', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('redirects to /dashboard when succesfully creating an account', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ data: 'it worked!' }));
    const wrapper = shallow(
      <SignIn authenticationLink={'link'} history={[]} />
    );

    await wrapper.instance().submit({ preventDefault: () => {} });
    expect(wrapper.update().instance().props.history).toContain('/dashboard');
  });

  it('shows errors when it fails to SignIn', async() => {
    const errors = ['Password is required'];
    fetchMock.mockResponseOnce(JSON.stringify({ errors }), { status: 401 });

    const wrapper = shallow(
      <SignIn authenticationLink={'link'} history={[]} />
    );

    await wrapper.instance().submit({ preventDefault: () => {} });
    expect(wrapper.instance().state.errors).toContain(errors[0])
    expect(wrapper.find(AlertMessage)).toHaveLength(1);
  });
})
