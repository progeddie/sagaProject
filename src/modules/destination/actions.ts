import { createAsyncAction } from 'typesafe-actions';
import { AxiosError } from 'axios';
import {
  IDestinationResult,
  IDestInfo,
  destListSendData,
  deleteDestListSendData,
  insertDestListSendData,
} from '../../api/interface/destination/destination';

import {
  CdestListSendData,
  CDestInfo,
  copyDestListSendData,
  copyDestListResult,
} from '../../api/interface/destination/popup/copyDestination';

import {
  DestPrivateSendData,
  PointPrivateSendData,
  DestPrivateResult,
  PointPrivateResult,
  copyPrivateSendData,
  copyPrivateResult,
} from '../../api/interface/destination/popup/copyDestinationPrivate';

export const GET_DEST_LIST = 'destination/GET_DEST_LIST';
export const GET_DEST_LIST_SUCCESS = 'destination/GET_DEST_LIST_SUCCESS';
export const GET_DEST_LIST_ERROR = 'destination/GET_DEST_LIST_ERROR';

export const getDestListAsync = createAsyncAction(
  GET_DEST_LIST,
  GET_DEST_LIST_SUCCESS,
  GET_DEST_LIST_ERROR
)<destListSendData, IDestInfo[], AxiosError>();

export const DELETE_DEST_LIST = 'destination/DELETE_DEST_LIST';
export const DELETE_DEST_LIST_SUCCESS = 'destination/DELETE_DEST_LIST_SUCCESS';
export const DELETE_DEST_LIST_ERROR = 'destination/DELETE_DEST_LIST_ERROR';

export const deleteDestListAsync = createAsyncAction(
  DELETE_DEST_LIST,
  DELETE_DEST_LIST_SUCCESS,
  DELETE_DEST_LIST_ERROR
)<deleteDestListSendData, IDestinationResult, AxiosError>();

export const GET_CDEST_LIST = 'destination/GET_CDEST_LIST';
export const GET_CDEST_LIST_SUCCESS = 'destination/GET_CDEST_LIST_SUCCESS';
export const GET_CDEST_LIST_ERROR = 'destination/GET_CDEST_LIST_ERROR';

export const getCDestListAsync = createAsyncAction(
  GET_CDEST_LIST,
  GET_CDEST_LIST_SUCCESS,
  GET_CDEST_LIST_ERROR
)<CdestListSendData, CDestInfo[], AxiosError>();

export const COPY_DEST_LIST = 'destination/COPY_DEST_LIST';
export const COPY_DEST_LIST_SUCCESS = 'destination/COPY_DEST_LIST_SUCCESS';
export const COPY_DEST_LIST_ERROR = 'destination/COPY_DEST_LIST_ERROR';

export const copyDestListAsync = createAsyncAction(
  COPY_DEST_LIST,
  COPY_DEST_LIST_SUCCESS,
  COPY_DEST_LIST_ERROR
)<copyDestListSendData, copyDestListResult, AxiosError>();

export const GET_DEST_PRIVATE = 'destination/GET_DEST_PRIVATE';
export const GET_DEST_PRIVATE_SUCCESS = 'destination/GET_DEST_PRIVATE_SUCCESS';
export const GET_DEST_PRIVATE_ERROR = 'destination/GET_DEST_PRIVATE_ERROR';

export const getDestPrivateAsync = createAsyncAction(
  GET_DEST_PRIVATE,
  GET_DEST_PRIVATE_SUCCESS,
  GET_DEST_PRIVATE_ERROR
)<DestPrivateSendData, DestPrivateResult[], AxiosError>();

export const GET_POINT_PRIVATE = 'destination/GET_POINT_PRIVATE';
export const GET_POINT_PRIVATE_SUCCESS = 'destination/GET_POINT_PRIVATE_SUCCESS';
export const GET_POINT_PRIVATE_ERROR = 'destination/GET_POINT_PRIVATE_ERROR';

export const getPointPrivateAsync = createAsyncAction(
  GET_POINT_PRIVATE,
  GET_POINT_PRIVATE_SUCCESS,
  GET_POINT_PRIVATE_ERROR
)<PointPrivateSendData, PointPrivateResult[], AxiosError>();

export const COPY_PRIVATE_DATA = 'destination/COPY_PRIVATE_DATA';
export const COPY_PRIVATE_DATA_SUCCESS = 'destination/COPY_PRIVATE_DATA_SUCCESS';
export const COPY_PRIVATE_DATA_ERROR = 'destination/COPY_PRIVATE_DATA_ERROR';

export const copyPrivateDataAsync = createAsyncAction(
  COPY_PRIVATE_DATA,
  COPY_PRIVATE_DATA_SUCCESS,
  COPY_PRIVATE_DATA_ERROR
)<copyPrivateSendData, copyPrivateResult, AxiosError>();

export const INSERT_DEST_LIST = 'destination/INSERT_DEST_LIST';
export const INSERT_DEST_LIST_SUCCESS = 'destination/INSERT_DEST_LIST_SUCCESS';
export const INSERT_DEST_LIST_ERROR = 'destination/INSERT_DEST_LIST_ERROR';

export const insertDestListAsync = createAsyncAction(
  INSERT_DEST_LIST,
  INSERT_DEST_LIST_SUCCESS,
  INSERT_DEST_LIST_ERROR
)<insertDestListSendData, IDestinationResult, AxiosError>();
