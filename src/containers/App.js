/* eslint-disable */
import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import NavigationDrawer from './NavigationDrawer';
import Drawer from 'react-md/lib/Drawers';
import Databases from '../components/Databases';
import Permissions from '../components/Permissions';
import DbComponents from './DbComponents';
import LiveCoding from '../components/LiveCoding';
import Users from '../components/Users';
import { types as navTypes } from '../actions/nav';
import Login from './Login';
import Toolbar  from 'react-md/lib/Toolbars';
import getNavItems from '../routes';
import TabsContainer from 'react-md/lib/Tabs/TabsContainer';
import Tabs from 'react-md/lib/Tabs/Tabs';
import Tab from 'react-md/lib/Tabs/Tab';
import rxjsConfig from 'recompose/rxjsObservableConfig';
import cn from 'classnames';
import FontIcon from 'react-md/lib/FontIcons';
import setObservableConfig from 'recompose/setObservableConfig';
setObservableConfig(rxjsConfig);
import '../scss/components/_Tabs.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.registerContainer = this.registerContainer.bind(this);
  }

  registerContainer(ref) {
    if (ref) {
      this.container = ref;
    }
  }

  render() {
    const {
      location: { pathname, search },
      defaultMedia,
      toolbarTitle,
      toolbarProminent,
    } = this.props;
    const { navItems, pageTitle } = getNavItems(pathname);
    return (
      <NavigationDrawer {...this.props}>
        <Login/>
        <Switch>
          <Route exact path={navTypes.DATABASES} render={props => <Databases {...props} />} />
          <Route path={navTypes.DB_COMPONENTS} render={props => <DbComponents {...props} />} />
          <Route path={navTypes.USERS} render={props => <Users {...props} />} />
          <Route path={navTypes.PERMISSIONS} render={props => <Permissions {...props} />} />
          <Route path={navTypes.LIVE_CODING} render={props => <LiveCoding {...props} />} />
        </Switch>
      </NavigationDrawer>
    )
    return (
        <NavigationDrawer
          ref={this.registerContainer}
          drawerTitle="PMT"
          defaultMedia={defaultMedia}
          toolbarClassName="main-toolbar"
          toolbarTitle={pageTitle}
          defaultVisible={false}
          //toolbarTitle="Predictive Marketing"
          //toolbarProminent={toolbarProminent}
          toolbarProminent={true}
          toolbarChildren={tabs2}
          navItems={navItems}
          constantDrawerType={true}
          drawerType={Drawer.DrawerTypes.TEMPORARY}
        >

          <Switch>
            <Route exact path={navTypes.DATABASES} render={props => <Databases {...props} />} />
            <Route path={navTypes.DB_COMPONENTS} render={props => <DbComponents {...props} />} />
            <Route path={navTypes.USERS} render={props => <Users {...props} />} />
          </Switch>
        </NavigationDrawer>
    );
  }

}
function mapStateToProps(store, ownProps) {
  return {
    ...store.ui.drawer,
    loggedIn: store.user.loggedIn,
  }
}

function mapDispatchToProps(dispatch, state) {
  return {

  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));