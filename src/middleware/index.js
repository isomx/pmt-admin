import { nav } from './nav';
import { renderLoadData, renderDataLoaded } from './render';
import UserLogic from './user';

export default [nav, renderLoadData, renderDataLoaded, ...UserLogic];