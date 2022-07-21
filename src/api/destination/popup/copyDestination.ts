import client from '../../client';
import {
  CdestListSendData,
  copyDestListSendData,
} from '../../interface/destination/popup/copyDestination';

export const getCDestList = async (sendDatas: CdestListSendData) => {
  const response = await client.post('/CallCenter/GetCopyDestListList', sendDatas);
  return response.data;
};

export const copyDestList = async (sendDatas: copyDestListSendData) => {
  const response = await client.post('/CallCenter/SetCopyDestListMulti', sendDatas);
  console.log(response);
  return response.data;
};
