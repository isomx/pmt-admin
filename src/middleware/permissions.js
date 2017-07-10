/* eslint-disable */
import { createLogic } from 'redux-logic';
import { types } from '../actions/permissions';
import { Observable } from 'rxjs/Observable';
import endpoints from '../api/endpoints';

export const fetchPermissions = createLogic({
  type: types.FETCH_PERMISSIONS,
  debounce: 0,
  throttle: 0,
  latest: true, //default false,
  process( { getState, action }, dispatch, done) {
    const state = getState();
    //const nonce = state.user.user.nonce;
    console.log('in permissions middleware');

    dispatch(
      Observable.ajax({
        url: endpoints.permissions,
        method: 'GET',
        responseType: 'json',
        crossDomain: true,
        withCredentials: true,
        //body: {_wpnonce: nonce},
        // headers: {'X-WP_Nonce': nonce}
      }).map(resp => resp.response)
        .map(resp => {
          console.log('resp = ', resp);
          return {
            type: types.FETCH_PERMISSIONS_FULFILLED,
            payload: resp,
          };
        }).catch(err => {
        console.log('CAUGHT ERROR! = ', err);
        return Observable.of({
          type: types.FETCH_PERMISSIONS_REJECTED,
          payload: err,
          error: true,
        });
      })
    );
    done();
  }
});

export default [fetchPermissions];

