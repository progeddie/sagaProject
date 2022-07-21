import client from '../client';
import {
  CenterUserInfoResult,
  CenterUserInfoSendData,
  AreaInsertSendData,
  AreaUpdateSendData,
  AreaDeleteSendData,
  AreaUseSendData,
  AreaListSendData,
  HelperCompany,
  MemberCompany,
  BranchCompany,
  SearchAreaListSendData,
} from '../interface/delivery/delivery';

export const getHelperCompanyList = async (sendDatas: CenterUserInfoSendData) => {
  const response = await client.post('/User/GetCenterUserInfo', sendDatas);
  // console.log(response);
  return response.data;
};

export const getMemberCompanyList = async (sendDatas: CenterUserInfoSendData) => {
  const response = await client.post('/User/GetCenterUserInfo', sendDatas);
  // console.log(response);
  return response.data;
};

export const getBranchCompanyList = async (sendDatas: CenterUserInfoSendData) => {
  const response = await client.post('/User/GetCenterUserInfo', sendDatas);
  // console.log(response);
  return response.data;
};

export const getAreaList = async (sendDatas: AreaListSendData) => {
  const response = await client.post('/CallCenter/GetAreaAmtList2', sendDatas);
  // console.log(response);
  return response.data;
};

export const getSearchAreaList = async (sendDatas: SearchAreaListSendData) => {
  const response = await client.post('/Area/GetNameSearchDawul', sendDatas);
  console.log(response);
  return response.data;
};

export const insertArea = async (sendDatas: AreaInsertSendData) => {
  const response = await client.post('/CallCenter/SetAreaAmtAdd2', sendDatas);
  return response.data;
};

export const updateArea = async (sendDatas: AreaUpdateSendData) => {
  const response = await client.post('/CallCenter/SetAreaAmtAdd2', sendDatas);
  // console.log(response);
  return response.data;
};

export const deleteArea = async (sendDatas: AreaDeleteSendData) => {
  const response = await client.post('/CallCenter/SetAreaAmtAdd', sendDatas);
  console.log(response);
  return response.data;
};

export const useArea = async (sendDatas: AreaUseSendData) => {
  const response = await client.post('/CallCenter/SetAreaAmtAdd', sendDatas);
  console.log(response);
  return response.data;
};
