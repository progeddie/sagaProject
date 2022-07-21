import { createReducer } from 'typesafe-actions';
import {
  HelperCompanyListState,
  MemberCompanyListState,
  BranchCompanyListState,
  AreaListState,
  SearchAreaListState,
  InsertAreaState,
  UpdateAreaState,
  DeleteAreaState,
  UseAreaState,
  CenterUserAction,
} from './types';
import {
  getAreaListAsync,
  getSearchAreaListAsync,
  getHelperCompanyListAsync,
  getMemberCompanyListAsync,
  getBranchCompanyListAsync,
  insertAreaAsync,
  updateAreaAsync,
  deleteAreaAsync,
  useAreaAsync,
} from './actions';
import { asyncState, createAsyncReducer, transformToArray } from '../../lib/reducerUtils';

const initialStateH: HelperCompanyListState = {
  helperCompanyList: asyncState.initial(),
};

export const helperCompanyList = createReducer<HelperCompanyListState, CenterUserAction>(
  initialStateH
).handleAction(
  transformToArray(getHelperCompanyListAsync),
  createAsyncReducer(getHelperCompanyListAsync, 'helperCompanyList')
);

const initialStateM: MemberCompanyListState = {
  memberCompanyList: asyncState.initial(),
};

export const memberCompanyList = createReducer<MemberCompanyListState, CenterUserAction>(
  initialStateM
).handleAction(
  transformToArray(getMemberCompanyListAsync),
  createAsyncReducer(getMemberCompanyListAsync, 'memberCompanyList')
);

const initialStateB: BranchCompanyListState = {
  branchCompanyList: asyncState.initial(),
};

export const branchCompanyList = createReducer<BranchCompanyListState, CenterUserAction>(
  initialStateB
).handleAction(
  transformToArray(getBranchCompanyListAsync),
  createAsyncReducer(getBranchCompanyListAsync, 'branchCompanyList')
);

const initialStateA: AreaListState = {
  areaList: asyncState.initial(),
};

export const areaList = createReducer<AreaListState, CenterUserAction>(initialStateA).handleAction(
  transformToArray(getAreaListAsync),
  createAsyncReducer(getAreaListAsync, 'areaList')
);

const initialStateS: SearchAreaListState = {
  searchAreaList: asyncState.initial(),
};

export const searchAreaList = createReducer<SearchAreaListState, CenterUserAction>(
  initialStateS
).handleAction(
  transformToArray(getSearchAreaListAsync),
  createAsyncReducer(getSearchAreaListAsync, 'searchAreaList')
);

const insertAreaState: InsertAreaState = {
  result: asyncState.initial(),
};

export const insertArea = createReducer<InsertAreaState, CenterUserAction>(
  insertAreaState
).handleAction(transformToArray(insertAreaAsync), createAsyncReducer(insertAreaAsync, 'result'));

const updateAreaState: UpdateAreaState = {
  result: asyncState.initial(),
};

export const updateArea = createReducer<UpdateAreaState, CenterUserAction>(
  updateAreaState
).handleAction(transformToArray(updateAreaAsync), createAsyncReducer(updateAreaAsync, 'result'));

const deleteAreaState: DeleteAreaState = {
  result: asyncState.initial(),
};

export const deleteArea = createReducer<DeleteAreaState, CenterUserAction>(
  deleteAreaState
).handleAction(transformToArray(deleteAreaAsync), createAsyncReducer(deleteAreaAsync, 'result'));

const useAreaState: UseAreaState = {
  result: asyncState.initial(),
};

export const useArea = createReducer<UseAreaState, CenterUserAction>(useAreaState).handleAction(
  transformToArray(useAreaAsync),
  createAsyncReducer(useAreaAsync, 'result')
);
