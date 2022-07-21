// 가맹점 구역요금 복사용 체크카운트 샌드
export interface getShopPayCheckSendData {
  JobGbn: string;
  CCCode: string;
  ShopCode: string;
  DestName: string;
  Seq: number;
}

export interface getShopPayCheckSendDataList {
  JobGbn: string;
  CCCode: string;
  ShopCode: string[];
  DestName: string[];
  Seq: number[];
}

// 가맹점 구역요금 복사용 체크카운트
export interface getShopPayCheckResult {
  result: string;
}

// 가맹점 구역요금 복사 샌드
export interface copyAreaAmtSendData {
  JobGbn: string;
  CCCode: string;
  ShopCode: string;
  ModName: string;
  Seq: number;
  DeleteMemo: string;
}

// 가맹점 구역요금 복사 결과
export interface copyAreaAmtResult {
  result: string;
}

// 가맹점 구역요금 조회 조건
export interface getShopFeeListSendData {
  JobGbn: string;
  CCCode: string;
  UseGbn: string;
  ShopCode: string;
  PayType: string;
}

// 가맹점 구역요금 조회 결과
export interface getShopFeeList {
  SEQ: number;
  SEQNO: number;
  CCCODE: string;
  SHOP_CD: string;
  AREA_NAME: string;
  PAY_AMT: number;
  USE_YN: string;
  ISRT_DATE: string;
  ISRT_NAME: string;
  MOD_DATE: string;
  MOD_NAME: string;
  CENTER_LON: string;
  CENTER_LAT: string;
  PAY_TYPE: string;
  LON: number;
  LAT: number;
  MAP_SEQ: number;
  ROWNO: string;
}

// 가맹점 구역요금 저장 샌드데이터
export interface saveShopAreaData {
  JobGbn: string;
  CCCode: string;
  ShopCode: string;
  AreaName: string;
  Seq: number;
  PayAMT: number;
  UseGbn: string;
  ModSeq: number[];
  ModAreaName: string[];
  ModPayAMT: number[];
  ModUseGbn: string[];
  CenterLon: string;
  CenterLat: string;
  InLon: number[];
  InLat: number[];
  PayType: string;
  ModPayType: string[];
  Lon: number;
  Lat: number;
  ModName: string;
  DeleteMemo: string;
}

export interface saveShopAreaResult {
  result: string;
}

// 가맹점 구역요금 사용 / 미사용 샌드 데이터
export interface setAreaAmtAddData {
  JobGbn: string;
  CCCode: string;
  ShopCode: string;
  AreaName: string;
  Seq: number;
  PayAMT: number;
  UseGbn: string;
  ModSeq: number[];
  ModAreaName: string[];
  ModPayAMT: number[];
  ModUseGbn: string[];
  CenterLon: string;
  CenterLat: string;
  InLon: number[];
  InLat: number[];
  PayType: string | null;
  ModPayType: string[];
  Lon: number;
  Lat: number;
  ModName: string;
  DeleteMemo: string;
}

export interface setAreaAmtAddResult {
  result: string;
}

// 가맹점 선택팝업 샌드데이터
export interface getCallCenterInfotData {
  JobGbn: string;
  CCCode: string;
  MCode: number;
}

// 가맹점 선택팝업 리스트
export interface getCallCenterInfoResult {
  CCCODE: string;
  CCNAME: string;
  CLEVEL: string;
}

// 가맹점 구역요금복사 팝업 가맹점리스트 샌드
export interface getCopyShopInfoData {
  JobGbn: string;
  CCCode: string;
  OrgCCCode: string;
  ShopCode: string;
  ShopName: string;
  Mcode: number;
  Distance: number;
  OriDistance: number;
  Seq: number;
  ModUCode: number;
}

// 가맹점 구역요금복사 팝업 가맹점리스트
export interface getCopyShopInfoResult {
  CHK: string;
  CCCODE: string;
  SHOP_CD: string;
  SHOP_NAME: string;
  TELNO: string;
  OWNER: string;
  API_COM_CODE1: string;
  API_COM_GBN1: string;
  ADDR1: string;
}

// 가맹점 구역요금복사 팝업 구역요금리스트 샌드
export interface getAreaAmtListData {
  JobGbn: string;
  CCCode: string;
  ShopCode: string;
  UseGbn: string;
}

// 가맹점 구역요금복사 팝업 구역요금리스트
export interface getAreaAmtListResult {
  SEQNO: number;
  CCCODE: string;
  SHOP_CD: string;
  AREA_NAME: string;
  PAY_AMT: number;
  USE_YN: string;
  ISRT_DATE: string;
  ISRT_NAME: string;
  MOD_DATE: string;
  MOD_NAME: string;
  CENTER_LON: string;
  CENTER_LAT: string;
  PAY_TYPE: string;
  LON: number;
  LAT: number;
}

// 구역요금 삭제리스트 전송데이터
export interface DeleteAreaFeeSendData {
  JobGbn: string;
  Seq: number;
  ModSeq: number[];
  CCCode: string;
  ShopCode: string;
  AreaName: string;
  PayAMT: number;
  UseGbn: string;
  ModAreaName: string[];
  ModPayAMT: number[];
  ModUseGbn: string[];
  CenterLon: string;
  CenterLat: string;
  InLon: number[];
  InLat: number[];
  Lon: number;
  Lat: number;
  PayType: string | null;
  ModPayType: string | null;
  ModName: string;
  DeleteMemo: string;
}

export interface DeleteAreaFeeResult {
  result: string;
}
