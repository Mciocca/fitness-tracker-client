import Request from '../utils/request';
import { showLoading, hideLoading } from './uiActions';
import { linksAction } from './configurationActions';

export const loadConfiguration = () => {
  return async (dispatch: any) => {
    dispatch(showLoading());
    const { links } = await Request.get('/api/v1');
    dispatch(linksAction(links));
    dispatch(hideLoading())
  }
}
