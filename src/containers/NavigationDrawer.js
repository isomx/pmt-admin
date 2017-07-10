/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Toolbar  from 'react-md/lib/Toolbars';
import Button from 'react-md/lib/Buttons';
import getNavItems from '../constants/navItems';
import Drawer from 'react-md/lib/Drawers';
import FontIcon from 'react-md/lib/FontIcons';
import { types as userTypes } from '../actions/user';
import cn from 'classnames';
import NavDrawerMain from '../components/NavDrawerMain';

class NavigationDrawer extends Component {
  constructor(props) {
    super(props);
    this.toolbarNavClick = this.toolbarNavClick.bind(this);
    this.registerNavDrawer = this.registerNavDrawer.bind(this);
  }

  toolbarNavClick(e) {
    this.navDrawer.toggleVisibility();
  }

  registerNavDrawer(ref) {
    if (ref) {
      this.navDrawer = ref;
    }
  }

  render() {
    const {
      location: { pathname, search },
      defaultMedia,
      prominent,
      bottomBorder,
      zDepth,
      children,
    } = this.props;
    const { navItems, pageTitle } = getNavItems(pathname);
    const doLogout = this.props.logout;
    return(
      <div style={{lineHeight: '0px'}}>&nbsp;
        <Toolbar
          fixed={true}
          colored={true}
          title={pageTitle}
          nav={<Button key="nav" icon onClick={this.toolbarNavClick}>menu</Button>}
          className={cn({'md-divider-border': bottomBorder, 'md-divider-border--bottom': bottomBorder})}
          prominent={prominent}
          zDepth={zDepth}
          //children={<div style={{float: 'right'}}>{this.props.userInfo}</div>}
          actions={<Button onClick={() => doLogout()} label="Logout" flat></Button>}
        />
        <NavDrawerMain userInfo={this.props.userInfo} navItems={navItems} update={false} ref={(ref) => this.registerNavDrawer(ref)} />
        {this.props.includeMini &&
        <Drawer
          position="right"
          navItems={navItems}
          type={Drawer.DrawerTypes.TEMPORARY_MINI}
          style={{zIndex: 10}}
          className="md-toolbar--relative"
        />}
        {children}
      </div>
    );

  }
}
NavigationDrawer.propTypes = {
  prominent: PropTypes.bool.isRequired,
  bottomBorder: PropTypes.bool.isRequired,
  zDepth: PropTypes.number.isRequired,
  includeMini: PropTypes.bool,
}
NavigationDrawer.defaultProps = {
  prominent: false,
  bottomBorder: true,
  zDepth: 2,
}


function mapStateToProps(store, ownProps) {
  return {
    ...store.ui.drawer,
    userInfo: store.user.user ? store.user.user.firstName + ' ' + store.user.user.lastName : '',
  };
}

function mapDispatchToProps(dispatch, state) {
  return {
    dispatch,
    logout: () => dispatch({type: userTypes.LOGOUT}),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationDrawer)