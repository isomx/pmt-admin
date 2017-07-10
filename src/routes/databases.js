/**
export default [{
  path: 'dbs',
  label: 'Databases',
  leftIcon: 'dns',
  pageTitle: 'Databases',
}];
 **/
export default [{
  path: 'databases',
  label: 'Databases',
  leftIcon: 'dns',
  pageTitle: 'Databases',
  nestedItems: [{
    path: '',
    label: 'ALL',
    pageTitle: 'All',
  },{
    path: 'apps',
    label: 'Apps',
    pageTitle: 'Apps',
  }, {
    path: 'components',
    label: 'Components',
    pageTitle: 'Components',
  }, {
    path: 'nodes',
    label: 'Nodes',
    pageTitle: 'Nodes',
  }, {
    path: 'sites',
    label: 'Sites',
    pageTitle: 'Sites',
  }, {
    path: 'users',
    label: 'Users',
    pageTitle: 'Users',
  },
  ],
}];
