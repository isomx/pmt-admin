/* eslint-disable */
import Drawer from 'react-md/lib/Drawers';
import { types as navTypes } from '../actions/nav';
import { createPageTitle } from '../utils/string';

const { mobile, tablet, desktop } = Drawer.getCurrentMedia(Drawer.defaultProps);
let defaultMedia = 'mobile';
if (desktop) {
  defaultMedia = 'desktop';
} else if (tablet) {
  defaultMedia = 'tablet';
} else if (mobile) {
  defaultMedia = 'mobile';
}
const initialState = {
  mobile,
  tablet,
  desktop,
  defaultMedia,
};
const processLocationChange = (state, { payload: { pathname } }) => {
  let bottomBorder = false, zDepth = 2, prominent = false;
  if (pathname.match(/users|permissions/)) {
    bottomBorder = false;
    zDepth = 0;
  } else {
    bottomBorder = true;
    zDepth = 2;
    prominent = false;
  }
  if (state.zDepth !== zDepth || state.prominent !== prominent || state.bottomBorder !== bottomBorder) {
    return {...state, bottomBorder, zDepth, prominent};
  } else {
    return state;
  }

}
const drawer = (state = initialState, action) => {
  switch (action.type) {
    case navTypes.LOCATION_CHANGE:
      return processLocationChange(state, action);
    default:
      return state;
  }
};
export default drawer;