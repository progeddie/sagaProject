import { ActionType } from 'typesafe-actions';
import * as actions from './actions';
import { AsyncState } from '../../lib/reducerUtils';
import {
  ShopListSendData,
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

export type ShopAction = ActionType<typeof actions>;

export type ShopListState = {
  shopList: AsyncState<ShopList[], Error>;
};

export type CopyShopListState = {
  copyShopList: AsyncState<CopyShopList[], Error>;
};

export type CallCenterListState = {
  callcenterList: AsyncState<CallCenterList[], Error>;
};

export type AreaFeeListState = {
  areaFeeList: AsyncState<AreaFeeList[], Error>;
};

export type AreaFeeSearchListState = {
  areaFeeSearchList: AsyncState<AreaFeeSearchList[], Error>;
};

export type AreaFeeB2BListState = {
  areaFeeB2BList: AsyncState<AreaFeeB2BList[], Error>;
};
