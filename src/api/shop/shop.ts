import client from '../client';
import {
  ShopListSendData,
  AreaFeeB2BListSendData,
  AreaFeeListSendData,
  AreaFeeSearchListSendData,
  CopyShopListSendData,
  CallCenterListSendData,
  ShopList,
  AreaFeeList,
  AreaFeeSearchList,
  CopyShopList,
  CallCenterList,
} from '../interface/shop/shop';

export const getShopList = async (sendDatas: ShopListSendData) => {
  const response = await client.post('/Shop/GetQorderShopList', sendDatas);
  // console.log(response);
  return response.data;
};

export const getCopyShopList = async (sendDatas: CopyShopListSendData) => {
  const response = await client.post('/Shop/GetCopyShopInfoList', sendDatas);
  // console.log(response);
  return response.data;
};

export const getCallCenterList = async (sendDatas: CallCenterListSendData) => {
  const response = await client.post('/CallCenter/GetCallCenterInfoList', sendDatas);
  // console.log(response);
  return response.data;
};

export const getAreaFeeB2BList = async (sendDatas: AreaFeeB2BListSendData) => {
  const response = await client.post('/CallCenter/GetB2bShopCode', sendDatas);
  console.log(response);
  return response.data;
};

export const getAreaFeeList = async (sendDatas: AreaFeeListSendData) => {
  const response = await client.post('/CallCenter/GetAreaAmtList2', sendDatas);
  console.log(response);
  return response.data;
};



export const getAreaFeeSearchList = async (sendDatas: AreaFeeSearchListSendData) => {
  const response = await client.post('/Area/GetNameSearchDawul', sendDatas);
  console.log(response);
  return response.data;
};
