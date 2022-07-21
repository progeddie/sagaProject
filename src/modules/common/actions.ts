import { createAsyncAction } from 'typesafe-actions';
import { AxiosError } from 'axios';
import {
  ISidoInfo,
  IGunguInfo,
  gunguListSendData,
  IDongInfo,
  dongListSendData,
  IRiInfo,
  riListSendData,
  nameShopListSendData,
  nameShopList,
  daumAddrSendData,
  commonStringResult,
} from '../../api/interface/common/area/area';

import {
  msgRiderSendData,
  msgRiderSendResult,
  insertMsgSendData,
  insertMsgResult,
} from '../../api/interface/common/sms/sms';

export const GET_SIDO_LIST = 'common/GET_SIDO_LIST';
export const GET_SIDO_LIST_SUCCESS = 'common/GET_SIDO_LIST_SUCCESS';
export const GET_SIDO_LIST_ERROR = 'common/GET_SIDO_LIST_ERROR';

export const getSidoListAsync = createAsyncAction(
  GET_SIDO_LIST,
  GET_SIDO_LIST_SUCCESS,
  GET_SIDO_LIST_ERROR
)<string, ISidoInfo[], AxiosError>();

export const GET_GUNGU_LIST = 'common/GET_GUNGU_LIST';
export const GET_GUNGU_LIST_SUCCESS = 'common/GET_GUNGU_LIST_SUCCESS';
export const GET_GUNGU_LIST_ERROR = 'common/GET_GUNGU_LIST_ERROR';

export const getGunguListAsync = createAsyncAction(
  GET_GUNGU_LIST,
  GET_GUNGU_LIST_SUCCESS,
  GET_GUNGU_LIST_ERROR
)<gunguListSendData, IGunguInfo[], AxiosError>();

export const GET_DONG_LIST = 'common/GET_DONG_LIST';
export const GET_DONG_LIST_SUCCESS = 'common/GET_DONG_LIST_SUCCESS';
export const GET_DONG_LIST_ERROR = 'common/GET_DONG_LIST_ERROR';

export const getDongListAsync = createAsyncAction(
  GET_DONG_LIST,
  GET_DONG_LIST_SUCCESS,
  GET_DONG_LIST_ERROR
)<dongListSendData, IDongInfo[], AxiosError>();

export const GET_RI_LIST = 'common/GET_RI_LIST';
export const GET_RI_LIST_SUCCESS = 'common/GET_RI_LIST_SUCCESS';
export const GET_RI_LIST_ERROR = 'common/GET_RI_LIST_ERROR';

export const getRiListAsync = createAsyncAction(
  GET_RI_LIST,
  GET_RI_LIST_SUCCESS,
  GET_RI_LIST_ERROR
)<riListSendData, IRiInfo[], AxiosError>();

export const GET_NAMESHOP_LIST = 'rider/GET_NAMESHOP_LIST';
export const GET_NAMESHOP_LIST_SUCCESS = 'rider/GET_NAMESHOP_LIST_SUCCESS';
export const GET_NAMESHOP_LIST_ERROR = 'rider/GET_NAMESHOP_LIST_ERROR';

export const getNameShopListAsync = createAsyncAction(
  GET_NAMESHOP_LIST,
  GET_NAMESHOP_LIST_SUCCESS,
  GET_NAMESHOP_LIST_ERROR
)<nameShopListSendData, nameShopList[], AxiosError>();

export const GET_DAUM_ADDR = 'destination/GET_DAUM_ADDR';
export const GET_DAUM_ADDR_SUCCESS = 'destination/GET_DAUM_ADDR_SUCCESS';
export const GET_DAUM_ADDR_ERROR = 'destination/GET_DAUM_ADDR_ERROR';

export const getDaumAddrAsync = createAsyncAction(
  GET_DAUM_ADDR,
  GET_DAUM_ADDR_SUCCESS,
  GET_DAUM_ADDR_ERROR
)<daumAddrSendData, commonStringResult, AxiosError>();

export const SEND_RIDER_SMS = 'common/SEND_RIDER_SMS';
export const SEND_RIDER_SMS_SUCCESS = 'common/SEND_RIDER_SMS_SUCCESS';
export const SEND_RIDER_SMS_ERROR = 'common/SEND_RIDER_SMS_ERROR';

export const sendRiderSmsAsync = createAsyncAction(
  SEND_RIDER_SMS,
  SEND_RIDER_SMS_SUCCESS,
  SEND_RIDER_SMS_ERROR
)<msgRiderSendData, msgRiderSendResult, AxiosError>();

export const INSERT_MSG = 'common/INSERT_MSG';
export const INSERT_MSG_SUCCESS = 'common/INSERT_MSG_SUCCESS';
export const INSERT_MSG_ERROR = 'common/INSERT_MSG_ERROR';

export const insertMsgAsync = createAsyncAction(INSERT_MSG, INSERT_MSG_SUCCESS, INSERT_MSG_ERROR)<
  insertMsgSendData,
  insertMsgResult,
  AxiosError
>();
