import client from '../client';
import {
  searchShopLocSendData,
  shopItemSendData,
  searchShopLocList,
  shopItemList,
  searchShopLocResult,
  setShopAddrSendData,
  setShopAddrResult,
} from '../interface/shopLocation/shopLocation';

export const getsearchShopLocList = async (sendDatas: searchShopLocSendData) => {
  const response = await client.post('/Shop/GetShopLocation', sendDatas);
  return response.data;
};

export const getShopItemList = async (sendDatas: shopItemSendData) => {
  const response = await client.post('/Shop/GetShopInfoItem', sendDatas);
  return response.data;
};

export const setShopAddr = async (sendDatas: setShopAddrSendData) => {
  const response = await client.post('/Shop/SetShopAddr', sendDatas);
  console.log(response);
  return response.data;
};
// export const getDestList = async (sendDatas: destListSendData) => {
//   const response = await client.post('/System/GetDestList', sendDatas);
//   return response.data;
// };
