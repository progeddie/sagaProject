import { takeEvery } from 'redux-saga/effects';

import {
  getHelperCompanyListAsync,
  getMemberCompanyListAsync,
  getBranchCompanyListAsync,
  getAreaListAsync,
  getSearchAreaListAsync,
  insertAreaAsync,
  updateAreaAsync,
  deleteAreaAsync,
  useAreaAsync,
  GET_HELPERC_LIST,
  GET_MEMBERC_LIST,
  GET_BRANCHC_LIST,
  GET_AREA_LIST,
  GET_SEARCH_AREA_LIST,
  INSERT_AREA,
  UPDATE_AREA,
  DELETE_AREA,
  USE_AREA,
} from './actions';

import {
  insertArea,
  updateArea,
  deleteArea,
  useArea,
  getAreaList,
  getSearchAreaList,
  getHelperCompanyList,
  getMemberCompanyList,
  getBranchCompanyList,
} from '../../api/delivery/delivery';

import createAsyncSaga from '../../lib/createAsyncSaga';

const getHelperCompanyListSaga = createAsyncSaga(getHelperCompanyListAsync, getHelperCompanyList);

export function* helperCompanyListSaga() {
  yield takeEvery(GET_HELPERC_LIST, getHelperCompanyListSaga);
}

const getMemberCompanyListSaga = createAsyncSaga(getMemberCompanyListAsync, getMemberCompanyList);

export function* memberCompanyListSaga() {
  yield takeEvery(GET_MEMBERC_LIST, getMemberCompanyListSaga);
}

const getBranchCompanyListSaga = createAsyncSaga(getBranchCompanyListAsync, getBranchCompanyList);

export function* branchCompanyListSaga() {
  yield takeEvery(GET_BRANCHC_LIST, getBranchCompanyListSaga);
}

const getAreaListSaga = createAsyncSaga(getAreaListAsync, getAreaList);

export function* areaListSaga() {
  yield takeEvery(GET_AREA_LIST, getAreaListSaga);
}

const getSearchAreaListSaga = createAsyncSaga(getSearchAreaListAsync, getSearchAreaList);

export function* searchAreaListSaga() {
  yield takeEvery(GET_SEARCH_AREA_LIST, getSearchAreaListSaga);
}

const inAreaSaga = createAsyncSaga(insertAreaAsync, insertArea);

export function* insertAreaSaga() {
  yield takeEvery(INSERT_AREA, inAreaSaga);
}

const upAreaSaga = createAsyncSaga(updateAreaAsync, updateArea);

export function* updateAreaSaga() {
  yield takeEvery(UPDATE_AREA, upAreaSaga);
}

const delAreaSaga = createAsyncSaga(deleteAreaAsync, deleteArea);

export function* deleteAreaSaga() {
  yield takeEvery(DELETE_AREA, delAreaSaga);
}

const usAreaSaga = createAsyncSaga(useAreaAsync, useArea);

export function* UseAreaSaga() {
  yield takeEvery(USE_AREA, usAreaSaga);
}
