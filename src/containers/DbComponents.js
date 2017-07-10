/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { types as navTypes } from '../actions/nav';

class DbComponents extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>Hello</div>
    )
  }
}

function mapStateToProps(store, ownProps) {
  return {

  }
}

function mapDispatchToProps(dispatch, state) {
  return {

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DbComponents);