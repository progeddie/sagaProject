import { createAsyncAction } from 'typesafe-actions';
import { AxiosError } from 'axios';
import {
  getShopFeeListSendData,
  getShopFeeList,
  saveShopAreaData,
  saveShopAreaResult,
  setAreaAmtAddData,
  setAreaAmtAddResult,
  getCallCenterInfotData,
  getCallCenterInfoResult,
  getCopyShopInfoData,
  getCopyShopInfoResult,
  getAreaAmtListData,
  getAreaAmtListResult,
  DeleteAreaFeeSendData,
  DeleteAreaFeeResult,
  getShopPayCheckSendData,
  getShopPayCheckResult,
  copyAreaAmtSendData,
  copyAreaAmtResult,
} from '../../api/interface/shopFee/shopFee';

export const SHOP_FEE_LIST = 'shopFee/SHOP_FEE_LIST';
export const SHOP_FEE_LIST_SUCCESS = 'shopFee/SHOP_FEE_LIST_SUCCESS';
export const SHOP_FEE_LIST_ERROR = 'shopFee/SHOP_FEE_LIST_ERROR';

export const getShopFeeListAsync = createAsyncAction(
  SHOP_FEE_LIST,
  SHOP_FEE_LIST_SUCCESS,
  SHOP_FEE_LIST_ERROR
)<getShopFeeListSendData, getShopFeeList, AxiosError>();

export const SAVE_SHOP_AREA = 'shopFee/SAVE_SHOP_AREA';
export const SAVE_SHOP_AREA_SUCCESS = 'shopFee/SAVE_SHOP_AREA_SUCCESS';
export const SAVE_SHOP_AREA_ERROR = 'shopFee/SAVE_SHOP_AREA_ERROR';

export const saveShopFeeAreaAsync = createAsyncAction(
  SAVE_SHOP_AREA,
  SAVE_SHOP_AREA_SUCCESS,
  SAVE_SHOP_AREA_ERROR
)<saveShopAreaData, saveShopAreaResult, AxiosError>();

export const SET_AREA_AMT_ADD = 'shopFee/SET_AREA_AMT_ADD';
export const SET_AREA_AMT_ADD_SUCCESS = 'shopFee/SET_AREA_AMT_ADD_SUCCESS';
export const SET_AREA_AMT_ADD_ERROR = 'shopFee/SET_AREA_AMT_ADD_ERROR';

export const setAreaAmtAddAsync = createAsyncAction(
  SET_AREA_AMT_ADD,
  SET_AREA_AMT_ADD_SUCCESS,
  SET_AREA_AMT_ADD_ERROR
)<setAreaAmtAddData, setAreaAmtAddResult, AxiosError>();

export const GET_CALL_CENTER_INFO = 'shopFee/GET_CALL_CENTER_INFO';
export const GET_CALL_CENTER_INFO_SUCCESS = 'shopFee/GET_CALL_CENTER_INFO_SUCCESS';
export const GET_CALL_CENTER_INFO_ERROR = 'shop/GET_CALL_CENTER_INFO_ERROR';

export const getCallCenterInfoAsync = createAsyncAction(
  GET_CALL_CENTER_INFO,
  GET_CALL_CENTER_INFO_SUCCESS,
  GET_CALL_CENTER_INFO_ERROR
)<getCallCenterInfotData, getCallCenterInfoResult, AxiosError>();

export const GET_COPY_SHOP_INFO = 'shopFee/GET_COPY_SHOP_INFO';
export const GET_COPY_SHOP_INFO_SUCCESS = 'shopFee/GET_COPY_SHOP_INFO_SUCCESS';
export const GET_COPY_SHOP_INFO_ERROR = 'shop/GET_COPY_SHOP_INFO_ERROR';

export const getCopyShopInfoAsync = createAsyncAction(
  GET_COPY_SHOP_INFO,
  GET_COPY_SHOP_INFO_SUCCESS,
  GET_COPY_SHOP_INFO_ERROR
)<getCopyShopInfoData, getCopyShopInfoResult, AxiosError>();

export const GET_AREA_AMT_LIST = 'shopFee/GET_AREA_AMT_LIST';
export const GET_AREA_AMT_LIST_SUCCESS = 'shopFee/GET_AREA_AMT_LIST_SUCCESS';
export const GET_AREA_AMT_LIST_ERROR = 'shop/GET_AREA_AMT_LIST_ERROR';

export const getAreaAmtListAsync = createAsyncAction(
  GET_AREA_AMT_LIST,
  GET_AREA_AMT_LIST_SUCCESS,
  GET_AREA_AMT_LIST_ERROR
)<getAreaAmtListData, getAreaAmtListResult, AxiosError>();

export const DELETE_AREA_FEE = 'shop/DELETE_AREA_FEE';
export const DELETE_AREA_FEE_SUCCESS = 'shop/DELETE_AREA_FEE_SUCCESS';
export const DELETE_AREA_FEE_ERROR = 'shop/DELETE_AREA_FEE_ERROR';

export const deleteAreaFeeAsync = createAsyncAction(
  DELETE_AREA_FEE,
  DELETE_AREA_FEE_SUCCESS,
  DELETE_AREA_FEE_ERROR
)<DeleteAreaFeeSendData, DeleteAreaFeeResult[], AxiosError>();

export const GET_SHOP_PAY_CHECK = 'shopFee/GET_SHOP_PAY_CHECK';
export const GET_SHOP_PAY_CHECK_SUCCESS = 'shopFee/GET_SHOP_PAY_CHECK_SUCCESS';
export const GET_SHOP_PAY_CHECK_ERROR = 'shop/GET_SHOP_PAY_CHECK_ERROR';

export const getShopPayCheckAsync = createAsyncAction(
  GET_SHOP_PAY_CHECK,
  GET_SHOP_PAY_CHECK_SUCCESS,
  GET_SHOP_PAY_CHECK_ERROR
)<getShopPayCheckSendData, getShopPayCheckResult, AxiosError>();

export const COPY_AREA_AMT = 'shop/COPY_AREA_AMT';
export const COPY_AREA_AMT_SUCCESS = 'shop/COPY_AREA_AMT_SUCCESS';
export const COPY_AREA_AMT_ERROR = 'shop/COPY_AREA_AMT_ERROR';

export const copyAreaAmtAsync = createAsyncAction(
  COPY_AREA_AMT,
  COPY_AREA_AMT_SUCCESS,
  COPY_AREA_AMT_ERROR
)<copyAreaAmtSendData, copyAreaAmtResult[], AxiosError>();
