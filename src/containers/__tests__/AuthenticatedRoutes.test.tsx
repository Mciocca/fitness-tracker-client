import React from 'react';
import { shallow } from 'enzyme';
import { AuthenticatedRoutes } from '../AuthenticatedRoutes';

const links = {
  links: {
    user_url: 'test'
  }
}

function flushPromises() {
  return new Promise(resolve => setImmediate(resolve));
}

describe('AuthenticatedRoutes', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('redirects to signin when the user did not succesfully authenticate', () => {
    fetchMock.mockResponseOnce('unauthorized', { status: 401 });
    const showLoading = jest.fn();
    const hideLoading = jest.fn();

    const wrapper = shallow(
      <AuthenticatedRoutes
        links={links}
        showLoading={showLoading}
        hideLoading={hideLoading}
        history={[]} />
    );

    return flushPromises().then(() => {
      expect(wrapper.update().instance().props.history).toContain('/sign-in');
    });
  });

  it('redirects to signin when the user did not succesfully authenticate', () => {
    fetchMock.mockResponseOnce(JSON.stringify({ user: 'it worked!' }));
    const showLoading = jest.fn();
    const hideLoading = jest.fn();
    const userAction = jest.fn();

    const wrapper = shallow(
      <AuthenticatedRoutes
        links={links}
        showLoading={showLoading}
        hideLoading={hideLoading}
        userAction={userAction}
        history={[]} />
    );

    return flushPromises().then(() => {
      expect(wrapper.instance().props.history).not.toContain('/sign-in');
    });
  });
});
