import { createAsyncAction } from 'typesafe-actions';
import { AxiosError } from 'axios';
import {
  searchShopLocSendData,
  searchShopLocList,
  searchShopLocResult,
  shopItemSendData,
  shopItemList,
  setShopAddrSendData,
  setShopAddrResult,
} from '../../api/interface/shopLocation/shopLocation';

export const SHOP_LOC_LIST = 'shop/SHOP_LOC_LIST';
export const SHOP_LOC_LIST_SUCCESS = 'shop/SHOP_LOC_LIST_SUCCESS';
export const SHOP_LOC_LIST_ERROR = 'shop/SHOP_LOC_LIST_ERROR';

export const searchShopLocListAsync = createAsyncAction(
  SHOP_LOC_LIST,
  SHOP_LOC_LIST_SUCCESS,
  SHOP_LOC_LIST_ERROR
)<searchShopLocSendData, searchShopLocList, AxiosError>();

export const SHOP_ITEM_LIST = 'shop/SHOP_ITEM_LIST';
export const SHOP_ITEM_LIST_SUCCESS = 'shop/SHOP_ITEM_LIST_SUCCESS';
export const SHOP_ITEM_LIST_ERROR = 'shop/SHOP_ITEM_LIST_ERROR';

export const getShopItemListAsync = createAsyncAction(
  SHOP_ITEM_LIST,
  SHOP_ITEM_LIST_SUCCESS,
  SHOP_ITEM_LIST_ERROR
)<shopItemSendData, shopItemList, AxiosError>();

export const SET_SHOP_ADDR = 'shop/SET_SHOP_ADDR';
export const SET_SHOP_ADDR_SUCCESS = 'shop/SET_SHOP_ADDR_SUCCESS';
export const SET_SHOP_ADDR_ERROR = 'shop/SET_SHOP_ADDR_ERROR';

export const setShopAddrAsync = createAsyncAction(
  SET_SHOP_ADDR,
  SET_SHOP_ADDR_SUCCESS,
  SET_SHOP_ADDR_ERROR
)<setShopAddrSendData, setShopAddrResult, AxiosError>();
