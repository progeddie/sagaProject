// 라이더 리스트 조회 조건
export interface riderListSendData {
  RiderCode: number;
  RiderID: string | null;
  RiderName: string | null;
  JobGbn: string | null;
  Mcode: number;
  UserCCCode: string | null;
  CCCode: string | null;
  CCCodeList: string | null;
  OrderDate: string | null;
  RiderType: string | null;
  PickUpType: string | null;
  ShareGbn: string | null;
  time: number;
}

// 라이더 리스트
export interface riderList {
  CHK: string | null;
  RIDER_CODE: string | null;
  RIDER_ID: string | null;
  RIDER_NAME: string | null;
  SIDO_NAME: string | null;
  GUNGU_NAME: string | null;
  DONG_NAME: string | null;
  DONGCODE: string | null;
  LON: string | null;
  LAT: string | null;
  RIDER_TYPE: string | null;
  CNT: string | null;
  GUNGU_CODE: string | null;
  RIDER_STATE: string | null;
  STATE: string | null;
  SHARE_GBN: string | null;
  ORDER_LONLAT: string | null;
}

// 라이더 리스트 샵 조회 조건
export interface shopListSendData {
  RiderCode: number;
  RiderID: string | null;
  RiderName: string | null;
  JobGbn: string | null;
  Mcode: number;
  UserCCCode: string | null;
  CCCode: string | null;
  CCCodeList: string | null;
  OrderDate: string | null;
  RiderType: string | null;
  PickUpType: string | null;
  ShareGbn: string | null;
  time: number;
}

// 라이더 리스트 샵
export interface shopList {
  SHOP_CD: string | null;
  SHOP_NAME: string | null;
  SIDO_NAME: string | null;
  GUNGU_NAME: string | null;
  DONG_NAME: string | null;
  ADDR2: string | null;
  LON: number;
  LAT: number;
  CNT: number;
}

// 가맹점 명칭검색 리스트 조건
export interface nameShopListSendData {
  JobGbn: string | null;
  CCCode: string | null;
  SiDo: string | null;
  GunGu: string | null;
  Dong: string | null;
  Ri: string | null;
  JiBun: string | null;
  SiDoCode: string | null;
  GunGuCode: string | null;
  PlaceName: string | null;
  Ma: string | null;
  Sb: string | null;
  B_CODE: string | null;
  B_LARGE: string | null;
  B_MIDDLE: string | null;
  B_SMALL: string | null;
  B_DETAIL: string | null;
  B_MIDDLE_ORIGIN: string | null;
  LON: number;
  LAT: number;
  LON_WGS84: number;
  LAT_WGS84: number;
  LON_GRS80: number;
  LAT_GRS80: number;
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

// 기사운행 내역 리스트 조건
export interface riderDrivingListSendData {
  JobGbn: string | null;
  Mcode: number;
  CCCode: string | null;
  OrderDate: string | null;
  RiderCode: number;
  RiderID: string | null;
}

// 기사운행 내역 리스트
export interface riderDrivingList {
  IDX: string | null;
  POI_NAME: string | null;
  ADDR: string | null;
  LON: number;
  LAT: number;
}
