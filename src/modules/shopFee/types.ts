import { ActionType } from 'typesafe-actions';
import * as actions from './actions';
import { AsyncState } from '../../lib/reducerUtils';
import {
  getShopFeeList,
  saveShopAreaResult,
  setAreaAmtAddData,
  getCallCenterInfotData,
  getCopyShopInfoData,
  getAreaAmtListData,
  DeleteAreaFeeResult,
  getShopPayCheckResult,
  copyAreaAmtResult,
} from '../../api/interface/shopFee/shopFee';

export type ShopFeeAction = ActionType<typeof actions>;

export type getShopFeeListState = {
  getShopFeeList: AsyncState<getShopFeeList[], Error>;
};

export type saveShopFeeListState = {
  saveShopFeeArea: AsyncState<saveShopAreaResult, Error>;
};

export type setAreaAmtAddState = {
  setAreaAmt: AsyncState<setAreaAmtAddData, Error>;
};

export type getCallCenterInfoState = {
  callCeterInfo: AsyncState<getCallCenterInfotData[], Error>;
};

export type getCopyShopInfoState = {
  copyShopInfo: AsyncState<getCopyShopInfoData[], Error>;
};

export type getAreaAmtListState = {
  areaAmtList: AsyncState<getAreaAmtListData[], Error>;
};

export type DeleteAreaFeeState = {
  deleteAreaFee: AsyncState<DeleteAreaFeeResult, Error>;
};

export type getShopPayCheckState = {
  shopPayCheck: AsyncState<getShopPayCheckResult, Error>;
};

export type copyAreaAmtState = {
  copyAreaAmt: AsyncState<copyAreaAmtResult, Error>;
};
