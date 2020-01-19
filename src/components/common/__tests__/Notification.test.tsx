import React from 'react';
import { mount } from 'enzyme';
import Notification from '../Notification';
import router from 'react-router';

describe('Notification', () => {
  let hideNotification: any;
  const mockLocation = {
    pathname: '/fake',
    hash: '',
    search: '',
    state: ''
  }

  beforeAll(() => {
    jest.spyOn(router, 'useLocation').mockReturnValue(mockLocation)
  });

  beforeEach(() => {
    hideNotification = jest.fn();
  });

  afterEach(() => {
    hideNotification.mockClear();
  });

  // TODO: figure out if jest cleans up after itself or I actually need todo this
  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('is visible when open prop is false', () => {
    const wrapper = mount(
      <Notification
        message="hello"
        severity="info"
        open={true}
        hideNotification={hideNotification} />
    );

    expect(wrapper.find('.MuiSnackbar-root').length).toBe(1);
  });

  it('is visible when open prop is false', () => {
    const wrapper = mount(
      <Notification
        message="hello"
        severity="info"
        open={false}
        hideNotification={hideNotification} />
    );

    expect(wrapper.find('.MuiSnackbar-root').length).toBe(0);
  });

  // TODO: Button is rendered by render prop, doesn't show up in  wrapper.debug().
  it.skip('calls hideNotification when the close button is clicked', () => {
    const wrapper = mount(
      <Notification
        message="hello"
        severity="info"
        open={false}
        hideNotification={hideNotification} />
    )

    wrapper.simulate('click', 'button');
    expect(hideNotification).toBeCalled()
  });
});

