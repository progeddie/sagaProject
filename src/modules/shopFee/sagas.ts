import { takeEvery } from 'redux-saga/effects';
import {
  getShopFeeListAsync,
  SHOP_FEE_LIST,
  saveShopFeeAreaAsync,
  SAVE_SHOP_AREA,
  setAreaAmtAddAsync,
  SET_AREA_AMT_ADD,
  getCallCenterInfoAsync,
  GET_CALL_CENTER_INFO,
  getCopyShopInfoAsync,
  GET_COPY_SHOP_INFO,
  getAreaAmtListAsync,
  GET_AREA_AMT_LIST,
  deleteAreaFeeAsync,
  DELETE_AREA_FEE,
  getShopPayCheckAsync,
  GET_SHOP_PAY_CHECK,
  copyAreaAmtAsync,
  COPY_AREA_AMT,
} from './actions';
import {
  getShopFeeList,
  saveShopFeeArea,
  setAreaAmtAdd,
  getCallCenterInfo,
  getCopyShopInfo,
  getAreaAmtList,
  deleteAreaFee,
  getShopPayCheck,
  copyAreaAmt,
} from '../../api/shopFee/shopFee';
import createAsyncSaga from '../../lib/createAsyncSaga';

const getShopFeeListSaga = createAsyncSaga(getShopFeeListAsync, getShopFeeList);

export function* searchShopFeeListSaga() {
  yield takeEvery(SHOP_FEE_LIST, getShopFeeListSaga);
}

const shopFeeAreaSaga = createAsyncSaga(saveShopFeeAreaAsync, saveShopFeeArea);

export function* saveShopFeeAreaSaga() {
  yield takeEvery(SAVE_SHOP_AREA, shopFeeAreaSaga);
}

const areaAmtAddSaga = createAsyncSaga(setAreaAmtAddAsync, setAreaAmtAdd);

export function* setAreaAmtAddSaga() {
  yield takeEvery(SET_AREA_AMT_ADD, areaAmtAddSaga);
}

const callCenterInfoSaga = createAsyncSaga(getCallCenterInfoAsync, getCallCenterInfo);

export function* getCallCenterInfoSaga() {
  yield takeEvery(GET_CALL_CENTER_INFO, callCenterInfoSaga);
}

const copyShopInfoSaga = createAsyncSaga(getCopyShopInfoAsync, getCopyShopInfo);

export function* getCopyShopInfoSaga() {
  yield takeEvery(GET_COPY_SHOP_INFO, copyShopInfoSaga);
}

const areaAmtListSaga = createAsyncSaga(getAreaAmtListAsync, getAreaAmtList);

export function* getAreaAmtListSaga() {
  yield takeEvery(GET_AREA_AMT_LIST, areaAmtListSaga);
}

const delAreaFeeSaga = createAsyncSaga(deleteAreaFeeAsync, deleteAreaFee);

export function* deleteAreaFeeSaga() {
  yield takeEvery(DELETE_AREA_FEE, delAreaFeeSaga);
}

const getShopPayCheckSaga = createAsyncSaga(getShopPayCheckAsync, getShopPayCheck);

export function* shopPayCheckSaga() {
  yield takeEvery(GET_SHOP_PAY_CHECK, getShopPayCheckSaga);
}

const copyAreaAmtSaga = createAsyncSaga(copyAreaAmtAsync, copyAreaAmt);

export function* cAreaAmtSaga() {
  yield takeEvery(COPY_AREA_AMT, copyAreaAmtSaga);
}
