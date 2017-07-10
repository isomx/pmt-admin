/* eslint-disable */
import React, { Component } from 'react';
import queryString from 'query-string';
import Tabs from 'react-md/lib/Tabs/Tabs';
import Tab from 'react-md/lib/Tabs/Tab';
import TabsContainer from 'react-md/lib/Tabs/TabsContainer';
import Roles from '../containers/Roles';
import FontIcon from 'react-md/lib/FontIcons';

export default class Permissions extends Component {
  constructor(props) {
    super(props);
    this.handleTabChange = this.handleTabChange.bind(this);
    this.toolbarNavClick = this.toolbarNavClick.bind(this);
    this.forceTabUpdate = this.forceTabUpdate.bind(this);
    this.registerTabContainer = this.registerTabContainer.bind(this);
  }

  toolbarNavClick() {

  }

  handleTabChange() {

  }

  forceTabUpdate() {
    this.tabsContainer.forceUpdate();
  }

  registerTabContainer(ref) {
    if (ref) this.tabsContainer = ref;
  }

  render() {
    const { location } = this.props;
    const searchParams = queryString.parse(location.search);
    return (<Roles updateTabs={this.forceTabUpdate} />);
    return (
      <TabsContainer colored ref={this.registerTabContainer} active={false}>
        <Tabs tabId="tab" className="md-paper--3 md-tabs-fixed-toolbar">
          <Tab label="Roles" icon={<FontIcon>supervisor_account</FontIcon>}>
            <section className="md-tabs-fixed-toolbar-offset--icons" style={{minHeight: '5900px'}}>
              <Roles updateTabs={this.forceTabUpdate} />
            </section>
          </Tab>
          <Tab label="Permissions" icon={<FontIcon>phonelink_lock</FontIcon>}>
            <section className="md-tabs-fixed-toolbar-offset--icons" style={{minHeight: '5900px'}}>
              <Roles updateTabs={this.forceTabUpdate} />
            </section>
          </Tab>
        </Tabs>
      </TabsContainer>
    )
  }
}