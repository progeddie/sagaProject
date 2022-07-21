import { combineReducers } from 'redux';
// import { sampleSlice } from './reducers/r_distributionDelivery/r_distributionDelivery';

// 배송 가능/불가
import {
  helperCompanyList,
  memberCompanyList,
  branchCompanyList,
  areaList,
  searchAreaList,
  insertArea,
  updateArea,
  deleteArea,
  useArea,
  helperCompanyListSaga,
  memberCompanyListSaga,
  branchCompanyListSaga,
  insertAreaSaga,
  updateAreaSaga,
  deleteAreaSaga,
  UseAreaSaga,
  areaListSaga,
  searchAreaListSaga,
} from '../modules/delivery';

import {
  searchShopLocList,
  searchShopLocListSaga,
  getShopItemList,
  shopItemListSaga,
  shopAddrSaga,
  setShopAddr,
} from '../modules/shopLocation';

// 목적지 관리
import {
  destList,
  destListSaga,
  deleteDestList,
  deleteDestListSaga,
  insertDestList,
  insertDestListSaga,
  CdestList,
  CdestListSaga,
  copyDestList,
  copyDestListSaga,
  searchDestPrivate,
  destPrivateSaga,
  searchPointPrivate,
  pointPrivateSaga,
  copyDataPrivate,
  copyPrivateSaga,
} from '../modules/destination';

// 기사 관제
import {
  cRiderList,
  cShopList,
  cRiderDrivingList,
  cRiderListSaga,
  cShopListSaga,
  cRiderDrivingListSaga,
} from '../modules/rider';

// 지역 공통
import {
  sidoList,
  sidoListSaga,
  gunguList,
  gunguListSaga,
  dongList,
  dongListSaga,
  riList,
  riListSaga,
  cNameShopList,
  cNameShopListSaga,
  getDaumAddr,
  getDaumAddrSaga,
  sendRiderSms,
  sendRSmsSaga,
  insertMSG,
  insertMsgSaga,
} from '../modules/common';

// 가맹점 좌표
import {
  shopList,
  areaFeeList,
  areaFeeSearchList,
  areaFeeB2BList,
  shopListSaga,
  areaFeeB2BListSaga,
  areaFeeListSaga,
  areaFeeSearchListSaga,
} from '../modules/shop';

// 가맹점 구역 요금
import {
  getShopFeeList,
  saveShopFeeAreaList,
  setAreaAmtAdd,
  getCallCenterInfo,
  getCopyShopInfo,
  getAreaAmtList,
  searchShopFeeListSaga,
  saveShopFeeAreaSaga,
  setAreaAmtAddSaga,
  getCallCenterInfoSaga,
  getAreaAmtListSaga,
  getCopyShopInfoSaga,
  deleteAreaFee,
  deleteAreaFeeSaga,
  shopPayCheckSaga,
  cAreaAmtSaga,
  getShopPayCheckExec,
  copyAreaAmtExec,
} from '../modules/shopFee';

const rootReducer = combineReducers({
  // rider: sampleSlice.reducer,
  destList,
  deleteDestList,
  sidoList,
  gunguList,
  dongList,
  riList,
  helperCompanyList,
  memberCompanyList,
  branchCompanyList,
  areaList,
  searchAreaList,
  shopList,
  areaFeeList,
  areaFeeSearchList,
  areaFeeB2BList,
  deleteAreaFee,
  searchShopLocList,
  CdestList,
  copyDestList,
  searchDestPrivate,
  searchPointPrivate,
  copyDataPrivate,
  cRiderList,
  cShopList,
  cNameShopList,
  cRiderDrivingList,
  insertArea,
  updateArea,
  deleteArea,
  useArea,
  getShopFeeList,
  saveShopFeeAreaList,
  insertDestList,
  getDaumAddr,
  getShopItemList,
  setShopAddr,
  setAreaAmtAdd,
  getCallCenterInfo,
  getCopyShopInfo,
  getAreaAmtList,
  getShopPayCheckExec,
  copyAreaAmtExec,
  sendRiderSms,
  insertMSG,
});

export default rootReducer;
