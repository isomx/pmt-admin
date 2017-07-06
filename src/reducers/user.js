import { types } from '../actions/user';

export default function (state = {}, action) {
  switch (action.type) {
    case types.AVAILABLE:
      let newState = {...state};
      return newState;
    default:
      return state;
  }
}