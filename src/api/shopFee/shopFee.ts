import { AxiosResponse } from 'axios';
import client from '../client';

import {
  getCopyShopInfoData,
  getShopFeeListSendData,
  saveShopAreaData,
  setAreaAmtAddData,
  getCallCenterInfotData,
  DeleteAreaFeeSendData,
  getAreaAmtListData,
  getShopPayCheckSendData,
  copyAreaAmtSendData,
} from '../interface/shopFee/shopFee';

// 가맹점 리스트
export const getShopFeeList = async (sendDatas: getShopFeeListSendData) => {
  const response = await client.post('/CallCenter/GetAreaAmtList2', sendDatas);
  return response.data;
};

// 사용/ 미사용
export const setAreaAmtAdd = async (sendDatas: setAreaAmtAddData) => {
  const response = await client.post('/CallCenter/SetAreaAmtAdd2', sendDatas);
  return response.data;
};

// 구역설정
export const saveShopFeeArea = async (sendDatas: saveShopAreaData) => {
  const response = await client.post('/CallCenter/SetAreaAmtAdd2', sendDatas);
  return response.data;
};

// 가맹점 선택팝업 리스트
export const getCallCenterInfo = async (sendDatas: getCallCenterInfotData) => {
  const response = await client.post('/CallCenter/GetCallCenterInfoList', sendDatas);
  return response.data;
};

// 가맹점 구역요금복사 좌측리스트
export const getCopyShopInfo = async (sendDatas: getCopyShopInfoData) => {
  const response = await client.post('/Shop/GetCopyShopInfoList', sendDatas);
  return response.data;
};

// 구역요금 리스트
export const getAreaAmtList = async (sendDatas: getAreaAmtListData) => {
  const response = await client.post('/Shop/GetAreaAmtList', sendDatas);
  // console.log(response);
  return response.data;
};

// 구역요금 삭제
export const deleteAreaFee = async (sendDatas: DeleteAreaFeeSendData) => {
  const response = await client.post('/CallCenter/SetAreaAmtAdd', sendDatas);
  // console.log(response);
  return response.data;
};

// 구역요금 복사(시작)
let responsePayCheck: any[] = [];

export const resetResponsePayCheck = () => {
  responsePayCheck = [];
};

export const getResponsePayCheck = () => {
  return responsePayCheck;
};

export const setResponsePayCheck = (param: any) => {
  console.log('???=', param);
  responsePayCheck.push(param);
};

export const getShopPayCheck = async (sendDatas: getShopPayCheckSendData) => {
  const DestName: string = sendDatas.DestName;
  const Seq: number = sendDatas.Seq;
  const CCCode: string = sendDatas.CCCode;
  const ShopCode: string = sendDatas.ShopCode;
  const response = await client.post('/Shop/GetShopPayCheckCount', sendDatas);
  response.data = `${response.data}|${DestName}|${Seq}|${CCCode}|${ShopCode}`;
  console.log(response.data);
  setResponsePayCheck(response.data);
  return response.data;
};

// 구역요금 복사(시작)
let responseAreaAmt: any[] = [];

export const resetResponseAreaAmt = () => {
  responseAreaAmt = [];
};

export const getResponseAreaAmt = () => {
  return responseAreaAmt;
};

export const setResponseAreaAmt = (param: any) => {
  console.log(param);
  responseAreaAmt.push(param);
};

export const copyAreaAmtExec = (CCCODE: string, selShop: string) => {
  const copyAreaAmtSend: copyAreaAmtSendData = {
    JobGbn: 'I',
    CCCode: CCCODE,
    ShopCode: selShop,
    ModName: '',
    Seq: 0,
    DeleteMemo: '',
  };

  const resArr: string[] = getResponsePayCheck();

  // 중복체크
  let i = 0;
  resArr.forEach((val: any, key: any) => {
    let Arrtemp: string[] = [];
    Arrtemp = val.split('|');
    if (Number(Arrtemp[0]) === 0) {
      // console.log(Arrtemp[2], Arrtemp[3], Arrtemp[4]);
      copyAreaAmtSend.JobGbn = 'I';
      copyAreaAmtSend.Seq = Number(Arrtemp[2]);
      copyAreaAmtSend.CCCode = Arrtemp[3];
      copyAreaAmtSend.ShopCode = Arrtemp[4];
      copyAreaAmtSend.ModName = '김한욱';
      copyAreaAmtSend.DeleteMemo = '구역요금복사입력';
      // console.log(copyAreaAmtSend);
      copyAreaAmt(copyAreaAmtSend);
      i++;
    }
  });
  console.log(i);
  console.log(getResponsePayCheck().length);
  return i;
};

export const copyAreaAmt = async (sendDatas: copyAreaAmtSendData) => {
  // console.log(sendDatas);
  const response = await client.post('/Shop/SetAreaAmt', sendDatas);
  // console.log(response);
  setResponseAreaAmt(response.data);
  return response.data;
};
// 구역요금 복사(끝)
