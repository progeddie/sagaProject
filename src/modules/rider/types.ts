import { ActionType } from 'typesafe-actions';
import * as actions from './actions';
import { AsyncState } from '../../lib/reducerUtils';
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

export type CenterUserAction = ActionType<typeof actions>;

export type RiderListState = {
  riderList: AsyncState<riderList[], Error>;
};

export type ShopListState = {
  shopList: AsyncState<shopList[], Error>;
};

export type NameShopListState = {
  nameShopList: AsyncState<nameShopList[], Error>;
};

export type RiderDrivingListState = {
  riderDrivingList: AsyncState<riderDrivingList[], Error>;
};
