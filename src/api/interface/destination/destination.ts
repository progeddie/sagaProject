export interface IDestinationResult {
  result: string;
}

// 목적지 리스트 조회 조건
export interface destListSendData {
  JobGbn: string;
  CCCode: string;
  DestType: string;
  DestName: string;
}

export interface insertDestListSendData {
  JobGbn: string;
  CCCode: string;
  DestType: string;
  DestName: string;
  Seq: number | undefined;
  Seqs: number | null;
  Lon: number;
  Lat: number;
  SiDo: string;
  GunGu: string;
  Dong: string;
  GRS80Lon: number;
  GRS80Lat: number;
  JibunAddr: string | null;
  RoadAddr: string | null;
  Ucode: number;
  UserName: string;
}

export interface IDestInfo {
  NO: number;
  SEQNO: number;
  CCCODE: string;
  DEST_NAME: string;
  SIDO_NAME: string;
  SIDO_CODE: string;
  GUNGU_NAME: string;
  GUNGU_CODE: string;
  DONG_NAME: string;
  DONG_CODE: string;
  LON: number;
  LAT: number;
  DEST_TYPE: string;
  TELNO: string;
}

// 삭제 대상 목적지 시퀀스 리스트
export interface deleteDestListSendData {
  Seqs: string[];
}
