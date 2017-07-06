/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { types as userActions } from '../actions/user';
import { loadData } from '../actions/render';
import PropTypes from 'prop-types';
import Toolbar  from 'react-md/lib/Toolbars';
import cn from 'classnames';
import Button from 'react-md/lib/Buttons';
import TextField from 'react-md/lib/TextFields';
import CircularProgress from 'react-md/lib/Progress/CircularProgress';

import componentFromStream from 'recompose/componentFromStream';
import mapPropsStream from 'recompose/mapPropsStream';
import renderComponent from 'recompose/renderComponent';
import compose from 'recompose/compose';
import getContext from 'recompose/getContext';
import { Observable } from 'rxjs/Observable';

import rxjsConfig from 'recompose/rxjsObservableConfig';
import setObservableConfig from 'recompose/setObservableConfig';
setObservableConfig(rxjsConfig);

const App = props => {
  console.log('props = ', props);
  return (
    <div>
      <TextField
        //leftIcon={<CircularProgress id="spinner" scale={1} key="progress"/>}
        //inlineIndicator={<CircularProgress id="spinner" scale={1} key="progress"/>}
        label="First Name"
        id="fname"
        name="fname"
      />
      <TextField
        //leftIcon={<CircularProgress id="spinner" scale={1} key="progress"/>}
        //inlineIndicator={<CircularProgress id="spinner" scale={1} key="progress"/>}
        label="Last Name"
        id="lname"
        name="lname"
      />
      <TextField
        label="Email"
        id="email"
        name="email"
      />
      <TextField
        leftIcon={<CircularProgress id="spinner" scale={1} key="progress" style={{opacity: 0}}/>}
        //inlineIndicator={<CircularProgress id="spinner" scale={1} key="progress"/>}
        label="Username"
        id="username"
        name="username"
      />
      <Button
        disabled
        //icon
        children={<CircularProgress id="spinner" scale={1} key="progress"/>}

        raised
        label="MANAGE"
        onClick={(e) => { props.checkUser({
        firstName: 'Josh',
        lastName: 'Test1',
        email: 'josh23@ugilityenterprises.com',
        username: 'jtest1',
        password: 'kawasaki',
      }) } }
      />
      <Button raised primary label="Manage">keyboard_arrow_right</Button>
    </div>
  );

}


function mapStateToProps(store, ownProps) {
  return {}
}

function mapDispatchToProps(dispatch, state) {
  return {
    createNewUser: (payload) => dispatch({type: userActions.CREATE, payload}),
    checkUser: (payload) => dispatch({type:userActions.CHECK_AVAILABILITY, payload}),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
