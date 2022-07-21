import { ActionType } from 'typesafe-actions';
import * as actions from './actions';
import { AsyncState } from '../../lib/reducerUtils';
import {
  searchShopLocList,
  shopItemList,
  setShopAddrResult,
} from '../../api/interface/shopLocation/shopLocation';

export type searchShopLocAction = ActionType<typeof actions>;

export type searchShopLocListState = {
  searchShopLocList: AsyncState<searchShopLocList[], Error>;
};

export type getShopItemAction = ActionType<typeof actions>;

export type getShopItemListState = {
  shopItemList: AsyncState<shopItemList[], Error>;
};

export type setShopAddrAction = ActionType<typeof actions>;

export type setShopAddrState = {
  result: AsyncState<setShopAddrResult, Error>;
};
