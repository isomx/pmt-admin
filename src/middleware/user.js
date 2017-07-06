/* eslint-disable */
import { createLogic } from 'redux-logic';
import { types } from '../actions/user';
import { Observable } from 'rxjs/Observable';

export const createUser = createLogic({
  type: types.CREATE,
  debounce: 1000,
  throttle: 0,
  latest: true, //default false,
  transform({ getState, action }, next, reject) {
    Observable.ajax({
      url: 'http://pmt.dev/wp-json/sysapi/v1/users/create',
      method: 'POST',
      responseType: 'json',
      crossDomain: true,
      withCredentials: true,
      body: action.payload,
    }).map(resp => resp.response).subscribe(
      data => {
        console.log('data = ', data);
      },
      err => console.log('err = ', err),
      () => console.log('complete!'),

    );
    next(action);
  }

});

const userAvailable = createLogic({
  type: types.CHECK_AVAILABILITY,
  debounce: 2000,
  throttle: 0,
  latest: true, //default false,
  /**
  transform({ getState, action }, next, reject) {
    Observable.ajax({
      url: 'http://pmt.dev/wp-json/sysapi/v1/users/available',
      method: 'POST',
      responseType: 'json',
      crossDomain: true,
      withCredentials: true,
      body: action.payload,
    }).map(resp => {
      console.log('resp = ', resp);
      return resp.response;
    });
    next(action);
  }
   **/
  process( { getState, action }, dispatch) {
    dispatch(
      Observable.ajax({
        url: 'http://pmt.dev/wp-json/sysapi/v1/users/available',
        method: 'POST',
        responseType: 'json',
        crossDomain: true,
        withCredentials: true,
        body: action.payload,
      }).map(resp => resp.response)
        .map(resp => {
        console.log('resp = ', resp);
        return {
          type: types.CHECK_AVAILABILITY_FULFILLED,
          payload: resp,
        };
      }).catch(err => {
        console.log('CAUGHT ERROR!');
        return Observable.of({
          type: types.CHECK_AVAILABILITY_REJECTED,
          payload: err,
          error: true,
        });
      })
    );
  }
});

export default [createUser, userAvailable];

