import client from '../client';
import {
  destListSendData,
  deleteDestListSendData,
  insertDestListSendData,
} from '../interface/destination/destination';

export const getDestList = async (sendDatas: destListSendData) => {
  const response = await client.post('/System/GetDestList', sendDatas);
  console.log(response);
  return response.data;
};

export const deleteDestList = async (sendDatas: deleteDestListSendData) => {
  const response = await client.post('/System/DelDestListPrivate', sendDatas);
  console.log(response);
  return response.data;
};

export const insertDestList = async (sendDatas: insertDestListSendData) => {
  const response = await client.post('/System/SetDestList', sendDatas);
  console.log(response);
  return response.data;
};
