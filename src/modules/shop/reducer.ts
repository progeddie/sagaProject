import { createReducer } from 'typesafe-actions';
import {
  ShopAction,
  ShopListState,
  CopyShopListState,
  CallCenterListState,
  AreaFeeB2BListState,
  AreaFeeListState,
  AreaFeeSearchListState,
} from './types';
import {
  getShopListAsync,
  getCopyShopListAsync,
  getCallCenterListAsync,
  getAreaFeeB2BListAsync,
  getAreaFeeListAsync,
  getAreaFeeSearchListAsync,
} from './actions';
import { asyncState, createAsyncReducer, transformToArray } from '../../lib/reducerUtils';

const initialStateS: ShopListState = {
  shopList: asyncState.initial(),
};

export const shopList = createReducer<ShopListState, ShopAction>(initialStateS).handleAction(
  transformToArray(getShopListAsync),
  createAsyncReducer(getShopListAsync, 'shopList')
);

const initialStateC: CopyShopListState = {
  copyShopList: asyncState.initial(),
};

export const copyShopList = createReducer<CopyShopListState, ShopAction>(
  initialStateC
).handleAction(
  transformToArray(getCopyShopListAsync),
  createAsyncReducer(getCopyShopListAsync, 'copyShopList')
);

const initialStateA: AreaFeeListState = {
  areaFeeList: asyncState.initial(),
};

export const areaFeeList = createReducer<AreaFeeListState, ShopAction>(initialStateA).handleAction(
  transformToArray(getAreaFeeListAsync),
  createAsyncReducer(getAreaFeeListAsync, 'areaFeeList')
);

const initialStateAS: AreaFeeSearchListState = {
  areaFeeSearchList: asyncState.initial(),
};

export const areaFeeSearchList = createReducer<AreaFeeSearchListState, ShopAction>(
  initialStateAS
).handleAction(
  transformToArray(getAreaFeeSearchListAsync),
  createAsyncReducer(getAreaFeeSearchListAsync, 'areaFeeSearchList')
);

const initialStateAB: AreaFeeB2BListState = {
  areaFeeB2BList: asyncState.initial(),
};

export const areaFeeB2BList = createReducer<AreaFeeB2BListState, ShopAction>(
  initialStateAB
).handleAction(
  transformToArray(getAreaFeeB2BListAsync),
  createAsyncReducer(getAreaFeeB2BListAsync, 'areaFeeB2BList')
);
