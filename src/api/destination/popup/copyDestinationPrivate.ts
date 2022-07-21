import client from '../../client';
import {
  DestPrivateSendData,
  PointPrivateSendData,
  copyPrivateSendData,
} from '../../interface/destination/popup/copyDestinationPrivate';

export const getDestPrivate = async (sendDatas: DestPrivateSendData) => {
  const response = await client.post('/System/GetDestList', sendDatas);
  return response.data;
};

export const getPointPrivate = async (sendDatas: PointPrivateSendData) => {
  const response = await client.post('/CallCenter/GetCopyDestListList', sendDatas);
  return response.data;
};

export const copyDataPrivate = async (sendDatas: copyPrivateSendData) => {
  const response = await client.post('/CallCenter/SetCopyDestListPrivate', sendDatas);
  return response.data;
};
