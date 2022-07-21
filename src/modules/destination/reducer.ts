import { createReducer } from 'typesafe-actions';
import {
  DestListState,
  DestinationAction,
  DeleteDestListState,
  CDestListState,
  CopyDestListState,
  DestPrivateState,
  PointPrivateState,
  CopyPrivateState,
  InsertDestListState,
} from './types';
import {
  getDestListAsync,
  deleteDestListAsync,
  getCDestListAsync,
  copyDestListAsync,
  getDestPrivateAsync,
  getPointPrivateAsync,
  copyPrivateDataAsync,
  insertDestListAsync,
} from './actions';
import { asyncState, createAsyncReducer, transformToArray } from '../../lib/reducerUtils';

const initialState: DestListState = {
  destList: asyncState.initial(),
};

export const destList = createReducer<DestListState, DestinationAction>(initialState).handleAction(
  transformToArray(getDestListAsync),
  createAsyncReducer(getDestListAsync, 'destList')
);

const deleteDestInitialState: DeleteDestListState = {
  result: asyncState.initial(),
};

export const deleteDestList = createReducer<DeleteDestListState, DestinationAction>(
  deleteDestInitialState
).handleAction(
  transformToArray(deleteDestListAsync),
  createAsyncReducer(deleteDestListAsync, 'result')
);

const cinitialState: CDestListState = {
  CdestList: asyncState.initial(),
};

export const CdestList = createReducer<CDestListState, DestinationAction>(
  cinitialState
).handleAction(
  transformToArray(getCDestListAsync),
  createAsyncReducer(getCDestListAsync, 'CdestList')
);

const copyDestInitialState: CopyDestListState = {
  copyDest: asyncState.initial(),
};
export const copyDestList = createReducer<CopyDestListState, DestinationAction>(
  copyDestInitialState
).handleAction(
  transformToArray(copyDestListAsync),
  createAsyncReducer(copyDestListAsync, 'copyDest')
);

const destPrivateInitialState: DestPrivateState = {
  destPrivate: asyncState.initial(),
};
export const searchDestPrivate = createReducer<DestPrivateState, DestinationAction>(
  destPrivateInitialState
).handleAction(
  transformToArray(getDestPrivateAsync),
  createAsyncReducer(getDestPrivateAsync, 'destPrivate')
);

const pointPrivateInitialState: PointPrivateState = {
  pointPrivate: asyncState.initial(),
};
export const searchPointPrivate = createReducer<PointPrivateState, DestinationAction>(
  pointPrivateInitialState
).handleAction(
  transformToArray(getPointPrivateAsync),
  createAsyncReducer(getPointPrivateAsync, 'pointPrivate')
);

const copyPrivateInitialState: CopyPrivateState = {
  copyPrivate: asyncState.initial(),
};
export const copyDataPrivate = createReducer<CopyPrivateState, DestinationAction>(
  copyPrivateInitialState
).handleAction(
  transformToArray(copyPrivateDataAsync),
  createAsyncReducer(copyPrivateDataAsync, 'copyPrivate')
);

const insertDestListState: InsertDestListState = {
  result: asyncState.initial(),
};
export const insertDestList = createReducer<InsertDestListState, DestinationAction>(
  insertDestListState
).handleAction(
  transformToArray(insertDestListAsync),
  createAsyncReducer(insertDestListAsync, 'result')
);
