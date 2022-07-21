import { createReducer } from 'typesafe-actions';
import {
  CommonAction,
  SidoListState,
  GunguListState,
  DongListState,
  RiListState,
  NameShopListState,
  GetDaumAddrState,
  RiderSmsState,
  InsertMsgState,
} from './types';
import {
  getSidoListAsync,
  getGunguListAsync,
  getDongListAsync,
  getRiListAsync,
  getNameShopListAsync,
  getDaumAddrAsync,
  sendRiderSmsAsync,
  insertMsgAsync,
} from './actions';
import { asyncState, createAsyncReducer, transformToArray } from '../../lib/reducerUtils';

const sidoInitialState: SidoListState = {
  sidoList: asyncState.initial(),
};

export const sidoList = createReducer<SidoListState, CommonAction>(sidoInitialState).handleAction(
  transformToArray(getSidoListAsync),
  createAsyncReducer(getSidoListAsync, 'sidoList')
);

const gunguInitialState: GunguListState = {
  gunguList: asyncState.initial(),
};

export const gunguList = createReducer<GunguListState, CommonAction>(
  gunguInitialState
).handleAction(
  transformToArray(getGunguListAsync),
  createAsyncReducer(getGunguListAsync, 'gunguList')
);

const dongInitialState: DongListState = {
  dongList: asyncState.initial(),
};

export const dongList = createReducer<DongListState, CommonAction>(dongInitialState).handleAction(
  transformToArray(getDongListAsync),
  createAsyncReducer(getDongListAsync, 'dongList')
);

const riInitialState: RiListState = {
  riList: asyncState.initial(),
};

export const riList = createReducer<RiListState, CommonAction>(riInitialState).handleAction(
  transformToArray(getRiListAsync),
  createAsyncReducer(getRiListAsync, 'riList')
);

const initialStateN: NameShopListState = {
  nameShopList: asyncState.initial(),
};

export const cNameShopList = createReducer<NameShopListState, CommonAction>(
  initialStateN
).handleAction(
  transformToArray(getNameShopListAsync),
  createAsyncReducer(getNameShopListAsync, 'nameShopList')
);

const getDaumAddrState: GetDaumAddrState = {
  result: asyncState.initial(),
};

export const getDaumAddr = createReducer<GetDaumAddrState, CommonAction>(
  getDaumAddrState
).handleAction(transformToArray(getDaumAddrAsync), createAsyncReducer(getDaumAddrAsync, 'result'));

const riderSmsState: RiderSmsState = {
  result: asyncState.initial(),
};

export const sendRiderSms = createReducer<RiderSmsState, CommonAction>(riderSmsState).handleAction(
  transformToArray(sendRiderSmsAsync),
  createAsyncReducer(sendRiderSmsAsync, 'result')
);

const insertMsgState: InsertMsgState = {
  msgNo: asyncState.initial(),
};

export const insertMSG = createReducer<InsertMsgState, CommonAction>(insertMsgState).handleAction(
  transformToArray(insertMsgAsync),
  createAsyncReducer(insertMsgAsync, 'msgNo')
);
