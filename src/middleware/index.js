import { renderLoadData, renderDataLoaded } from './render';
import UserLogic from './user';
import Permissions from './permissions';

export default [renderLoadData, renderDataLoaded, ...UserLogic, ...Permissions];