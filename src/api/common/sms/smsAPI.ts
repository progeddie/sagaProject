import client from '../../client';
import { msgRiderSendData, insertMsgSendData } from '../../interface/common/sms/sms';

export const sendRiderSms = async (sendDatas: msgRiderSendData) => {
  const response = await client.post('/Message/SetMsgRiderSend', sendDatas);
  return response.data;
};

export const insertMessage = async (sendDatas: insertMsgSendData) => {
  const response = await client.post('/Message/SetMsgList', sendDatas);
  return response.data;
};
