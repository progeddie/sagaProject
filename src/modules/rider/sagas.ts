import { takeEvery } from 'redux-saga/effects';
import {
  getRiderListAsync,
  getShopListAsync,
  getRiderDrivingListAsync,
  GET_RIDER_LIST,
  GET_SHOP_LIST,
  GET_RIDER_DRIVING_LIST,
} from './actions';

import { getRiderList, getShopList, getRiderDrivingList } from '../../api/rider/rider';

import createAsyncSaga from '../../lib/createAsyncSaga';

const getRiderListSaga = createAsyncSaga(getRiderListAsync, getRiderList);

export function* cRiderListSaga() {
  yield takeEvery(GET_RIDER_LIST, getRiderListSaga);
}

const getShopListSaga = createAsyncSaga(getShopListAsync, getShopList);

export function* cShopListSaga() {
  yield takeEvery(GET_SHOP_LIST, getShopListSaga);
}

const getRiderDrivingListSaga = createAsyncSaga(getRiderDrivingListAsync, getRiderDrivingList);

export function* cRiderDrivingListSaga() {
  yield takeEvery(GET_RIDER_DRIVING_LIST, getRiderDrivingListSaga);
}
