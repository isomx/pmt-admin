/*eslint-disable*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { types as permissionsActions } from '../actions/permissions';
import TextField from 'react-md/lib/TextFields';
import DataTable from 'react-md/lib/DataTables/DataTable';
import TableHeader from 'react-md/lib/DataTables/TableHeader';
import TableBody from 'react-md/lib/DataTables/TableBody';
import TableRow from 'react-md/lib/DataTables/TableRow';
import TableColumn from 'react-md/lib/DataTables/TableColumn';
import Tabs from 'react-md/lib/Tabs/Tabs';
import Tab from 'react-md/lib/Tabs/Tab';
import TabsContainer from 'react-md/lib/Tabs/TabsContainer';
import EditDialogColumn from 'react-md/lib/DataTables/EditDialogColumn';
import Card from 'react-md/lib/Cards';
import CardTitle from 'react-md/lib/Cards/CardTitle';
import CircularProgress from 'react-md/lib/Progress/CircularProgress';
import validate from 'validate.js';
import Button from 'react-md/lib/Buttons';
import FontIcon from 'react-md/lib/FontIcons';
import isEmpty from 'lodash/isEmpty';
import forOwn from 'lodash/forOwn';

class Roles extends Component {
  constructor(props) {
    super(props);

    this.handleTabChange = this.handleTabChange.bind(this);
    this.forceTabUpdate = this.forceTabUpdate.bind(this);
    this.registerTabContainer = this.registerTabContainer.bind(this);
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
    const { permissions } = this.props;
    if (isEmpty(permissions)) {
      this.props.fetchPermissions();
      return (
        <section className="md-tabs-fixed-toolbar-offset--icons" style={{minHeight: '5900px'}}>
          <CircularProgress centered={true} id="fetching permissions" scale={3} />
        </section>
      )
    }
    const redX = <FontIcon style={{color: 'red'}}>clear</FontIcon>;
    const greenCheck = <FontIcon style={{color: 'green'}}>done</FontIcon>;
    const columnTitleStyle = {fontWeight: 'bold'};
    const roleColumns = [
      <TableColumn key="name"><p style={columnTitleStyle}>Name</p></TableColumn>,
      <TableColumn key="WPCore"><p style={columnTitleStyle}>Core</p></TableColumn>,
      <TableColumn key="System Role"><p style={columnTitleStyle}>System</p></TableColumn>,
      <TableColumn key="Other Role"><p style={columnTitleStyle}>Other/Unknown</p></TableColumn>,
      <TableColumn key="hasCaps"><p style={columnTitleStyle}>Capabilities</p></TableColumn>,
      <TableColumn key="Edit"><p style={columnTitleStyle}>Edit</p></TableColumn>,
    ];
    const capColumns = [
      <TableColumn key="name"><p style={columnTitleStyle}>Name</p></TableColumn>,
      <TableColumn key="WPCore"><p style={columnTitleStyle}>Core</p></TableColumn>,
      <TableColumn key="SystemCap"><p style={columnTitleStyle}>System</p></TableColumn>,
      <TableColumn key="OtherCap"><p style={columnTitleStyle}>Other/Unknown</p></TableColumn>,
      <TableColumn key="Edit"><p style={columnTitleStyle}>Edit</p></TableColumn>,
    ];
    let roleRows = [];
    let capsCount = {};
    let tabs = [];
    forOwn(permissions, (val, key) => {
      let caps = {};
      const totalCaps = val.capsCount.otherCaps + val.capsCount.pluginCaps + val.capsCount.wpCoreCaps;
      let button = {
        raised: true,
        primary: true,
        label: 'Edit',
      };
      if (!val.isEditable)  button.disabled = true;
      roleRows.push(
        <TableRow key={key}>
          <TableColumn><p>{val.displayName}</p></TableColumn>
          <TableColumn><p style={{textAlign: 'center'}}>{val.isWpCoreRole ? greenCheck : redX}</p></TableColumn>
          <TableColumn><p style={{textAlign: 'center'}}>{val.isPluginRole ? greenCheck : redX}</p></TableColumn>
          <TableColumn><p style={{textAlign: 'center'}}>{val.isOtherRole ? greenCheck : redX}</p></TableColumn>
          <TableColumn><p style={{textAlign: 'center'}}>{totalCaps}</p></TableColumn>
          <TableColumn><Button {...button} /></TableColumn>
        </TableRow>
      );
      forOwn(val.otherCaps, (name, slug) => {
        if (!capsCount[slug]) capsCount[slug] = {wpCore: 0, plugin: 0, other: 0, name};
        capsCount[slug].other++;
        if (!caps[slug]) caps[slug] = {isWpCore: false, isPluginCap: false, isOtherCap: false, name};
        caps[slug].isOtherCap = true;
      });
      forOwn(val.wpCoreCaps, (name, slug) => {
        if (!capsCount[slug]) capsCount[slug] = {wpCore: 0, plugin: 0, other: 0, name};
        capsCount[slug].wpCore++;
        if (!caps[slug]) caps[slug] = {isWpCore: false, isPluginCap: false, isOtherCap: false, name};
        caps[slug].isWpCore = true;
      });
      forOwn(val.pluginCaps, (name, slug) => {
        if (!capsCount[slug]) capsCount[slug] = {wpCore: 0, plugin: 0, other: 0, name};
        capsCount[slug].plugin++;
        if (!caps[slug]) caps[slug] = {isWpCore: false, isPluginCap: false, isOtherCap: false, name};
        caps[slug].isPluginCap = true;
      });
      let roleCapRows = [];
      let c = 0;
      forOwn(caps, (v, s) => {
        roleCapRows.push(
          <TableRow key={c}>
            <TableColumn><p>{v.name}</p></TableColumn>
            <TableColumn><p style={{textAlign: 'center'}}>{v.isWpCore ? greenCheck : redX}</p></TableColumn>
            <TableColumn><p style={{textAlign: 'center'}}>{v.isPluginCap ? greenCheck : redX}</p></TableColumn>
            <TableColumn><p style={{textAlign: 'center'}}>{v.isOtherCap ? greenCheck : redX}</p></TableColumn>
            <TableColumn><Button {...button} /></TableColumn>
          </TableRow>
        );
        c++;
      });
      tabs.push(
        <Tab key={val.name} label={`${val.displayName} Role`}>
          <section className="md-tabs-fixed-toolbar-offset--icons" style={{minHeight: '5900px'}}>
            <div className="md-grid md-grid--40-24">
              <div style={{marginLeft: 'auto', marginRight: 'auto'}} className="md-cell md-cell--6">
                <Card tableCard>
                  <CardTitle title={`${val.displayName} Capabilities`}/>
                  <DataTable plain={true} baseId="something">
                    <TableHeader>
                      <TableRow>
                        {capColumns}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {roleCapRows}
                    </TableBody>
                  </DataTable>
                </Card>
              </div>
            </div>
          </section>
        </Tab>
      );
      console.log('caps = ', caps);
      console.log('capsCount = ', capsCount);
    });
    let capRows = [];
    let c = 0;
    forOwn(capsCount, (val, slug) => {
      let button = {
        raised: true,
        primary: true,
        label: 'Edit',
      };
      capRows.push(
        <TableRow key={c}>
          <TableColumn><p>{val.name}</p></TableColumn>
          <TableColumn><p style={{textAlign: 'center'}}>{val.wpCore > 0 ? greenCheck : redX}</p></TableColumn>
          <TableColumn><p style={{textAlign: 'center'}}>{val.plugin > 0 ? greenCheck : redX}</p></TableColumn>
          <TableColumn><p style={{textAlign: 'center'}}>{val.other > 0 ? greenCheck : redX}</p></TableColumn>
          <TableColumn><Button {...button} /></TableColumn>
        </TableRow>
      );
      c++;
    })



    return (
      <TabsContainer colored ref={this.registerTabContainer} active={true}>
        <Tabs tabId="tab23" className="md-paper--3 md-tabs-fixed-toolbar">
          <Tab label="Permissions Summary" icon={<FontIcon>phonelink_lock</FontIcon>}>
            <section className="md-tabs-fixed-toolbar-offset--icons" style={{minHeight: '5900px'}}>
              <div className="md-grid md-grid--40-24">
                <div className="md-cell md-cell--3"></div>
                <div style={{marginLeft: 'auto', marginRight: 'auto'}} className="md-cell md-cell--6">
                  <Card tableCard>
                    <CardTitle title="Roles"/>
                    <DataTable plain={true} baseId="something">
                      <TableHeader>
                        <TableRow>
                          {roleColumns}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {roleRows}
                      </TableBody>
                    </DataTable>
                  </Card>
                </div>
                <div className="md-cell md-cell--3"></div>
                <div style={{marginLeft: 'auto', marginRight: 'auto', marginTop: '50px'}} className="md-cell md-cell--6">
                  <Card tableCard>
                    <CardTitle title="Capabilities"/>
                    <DataTable plain={true} baseId="something">
                      <TableHeader>
                        <TableRow>
                          {capColumns}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {capRows}
                      </TableBody>
                    </DataTable>
                  </Card>
                </div>
              </div>
            </section>
          </Tab>
          {tabs}
        </Tabs>
      </TabsContainer>
    );


  }
}

function mapStateToProps(store, ownProps) {
  return {
    permissions: store.permissions,
  }
}

function mapDispatchToProps(dispatch, state) {
  return {
    fetchPermissions: () => dispatch({type: permissionsActions.FETCH_PERMISSIONS}),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Roles);