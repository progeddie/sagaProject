import { createAsyncAction } from 'typesafe-actions';
import { AxiosError } from 'axios';
import {
  CenterUserInfoResult,
  CenterUserInfoSendData,
  AreaListSendData,
  AreaInsertSendData,
  AreaUpdateSendData,
  AreaDeleteSendData,
  AreaUseSendData,
  AreaList,
  SearchAreaList,
  HelperCompany,
  MemberCompany,
  BranchCompany,
  AreaInsertResult,
  AreaUpdateResult,
  AreaDeleteResult,
  AreaUseResult,
  SearchAreaListSendData,
} from '../../api/interface/delivery/delivery';

export const GET_HELPERC_LIST = 'delivery/GET_HELPERC_LIST';
export const GET_HELPERC_LIST_SUCCESS = 'delivery/GET_HELPERC_LIST_SUCCESS';
export const GET_HELPERC_LIST_ERROR = 'delivery/GET_HELPERC_LIST_ERROR';

export const getHelperCompanyListAsync = createAsyncAction(
  GET_HELPERC_LIST,
  GET_HELPERC_LIST_SUCCESS,
  GET_HELPERC_LIST_ERROR
)<CenterUserInfoSendData, HelperCompany[], AxiosError>();

export const GET_MEMBERC_LIST = 'delivery/GET_MEMBERC_LIST';
export const GET_MEMBERC_LIST_SUCCESS = 'delivery/GET_MEMBERC_LIST_SUCCESS';
export const GET_MEMBERC_LIST_ERROR = 'delivery/GET_MEMBERC_LIST_ERROR';

export const getMemberCompanyListAsync = createAsyncAction(
  GET_MEMBERC_LIST,
  GET_MEMBERC_LIST_SUCCESS,
  GET_MEMBERC_LIST_ERROR
)<CenterUserInfoSendData, MemberCompany[], AxiosError>();

export const GET_BRANCHC_LIST = 'delivery/GET_BRANCHC_LIST';
export const GET_BRANCHC_LIST_SUCCESS = 'delivery/GET_BRANCHC_LIST_SUCCESS';
export const GET_BRANCHC_LIST_ERROR = 'delivery/GET_BRANCHC_LIST_ERROR';

export const getBranchCompanyListAsync = createAsyncAction(
  GET_BRANCHC_LIST,
  GET_BRANCHC_LIST_SUCCESS,
  GET_BRANCHC_LIST_ERROR
)<CenterUserInfoSendData, BranchCompany[], AxiosError>();

export const GET_AREA_LIST = 'delivery/GET_AREA_LIST';
export const GET_AREA_LIST_SUCCESS = 'delivery/GET_AREA_LIST_SUCCESS';
export const GET_AREA_LIST_ERROR = 'delivery/GET_AREA_LIST_ERROR';

export const getAreaListAsync = createAsyncAction(
  GET_AREA_LIST,
  GET_AREA_LIST_SUCCESS,
  GET_AREA_LIST_ERROR
)<AreaListSendData, AreaList[], AxiosError>();

export const GET_SEARCH_AREA_LIST = 'delivery/GET_SEARCH_AREA_LIST';
export const GET_SEARCH_AREA_LIST_SUCCESS = 'delivery/GET_SEARCH_AREA_LIST_SUCCESS';
export const GET_SEARCH_AREA_LIST_ERROR = 'delivery/GET_SEARCH_AREA_LIST_ERROR';

export const getSearchAreaListAsync = createAsyncAction(
  GET_SEARCH_AREA_LIST,
  GET_SEARCH_AREA_LIST_SUCCESS,
  GET_SEARCH_AREA_LIST_ERROR
)<SearchAreaListSendData, SearchAreaList[], AxiosError>();

export const GET_UNABLE_AREA_LIST = 'delivery/GET_UNABLE_AREA_LIST';
export const GET_UNABLE_AREA_LIST_SUCCESS = 'delivery/GET_UNABLE_AREA_LIST_SUCCESS';
export const GET_UNABLE_AREA_LIST_ERROR = 'delivery/GET_UNABLE_AREA_LIST_ERROR';

export const getUnableAreaListAsync = createAsyncAction(
  GET_UNABLE_AREA_LIST,
  GET_SEARCH_AREA_LIST_SUCCESS,
  GET_SEARCH_AREA_LIST_ERROR
)<SearchAreaListSendData, SearchAreaList[], AxiosError>();

export const INSERT_AREA = 'delivery/INSERT_AREA';
export const INSERT_AREA_SUCCESS = 'delivery/INSERT_AREA_SUCCESS';
export const INSERT_AREA_ERROR = 'delivery/INSERT_AREA_ERROR';

export const insertAreaAsync = createAsyncAction(
  INSERT_AREA,
  INSERT_AREA_SUCCESS,
  INSERT_AREA_ERROR
)<AreaInsertSendData, AreaInsertResult, AxiosError>();

export const UPDATE_AREA = 'delivery/UPDATE_AREA';
export const UPDATE_AREA_SUCCESS = 'delivery/UPDATE_AREA_SUCCESS';
export const UPDATE_AREA_ERROR = 'delivery/UPDATE_AREA_ERROR';

export const updateAreaAsync = createAsyncAction(
  UPDATE_AREA,
  UPDATE_AREA_SUCCESS,
  UPDATE_AREA_ERROR
)<AreaUpdateSendData, AreaUpdateResult, AxiosError>();

export const DELETE_AREA = 'delivery/DELETE_AREA';
export const DELETE_AREA_SUCCESS = 'delivery/DELETE_AREA_SUCCESS';
export const DELETE_AREA_ERROR = 'delivery/DELETE_AREA_ERROR';

export const deleteAreaAsync = createAsyncAction(
  DELETE_AREA,
  DELETE_AREA_SUCCESS,
  DELETE_AREA_ERROR
)<AreaDeleteSendData, AreaDeleteResult, AxiosError>();

export const USE_AREA = 'delivery/USE_AREA';
export const USE_AREA_SUCCESS = 'delivery/USE_AREA_SUCCESS';
export const USE_AREA_ERROR = 'delivery/USE_AREA_ERROR';

export const useAreaAsync = createAsyncAction(USE_AREA, USE_AREA_SUCCESS, USE_AREA_ERROR)<
  AreaUseSendData,
  AreaUseResult,
  AxiosError
>();
