// 시도 리스트
export interface ISidoInfo {
  B_LARGE: number;
  LON: number;
  LAT: number;
  B_CODE: string;
}

// 군구 리스트
export interface gunguListSendData {
  SiDo: string;
}

export interface IGunguInfo {
  B_MIDDLE: number;
  LON: number;
  LAT: number;
  B_MIDDLE_ORIGIN: string;
  B_CODE: string;
}

// 동 리스트
export interface dongListSendData {
  SiDo: string;
  GunGu: string;
}

export interface IDongInfo {
  B_SMALL: number;
  LON: number;
  LAT: number;
}

// 리 리스트
export interface riListSendData {
  SiDo: string;
  GunGu: string;
  Dong: string;
}

export interface IRiInfo {
  B_DETAIL: string;
  B_CODE: string;
  LON: number;
  LAT: number;
}

// 가맹점 명칭검색 리스트 조건
export interface nameShopListSendData {
  JobGbn: string | null;
  SiDoCode: string | null;
  PlaceName: string | null;
}

// 가명점 명칭검색 리스트
export interface nameShopList {
  STATUS2: string | null;
  DELAY_TIME: number;
  REMAIN_TIME: number;
  ALLOC_TIME: number;
  START_DONG: string | null;
  START_ADDR: string | null;
  DEST_ADDR: string | null;
  DEST_ADDR2: string | null;
}

export interface daumAddrSendData {
  JobGbn: string;
  Addr: string;
}

export interface daumAddrResult {
  SIDO: string;
  GUNGU: string;
  DONG: string;
  JIBUN: string;
  DETAIL_ADDR: string;
  DEPTH: number;
}

export interface commonStringResult {
  result: string;
}
