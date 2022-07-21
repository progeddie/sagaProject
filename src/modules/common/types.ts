import { ActionType } from 'typesafe-actions';
import * as actions from './actions';
import {
  ISidoInfo,
  IGunguInfo,
  IDongInfo,
  IRiInfo,
  nameShopListSendData,
  nameShopList,
  daumAddrResult,
} from '../../api/interface/common/area/area';

import {
  msgRiderSendData,
  msgRiderSendResult,
  insertMsgSendData,
  insertMsgResult,
} from '../../api/interface/common/sms/sms';

import { AsyncState } from '../../lib/reducerUtils';

export type CommonAction = ActionType<typeof actions>;

export type SidoListState = {
  sidoList: AsyncState<ISidoInfo[], Error>;
};

export type GunguListState = {
  gunguList: AsyncState<IGunguInfo[], Error>;
};

export type DongListState = {
  dongList: AsyncState<IDongInfo[], Error>;
};

export type RiListState = {
  riList: AsyncState<IRiInfo[], Error>;
};

export type NameShopListState = {
  nameShopList: AsyncState<nameShopList[], Error>;
};

export type GetDaumAddrState = {
  result: AsyncState<daumAddrResult[], Error>;
};

export type RiderSmsState = {
  result: AsyncState<msgRiderSendResult[], Error>;
};

export type InsertMsgState = {
  msgNo: AsyncState<insertMsgResult, Error>;
};
