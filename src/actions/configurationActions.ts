import * as actions from './actionTypes';

export const linksAction = (links: object) => {
  return {
    links,
    type: actions.RESOURCE_LINKS
  }
}
