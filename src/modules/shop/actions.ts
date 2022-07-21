import { createAsyncAction } from 'typesafe-actions';
import { AxiosError } from 'axios';
import {
  ShopListSendData,
  AreaFeeB2BListSendData,
  AreaFeeListSendData,
  AreaFeeSearchListSendData,
  CopyShopListSendData,
  CallCenterListSendData,
  ShopList,
  AreaFeeB2BList,
  AreaFeeList,
  AreaFeeSearchList,
  CopyShopList,
  CallCenterList,
} from '../../api/interface/shop/shop';

export const GET_SHOP_LIST = 'shop/GET_SHOP_LIST';
export const GET_SHOP_LIST_SUCCESS = 'shop/GET_SHOP_LIST_SUCCESS';
export const GET_SHOP_LIST_ERROR = 'shop/GET_SHOP_LIST_ERROR';

export const getShopListAsync = createAsyncAction(
  GET_SHOP_LIST,
  GET_SHOP_LIST_SUCCESS,
  GET_SHOP_LIST_ERROR
)<ShopListSendData, ShopList[], AxiosError>();

export const GET_CALLCENTER_LIST = 'shop/GET_CALLCENTER_LIST';
export const GET_CALLCENTER_LIST_SUCCESS = 'shop/GET_CALLCENTER_LIST_SUCCESS';
export const GET_CALLCENTER_LIST_ERROR = 'shop/GET_CALLCENTER_LIST_ERROR';

export const getCallCenterListAsync = createAsyncAction(
  GET_CALLCENTER_LIST,
  GET_CALLCENTER_LIST_SUCCESS,
  GET_CALLCENTER_LIST_ERROR
)<CallCenterListSendData, CallCenterList[], AxiosError>();

export const GET_COPY_SHOP_LIST = 'shop/GET_COPY_SHOP_LIST';
export const GET_COPY_SHOP_LIST_SUCCESS = 'shop/GET_COPY_SHOP_LIST_SUCCESS';
export const GET_COPY_SHOP_LIST_ERROR = 'shop/GET_COPY_SHOP_LIST_ERROR';

export const getCopyShopListAsync = createAsyncAction(
  GET_COPY_SHOP_LIST,
  GET_COPY_SHOP_LIST_SUCCESS,
  GET_COPY_SHOP_LIST_ERROR
)<CopyShopListSendData, CopyShopList[], AxiosError>();

export const GET_AREA_FEE_B2B_LIST = 'shop/GET_AREA_FEE_B2B_LIST';
export const GET_AREA_FEE_B2B_LIST_SUCCESS = 'shop/GET_AREA_FEE_B2B_LIST_SUCCESS';
export const GET_AREA_FEE_B2B_LIST_ERROR = 'shop/GET_AREA_FEE_B2B_LIST_ERROR';

export const getAreaFeeB2BListAsync = createAsyncAction(
  GET_AREA_FEE_B2B_LIST,
  GET_AREA_FEE_B2B_LIST_SUCCESS,
  GET_AREA_FEE_B2B_LIST_ERROR
)<AreaFeeB2BListSendData, AreaFeeB2BList[], AxiosError>();

export const GET_AREA_FEE_LIST = 'shop/GET_AREA_FEE_LIST';
export const GET_AREA_FEE_LIST_SUCCESS = 'shop/GET_AREA_FEE_LIST_SUCCESS';
export const GET_AREA_FEE_LIST_ERROR = 'shop/GET_AREA_FEE_LIST_ERROR';

export const getAreaFeeListAsync = createAsyncAction(
  GET_AREA_FEE_LIST,
  GET_AREA_FEE_LIST_SUCCESS,
  GET_AREA_FEE_LIST_ERROR
)<AreaFeeListSendData, AreaFeeList[], AxiosError>();

export const GET_AREA_FEE_SEARCH_LIST = 'shop/GET_AREA_FEE_SEARCH_LIST';
export const GET_AREA_FEE_SEARCH_LIST_SUCCESS = 'shop/GET_AREA_FEE_SEARCH_LIST_SUCCESS';
export const GET_AREA_FEE_SEARCH_LIST_ERROR = 'shop/GET_AREA_FEE_SEARCH_LIST_ERROR';

export const getAreaFeeSearchListAsync = createAsyncAction(
  GET_AREA_FEE_SEARCH_LIST,
  GET_AREA_FEE_SEARCH_LIST_SUCCESS,
  GET_AREA_FEE_SEARCH_LIST_ERROR
)<AreaFeeSearchListSendData, AreaFeeSearchList[], AxiosError>();
