export interface CenterUserInfoResult {
  result: string;
}

// 배송가능구역(지원센터/회원사/지사명 검색조건)
export interface CenterUserInfoSendData {
  JobGbn: string;
  UserID: string;
  McodeString: string;
  CCCode: string;
  HelpCenter: string;
}

// 배송가능구역(구역 호출조건)
export interface AreaListSendData {
  JobGbn: string;
  CCCode: string;
  ShopCode: string;
  UseGbn: string;
  PayType: string;
}

// 배송가능구역(구역 검색조건)
export interface SearchAreaListSendData {
  SiDoCode: string;
  PlaceName: string;
}

// 배송가능구역 리스트 검색
export interface SearchAreaList {
  SEQNO: string;
  CCCODE: string;
  SHOP_CD: string;
  AREA_NAME: string;
  PAY_AMT: string;
  USE_YN: string;
  CENTER_LON: string;
  CENTER_LAT: string;
  PAY_TYPE: string;
}

// 지원센터
export interface HelperCompany {
  USER_NAME: string;
  UCODE: string;
  CCCODE: string;
  CCNAME: string;
  CLEVEL: string;
  HELP_CENTER: string;
  VAN_CODE: string;
  CODE_NM: string;
}

// 회원사
export interface MemberCompany {
  MCODE: string;
  MNAME: string;
}

// 지사명
export interface BranchCompany {
  CCCODE: string;
  CCNAME: string;
}

// 배송가능구역 리스트
export interface AreaList {
  SEQNO: string;
  CCCODE: string;
  SHOP_CD: string;
  AREA_NAME: string;
  PAY_AMT: string;
  USE_YN: string;
  CENTER_LON: string;
  CENTER_LAT: string;
  PAY_TYPE: string;
}

// 구역설정 입력 전송데이터
export interface AreaInsertSendData {
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
  ModPayType: string[] | null;
  Lon: number;
  Lat: number;
  ModName: string;
  DeleteMemo: string | null;
}

// 구역설정 입력 전송결과
export interface AreaInsertResult {
  Result: string;
}

// 구역설정 수정 전송데이터
export interface AreaUpdateSendData {
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
  ModPayType: string[] | null;
  Lon: number;
  Lat: number;
  ModName: string;
  DeleteMemo: string | null;
}

// 구역설정 삭제 전송데이터
export interface AreaDeleteSendData {
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
  ModPayType: string[] | null;
  Lon: number;
  Lat: number;
  ModName: string;
  DeleteMemo: string | null;
}

// 구역설정 사용여부 전송데이터
export interface AreaUseSendData {
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
  ModPayType: string[] | null;
  Lon: number;
  Lat: number;
  ModName: string;
  DeleteMemo: string | null;
}

// 구역설정 수정 전송결과
export interface AreaUpdateResult {
  Result: string;
}

// 구역설정 삭제 전송결과
export interface AreaDeleteResult {
  Result: string;
}

// 구역설정 삭제 전송결과
export interface AreaUseResult {
  Result: string;
}
