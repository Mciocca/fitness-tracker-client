import * as actions from './actionTypes';
import { ConfigAction } from './actionTypes'

export const setConfiguration = (config: object): ConfigAction => {
  return {
    type: actions.CONFIGURATION,
    configuration: config
  }
}
