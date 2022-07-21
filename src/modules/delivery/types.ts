import { ActionType } from 'typesafe-actions';
import * as actions from './actions';
import { AsyncState } from '../../lib/reducerUtils';
import {
  CenterUserInfoResult,
  CenterUserInfoSendData,
  AreaListSendData,
  AreaInsertSendData,
  SearchAreaListSendData,
  AreaList,
  SearchAreaList,
  HelperCompany,
  MemberCompany,
  BranchCompany,
  AreaInsertResult,
  AreaUpdateResult,
  AreaDeleteResult,
  AreaUseResult,
} from '../../api/interface/delivery/delivery';

export type CenterUserAction = ActionType<typeof actions>;

export type HelperCompanyListState = {
  helperCompanyList: AsyncState<HelperCompany[], Error>;
};

export type MemberCompanyListState = {
  memberCompanyList: AsyncState<MemberCompany[], Error>;
};

export type BranchCompanyListState = {
  branchCompanyList: AsyncState<BranchCompany[], Error>;
};

export type AreaListState = {
  areaList: AsyncState<AreaList[], Error>;
};

export type SearchAreaListState = {
  searchAreaList: AsyncState<SearchAreaList[], Error>;
};

export type InsertAreaState = {
  result: AsyncState<AreaInsertResult, Error>;
};

export type UpdateAreaState = {
  result: AsyncState<AreaUpdateResult, Error>;
};

export type DeleteAreaState = {
  result: AsyncState<AreaDeleteResult, Error>;
};

export type UseAreaState = {
  result: AsyncState<AreaUseResult, Error>;
};
