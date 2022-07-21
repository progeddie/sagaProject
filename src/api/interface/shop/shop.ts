// 가맹점 리스트 전송데이터
export interface ShopListSendData {
  CCCode: string;
}

// 카피용 가맹점 리스트 전송데이터
export interface CopyShopListSendData {
  JobGbn: string;
  CCCode: string;
  ShopCode: string;
  ShopName: string;
  OrgCCCode: string;
}

// 구역요금 B2B확인용 전송데이터
export interface AreaFeeB2BListSendData {
  CCCode: string;
  ShopCode: string;
}

// 구역요금 리스트 전송데이터
export interface AreaFeeListSendData {
  JobGbn: string;
  CCCode: string;
  ShopCode: string;
  UseGbn: string;
  PayType: string;
}

// 콜센터호출 전송데이터
export interface CallCenterListSendData {
  JobGbn: string;
  CCCode: string;
  Mcode: string;
}

// 구역요금 검색 리스트 전송데이터
export interface AreaFeeSearchListSendData {
  SiDoCode: string;
  PlaceName: string;
}

// 가맹점 리스트
export interface ShopList {
  SHOP_CD: string;
  CCCODE: string;
  MCODE: string;
  SHOP_NAME: string;
  ORI_SHOP_NAME: string;
}

// 카피용가맹점 리스트
export interface CopyShopList {
  CHK: string;
  CCCODE: string;
  SHOP_CD: string;
  SHOP_NAME: string;
  TELNO: string;
  OWNER: string;
  ADDR1: string;
}

// 가맹점 리스트
export interface CallCenterList {
  CCCODE: string;
  CCNAME: string;
  CLEVEL: string;
}

// 구역요금 B2B 리스트
export interface AreaFeeB2BList {
  SHOP_NAME: string;
  BASIC_AMT: string;
  SIDO_NAME: string;
  GUNGU_NAME: string;
  DONG_NAME: string;
  API_COM_CODE1: string;
  API_COM_GBN1: string;
}

// 구역요금 리스트
export interface AreaFeeList {
  SHOP_NAME: string;
  BASIC_AMT: string;
  SIDO_NAME: string;
  GUNGU_NAME: string;
  DONG_NAME: string;
}

// 구역요금 검색 리스트
export interface AreaFeeSearchList {
  SHOP_NAME: string;
  BASIC_AMT: string;
  SIDO_NAME: string;
  GUNGU_NAME: string;
  DONG_NAME: string;
}
