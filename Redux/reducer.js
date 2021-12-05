import * as actions from './actionTypes'

const initialState = {
  playerInfo: [],
}
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.PlayerInfo:
      return {
        ...state,
        playerInfo: action.value,
      }

    default:
      return state
  }
}

export default reducer
