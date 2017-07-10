/*eslint-disable*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { types as userActions } from '../actions/user';
import TextField from 'react-md/lib/TextFields';
import CircularProgress from 'react-md/lib/Progress/CircularProgress';
import validate from 'validate.js';
import Button from 'react-md/lib/Buttons';
import forOwn from 'lodash/forOwn';
import FontIcon from 'react-md/lib/FontIcons';
validate.validators.memberPassword = (value, options, key, attributes) => {
  return null;
}

class UserAdd extends Component {
  constructor(props) {
    super(props);
    this.fieldNotices = {
      unchecked: (<div style={{width: '24px', height: '24px'}}/>),
      checking: (<CircularProgress centered={false} id="ssCircular" scale={1} />),
      valid: (<FontIcon style={{color: 'green'}}>done</FontIcon>),
      invalid: (<FontIcon style={{color: 'red'}}>clear</FontIcon>),
      error: (<FontIcon style={{color: 'red'}}>error</FontIcon>),
    };
    this.state = {
      values: {
        firstName: null,
        lastName: null,
        email: null,
        username: null,
        password: null,
        confirmPassword: null,
      },
      errors: {
        firstName: false,
        lastName: false,
        email: false,
        username: false,
        password: false,
        confirmPassword: false,
      },
      blurred: {
        firstName: false,
        lastName: false,
        email: false,
        username: false,
        password: false,
        confirmPassword: false,
      },
      formIsValid: false,
      usernameStatus: this.fieldNotices.unchecked,
      usernameValid: false,
      emailStatus: this.fieldNotices.unchecked,
      emailValid: false,
      submitting: false,
    }
    this.validateContext = {
      firstName: {
        presence: true,
      },
      lastName: {
        presence: true,
        length: {
          minimum: 2,
          tooShort: 'needs to have ${count} characters or more',
        }
      },
      email: {
        presence: true,
        email: true,
      },
      username: {
        presence: true,
        format: {
          pattern: '[a-z0-9]+',
          flags: 'i',
          message: 'can only contain a-z and 0-9',
        },
        length: {
          minimum: 3,
          tooShort: 'needs to have %{count} characters or more',
        }
      },
      password: {
        presence: true,
        memberPassword: 'some options',
      },
      confirmPassword: {
        presence: true,
        memberPassword: 'some options',
        equality: {
          attribute: 'password',
          message: 'does not match',
        }
      }
    }
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.recordBlur = this.recordBlur.bind(this);
    this.submitted = false;
  }

  checkEmail(value) {
    const callback = (resp) => {
      if (this.state.values.email === value) {
        if (!resp) {
          this.setState({
            emailStatus: this.fieldNotices.error,
            emailValid: 'There was a problem communicating with the server. Please try again.',
            formIsValid: false,
          });
        } else if (resp.email) {
          let formIsValid = true;
          forOwn(this.state.errors, (val) => {
            console.log('val = ', val);
            if (val) {
              formIsValid = false;
            }
          });
          this.setState({emailStatus: this.fieldNotices.valid, emailValid: true, formIsValid});
        } else if (!resp.email) {
          this.setState({emailStatus: this.fieldNotices.invalid, emailValid: 'The email you entered is not available.', formIsValid: false});
        }
      } else if (this.state.errors.email) {
        this.setState({emailStatus: this.fieldNotices.unchecked});
      }
    }
    this.props.checkEmailAvailability({email: value}, callback);
  }

  checkUsername(value) {
    const callback = (resp) => {
      if (this.state.values.username === value) {
        if (!resp) {
          this.setState({
            usernameStatus: this.fieldNotices.error,
            usernameValid: 'There was a problem communicating with the server. Please try again.',
            formIsValid: false,
          });
        } else if (resp.username) {
          let formIsValid = true;
          forOwn(this.state.errors, (val) => {
            if (val) {
              formIsValid = false;
            }
          });
          this.setState({usernameStatus: this.fieldNotices.valid, usernameValid: true, formIsValid});
        } else if (!resp.username) {
          this.setState({usernameStatus: this.fieldNotices.invalid, usernameValid: 'The username you entered is not available.', formIsValid: false,});
        }
      } else if (this.state.errors.username) {
        this.setState({usernameStatus: this.fieldNotices.unchecked});
      }
    }
    this.props.checkUsernameAvailability({username: value}, callback);
  }

  handleInput(val, e) {
    let newState = {values: {...this.state.values}, errors: {...this.state.errors}, blurred: {...this.state.blurred}};
    newState.values[e.target.name] = val;
    if (e.target.name === 'username') {
      newState.checkingUsername = true;
    }
    this.validateFields(newState, e);
  }

  handleSubmit(e) {
    this.submitted = true;
    this.props.createUser(this.state.values);
    //this.setState({submitting: true});
  }

  validateFields(newState, e) {
    forOwn(newState.errors, (val, key) => {
      newState.errors[key] = false;
    });
    newState.formIsValid = true;
    const validation = validate(newState.values, this.validateContext);
    if (validation) {
      newState.formIsValid = false;
      forOwn(validation, (val, key) => {
        newState.errors[key] = val;
        if (key === 'email') {
          newState.emailStatus = this.fieldNotices.unchecked;
        } else if (key === 'username') {
          newState.usernameStatus = this.fieldNotices.unchecked;
        }
      });
    }
    if (e.target.name === 'email' && (!validation || !validation.email) && this.state.values.email !== newState.values.email) {
      this.checkEmail(newState.values.email);
      newState.emailStatus = this.fieldNotices.checking;
      newState.emailValid = false;
      newState.formIsValid = false;
      newState.blurred.email = true;
    } else if (e.target.name === 'username' && (!validation || !validation.username) && this.state.values.username !== newState.values.username) {
      this.checkUsername(newState.values.username);
      newState.usernameStatus = this.fieldNotices.checking;
      newState.usernameValid = false;
      newState.formIsValid = false;
      newState.blurred.username = true;
    }
    if (this.state.emailValid !== true || this.state.usernameValid !== true) {
      newState.formIsValid = false;
    }

    //const forceUpdate = this.props.updateTabs;
    this.setState(newState);


    //setTimeout(() => {forceUpdate()}, 2000);
  }

  getErrors() {
    let errors = {};
    const { blurred } = this.state;
    forOwn(this.state.errors, (val, key) => {
      if (blurred[key] && val && val.length > 0) {
        errors[key] = {
          error: true,
          errorText: val[0],
        };
      }
    });
    if (this.state.emailValid && this.state.emailValid !== true && !errors.email) {
      errors.email = {
        error: true,
        errorText: this.state.emailValid,
      };
    }
    if (this.state.usernameValid && this.state.usernameValid !== true && !errors.username) {
      errors.username = {
        error: true,
        errorText: this.state.usernameValid
      }
    }
    return errors;
  }

  recordBlur(e) {
    let newState = {...this.state};
    newState.blurred[e.target.name] = true;
    this.setState(newState);
  }

  render() {
    console.log('UserAdd rendering, this.props = ', this.props);
    console.log('this.submitted = ', this.submitted);
    const errors = this.getErrors();
    const paperStyle = {
      width: '50%',
      minWidth: '300px',
      maxWidth: '800px',
      margin: '45px auto 15px auto',
      height: '100%',
    };
    return (
      <div style={paperStyle} className="md-paper--3 md-grid md-grid--40-24">
        <div className="md-cell md-cell--12">
          <h2>Create New User </h2>
        </div>
        <div className="md-cell md-cell--6">
          <TextField
            id="firstName"
            name="firstName"
            onChange={this.handleInput}
            onBlur={this.recordBlur}
            label="First Name"
            leftIcon={this.fieldNotices.unchecked}
            {...errors.firstName}
          />
        </div>
        <div className="md-cell md-cell--6">
          <TextField
            id="lastName"
            name="lastName"
            onChange={this.handleInput}
            onBlur={this.recordBlur}
            leftIcon={this.fieldNotices.unchecked}
            label="Last Name"
            {...errors.lastName}
          />
        </div>
        <div className="md-cell md-cell--12">
          <TextField
            id="email"
            name="email"
            onChange={this.handleInput}
            onBlur={this.recordBlur}
            label="Email"
            leftIcon={this.state.emailStatus}
            {...errors.email}
          />
        </div>
        <div className="md-cell md-cell--12">
          <TextField
            style={{float: 'left'}}
            id="username"
            name="username"
            onChange={this.handleInput}
            onBlur={this.recordBlur}
            label="Username"
            leftIcon={this.state.usernameStatus}
            {...errors.username}
          />
        </div>
        <div className="md-cell md-cell--6">
          <TextField
            id="password"
            name="password"
            onChange={this.handleInput}
            onBlur={this.recordBlur}
            label="Password"
            type="password"
            leftIcon={this.fieldNotices.unchecked}
            {...errors.password}
          />
        </div>
        <div className="md-cell md-cell--6">
          <TextField
            id="confirmPassword"
            name="confirmPassword"
            onChange={this.handleInput}
            onBlur={this.recordBlur}
            onFocus={this.recordBlur}
            label="Confirm Password"
            type="password"
            leftIcon={this.fieldNotices.unchecked}
            {...errors.confirmPassword}
          />
        </div>
        <div className="md-cell md-cell--5">
          {!this.props.creating && <Button style={{marginTop: '30px', marginLeft: '28px'}} onClick={this.handleSubmit} label="Create Account" disabled={!this.state.formIsValid} raised primary >add</Button>}
          {this.props.creating && <Button style={{marginTop: '30px', marginLeft: '28px'}} label="Creating Account..." disabled flat primary ><CircularProgress centered={false} id="ssCircular" scale={1} /></Button>}
        </div>
        {this.props.createResp && <div className="md-cell md-cell--10" style={{marginLeft: '35px', color: 'green'}}>Success</div>}
      </div>
    );
  }
}
//<Button style={{marginTop: '30px', marginLeft: '28px'}} onClick={this.handleSubmit} label="Create Account" disabled={!this.state.formIsValid} raised primary >add</Button>


function mapStateToProps(store, ownProps) {
  const { creating, createErrors, createResp } = store.user;
  return {creating, createErrors, createResp};
}

function mapDispatchToProps(dispatch, state) {
  return {
    checkEmailAvailability: (values, callback) => dispatch({type: userActions.CHECK_EMAIL_AVAILABILITY, payload: {values, callback}}),
    checkUsernameAvailability: (values, callback) => dispatch({type: userActions.CHECK_USERNAME_AVAILABILITY, payload: {values, callback}}),
    createUser: (payload) => dispatch({type: userActions.CREATE, payload}),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserAdd);