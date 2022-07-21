import client from '../../client';
import {
  gunguListSendData,
  dongListSendData,
  riListSendData,
  nameShopListSendData,
  nameShopList,
  daumAddrSendData,
} from '../../interface/common/area/area';

export const getSidoList = async () => {
  const response = await client.post('/Area/GetSiDoSearchDawl', '');
  return response.data;
};

export const getGunguList = async (sendDatas: gunguListSendData) => {
  const response = await client.post('/Area/GetGunGuSearch', sendDatas);
  return response.data;
};

export const getDongList = async (sendDatas: dongListSendData) => {
  const response = await client.post('/Area/GetDongSearchDawul', sendDatas);
  return response.data;
};

export const getRiList = async (sendDatas: riListSendData) => {
  const response = await client.post('/Area/GetRiSearchDawul', sendDatas);
  return response.data;
};

export const getNameShopList = async (sendDatas: nameShopListSendData) => {
  const response = await client.post('/Area/GetNameSearchDawul', sendDatas);
  // console.log(response);
  return response.data;
};

export const getDaumAddr = async (sendDatas: daumAddrSendData) => {
  const response = await client.post('/System/GetDaumAddrDiv  ', sendDatas);
  console.log(response);
  return response.data;
};
