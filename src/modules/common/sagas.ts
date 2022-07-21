import { takeEvery } from 'redux-saga/effects';

import {
  getSidoListAsync,
  GET_SIDO_LIST,
  getGunguListAsync,
  GET_GUNGU_LIST,
  getDongListAsync,
  GET_DONG_LIST,
  getRiListAsync,
  GET_RI_LIST,
  getNameShopListAsync,
  GET_NAMESHOP_LIST,
  GET_DAUM_ADDR,
  getDaumAddrAsync,
  SEND_RIDER_SMS,
  sendRiderSmsAsync,
  INSERT_MSG,
  insertMsgAsync,
} from './actions';

import {
  getSidoList,
  getGunguList,
  getDongList,
  getRiList,
  getNameShopList,
  getDaumAddr,
} from '../../api/common/area/areaAPI';

import { sendRiderSms, insertMessage } from '../../api/common/sms/smsAPI';

import createAsyncSaga from '../../lib/createAsyncSaga';

const getSidoListSaga = createAsyncSaga(getSidoListAsync, getSidoList);

export function* sidoListSaga() {
  yield takeEvery(GET_SIDO_LIST, getSidoListSaga);
}

const getGunguListSaga = createAsyncSaga(getGunguListAsync, getGunguList);

export function* gunguListSaga() {
  yield takeEvery(GET_GUNGU_LIST, getGunguListSaga);
}

const getDongListSaga = createAsyncSaga(getDongListAsync, getDongList);

export function* dongListSaga() {
  yield takeEvery(GET_DONG_LIST, getDongListSaga);
}

const getRiListSaga = createAsyncSaga(getRiListAsync, getRiList);

export function* riListSaga() {
  yield takeEvery(GET_RI_LIST, getRiListSaga);
}

const getNameShopListSaga = createAsyncSaga(getNameShopListAsync, getNameShopList);

export function* cNameShopListSaga() {
  yield takeEvery(GET_NAMESHOP_LIST, getNameShopListSaga);
}

const getDaumSaga = createAsyncSaga(getDaumAddrAsync, getDaumAddr);

export function* getDaumAddrSaga() {
  yield takeEvery(GET_DAUM_ADDR, getDaumSaga);
}

const sendRiderSmsSaga = createAsyncSaga(sendRiderSmsAsync, sendRiderSms);

export function* sendRSmsSaga() {
  yield takeEvery(SEND_RIDER_SMS, sendRiderSmsSaga);
}

const insertMessageSaga = createAsyncSaga(insertMsgAsync, insertMessage);

export function* insertMsgSaga() {
  yield takeEvery(INSERT_MSG, insertMessageSaga);
}
