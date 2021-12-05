import * as actions from './actionTypes'

export const GETPLAYERINFO = value => {
  return {
    type: actions.PlayerInfo,
    value,
  }
}
