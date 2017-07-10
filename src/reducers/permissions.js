import { types } from '../actions/permissions';

export default function (state = {}, action) {
  switch (action.type) {
    case types.FETCH_PERMISSIONS_FULFILLED:
      console.log('PERMISSIONS REDUCER, payload = ', action.payload);
      let newState = {...state, ...action.payload};
      return newState;
    case types.FETCH_PERMISSIONS_REJECTED:
      return state;
    default:
      return state;
  }
}