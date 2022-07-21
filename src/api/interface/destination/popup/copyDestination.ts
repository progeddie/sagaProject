// 목적지를 복사할 지점 리스트 조회 조건
export interface CdestListSendData {
  JobGbn: string;
  CCCode: string;
  Mcode: number;
  CCName: string;
}

// 목적지를 복사할 지점 리스트 조회 결과
export interface CDestInfo {
  CHK: string;
  CCCODE: string;
  CCNAME: string;
  OWNER: string;
  TELNO: string;
}

// 목적지 복사하기 위한 조건
export interface copyDestListSendData {
  JobGbn: string;
  CCCode: string;
  CCCodes: Array<string>;
  Mcode: number;
  ModUCode: number;
  ModName: string;
}

// 목적지 복사하기 결과
export interface copyDestListResult {
  result: string;
}
