import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router';
import App from '../../../App';
import Register from '../Register';
import Dashboard from '../../Dashboard';
import AlertMessage from '../../../components/common/AlertMessage';

describe('Register Page', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('redirects to /dashboard when succesfully creating an account', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ data: 'it worked!' }));
    const wrapper = mount(
      <MemoryRouter initialEntries={['/register']}>
        <App />
      </MemoryRouter>
    );

    const register = wrapper.find<Register>(Register);
    await register.instance().submit({ preventDefault: () => {} });
    expect(wrapper.update().find(Dashboard)).toHaveLength(1);
    expect(wrapper.update().find(Register)).toHaveLength(0);
  });

  it('shows errors when it fails to register', async() => {
    const errors = ['Password is required'];
    fetchMock.mockResponseOnce(JSON.stringify({ errors }), { status: 401 });

    const wrapper = mount(
      <MemoryRouter initialEntries={['/register']}>
        <App />
      </MemoryRouter>
    );

    const register = wrapper.find<Register>(Register);
    await register.instance().submit({ preventDefault: () => {} });
    expect(wrapper.update().find(Register)).toHaveLength(1);

    const alertMessage = wrapper.find(AlertMessage);
    expect(wrapper.find(AlertMessage)).toHaveLength(1);
    expect(alertMessage.text()).toMatch(errors[0]);
  });
});
