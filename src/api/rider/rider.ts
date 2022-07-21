import client from '../client';
import {
  riderListSendData,
  riderList,
  shopListSendData,
  shopList,
  nameShopListSendData,
  nameShopList,
  riderDrivingListSendData,
  riderDrivingList,
} from '../interface/rider/rider';

export const getRiderList = async (sendDatas: riderListSendData) => {
  const response = await client.post('/RiderMonitor/GetMapRiderList', sendDatas);
  // console.log(response);
  return response.data;
};

export const getShopList = async (sendDatas: shopListSendData) => {
  const response = await client.post('/RiderMonitor/GetMapRiderList', sendDatas);
  // console.log(response);
  return response.data;
};

export const getNameShopList = async (sendDatas: nameShopListSendData) => {
  const response = await client.post('/Area/GetNameSearchDawul', sendDatas);
  console.log(response);
  return response.data;
};

export const getRiderDrivingList = async (sendDatas: riderDrivingListSendData) => {
  const response = await client.post('/Order/GetMapRiderOrderInfo', sendDatas);
  // console.log(response);
  return response.data.RiderQorderList;
};
