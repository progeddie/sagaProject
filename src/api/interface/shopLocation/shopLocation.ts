// 가맹점 조회 결과
export interface searchShopLocResult {
  result: string;
}

// 가맹점 조회 조건
export interface searchShopLocSendData {
  JobGbn: string;
  CCCode: string;
  ShopName: string;
  Mcode: number;
  UseGbn: string;
  ItemCD: string;
  SalesName: string;
  GpsGbn: string;
}

// 가맹점 조회 리스트
export interface searchShopLocList {
  CCCODE: string;
  CCNAME: string;
  MCODE: number;
  CLEVEL: string;
  DDD: string;
  SHOP_CD: string;
  SHOP_NAME: string;
  MAIN_ITEM: string;
  USE_GBN: string;
  TELNO: string;
  REG_NO: string;
  ADDR1: string;
  ADDR2: string;
  OWNER: string;
  SORT_SEQ: string;
  OPEN_DT: string;
  CLOSE_DT: string;
  MEMO: string;
  REMAIN_MINUS_YN: string;
  REMAIN_AMT: string;
  PC_YN: string;
  CARD_USE_YN: string;
  SHOP_TYPE: string;
  USER_NAME: string;
  LON: number;
  LAT: number;
  SIDO_NAME: string;
  GUNGU_NAME: string;
  DONG_NAME: string;
  LOC: string;
}

// 업종 조회조건
export interface shopItemSendData {
  JobGbn: string;
}

// 업종리스트
export interface shopItemList {
  ITEM_CD: string;
  ITEM_NAME: string;
  SORT_SEQ: string;
}

export interface setShopAddrSendData {
  JobGbn: string;
  CCCode: string;
  ShopCode: string;
  Mcode: number;
  Lon: number;
  Lat: number;
  SiDo: string;
  GunGu: string;
  Dong: string;
  ModUCode: number;
  ModName: string;
}

export interface setShopAddrResult {
  result: string;
}
