import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import Navigation from './NavReducer';
import RenderReducer from './RenderReducer';
import drawer from './drawer';
import permissions from './permissions';
import user from './user';

export default combineReducers({
  router: routerReducer,
  nav: Navigation,
  render: RenderReducer,
  ui: combineReducers({ drawer }),
  permissions,
  user,
});
