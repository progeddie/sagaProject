import { ActionType } from 'typesafe-actions';
import * as actions from './actions';
import { AsyncState } from '../../lib/reducerUtils';
import { IDestinationResult, IDestInfo } from '../../api/interface/destination/destination';
import { searchDestPrivate } from './reducer';
import {
  CDestInfo,
  copyDestListResult,
} from '../../api/interface/destination/popup/copyDestination';
import {
  DestPrivateResult,
  PointPrivateResult,
  copyPrivateResult,
} from '../../api/interface/destination/popup/copyDestinationPrivate';

export type DestinationAction = ActionType<typeof actions>;

export type DestListState = {
  destList: AsyncState<IDestInfo[], Error>;
};

export type DeleteDestListState = {
  result: AsyncState<IDestinationResult, Error>;
};

export type CDestListState = {
  CdestList: AsyncState<CDestInfo[], Error>;
};

export type CopyDestListState = {
  copyDest: AsyncState<copyDestListResult, Error>;
};

export type DestPrivateState = {
  destPrivate: AsyncState<DestPrivateResult[], Error>;
};

export type PointPrivateState = {
  pointPrivate: AsyncState<PointPrivateResult[], Error>;
};

export type CopyPrivateState = {
  copyPrivate: AsyncState<copyPrivateResult, Error>;
};

export type InsertDestListState = {
  result: AsyncState<IDestinationResult, Error>;
};
