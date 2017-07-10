/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Drawer from 'react-md/lib/Drawers';
import Toolbar  from 'react-md/lib/Toolbars';
import cn from 'classnames';
import Button from 'react-md/lib/Buttons';


export default class NavDrawerMain extends Component {
  constructor(props){
    super(props);
    this.state = {
      visible: false,
    }
    this.visibilityToggleCallback = this.visibilityToggleCallback.bind(this)
    this.toggleVisibility = this.toggleVisibility.bind(this);
    this.update = this.props.update;
  }

  componentWillReceiveProps(nextProps) {
    this.update = nextProps.update;
  }

  shouldComponentUpdate() {
    return this.update;
  }

  visibilityToggleCallback(visible) {
    this.update = true;
    this.setState({visible});
  }

  toggleVisibility() {
    this.update = true;
    this.setState({ visible: !this.state.visible });
  }

  render() {
    const close = <Button icon onClick={this.toggleVisibility}>arrow_back</Button>
    let drawerType;
    const { PERSISTENT, PERSISTENT_MINI, TEMPORARY, TEMPORARY_MINI } = Drawer.DrawerTypes;
    switch (this.props.drawerType) {
      case 'temporary':
        drawerType = TEMPORARY;
        break;
      case 'temporary_mini':
        drawerType = TEMPORARY_MINI;
        break;
      case 'persistent':
        drawerType = PERSISTENT;
        break;
      case 'persistent_mini':
        drawerType = PERSISTENT_MINI;
        break;
      default:
        drawerType = TEMPORARY;
    };
    if (drawerType === PERSISTENT_MINI || drawerType === TEMPORARY_MINI) {
      return (
        <Drawer
          position="left"
          navItems={this.props.navItems}
          navStyle={{paddingLeft: '10px'}}
          type={drawerType}
          style={{zIndex: 10}}
        />
      );
    } else {
      const header = (
        <Toolbar
          //nav={close}
          actions={close}
          className="md-divider-border md-divider-border--bottom"
          title={this.props.userInfo}
          //prominent
        />
      );
      return (
        <Drawer
          {...this.state}
          position="left"
          navItems={this.props.navItems}
          navStyle={{paddingLeft: '10px'}}
          onVisibilityToggle={this.visibilityToggleCallback}
          type={drawerType}
          header={header}
          style={{zIndex: 18}}
          //clickableDesktopOverlay={false}
        />
      )
    }

  }
}

NavDrawerMain.propTypes = {
  update: PropTypes.bool.isRequired,
  navItems: PropTypes.array.isRequired,
}