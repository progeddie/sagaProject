import { createReducer } from 'typesafe-actions';
import {
  searchShopLocListState,
  searchShopLocAction,
  getShopItemListState,
  getShopItemAction,
  setShopAddrState,
  setShopAddrAction,
} from './types';
import { searchShopLocListAsync, getShopItemListAsync, setShopAddrAsync } from './actions';
import { asyncState, createAsyncReducer, transformToArray } from '../../lib/reducerUtils';

const initialState: searchShopLocListState = {
  searchShopLocList: asyncState.initial(),
};

export const searchShopLocList = createReducer<searchShopLocListState, searchShopLocAction>(
  initialState
).handleAction(
  transformToArray(searchShopLocListAsync),
  createAsyncReducer(searchShopLocListAsync, 'searchShopLocList')
);

const shopItemInitialState: getShopItemListState = {
  shopItemList: asyncState.initial(),
};

export const getShopItemList = createReducer<getShopItemListState, getShopItemAction>(
  shopItemInitialState
).handleAction(
  transformToArray(getShopItemListAsync),
  createAsyncReducer(getShopItemListAsync, 'shopItemList')
);

const setShopInitialState: setShopAddrState = {
  result: asyncState.initial(),
};

export const setShopAddr = createReducer<setShopAddrState, setShopAddrAction>(
  setShopInitialState
).handleAction(transformToArray(setShopAddrAsync), createAsyncReducer(setShopAddrAsync, 'result'));
