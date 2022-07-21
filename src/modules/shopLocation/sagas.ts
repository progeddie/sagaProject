import { takeEvery } from 'redux-saga/effects';
import {
  searchShopLocListAsync,
  SHOP_LOC_LIST,
  getShopItemListAsync,
  SHOP_ITEM_LIST,
  setShopAddrAsync,
  SET_SHOP_ADDR,
} from './actions';
import {
  getsearchShopLocList,
  getShopItemList,
  setShopAddr,
} from '../../api/shopLocation/shopLocation';
import createAsyncSaga from '../../lib/createAsyncSaga';

const getsearchShopLocListSaga = createAsyncSaga(searchShopLocListAsync, getsearchShopLocList);

export function* searchShopLocListSaga() {
  yield takeEvery(SHOP_LOC_LIST, getsearchShopLocListSaga);
}

const getShopItemListSaga = createAsyncSaga(getShopItemListAsync, getShopItemList);

export function* shopItemListSaga() {
  yield takeEvery(SHOP_ITEM_LIST, getShopItemListSaga);
}

const setShopAddrSaga = createAsyncSaga(setShopAddrAsync, setShopAddr);

export function* shopAddrSaga() {
  yield takeEvery(SET_SHOP_ADDR, setShopAddrSaga);
}
