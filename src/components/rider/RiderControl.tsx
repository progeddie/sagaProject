import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Split from 'react-split';

// Popup
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

// 컬러픽커
import { SketchPicker } from 'react-color';

import { confirmAlert } from 'react-confirm-alert';

// Ag-Grid
import { AgGridReact, AgGridColumn } from '@ag-grid-community/react';
import { AllModules, GridApi } from '@ag-grid-enterprise/all-modules';
import '@ag-grid-enterprise/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-enterprise/all-modules/dist/styles/ag-theme-alpine.css';

// Material
import Button from '@material-ui/core/Button';
import Search from '@material-ui/icons/Search';
import Home from '@material-ui/icons/Home';
import FormatColorFill from '@material-ui/icons/FormatColorFill';
import Mail from '@material-ui/icons/Mail';

/* 리액트 아이콘 */
import { RiEBike2Fill } from '@react-icons/all-files/ri/RiEBike2Fill';

// CSS
import '../../css/map/destmanager.css';
import '../../css/map/copypop.css';

// NaverMap
import { FormLabel } from '@material-ui/core';
import NaverMap from '../common/naver/RiderMng';
import TimerSet from './TimerSet';

// Alert
import Alert from '../common/Alert';

// Action
import {
  getRiderListAsync,
  getShopListAsync,
  getRiderDrivingListAsync,
} from '../../modules/rider/actions';

// API
import {
  riderListSendData,
  riderList,
  shopListSendData,
  shopList,
  riderDrivingListSendData,
  // riderDrivingList,
} from '../../api/interface/rider/rider';

// Common
import {
  getNameShopListAsync,
  sendRiderSmsAsync,
  insertMsgAsync,
} from '../../modules/common/actions';
import { nameShopListSendData } from '../../api/interface/common/area/area';
import { msgRiderSendData, insertMsgSendData } from '../../api/interface/common/sms/sms';
import { groupBy, byteCheck } from '../../util/common';
import { RootState } from '../../modules';

// import SidoSelect from '../common/area/SidoSelect';
// import GunGuSelect from '../common/area/GunGuSelect';
// import DongSelect from '../common/area/DongSelect';
// import RiSelector from '../common/area/RiSelector';
interface MatchParams {
  tests: string;
}

export interface urlParam {
  CCCode: string;
  RiderType: string;
  Mcode: number;
  PickUpType: string;
  ShareGbn: string;
  time: number;
  Date: string;
  UCode: number;
  UserName: string;
}

const RiderControl = (props: any) => {
  // 라인색상
  const { urlParams } = props;

  let jsonString: urlParam = {
    CCCode: '',
    RiderType: '',
    Mcode: 0,
    PickUpType: '',
    ShareGbn: '',
    time: 0,
    Date: '',
    UCode: 0,
    UserName: '',
  };

  try {
    jsonString = JSON.parse(decodeURI(atob(urlParams.commonParams)));
  } catch (e) {
    console.log(e);
  }

  const [stateC, setStateC] = useState({
    checkedA: false,
    checkedB: false,
  });

  // 경고창
  const [alertText, setAlertText] = useState('');
  const [alertType, setAlertType] = useState('');
  const [openA, setOpenA] = useState(false);
  const closeModalA = () => setOpenA(false);

  const colorRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  // // 리스트 4개 참조
  const rRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const sRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const dRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const nRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  // // 기사목록 텍스트 참조
  const rsRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const cntRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const shopCheckRef = useRef<string>('N');
  const smsRef = useRef() as React.MutableRefObject<HTMLTextAreaElement>;
  const riderNumRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const riderAllRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const riderDestRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const dongViewRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const nameRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const driveRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const selRef = useRef() as React.MutableRefObject<HTMLSelectElement>;
  const timerRef = useRef() as React.MutableRefObject<HTMLSelectElement>;
  const shareRef = useRef() as React.MutableRefObject<HTMLSelectElement>;
  const sido = useRef() as React.MutableRefObject<HTMLSelectElement>;
  const closeButtonRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  // 기사현황
  // const [rGData, setRGData] = useState<any[]>([]);
  const rGData = useRef<any[]>([]);
  // 기사목록
  const rData = useRef<any[]>([]);
  const sRiders = useRef<string[]>([]);

  const [shareGBN, setShareGBN] = useState('N');
  const [cTime, setCTime] = useState<number>(30);
  // 기사목록 (총37건) 구분
  const [cSel, setCSel] = useState('R');
  // 동단위 선택저장
  const [sDong, setSDong] = useState<string | null>('');
  // 명칭 검색 선택저장
  const [shopStr, setShopStr] = useState<string | null>('');
  // 가맹점 목록 선택저장
  const [shopListStr, setShopListStr] = useState<string | null>('');
  // 기사 선택저장
  const [sRider, setSRider] = useState<string | null>('');

  // 메시지 전송용 라이더코드
  const [riderCode, setRiderCode] = useState<number[]>([]);
  // 가맹점 노출 체크 여부
  // const [shopCk, setShopCk] = useState('off');
  // 라이더 클릭했을때는 깜박이기 때문에 클릭의 선택을 저장
  const [clickName, setClickName] = useState('');
  // 라이더 전체보기 체크
  const [riderAllCk, setRiderAllCk] = useState(true);
  // 목적지 보기 체크
  // const [riderDestCk, setRiderDestCk] = useState(false);
  const riderDestCk = useRef<boolean>(false);
  // 동단위 보기 체크
  const [dongViewCk, setDongViewCk] = useState(false);
  const [clickYN, setClickYN] = useState(false);

  // 가맹점 목록
  const [sData, setSData] = useState<any[]>([]);
  // 클릭한 좌표
  interface lonLatPoint {
    lon: number;
    lat: number;
  }
  const initLonLat: lonLatPoint = {
    lon: 0,
    lat: 0,
  };
  const [currentLonLat, setCurrentLonLat] = useState<lonLatPoint>(initLonLat);

  // 라인두께
  const [lineT, setLineT] = useState('1');
  // 라인색상
  const [backgroundC, setBackgroundC] = useState({
    displayColorPicker: false,
    hsl: { h: 249.99999999999994, s: 0.6187778227438285, l: 0.23820439999999998, a: 1 },
    color: {
      r: '241',
      g: '112',
      b: '19',
      a: '1',
    },
    hex: '#000',
  });

  const riderSendData: riderListSendData = {
    RiderCode: 0,
    RiderID: null,
    RiderName: null,
    // JobGbn: '3',
    JobGbn: '1',
    Mcode: jsonString.Mcode,
    UserCCCode: null,
    // CCCode: '558',
    CCCode: jsonString.CCCode,
    CCCodeList: null,
    OrderDate: null,
    RiderType: '%',
    PickUpType: jsonString.PickUpType,
    ShareGbn: '%',
    time: 30,
  };

  const shopSendData: shopListSendData = {
    RiderCode: 0,
    RiderID: null,
    RiderName: null,
    JobGbn: '9',
    Mcode: jsonString.Mcode,
    UserCCCode: null,
    CCCode: jsonString.CCCode,
    CCCodeList: null,
    OrderDate: null,
    RiderType: '%',
    PickUpType: jsonString.PickUpType,
    ShareGbn: '%',
    time: 30,
  };

  const msgSend: msgRiderSendData = {
    JobGbn: 'I',
    CCCode: jsonString.CCCode,
    RiderCode: [],
    Date: jsonString.Date,
    MessageNo: 0,
  };

  const insertMsgSend: insertMsgSendData = {
    JobGbn: '1',
    CCCode: jsonString.CCCode,
    Date: jsonString.Date,
    Message: '',
    UCode: jsonString.UCode,
    UserName: jsonString.UserName,
  };

  const riderDrivingSendData: riderDrivingListSendData = {
    JobGbn: '',
    Mcode: jsonString.Mcode,
    CCCode: jsonString.CCCode,
    OrderDate: '',
    RiderCode: 0,
    RiderID: '',
  };

  const nameShopSendData: nameShopListSendData = {
    JobGbn: '',
    SiDoCode: '',
    PlaceName: '',
  };

  const {
    loading: getShopLoading,
    data: shopData,
    error: shopError,
  } = useSelector((state: RootState) => state.cShopList.shopList);

  const {
    loading: inMsgLoading,
    data: inMsgData,
    error: inMsgError,
  } = useSelector((state: RootState) => state.insertMSG.msgNo);

  const {
    loading: sendSmsLoading,
    data: sendSmsData,
    error: sendSmsError,
  } = useSelector((state: RootState) => state.sendRiderSms.result);

  const {
    loading: getNameShopLoading,
    data: nameShopData,
    error: nameShopError,
  } = useSelector((state: RootState) => state.cNameShopList.nameShopList);

  const {
    loading: getRiderDrivingLoading,
    data: riderDrivingData,
    error: riderDrivingError,
  } = useSelector((state: RootState) => state.cRiderDrivingList.riderDrivingList);

  const {
    loading: getRiderLoading,
    data: riderData,
    error: riderError,
  } = useSelector((state: RootState) => state.cRiderList.riderList);

  const dispatch = useDispatch();

  // 라인색상 선택시
  const handleChangeComplete = (color: any) => {
    setClickName('handleChangeComplete');
    colorRef.current.style.backgroundColor = color.hex;
    setBackgroundC(color);
  };

  // 두께선택
  const selThickness = (event: any) => {
    setLineT(selRef.current.value);
  };

  // 명칭검색 리스트 선택
  const nameSearchSelShop = (params: any) => {
    setClickName('nameSelShop');
    setShopStr(params.data.POI_NAME);
    setCurrentLonLat({
      lon: params.data.LON,
      lat: params.data.LAT,
    });
  };

  // 가맹점 리스트 선택
  const selShopGrid = (params: any) => {
    setClickName('selShop');
    setShopStr(params.data.SHOP_NAME);
    setCurrentLonLat({
      lon: params.data.LON,
      lat: params.data.LAT,
    });
  };

  const searchRider = useCallback(() => {
    // 광클릭 방지 (클릭후 5초 지나야 클릭가능)
    if (clickYN === false && getRiderLoading === false) {
      setClickYN(true);
      searchRiderProcess();
    }
    setTimeout(() => {
      setClickYN(false);
    }, 5000);
  }, [dispatch, riderSendData, getRiderLoading, clickYN]);

  const searchRiderProcess = () => {
    riderSendData.time = Number(timerRef.current.value);
    riderSendData.ShareGbn = shareRef.current.value;
    dispatch(getRiderListAsync.request(riderSendData));
    if (shopCheckRef.current === 'Y') {
      shopSendData.time = Number(timerRef.current.value);
      shopSendData.ShareGbn = shareRef.current.value;
      dispatch(getShopListAsync.request(shopSendData));
    }
  };

  const [gridApi, setGridApi] = useState<GridApi>();

  const onGridReady = (params: any) => {
    setGridApi(params.api);
  };

  // 가맹점 지도 표시용 체크박스
  const shopView = (e: any) => {
    if (shopCheckRef.current === 'Y') {
      shopCheckRef.current = 'N';
    } else {
      shopCheckRef.current = 'Y';
    }
  };

  const sendSms = () => {
    if (gridApi !== undefined) {
      const selectItem = gridApi.getSelectedNodes();

      if (selectItem.length === 0) {
        setAlertText('선택된 라이더가 없습니다!');
        setOpenA((o) => !o);
        return;
      }

      if (smsRef.current.textLength === 0) {
        setAlertText('입력된 메시지가 없습니다!');
        setOpenA((o) => !o);
        return;
      }

      const byteLength: number = byteCheck(smsRef.current.value);

      if (byteLength > 1000) {
        setAlertText('1000 byte 까지만 등록가능합니다.');
        setOpenA((o) => !o);
        return;
      }

      const rcodes: number[] = [];
      let nameStr: string = '';
      selectItem.forEach((val: any, key: any) => {
        rcodes.push(Number(val.data.RIDER_CODE));
        if (key === 0) nameStr += val.data.RIDER_NAME;
        else nameStr += `\n${val.data.RIDER_NAME}`;
      });
      setRiderCode(rcodes);

      confirmAlert({
        title: '메시지 전송여부 확인',
        message: `총 ${selectItem.length}명\n--------------------------------\n${nameStr}\n--------------------------------\n기사에게 메시지를 전송하시겠습니까?`,
        buttons: [
          {
            label: 'YES',
            onClick: () => {
              insertMsgSend.Message = smsRef.current.value;
              dispatch(insertMsgAsync.request(insertMsgSend));
            },
          },
          {
            label: 'NO',
            onClick: () => {
              setAlertText('취소 되었습니다.');
              setOpenA((o: any) => !o);
            },
          },
        ],
      });
    }
  };

  // 기사 / 가맹점 선택 라디오
  const selType = (e: any) => {
    if (e.target.dataset.msg === 'R') {
      sRef.current.style.display = 'none';
      rRef.current.style.display = '';
      rsRef.current.innerHTML = '기사목록 (총';
      cntRef.current.innerHTML = rData.current.length.toString();
      setCSel('R');
    } else {
      sRef.current.style.display = '';
      rRef.current.style.display = 'none';
      rsRef.current.innerHTML = '가맹점목록 (총';
      cntRef.current.innerHTML = sData.length.toString();
      setCSel('S');
    }
  };

  // 동단위 보기 체크후 동선택
  const selDong = (params: any) => {
    if (dongViewRef.current.checked === true) {
      if (riderData && riderData.length > 0) {
        rData.current.length = 0;
        const result: any[] = riderData.filter((data) => data.DONG_NAME === params.data.DONG_NAME);

        // 기존체크 유지
        if (rData.current.length > 0) {
          rData.current = rData.current.splice(0, rData.current.length);
        }
        rData.current = [];
        result.forEach((val: any) => {
          let sameYn = 'N';
          sRiders.current.forEach((v: any) => {
            if (v === val.RIDER_CODE) sameYn = 'Y';
          });
          rData.current.push({
            CHK: val.CHK,
            CNT: val.CNT,
            DONGCODE: val.DONGCODE,
            DONG_NAME: val.DONG_NAME,
            GUNGU_CODE: val.GUNGU_CODE,
            GUNGU_NAME: val.GUNGU_NAME,
            LAT: val.LAT,
            LON: val.LON,
            ORDER_LONLAT: val.ORDER_LONLAT,
            RIDER_CODE: val.RIDER_CODE,
            RIDER_ID: val.RIDER_ID,
            RIDER_NAME: val.RIDER_NAME,
            RIDER_STATE: val.RIDER_STATE,
            RIDER_TYPE: val.RIDER_TYPE,
            SHARE_GBN: val.SHARE_GBN,
            SIDO_NAME: val.SIDO_NAME,
            STATE: val.STATE,
            CLICK: sameYn,
          });
        });

        if (rsRef.current.innerHTML === '기사목록 (총') {
          cntRef.current.innerHTML = result.length.toString();
        }
        setSDong(params.data.DONG_NAME);
      }
    }
    // 기사 운행팝업내역일때는 이동방지
    setClickName('selDong');
    setCurrentLonLat({
      lon: params.data.LON,
      lat: params.data.LAT,
    });
  };

  // 라이더 검색
  const selRider = (params: any) => {
    if (driveRef.current.checked === false) {
      setClickName('selRider');
      setSRider(params.data.RIDER_CODE);
      setCurrentLonLat({
        lon: params.data.LON,
        lat: params.data.LAT,
      });
    } else {
      riderDrivingSendData.RiderCode = params.data.RIDER_CODE;
      riderDrivingSendData.RiderID = params.data.RIDER_ID;
      dispatch(getRiderDrivingListAsync.request(riderDrivingSendData));
      nRef.current.style.display = 'block';
    }
  };

  const onSelectionChanged = () => {
    const selectItem = gridApi.getSelectedNodes();
    const srArr: any[] = [];
    selectItem.forEach((val: any, key: any) => {
      srArr.push(val.data.RIDER_CODE);
    });
    if (sRiders.current.length > 0) {
      sRiders.current.splice(0, sRiders.current.length);
    }
    sRiders.current = srArr;
    if (srArr.length > 0) {
      srArr.splice(0, srArr.length);
    }
  };

  // 명칭검색
  const nameSearch = () => {
    if (nameRef.current.value) {
      nameShopSendData.SiDoCode = sido.current.value;
      nameShopSendData.PlaceName = nameRef.current.value;
      dispatch(getNameShopListAsync.request(nameShopSendData));
      dRef.current.style.display = 'block';
      closeButtonRef.current.style.display = 'block';
    }
  };

  // 명칭검색 닫기버튼
  const closeNameSearch = (e: any) => {
    dRef.current.style.display = 'none';
    closeButtonRef.current.style.display = 'none';
  };

  // 운행목록 나오게 하는 체크
  const driveClick = (e: any) => {
    if (driveRef.current.checked === false) nRef.current.style.display = 'none';
  };

  // 시간 셀렉트
  const setTime = (e: any) => {
    const ctime: number = Number(timerRef.current.value);
    setCTime(ctime);
  };

  // 라이더 전체보기 체크
  const riderAllCheck = (e: any) => {
    setRiderAllCk(riderAllRef.current.checked);
  };

  // 목적지보기 체크
  const riderDestCheck = (e: any) => {
    if (riderDestCk.current === true) {
      riderDestCk.current = false;
    } else {
      riderDestCk.current = true;
    }
    searchRiderProcess();
  };

  // 동단위 보기 체크
  const dongViewCheck = (e: any) => {
    setDongViewCk(dongViewRef.current.checked);

    if (dongViewRef.current.checked === false && riderData && riderData.length > 0) {
      // 기존체크 유지
      if (rData.current.length > 0) {
        rData.current.splice(0, rData.current.length);
      }
      rData.current = [];
      riderData.forEach((val: any) => {
        let sameYn = 'N';
        sRiders.current.forEach((v: any) => {
          if (v === val.RIDER_CODE) sameYn = 'Y';
        });
        rData.current.push({
          CHK: val.CHK,
          CNT: val.CNT,
          DONGCODE: val.DONGCODE,
          DONG_NAME: val.DONG_NAME,
          GUNGU_CODE: val.GUNGU_CODE,
          GUNGU_NAME: val.GUNGU_NAME,
          LAT: val.LAT,
          LON: val.LON,
          ORDER_LONLAT: val.ORDER_LONLAT,
          RIDER_CODE: val.RIDER_CODE,
          RIDER_ID: val.RIDER_ID,
          RIDER_NAME: val.RIDER_NAME,
          RIDER_STATE: val.RIDER_STATE,
          RIDER_TYPE: val.RIDER_TYPE,
          SHARE_GBN: val.SHARE_GBN,
          SIDO_NAME: val.SIDO_NAME,
          STATE: val.STATE,
          CLICK: sameYn,
        });
      });

      if (rsRef.current.innerHTML === '기사목록 (총') {
        cntRef.current.innerHTML = riderData.length.toString();
      }
    }
    searchRiderProcess();
  };

  // 자사 / 공유 / 전체선택
  const selShare = (e: any) => {
    setShareGBN(shareRef.current.value);
  };

  // 기사 번호로 위치 검색
  const riderSearch = () => {
    if (riderData && riderData.length > 0) {
      setClickName('selDong');
      const result: any[] = riderData.filter((data) => data.RIDER_ID === riderNumRef.current.value);
      setCurrentLonLat({
        lon: result[0].LON,
        lat: result[0].LAT,
      });
      if (result.length > 0) {
        result.splice(0, result.length);
      }
    }
  };

  // 기사번호로 검색 input 리셋
  const numReset = () => {
    riderNumRef.current.value = '';
  };

  // 명칭 검색시 input 리셋
  const nameReset = () => {
    nameRef.current.value = '';
  };

  const enterInput = (e: any) => {
    if (e.keyCode === 13) {
      riderSearch();
    }
  };

  const nameEnterInput = (e: any) => {
    if (e.keyCode === 13) {
      nameSearch();
    }
  };

  // 마우스 클릭시 기사운행내역 팝업보기
  const statusCellRender = (params: any) => {
    let str: string = '';
    let color: string = '';

    if (params.data.STATUS === '40' && params.data.PICKUP_TIME !== '') {
      str = '픽업';
      color = '#9000ff';
    } else if (params.data.STATUS === '40') {
      str = '운행';
      color = '#84ff00';
    } else if (params.data.STATUS === '30') {
      str = '배차';
      color = '#ff00ff';
    } else {
      str = '완료';
      color = '#00ffff';
    }
    return `<div style="color:${color}">${str}</div>`;
  };

  const hashValueGetter = (params: any) => {
    return params.node.rowIndex + 1;
  };

  const riderCellRender = (params: any) => {
    if (params.data.CLICK === 'Y') {
      params.node.setSelected(true);
    }

    return `<div>${params.value}</div>`;
  };

  const dongCellRender = (params: any) => {
    if (params.data.DONG_NAME === params.data.SDONG) {
      params.node.setSelected(true);
    }

    return `<div>${params.value}</div>`;
  };

  useEffect(() => {
    searchRider();
  }, []);

  useEffect(() => {
    if (inMsgLoading === false && inMsgData) {
      msgSend.MessageNo = Number(inMsgData);
      msgSend.RiderCode = riderCode;
      dispatch(sendRiderSmsAsync.request(msgSend));
    }
  }, [inMsgLoading, inMsgData]);

  useEffect(() => {
    if (sendSmsLoading === false && sendSmsData) {
      const result: string = String(sendSmsData);
      const resultMessage: string[] = result.split(',');
      if (resultMessage.length > 1) {
        if (resultMessage[0] !== '00') {
          setAlertText('메시지 전송에 실패하였습니다. 관리자에 문의하세요!!!');
          return;
        }
        smsRef.current.value = '';
        gridApi.deselectAll();
        setAlertText('메시지를 전송하였습니다.');
        setOpenA((o: any) => !o);
      }
    }
  }, [sendSmsLoading, sendSmsData]);

  useEffect(() => {
    if (riderData != null) {
      // 그룹핑
      let riderDataGroup = groupBy(riderData, (d: any) => d.DONG_NAME);

      if (riderDataGroup && riderDataGroup.size > 0) {
        if (rGData.current.length > 0) {
          rGData.current.splice(0, rGData.current.length);
        }
        rGData.current = [];
        riderDataGroup.forEach((value: any, key: any, mapObject: any) => {
          rGData.current.push({
            DONG_NAME: key,
            CNT: value.length,
            LAT: value[0].LAT,
            LON: value[0].LON,
            SDONG: sDong,
          });
        });
        if (dongViewCk === true) {
          riderDataGroup.forEach((value: any, key: any, mapObject: any) => {
            if (key === sDong) {
              selDong({
                data: {
                  DONG_NAME: key,
                  CNT: value.length,
                  LAT: value[0].LAT,
                  LON: value[0].LON,
                  SDONG: sDong,
                },
              });
            }
          });
        }
        riderDataGroup = null;
      }

      if (dongViewCk === false) {
        if (riderData && riderData.length > 0) {
          // 기존체크 유지
          if (rData.current.length > 0) {
            rData.current.splice(0, rData.current.length);
          }
          rData.current = [];
          riderData.forEach((val: any) => {
            let sameYn = 'N';
            sRiders.current.forEach((v: any) => {
              if (v === val.RIDER_CODE) sameYn = 'Y';
            });
            rData.current.push({
              CHK: val.CHK,
              CNT: val.CNT,
              DONGCODE: val.DONGCODE,
              DONG_NAME: val.DONG_NAME,
              GUNGU_CODE: val.GUNGU_CODE,
              GUNGU_NAME: val.GUNGU_NAME,
              LAT: val.LAT,
              LON: val.LON,
              ORDER_LONLAT: val.ORDER_LONLAT,
              RIDER_CODE: val.RIDER_CODE,
              RIDER_ID: val.RIDER_ID,
              RIDER_NAME: val.RIDER_NAME,
              RIDER_STATE: val.RIDER_STATE,
              RIDER_TYPE: val.RIDER_TYPE,
              SHARE_GBN: val.SHARE_GBN,
              SIDO_NAME: val.SIDO_NAME,
              STATE: val.STATE,
              CLICK: sameYn,
            });
          });

          cntRef.current.innerHTML = rData.current.length.toString();
          if (cSel === 'R') cntRef.current.innerHTML = riderData.length.toString();
        }
      }
      if (rGData.current && rGData.current.length > 0) {
        if (sDong === '') {
          setSDong(rGData.current[0].DONG_NAME);
        }
      }
    }
  }, [riderData]);

  useEffect(() => {
    if (shopCheckRef.current === 'Y' && shopData && shopData.length > 0) {
      setSData(shopData);
      if (cSel === 'S') cntRef.current.innerHTML = shopData.length.toString();
    }
  }, [shopData]);

  return (
    <Split className="split" sizes={[17, 83]}>
      <Popup
        open={openA}
        closeOnDocumentClick={false}
        onClose={closeModalA}
        contentStyle={{ width: '1000px' }}
      >
        <div>
          <Alert closeModal={closeModalA} text={alertText} type={alertType} />
        </div>
      </Popup>
      <div className=" left_box flex_section_column">
        <div className="flex_section_row ">
          <div className="grayLabel mt05" style={{ width: '70px' }}>
            기사현황
          </div>
        </div>
        <div className="box_border">
          <div className="flex_section_row">
            <div className="blueLabel " style={{ width: '70px' }}>
              상태
            </div>
            <select className="ml05" style={{ width: '70px' }}>
              <option value="">전체</option>
            </select>
          </div>
          <div className="flex_section_row mt05">
            <div className="blueLabel" style={{ width: '70px' }}>
              시간
            </div>
            <select ref={timerRef} className="ml05" onChange={setTime} style={{ width: '70px' }}>
              <option value="0">0</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30" selected>
                30
              </option>
              <option value="40">40</option>
              <option value="50">50</option>
              <option value="60">60</option>
            </select>
            <label htmlFor="shop">
              <input
                id="shop"
                type="checkbox"
                className="fl mt07 ml05"
                style={{ width: '15px', height: '15px' }}
                onClick={shopView}
              />
              <div className="fl ml05 mt09">가맹점</div>
            </label>
            <select
              ref={shareRef}
              className="ml10 mt02"
              style={{ width: '70px', height: '25px' }}
              onChange={selShare}
            >
              <option value="%">전체</option>
              <option value="N" selected>
                자사
              </option>
              <option value="Y">공유</option>
            </select>
            <Button
              variant="contained"
              color="primary"
              size="small"
              className="ml10 mt02"
              style={{
                width: '85px',
                height: '25px',
              }}
              startIcon={<Search />}
              onClick={searchRider}
            >
              검색
            </Button>
          </div>
          <div className="flex_section_row mt15 ml50">
            <TimerSet
              stateC={stateC}
              setStateC={setStateC}
              searchRiderProcess={searchRiderProcess}
            />
          </div>
          <div className="flex_section_row mt10 ml10 align_center">
            <div className="flex_section_row align_center">
              <label htmlFor="riderAll">
                <input
                  ref={riderAllRef}
                  id="riderAll"
                  type="checkbox"
                  style={{ float: 'left', width: '15px', height: '15px' }}
                  defaultChecked
                  onClick={riderAllCheck}
                />
                <div className="fl ml02">라이더 전체보기</div>
              </label>
            </div>
            <div className="flex_section_row ml05 align_center">
              <label htmlFor="dongView">
                <input
                  ref={dongViewRef}
                  id="dongView"
                  type="checkbox"
                  style={{ float: 'left', width: '15px', height: '15px' }}
                  onClick={dongViewCheck}
                />
                <div className="fl ml02">동단위 보기</div>
              </label>
            </div>
            <div className="flex_section_row ml05 align_center">
              <div className="blueLabelSmall" style={{ width: '60px' }}>
                라인두께
              </div>
              <select
                ref={selRef}
                className="baseSelectSmall ml05"
                style={{ width: '30px' }}
                onChange={selThickness}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
              <Popup
                trigger={
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    className="ml05"
                    style={{
                      width: '90px',
                      height: '22px',
                    }}
                    startIcon={<FormatColorFill />}
                  >
                    라인색상
                  </Button>
                }
                position="bottom center"
                contentStyle={{ width: '220px' }}
              >
                <div>
                  <SketchPicker color={backgroundC.hsl} onChange={handleChangeComplete} />
                </div>
              </Popup>
              <div
                ref={colorRef}
                className="ml03"
                style={{
                  width: '20px',
                  height: '20px',
                  backgroundColor: 'black',
                  borderRadius: '5px',
                }}
              />
            </div>
          </div>
          <div className="flex_section_row align_center mt10 ml10">
            <label htmlFor="riderDest">
              <input
                ref={riderDestRef}
                id="riderDest"
                type="checkbox"
                style={{ float: 'left', width: '15px', height: '15px' }}
                onClick={riderDestCheck}
              />
              <div className="fl ml02">목적지 보기</div>
            </label>
          </div>
        </div>
        <div className="flex_section_row align_center mt10">
          <RiEBike2Fill className="ml05" />
          <div className="ml02 blue">기사현황 </div>
          <div className="red" style={{ marginLeft: '9px', textDecoration: 'underline' }}>
            ※ 전체 보기 선택 시 속도가 느려질 수 있습니다.
          </div>
        </div>
        <div className="flex_section_row mt05 box_border">
          <div
            style={{
              height: '20vh',
              width: '100%',
              fontSize: '9px',
            }}
            className="ag-theme-alpine"
          >
            <AgGridReact
              modules={AllModules}
              defaultColDef={{
                flex: 1,
                resizable: true,
                menuTabs: ['columnsMenuTab'],
                columnsMenuParams: { suppressSyncLayoutWithGrid: true },
              }}
              statusBar={{
                statusPanels: [
                  {
                    statusPanel: 'agTotalAndFilteredRowCountComponent',
                    align: 'left',
                  },
                  {
                    statusPanel: 'agTotalRowCountComponent',
                    align: 'center',
                  },
                  { statusPanel: 'agFilteredRowCountComponent' },
                  { statusPanel: 'agSelectedRowCountComponent' },
                  { statusPanel: 'agAggregationComponent' },
                ],
              }}
              rowSelection="single"
              headerHeight={22}
              rowData={rGData.current}
              onRowClicked={selDong}
            >
              <AgGridColumn
                headerName="시군구"
                field="ORDER_NO"
                minWidth={120}
                filter="agTextColumnFilter"
              />
              <AgGridColumn
                headerName="읍면동"
                field="DONG_NAME"
                minWidth={120}
                filter="agTextColumnFilter"
                cellRenderer={dongCellRender}
              />
              <AgGridColumn
                headerName="기사수"
                field="CNT"
                minWidth={120}
                filter="agTextColumnFilter"
              />
            </AgGridReact>
          </div>
        </div>
        <div className="box_border mt05">
          <div className="flex_section_row align_center">
            <div className="blueLabel " style={{ width: '70px' }}>
              기사번호
            </div>
            <input
              ref={riderNumRef}
              type="text"
              className="baseInputSmall ml03"
              style={{ width: '80px', height: '23px' }}
              onClick={numReset}
              onKeyUp={enterInput}
            />
            <Button
              variant="contained"
              color="primary"
              size="small"
              className="ml03 "
              style={{ width: '70px', height: '27px' }}
              startIcon={<Search />}
              onClick={riderSearch}
            >
              찾기
            </Button>
            <input
              id="seltype1"
              type="radio"
              name="selType"
              className="ml20 mr02"
              data-msg="R"
              onClick={selType}
              defaultChecked
            />
            기사
            <input
              id="seltype2"
              type="radio"
              name="selType"
              className="ml15 mr02"
              data-msg="S"
              onClick={selType}
            />
            가맹점
          </div>
          <div className="flex_section_row mt05 ml01 align_center">
            <label htmlFor="drive">
              <input
                ref={driveRef}
                id="drive"
                type="checkbox"
                style={{ float: 'left', width: '15px', height: '15px' }}
                onClick={driveClick}
              />
              <div className="fl ml03">마우스 클릭시 기사운행내역 팝업보기</div>
            </label>
          </div>
        </div>
        <div className="flex_section_row mt05 align_center">
          <RiEBike2Fill className="ml05 mt05" />
          <div ref={rsRef} className="ml02 mt03 blue">
            기사목록 (총
          </div>
          <div ref={cntRef} className="ml02 mt03 blue">
            0
          </div>
          <div className="ml02 mt03 blue">건)</div>
        </div>
        <div
          className="flex_section_row mt05 stretch box_border"
          style={{
            height: '100%',
          }}
        >
          <div
            ref={rRef}
            style={{
              height: '100%',
              width: '100%',
              fontSize: '9px',
            }}
            className="ag-theme-alpine"
          >
            <AgGridReact
              modules={AllModules}
              defaultColDef={{
                flex: 1,
                resizable: true,
                menuTabs: ['columnsMenuTab'],
                columnsMenuParams: { suppressSyncLayoutWithGrid: true },
              }}
              rowSelection="multiple"
              onGridReady={onGridReady}
              headerHeight={22}
              rowData={rData.current}
              onRowClicked={selRider}
              rowMultiSelectWithClick
              onSelectionChanged={onSelectionChanged}
            >
              <AgGridColumn
                headerName=""
                field="check"
                minWidth={30}
                headerCheckboxSelection
                headerCheckboxSelectionFilteredOnly
                checkboxSelection
              />
              <AgGridColumn
                headerName="번호"
                field="RIDER_ID"
                minWidth={120}
                columnsMenuParams={{
                  suppressColumnFilter: true,
                  suppressColumnSelectAll: true,
                  suppressColumnExpandAll: true,
                }}
                filter="agTextColumnFilter"
              />
              <AgGridColumn
                headerName="상태"
                field="STATE"
                minWidth={80}
                columnsMenuParams={{ contractColumnSelection: true }}
                filter="agTextColumnFilter"
              />
              <AgGridColumn
                headerName="기사명"
                field="RIDER_NAME"
                minWidth={180}
                columnsMenuParams={{ contractColumnSelection: true }}
                filter="agTextColumnFilter"
                cellRenderer={riderCellRender}
              />
              <AgGridColumn
                headerName="시군구"
                field="GUNGU_NAME"
                minWidth={90}
                columnsMenuParams={{ contractColumnSelection: true }}
                filter="agTextColumnFilter"
              />
              <AgGridColumn
                headerName="읍면동"
                field="DONG_NAME"
                minWidth={90}
                columnsMenuParams={{ contractColumnSelection: true }}
                filter="agTextColumnFilter"
              />
              <AgGridColumn
                headerName="수량"
                field="CNT"
                minWidth={80}
                columnsMenuParams={{ contractColumnSelection: true }}
                filter="agTextColumnFilter"
              />
            </AgGridReact>
          </div>
          <div
            ref={sRef}
            style={{
              height: '100%',
              width: '100%',
              fontSize: '9px',
              display: 'none',
            }}
            className="ag-theme-alpine ml03 mt03"
          >
            <AgGridReact
              modules={AllModules}
              defaultColDef={{
                flex: 1,
                resizable: true,
                menuTabs: ['columnsMenuTab'],
                columnsMenuParams: { suppressSyncLayoutWithGrid: true },
              }}
              rowSelection="multiple"
              headerHeight={22}
              rowData={sData!}
              onRowClicked={selShopGrid}
            >
              <AgGridColumn
                headerName="가맹점"
                field="SHOP_NAME"
                minWidth={280}
                columnsMenuParams={{
                  suppressColumnFilter: true,
                  suppressColumnSelectAll: true,
                  suppressColumnExpandAll: true,
                }}
                filter="agTextColumnFilter"
              />
              <AgGridColumn
                headerName="시도"
                field="SIDO_NAME"
                minWidth={150}
                columnsMenuParams={{ contractColumnSelection: true }}
                filter="agTextColumnFilter"
              />
              <AgGridColumn
                headerName="군구"
                field="GUNGU_NAME"
                minWidth={100}
                columnsMenuParams={{ contractColumnSelection: true }}
                filter="agTextColumnFilter"
              />
              <AgGridColumn
                headerName="동"
                field="DONG_NAME"
                minWidth={100}
                columnsMenuParams={{ contractColumnSelection: true }}
                filter="agTextColumnFilter"
              />
              <AgGridColumn
                headerName="세부주소"
                field="ADDR2"
                minWidth={100}
                columnsMenuParams={{ contractColumnSelection: true }}
                filter="agTextColumnFilter"
              />
            </AgGridReact>
          </div>
        </div>

        <div>
          <div className="flex_section_row mt03 mb05">
            <textarea
              ref={smsRef}
              className="mb01"
              placeholder="메시지 전송시 자동 조회 체크를 해제 하십시오."
              style={{ width: '74%', height: '40px', resize: 'none', padding: '10px' }}
            />
            <Button
              variant="contained"
              color="primary"
              size="small"
              className="ml05"
              style={{ width: '21%', height: '61px' }}
              startIcon={<Mail />}
              onClick={sendSms}
            >
              메세지전송
            </Button>
          </div>
        </div>
      </div>

      <div className=" right_box" style={{ height: '100%' }}>
        <div style={{ height: '100%' }}>
          <input
            ref={nameRef}
            type="text"
            style={{ width: '180px', marginTop: '10px' }}
            onClick={nameReset}
            onKeyUp={nameEnterInput}
          />
          <Button
            className="ml03"
            variant="contained"
            color="primary"
            size="small"
            style={{ width: '90px', height: '25px' }}
            startIcon={<Home />}
          >
            지번
          </Button>
          <NaverMap
            style={{ width: '100%', height: '95.5%', marginTop: '5px' }}
            rData={rData.current}
            sData={sData}
            lineColor={backgroundC.hex}
            lineT={lineT}
            shopCk={shopCheckRef.current}
            riderAllCk={riderAllCk}
            riderDestCk={riderDestCk.current}
            dongViewCk={dongViewCk}
            sRider={sRider}
            sDong={sDong}
            currentLat={currentLonLat.lat}
            currentLon={currentLonLat.lon}
            clickName={clickName}
            shopStr={shopStr}
            shopListStr={shopListStr}
            setClickName={setClickName}
          />
        </div>
        <div
          ref={dRef}
          style={{
            height: '278px',
            width: '800px',
            fontSize: '9px',
            display: 'none',
          }}
          className="ag-theme-alpine ml03 mt03 mb03"
        >
          <AgGridReact
            modules={AllModules}
            defaultColDef={{
              flex: 1,
              resizable: true,
              menuTabs: ['columnsMenuTab'],
              columnsMenuParams: { suppressSyncLayoutWithGrid: true },
              floatingFilter: true,
            }}
            statusBar={{
              statusPanels: [
                {
                  statusPanel: 'agTotalAndFilteredRowCountComponent',
                  align: 'left',
                },
                {
                  statusPanel: 'agTotalRowCountComponent',
                  align: 'center',
                },
                { statusPanel: 'agFilteredRowCountComponent' },
                { statusPanel: 'agSelectedRowCountComponent' },
                { statusPanel: 'agAggregationComponent' },
              ],
            }}
            headerHeight={22}
            rowData={nameShopData!}
            onRowClicked={nameSearchSelShop}
          >
            <AgGridColumn
              headerName="No"
              field="IDX"
              minWidth={40}
              columnsMenuParams={{
                suppressColumnFilter: true,
                suppressColumnSelectAll: true,
                suppressColumnExpandAll: true,
              }}
              filter="agNumberColumnFilter"
              cellRenderer={hashValueGetter}
            />
            <AgGridColumn
              headerName="명칭"
              field="POI_NAME"
              minWidth={200}
              columnsMenuParams={{ contractColumnSelection: true }}
              filter="agTextColumnFilter"
            />
            <AgGridColumn
              headerName="주소"
              field="ADDR"
              minWidth={200}
              columnsMenuParams={{ contractColumnSelection: true }}
              filter="agTextColumnFilter"
            />
          </AgGridReact>
        </div>
        <div
          ref={nRef}
          style={{
            position: 'absolute',
            top: '35px',
            height: '788px',
            width: '780px',
            fontSize: '9px',
            display: 'none',
          }}
          className="ag-theme-alpine ml03 mt03 mb03"
        >
          <AgGridReact
            modules={AllModules}
            defaultColDef={{
              flex: 1,
              resizable: true,
              menuTabs: ['columnsMenuTab'],
              columnsMenuParams: { suppressSyncLayoutWithGrid: true },
            }}
            rowSelection="multiple"
            headerHeight={22}
            rowData={riderDrivingData!}
          >
            <AgGridColumn
              headerName="상태"
              field="STATUS"
              minWidth={80}
              columnsMenuParams={{ contractColumnSelection: true }}
              filter="agTextColumnFilter"
              cellRenderer={statusCellRender}
            />
            <AgGridColumn
              headerName="경과"
              field="DELAY_TIME"
              minWidth={80}
              columnsMenuParams={{ contractColumnSelection: true }}
              filter="agTextColumnFilter"
            />
            <AgGridColumn
              headerName="시간"
              field="REMAIN_TIME"
              minWidth={80}
              columnsMenuParams={{ contractColumnSelection: true }}
              filter="agTextColumnFilter"
            />
            <AgGridColumn
              headerName="배차"
              field="ALLOC_TIME"
              minWidth={80}
              columnsMenuParams={{ contractColumnSelection: true }}
              filter="agTextColumnFilter"
            />
            <AgGridColumn
              headerName="출발지"
              field="START_DONG"
              minWidth={200}
              columnsMenuParams={{ contractColumnSelection: true }}
              filter="agTextColumnFilter"
            />
            <AgGridColumn
              headerName="출발지주소"
              field="START_ADDR"
              minWidth={200}
              columnsMenuParams={{ contractColumnSelection: true }}
              filter="agTextColumnFilter"
            />
            <AgGridColumn
              headerName="도착지주소"
              field="DEST_ADDR"
              minWidth={200}
              columnsMenuParams={{ contractColumnSelection: true }}
              filter="agTextColumnFilter"
            />
            <AgGridColumn
              headerName="도착지변환주소"
              field="DEST_ADDR2"
              minWidth={200}
              columnsMenuParams={{ contractColumnSelection: true }}
              filter="agTextColumnFilter"
            />
          </AgGridReact>
        </div>
      </div>
    </Split>
  );
};

export default React.memo(RiderControl);
