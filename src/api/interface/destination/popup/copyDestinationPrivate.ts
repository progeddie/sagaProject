// 복사할 목적지 리스트 조회 조건
export interface DestPrivateSendData {
  JobGbn: string;
  CCCode: string;
  DestType: string;
  DestName: string;
}

// 복사할 지점 리스트 조회 조건
export interface PointPrivateSendData {
  JobGbn: string;
  CCCode: string;
  Mcode: number;
  CCName: string;
}

// 복사할 목적지 리스트 조회 결과
export interface DestPrivateResult {
  check: string;
  No: string;
  IDX: string;
  DEST_NAME: string;
  DONG_NAME: string;
  SEQNO: string;
}

// 복사할 지점 리스트 조회 결과
export interface PointPrivateResult {
  check: string;
  CCCODE: string;
  CCNAME: string;
  OWNER: string;
  TELNO: string;
}

// 복사하기 위한 조건
export interface copyPrivateSendData {
  JobGbn: string;
  CCCode: string;
  CCCodes: string[];
  Seqnos: string[];
  Mcode: number;
  ModUCode: number;
  ModName: string;
}

// 복사 결과
export interface copyPrivateResult {
  result: string;
}
