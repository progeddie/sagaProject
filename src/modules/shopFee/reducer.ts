import { createReducer } from 'typesafe-actions';
import {
  getShopFeeListState,
  saveShopFeeListState,
  setAreaAmtAddState,
  getCallCenterInfoState,
  getCopyShopInfoState,
  getAreaAmtListState,
  DeleteAreaFeeState,
  ShopFeeAction,
  getShopPayCheckState,
  copyAreaAmtState,
} from './types';
import {
  getShopFeeListAsync,
  saveShopFeeAreaAsync,
  setAreaAmtAddAsync,
  getCallCenterInfoAsync,
  getCopyShopInfoAsync,
  getAreaAmtListAsync,
  deleteAreaFeeAsync,
  getShopPayCheckAsync,
  copyAreaAmtAsync,
} from './actions';
import { asyncState, createAsyncReducer, transformToArray } from '../../lib/reducerUtils';

const initialStateShopFee: getShopFeeListState = {
  getShopFeeList: asyncState.initial(),
};

export const getShopFeeList = createReducer<getShopFeeListState, ShopFeeAction>(
  initialStateShopFee
).handleAction(
  transformToArray(getShopFeeListAsync),
  createAsyncReducer(getShopFeeListAsync, 'getShopFeeList')
);

const initialStateShopArea: saveShopFeeListState = {
  saveShopFeeArea: asyncState.initial(),
};

export const saveShopFeeAreaList = createReducer<saveShopFeeListState, ShopFeeAction>(
  initialStateShopArea
).handleAction(
  transformToArray(saveShopFeeAreaAsync),
  createAsyncReducer(saveShopFeeAreaAsync, 'saveShopFeeArea')
);

const initialStateAreaAmt: setAreaAmtAddState = {
  setAreaAmt: asyncState.initial(),
};

export const setAreaAmtAdd = createReducer<setAreaAmtAddState, ShopFeeAction>(
  initialStateAreaAmt
).handleAction(
  transformToArray(setAreaAmtAddAsync),
  createAsyncReducer(setAreaAmtAddAsync, 'setAreaAmt')
);

const initialCallCenterInfo: getCallCenterInfoState = {
  callCeterInfo: asyncState.initial(),
};

export const getCallCenterInfo = createReducer<getCallCenterInfoState, ShopFeeAction>(
  initialCallCenterInfo
).handleAction(
  transformToArray(getCallCenterInfoAsync),
  createAsyncReducer(getCallCenterInfoAsync, 'callCeterInfo')
);

const initialCopyShopInfo: getCopyShopInfoState = {
  copyShopInfo: asyncState.initial(),
};

export const getCopyShopInfo = createReducer<getCopyShopInfoState, ShopFeeAction>(
  initialCopyShopInfo
).handleAction(
  transformToArray(getCopyShopInfoAsync),
  createAsyncReducer(getCopyShopInfoAsync, 'copyShopInfo')
);

const initialAreaAmtList: getAreaAmtListState = {
  areaAmtList: asyncState.initial(),
};

export const getAreaAmtList = createReducer<getAreaAmtListState, ShopFeeAction>(
  initialAreaAmtList
).handleAction(
  transformToArray(getAreaAmtListAsync),
  createAsyncReducer(getAreaAmtListAsync, 'areaAmtList')
);

const initialStateD: DeleteAreaFeeState = {
  deleteAreaFee: asyncState.initial(),
};

export const deleteAreaFee = createReducer<DeleteAreaFeeState, ShopFeeAction>(
  initialStateD
).handleAction(
  transformToArray(deleteAreaFeeAsync),
  createAsyncReducer(deleteAreaFeeAsync, 'deleteAreaFee')
);

const initialShopPayCheck: getShopPayCheckState = {
  shopPayCheck: asyncState.initial(),
};

export const getShopPayCheckExec = createReducer<getShopPayCheckState, ShopFeeAction>(
  initialShopPayCheck
).handleAction(
  transformToArray(getShopPayCheckAsync),
  createAsyncReducer(getShopPayCheckAsync, 'shopPayCheck')
);

const initialCAreaAmt: copyAreaAmtState = {
  copyAreaAmt: asyncState.initial(),
};

export const copyAreaAmtExec = createReducer<copyAreaAmtState, ShopFeeAction>(
  initialCAreaAmt
).handleAction(
  transformToArray(copyAreaAmtAsync),
  createAsyncReducer(copyAreaAmtAsync, 'copyAreaAmt')
);
