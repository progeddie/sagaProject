import { takeEvery } from 'redux-saga/effects';
import {
  getDestListAsync,
  GET_DEST_LIST,
  deleteDestListAsync,
  DELETE_DEST_LIST,
  getCDestListAsync,
  GET_CDEST_LIST,
  copyDestListAsync,
  COPY_DEST_LIST,
  getDestPrivateAsync,
  GET_DEST_PRIVATE,
  getPointPrivateAsync,
  GET_POINT_PRIVATE,
  copyPrivateDataAsync,
  COPY_PRIVATE_DATA,
  insertDestListAsync,
  INSERT_DEST_LIST,
} from './actions';
import { getDestList, deleteDestList, insertDestList } from '../../api/destination/destination';
import { getCDestList, copyDestList } from '../../api/destination/popup/copyDestination';
import {
  getDestPrivate,
  getPointPrivate,
  copyDataPrivate,
} from '../../api/destination/popup/copyDestinationPrivate';
import createAsyncSaga from '../../lib/createAsyncSaga';

const getDestListSaga = createAsyncSaga(getDestListAsync, getDestList);

export function* destListSaga() {
  yield takeEvery(GET_DEST_LIST, getDestListSaga);
}

const setDeleteDestListSaga = createAsyncSaga(deleteDestListAsync, deleteDestList);

export function* deleteDestListSaga() {
  yield takeEvery(DELETE_DEST_LIST, setDeleteDestListSaga);
}

const getCDestListSaga = createAsyncSaga(getCDestListAsync, getCDestList);

export function* CdestListSaga() {
  yield takeEvery(GET_CDEST_LIST, getCDestListSaga);
}

const getCopyDestListSaga = createAsyncSaga(copyDestListAsync, copyDestList);

export function* copyDestListSaga() {
  yield takeEvery(COPY_DEST_LIST, getCopyDestListSaga);
}

const getDestPrivateSaga = createAsyncSaga(getDestPrivateAsync, getDestPrivate);

export function* destPrivateSaga() {
  yield takeEvery(GET_DEST_PRIVATE, getDestPrivateSaga);
}

const getPointPrivateSaga = createAsyncSaga(getPointPrivateAsync, getPointPrivate);

export function* pointPrivateSaga() {
  yield takeEvery(GET_POINT_PRIVATE, getPointPrivateSaga);
}

const getCopyPrivateSaga = createAsyncSaga(copyPrivateDataAsync, copyDataPrivate);

export function* copyPrivateSaga() {
  yield takeEvery(COPY_PRIVATE_DATA, getCopyPrivateSaga);
}

const insertDestSaga = createAsyncSaga(insertDestListAsync, insertDestList);

export function* insertDestListSaga() {
  yield takeEvery(INSERT_DEST_LIST, insertDestSaga);
}
