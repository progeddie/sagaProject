import { createAsyncAction } from 'typesafe-actions';
import { AxiosError } from 'axios';
import {
  riderListSendData,
  riderList,
  shopListSendData,
  shopList,
  nameShopListSendData,
  nameShopList,
  riderDrivingListSendData,
  riderDrivingList,
} from '../../api/interface/rider/rider';

export const GET_RIDER_LIST = 'rider/GET_RIDER_LIST';
export const GET_RIDER_LIST_SUCCESS = 'rider/GET_RIDER_LIST_SUCCESS';
export const GET_RIDER_LIST_ERROR = 'rider/GET_RIDER_LIST_ERROR';

export const getRiderListAsync = createAsyncAction(
  GET_RIDER_LIST,
  GET_RIDER_LIST_SUCCESS,
  GET_RIDER_LIST_ERROR
)<riderListSendData, riderList[], AxiosError>();

export const GET_SHOP_LIST = 'rider/GET_SHOP_LIST';
export const GET_SHOP_LIST_SUCCESS = 'rider/GET_SHOP_LIST_SUCCESS';
export const GET_SHOP_LIST_ERROR = 'rider/GET_SHOP_LIST_ERROR';

export const getShopListAsync = createAsyncAction(
  GET_SHOP_LIST,
  GET_SHOP_LIST_SUCCESS,
  GET_SHOP_LIST_ERROR
)<shopListSendData, shopList[], AxiosError>();

export const GET_NAMESHOP_LIST = 'rider/GET_NAMESHOP_LIST';
export const GET_NAMESHOP_LIST_SUCCESS = 'rider/GET_NAMESHOP_LIST_SUCCESS';
export const GET_NAMESHOP_LIST_ERROR = 'rider/GET_NAMESHOP_LIST_ERROR';

export const getNameShopListAsync = createAsyncAction(
  GET_NAMESHOP_LIST,
  GET_NAMESHOP_LIST_SUCCESS,
  GET_NAMESHOP_LIST_ERROR
)<nameShopListSendData, nameShopList[], AxiosError>();

export const GET_RIDER_DRIVING_LIST = 'rider/GET_RIDER_DRIVING_LIST';
export const GET_RIDER_DRIVING_LIST_SUCCESS = 'rider/GET_RIDER_DRIVING_LIST_SUCCESS';
export const GET_RIDER_DRIVING_LIST_ERROR = 'rider/GET_RIDER_DRIVING_LIST_ERROR';

export const getRiderDrivingListAsync = createAsyncAction(
  GET_RIDER_DRIVING_LIST,
  GET_RIDER_DRIVING_LIST_SUCCESS,
  GET_RIDER_DRIVING_LIST_ERROR
)<riderDrivingListSendData, riderDrivingList[], AxiosError>();
