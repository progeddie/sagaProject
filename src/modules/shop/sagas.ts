import { takeEvery } from 'redux-saga/effects';

import {
  getShopListAsync,
  getAreaFeeB2BListAsync,
  getAreaFeeListAsync,
  getAreaFeeSearchListAsync,
  GET_SHOP_LIST,
  GET_AREA_FEE_B2B_LIST,
  GET_AREA_FEE_LIST,
  GET_AREA_FEE_SEARCH_LIST,
} from './actions';

import {
  getShopList,
  getAreaFeeB2BList,
  getAreaFeeList,
  getAreaFeeSearchList,
} from '../../api/shop/shop';

import createAsyncSaga from '../../lib/createAsyncSaga';

const getShopListSaga = createAsyncSaga(getShopListAsync, getShopList);

export function* shopListSaga() {
  yield takeEvery(GET_SHOP_LIST, getShopListSaga);
}

const getAreaFeeB2BListSaga = createAsyncSaga(getAreaFeeB2BListAsync, getAreaFeeB2BList);

export function* areaFeeB2BListSaga() {
  yield takeEvery(GET_AREA_FEE_B2B_LIST, getAreaFeeB2BListSaga);
}

const getAreaFeeListSaga = createAsyncSaga(getAreaFeeListAsync, getAreaFeeList);

export function* areaFeeListSaga() {
  yield takeEvery(GET_AREA_FEE_LIST, getAreaFeeListSaga);
}

const getAreaFeeSearchListSaga = createAsyncSaga(getAreaFeeSearchListAsync, getAreaFeeSearchList);

export function* areaFeeSearchListSaga() {
  yield takeEvery(GET_AREA_FEE_SEARCH_LIST, getAreaFeeSearchListSaga);
}
