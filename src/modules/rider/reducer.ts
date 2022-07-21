import { createReducer } from 'typesafe-actions';
import {
  getRiderListAsync,
  getShopListAsync,
  getRiderDrivingListAsync,
  getNameShopListAsync,
} from './actions';
import { asyncState, createAsyncReducer, transformToArray } from '../../lib/reducerUtils';
import {
  RiderListState,
  ShopListState,
  NameShopListState,
  RiderDrivingListState,
  CenterUserAction,
} from './types';

const initialStateR: RiderListState = {
  riderList: asyncState.initial(),
};

export const cRiderList = createReducer<RiderListState, CenterUserAction>(
  initialStateR
).handleAction(
  transformToArray(getRiderListAsync),
  createAsyncReducer(getRiderListAsync, 'riderList')
);

const initialStateS: ShopListState = {
  shopList: asyncState.initial(),
};

export const cShopList = createReducer<ShopListState, CenterUserAction>(initialStateS).handleAction(
  transformToArray(getShopListAsync),
  createAsyncReducer(getShopListAsync, 'shopList')
);

const initialStateN: NameShopListState = {
  nameShopList: asyncState.initial(),
};

export const cNameShopList = createReducer<NameShopListState, CenterUserAction>(
  initialStateN
).handleAction(
  transformToArray(getNameShopListAsync),
  createAsyncReducer(getNameShopListAsync, 'nameShopList')
);

const initialStateD: RiderDrivingListState = {
  riderDrivingList: asyncState.initial(),
};

export const cRiderDrivingList = createReducer<RiderDrivingListState, CenterUserAction>(
  initialStateD
).handleAction(
  transformToArray(getRiderDrivingListAsync),
  createAsyncReducer(getRiderDrivingListAsync, 'riderDrivingList')
);
