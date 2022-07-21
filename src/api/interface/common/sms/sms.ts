export interface insertMsgSendData {
  JobGbn: string;
  CCCode: string;
  Date: string;
  Message: string;
  UCode: number;
  UserName: string;
}

export interface insertMsgResult {
  MessageNo: number;
}

export interface msgRiderSendData {
  JobGbn: string;
  CCCode: string;
  RiderCode: number[];
  Date: string;
  MessageNo: number;
}

export interface msgRiderSendResult {
  result: string;
}
