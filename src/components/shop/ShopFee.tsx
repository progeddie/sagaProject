import React, { useState, useEffect, createRef, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import $ from 'jquery';
// npimport { useMediaQuery } from 'react-responsive';
// Popup
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Split from 'react-split';

// confirm
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

// Ag-Grid
import { AgGridReact, AgGridColumn } from '@ag-grid-community/react';
import { AllModules, GridApi, ValueCache } from '@ag-grid-enterprise/all-modules';
import '@ag-grid-enterprise/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-enterprise/all-modules/dist/styles/ag-theme-alpine.css';

// Material
import Button from '@material-ui/core/Button';
import Search from '@material-ui/icons/Search';
import Close from '@material-ui/icons/Close';
import NoteAdd from '@material-ui/icons/NoteAdd';
import FileCopy from '@material-ui/icons/FileCopy';
import DeleteSweep from '@material-ui/icons/DeleteSweep';
import CheckBox from '@material-ui/icons/CheckBox';
import CheckBoxOutlined from '@material-ui/icons/CheckBoxOutlined';
import Home from '@material-ui/icons/Home';
import Spellcheck from '@material-ui/icons/Spellcheck';
import AddLocation from '@material-ui/icons/AddLocation';
import LocationOff from '@material-ui/icons/LocationOff';
import Save from '@material-ui/icons/Save';
import DeleteForever from '@material-ui/icons/DeleteForever';

// CSS
import '../../css/map/destmanager.css';
import '../../css/map/copypop.css';
import '../../css/flex.css';

// Action
// import userEvent from '@testing-library/user-event';
// import { consoleTestResultsHandler } from 'tslint/lib/test';
// import Checkbox from '@material-ui/core/Checkbox';
// import CheckCircle from '@material-ui/icons/CheckCircle';
import { setConstantValue } from 'typescript';

import { getAreaFeeSearchListAsync } from '../../modules/shop/actions';

import {
  getShopFeeListAsync,
  saveShopFeeAreaAsync,
  setAreaAmtAddAsync,
  deleteAreaFeeAsync,
} from '../../modules/shopFee/actions';

// API
import { AreaFeeSearchListSendData } from '../../api/interface/shop/shop';

import {
  getShopFeeListSendData,
  saveShopAreaData,
  setAreaAmtAddData,
  DeleteAreaFeeSendData,
  DeleteAreaFeeResult,
} from '../../api/interface/shopFee/shopFee';
import NaverMap from '../common/naver/PolygonShopFee';

import { groupBy, makeComma } from '../../util/common';
import ShopSelect from '../common/area/ShopSelect';
import SidoSelect from '../common/area/SidoSelect';
import GunGuSelect from '../common/area/GunGuSelect';
import DongSelect from '../common/area/DongSelect';
import RiSelector from '../common/area/RiSelector';

import CopyShopfee from './popup/CopyShopfee';

// Alert
import Alert from '../common/Alert';

// 로딩화면
import Loader from '../common/Loader';

import { RootState } from '../../modules';

export interface urlParam {
  CCCode: string;
  ModName: string;
  Mcode: number;
  ModUCode: number;
}

const ShopFee = (props: any) => {
  const { urlParams } = props;
  let commonParams: urlParam = {
    CCCode: '',
    ModName: '',
    Mcode: 0,
    ModUCode: 0,
  };
  try {
    commonParams = JSON.parse(decodeURI(atob(urlParams.commonParams)));
  } catch (e) {
    console.log(e);
  }

  const [gridApi, setGridApi] = useState<GridApi>();
  const [copyGridApi, setCopyGridApi] = useState<GridApi>();
  const [gridColumnApi, setGridColumnApi] = useState();
  const [rowData, setRowData] = useState(null);

  const onGridReady = (params: any) => {
    setGridApi(params.api);
  };
  const onCopyGridReady = (params: any) => {
    setCopyGridApi(params.api);
  };

  const [selShop, setSelShop] = useState('');
  const [useGbn, setUseGbn] = useState('');
  const [payType, setPayType] = useState('');
  const [openA, setOpenA] = useState(false);
  const closeModalA = () => setOpenA(false);
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const [alertText, setAlertText] = useState('');
  const [alertType, setAlertType] = useState('');
  const [currentLat, setCurrentLat] = useState<Number>(0);
  const [currentLon, setCurrentLon] = useState<Number>(0);
  const [polygonData, setPolygonData] = useState<any[]>([]);

  const areaNameList = useRef<string[]>([]);
  const areaNameListOrigin = useRef<string[]>([]);
  const modSeqList = useRef<number[]>([]);
  const payAmtList = useRef<number[]>([]);
  const payAmtListOrigin = useRef<number[]>([]);
  const useGbnList = useRef<string[]>([]);
  const useGbnListOrigin = useRef<string[]>([]);
  const payTypeList = useRef<string[]>([]);
  const payTypeListOrigin = useRef<string[]>([]);

  const [colorb, setColorb] = useState<String>('#3f51b5');
  const setBtn = useRef() as React.MutableRefObject<any>;
  const setBtnText = useRef() as React.MutableRefObject<HTMLDivElement>;
  const areaNameRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const areaFeeRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const areaUseGbnRef = useRef() as React.MutableRefObject<HTMLSelectElement>;
  const areaPayTypeRef = useRef() as React.MutableRefObject<HTMLSelectElement>;
  const [gridDestApi, setGridDestApi] = useState<GridApi>();
  const [gridPointApi, setGridPointApi] = useState<GridApi>();
  const [areaDataGroup, setAreaDataGroup] = useState(new Map());
  const [currentAreaData, setCurrentAreaData] = useState(new Map());

  const searchHidden = useRef() as React.MutableRefObject<HTMLDivElement>;
  const searchText = useRef() as React.MutableRefObject<HTMLDivElement>;
  const sido = useRef() as React.MutableRefObject<HTMLSelectElement>;
  const placeName = useRef() as React.MutableRefObject<HTMLInputElement>;

  const {
    loading: getShopFeeLoading,
    data: shopFee,
    error: areaListError,
  } = useSelector((state: RootState) => state.getShopFeeList.getShopFeeList);

  const {
    loading: getAreaFeeB2BListDataLoading,
    data: areaB2BData,
    error: areaFeeB2BListError,
  } = useSelector((state: RootState) => state.areaFeeB2BList.areaFeeB2BList);

  const {
    loading: getAreaFeeListDataLoading,
    data: areaData,
    error: areaFeeListError,
  } = useSelector((state: RootState) => state.areaFeeList.areaFeeList);

  const {
    loading: getAreaFeeSearchListDataLoading,
    data: areaSearchData,
    error: areaFeeSearchListError,
  } = useSelector((state: RootState) => state.areaFeeSearchList.areaFeeSearchList);

  const {
    loading: deleteAreaFeeDataLoading,
    data: deleteAreaData,
    error: deleteAreaError,
  } = useSelector((state: RootState) => state.deleteAreaFee.deleteAreaFee);

  const {
    loading: setAreaAmtDataLoading,
    data: setAreaAmtStateData,
    error: setAreaAmtError,
  } = useSelector((state: RootState) => state.setAreaAmtAdd.setAreaAmt);

  const {
    loading: saveDataLoading,
    data: saveData,
    error: saveDataError,
  } = useSelector((state: RootState) => state.saveShopFeeAreaList.saveShopFeeArea);
  const dispatch = useDispatch();

  const shopFeeListSendData: getShopFeeListSendData = {
    JobGbn: '1',
    CCCode: commonParams.CCCode,
    UseGbn: '',
    ShopCode: '0',
    PayType: '',
  };

  const saveShopArea: saveShopAreaData = {
    JobGbn: '',
    CCCode: commonParams.CCCode,
    ShopCode: '0',
    AreaName: '',
    Seq: 0,
    PayAMT: 0,
    UseGbn: '',
    ModSeq: [],
    ModAreaName: [],
    ModPayAMT: [],
    ModUseGbn: [],
    CenterLon: '',
    CenterLat: '',
    InLon: [],
    InLat: [],
    PayType: '',
    ModPayType: [],
    ModName: commonParams.ModName,
    Lon: 0,
    Lat: 0,
    DeleteMemo: '',
  };

  const areaDataSingle: any[] = [];
  let count = 0;

  // 기존값 현재변형값 비교
  // 틀린거만
  areaDataGroup.forEach((val: any, key: any, mapObject: any) => {
    areaDataSingle[count] = val[0];
    areaNameList.current[count] = val[0].AREA_NAME;
    modSeqList.current[count] = Number(val[0].SEQNO);
    useGbnList.current[count] = val[0].USE_YN;
    payAmtList.current[count] = Number(val[0].PAY_AMT);
    payTypeList.current[count] = val[0].PAY_TYPE;
    count++;
  });

  useEffect(() => {
    // getShopFeeLoading
    if (getShopFeeLoading === false && shopFee && shopFee.length > 0) {
      // 그룹핑
      const areaArr = groupBy(shopFee, (data: any) => data.AREA_NAME);
      setAreaDataGroup(areaArr);

      let cnt = 0;
      // 수정정보 저장용 데이터저장
      areaArr.forEach((val: any, key: any, mapObject: any) => {
        areaNameListOrigin.current[cnt] = val[0].AREA_NAME;
        useGbnListOrigin.current[cnt] = val[0].USE_YN;
        payAmtListOrigin.current[cnt] = val[0].PAY_AMT;
        payTypeListOrigin.current[cnt] = val[0].PAY_TYPE;
        cnt++;
      });
    }
  }, [shopFee]);

  useEffect(() => {
    if (saveDataLoading === false && saveData) {
      const saveResult: string = String(saveData);
      const resultMessage: string[] = saveResult.split('@');
      if (resultMessage.length > 1) {
        if (resultMessage[0] !== '00') {
          setAlertText('선택하신 가맹점 구역 저장을 실패하였습니다');
        } else {
          setAlertText('선택하신 가맹점 구역 저장을 성공하였습니다');
          searchShopFeeListData();
        }
        setOpenA((o: any) => !o);
      }
    }
  }, [saveDataLoading, saveData]);

  useEffect(() => {
    if (!setAreaAmtDataLoading && setAreaAmtStateData) {
      const setResult: string = String(setAreaAmtStateData);
      const resultMessage: string[] = setResult.split('@');
      if (resultMessage.length > 1) {
        if (resultMessage[0] !== '00') {
          setAlertText('선택하신 가맹점 구역 수정을 실패하였습니다');
        } else {
          searchShopFeeListData();
          setAlertText('선택하신 가맹점 구역 수정을 성공하였습니다');
        }
        setOpenA((o: any) => !o);
      }
    }
  }, [setAreaAmtDataLoading, setAreaAmtStateData]);

  const selDest = (params: any) => {
    if (params.data.LAT !== 0 && params.data.LON !== 0) {
      setCurrentLat(params.data.LAT);
      setCurrentLon(params.data.LON);
    }
  };

  const getRowStyle = (params: any) => {
    let color = 'black';
    if (params.data.LAT !== 0 && params.data.LAT !== null) {
      color = 'blue';
    }
    return { color };
  };

  const setDest = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (colorb === '#3f51b5') {
      setBtn.current.style.backgroundColor = '#FF0000';
      setBtnText.current.innerText = '구역설정완료';
      setColorb('#FF0000');
    } else if (polygonData[0] === undefined) {
      setAlertText('설정된 구역정보가없습니다! 구역설정을 하세요!');
      setOpenA((o: any) => !o);
    } else {
      // 데이터가 세개이상 있어야 그린거
      if (polygonData[0].getPath().getArray().length < 3) {
        setAlertText('설정된 구역정보가없습니다! 세개이상의 좌표를 찍어주세요!');
        setOpenA((o: any) => !o);
        return;
      }

      if (areaNameRef.current.value === '') {
        setAlertText('구역명칭을 입력하세요');
        setOpenA((o: any) => !o);
        return;
      }

      const nameOverlap = areaDataSingle.filter(
        (data) => data.AREA_NAME === areaNameRef.current.value
      );
      if (!(Array.isArray(nameOverlap) && nameOverlap.length === 0)) {
        setAlertText('이미 존재하는 구역명입니다! 다른 구역명칭을 입력하세요!');
        setOpenA((o: any) => !o);
        return;
      }

      if (areaFeeRef.current.value === '') {
        setAlertText('구역요금은 숫자만 입력해주세요!');
        setOpenA((o: any) => !o);
        return;
      }

      if (Number(areaFeeRef.current.value) < 0) {
        setAlertText('구역요금은 0원 이상이어야 합니다!');
        setOpenA((o: any) => !o);
        return;
      }
      saveShopFeeListArea();
      cancelExecute();
    }
  };

  // 구역설정 취소
  const cancelExecute = () => {
    setBtn.current.style.backgroundColor = '#3f51b5';
    areaNameRef.current.value = '';
    areaFeeRef.current.value = '';
    setBtnText.current.innerText = '구역설정시작';
    setColorb('#3f51b5');
  };

  // 구역설정 취소 버튼 클릭
  const cancelSetDest = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    cancelExecute();
  };
  // 검색창 열기 / 닫기
  const searchHiddenOpen = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (searchHidden.current.style.display === 'block') {
      searchText.current.innerText = '검색창열기';
      searchHidden.current.style.display = 'none';
    } else {
      searchText.current.innerText = '검색창닫기';
      searchHidden.current.style.display = 'block';
    }
  };

  const areaFeeSearchListSendData: AreaFeeSearchListSendData = {
    SiDoCode: '1',
    PlaceName: commonParams.CCCode,
  };

  // 명칭검색
  const searchArea = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    areaFeeSearchListSendData.SiDoCode = sido.current.value;
    areaFeeSearchListSendData.PlaceName = placeName.current.value;
    dispatch(getAreaFeeSearchListAsync.request(areaFeeSearchListSendData));
    searchText.current.innerText = '검색창닫기';
    searchHidden.current.style.display = 'block';
  };

  const hashValueGetter = (params: any) => {
    return params.node.rowIndex + 1;
  };

  const payTypeGetter = (params: any) => {
    if (params.data.PAY_TYPE === '1') {
      return '기본요금';
    }
    if (params.data.PAY_TYPE === '3') {
      return '할증요금';
    }

    return '배송불가';
  };

  const payGetter = (params: any) => {
    const money = params.data.PAY_AMT;
    return makeComma(money);
  };

  const areaNameGetter = (params: any) => {
    const name = params.data.AREA_NAME;
    return name;
  };

  const useTypeGetter = (params: any) => {
    if (params.data.USE_YN === 'Y') {
      return '사용';
    }
    return '미사용';
  };

  const selectAllList = () => {
    if (gridApi !== undefined) {
      gridApi.selectAll();
    }
  };

  const deselectAllList = () => {
    if (gridApi !== undefined) {
      gridApi.deselectAll();
    }
  };

  const deleteAreaFeeSendData: DeleteAreaFeeSendData = {
    JobGbn: 'D',
    CCCode: commonParams.CCCode,
    ShopCode: '',
    AreaName: '',
    Seq: 0,
    ModSeq: [],
    PayAMT: 0,
    UseGbn: '',
    ModAreaName: [],
    ModPayAMT: [],
    ModUseGbn: [],
    CenterLon: '',
    CenterLat: '',
    InLon: [],
    InLat: [],
    Lon: 0,
    Lat: 0,
    PayType: null,
    ModPayType: null,
    ModName: commonParams.ModName,
    DeleteMemo: '선택삭제',
  };

  const setAreaAmtData: setAreaAmtAddData = {
    JobGbn: 'A',
    CCCode: commonParams.CCCode,
    ShopCode: '',
    AreaName: '',
    Seq: 0,
    PayAMT: 0,
    UseGbn: 'Y',
    ModSeq: [0],
    ModAreaName: [''],
    ModPayAMT: [0],
    ModUseGbn: ['Y'],
    CenterLon: '',
    CenterLat: '',
    InLon: [0],
    InLat: [0],
    PayType: '',
    ModPayType: [''],
    Lon: 0,
    Lat: 0,
    ModName: commonParams.ModName,
    DeleteMemo: '',
  };

  const setAllUsed = () => {
    setAreaAmtData.JobGbn = 'A';
    setAreaAmtData.CCCode = commonParams.CCCode;
    setAreaAmtData.ShopCode = selShop;
    setAreaAmtData.AreaName = '';
    setAreaAmtData.Seq = 0;
    setAreaAmtData.PayAMT = 0;
    setAreaAmtData.UseGbn = 'Y';
    setAreaAmtData.ModSeq = [0];
    setAreaAmtData.ModAreaName = ['1'];
    setAreaAmtData.ModPayAMT = [0];
    setAreaAmtData.ModUseGbn = ['Y'];
    setAreaAmtData.CenterLon = '';
    setAreaAmtData.CenterLat = '';
    setAreaAmtData.InLon = [0];
    setAreaAmtData.InLat = [0];
    setAreaAmtData.PayType = null;
    setAreaAmtData.ModPayType = [''];
    setAreaAmtData.Lon = 0;
    setAreaAmtData.Lat = 0;
    setAreaAmtData.ModName = commonParams.ModName;
    setAreaAmtData.DeleteMemo = '';
    dispatch(setAreaAmtAddAsync.request(setAreaAmtData));
  };

  const setAllNotUsed = () => {
    setAreaAmtData.JobGbn = 'A';
    setAreaAmtData.CCCode = commonParams.CCCode;
    setAreaAmtData.ShopCode = selShop;
    setAreaAmtData.AreaName = '';
    setAreaAmtData.Seq = 0;
    setAreaAmtData.PayAMT = 0;
    setAreaAmtData.UseGbn = 'N';
    setAreaAmtData.ModSeq = [0];
    setAreaAmtData.ModAreaName = ['1'];
    setAreaAmtData.ModPayAMT = [0];
    setAreaAmtData.ModUseGbn = ['Y'];
    setAreaAmtData.CenterLon = '';
    setAreaAmtData.CenterLat = '';
    setAreaAmtData.InLon = [0];
    setAreaAmtData.InLat = [0];
    setAreaAmtData.PayType = null;
    setAreaAmtData.ModPayType = [''];
    setAreaAmtData.Lon = 0;
    setAreaAmtData.Lat = 0;
    setAreaAmtData.ModName = commonParams.ModName;
    setAreaAmtData.DeleteMemo = '';
    dispatch(setAreaAmtAddAsync.request(setAreaAmtData));
  };

  const searchShopFeeListData = () => {
    shopFeeListSendData.JobGbn = '1';
    shopFeeListSendData.CCCode = commonParams.CCCode;
    shopFeeListSendData.UseGbn = useGbn === '' ? '%' : useGbn;
    shopFeeListSendData.ShopCode = String($('#shopCode').val());
    shopFeeListSendData.PayType = payType === '' ? '%' : payType;
    dispatch(getShopFeeListAsync.request(shopFeeListSendData));
    setForceRefresh(true);
  };

  const saveShopFeeListArea = () => {
    if (saveShopArea !== null && polygonData[0] != null) {
      const getLatLng = polygonData[0].getPaths().getAt(0);
      const name = areaNameRef.current.value;
      const amt = Math.ceil(Number(areaFeeRef.current.value));
      const areaUseGbn = areaUseGbnRef.current.value;
      const areaPayType = areaPayTypeRef.current.value;

      saveShopArea.JobGbn = 'I';
      saveShopArea.CCCode = commonParams.CCCode;
      saveShopArea.ShopCode = selShop;
      saveShopArea.AreaName = name;
      saveShopArea.Seq = 0;
      saveShopArea.PayAMT = amt;
      saveShopArea.UseGbn = areaUseGbn;
      saveShopArea.ModSeq = [0];
      saveShopArea.ModAreaName = ['1'];
      saveShopArea.ModPayAMT = [0];
      saveShopArea.ModUseGbn = ['1'];
      saveShopArea.CenterLon = String(polygonData[0].mapCenter._lng);
      saveShopArea.CenterLat = String(polygonData[0].mapCenter._lat);

      getLatLng.forEach((lngs: any) => {
        saveShopArea.InLon.push(Math.ceil(Number(lngs._lng) * 360000));
      });
      getLatLng.forEach((lats: any) => {
        saveShopArea.InLat.push(Math.ceil(Number(lats._lat) * 360000));
      });

      saveShopArea.PayType = areaPayType;
      saveShopArea.ModPayType = ['1'];
      saveShopArea.ModName = commonParams.ModName;
      dispatch(saveShopFeeAreaAsync.request(saveShopArea));
    }
  };

  const editShopFeeList = () => {
    const changeModSeqList: number[] = [];
    const changeAreaNameList: string[] = [];
    const changeUseGbnList: string[] = [];
    const changePayAmtList: number[] = [];
    const changePayTypeList: string[] = [];

    modSeqList.current.forEach((val: any, key: any) => {
      if (
        areaNameList.current[key] !== areaNameListOrigin.current[key] ||
        useGbnList.current[key] !== useGbnListOrigin.current[key] ||
        payTypeList.current[key] !== payTypeListOrigin.current[key] ||
        payAmtList.current[key] !== payAmtListOrigin.current[key]
      ) {
        changeModSeqList.push(modSeqList.current[key]);
        changeAreaNameList.push(areaNameList.current[key]);
        changeUseGbnList.push(useGbnList.current[key]);
        changePayTypeList.push(payTypeList.current[key]);
        changePayAmtList.push(payAmtList.current[key]);
      }
    });

    saveShopArea.JobGbn = 'U';
    saveShopArea.CCCode = commonParams.CCCode;
    saveShopArea.ShopCode = selShop;
    saveShopArea.AreaName = '';
    saveShopArea.Seq = 0;
    saveShopArea.PayAMT = 0;
    saveShopArea.UseGbn = '';
    saveShopArea.ModSeq = changeModSeqList;
    saveShopArea.ModAreaName = changeAreaNameList;
    saveShopArea.ModPayAMT = changePayAmtList;
    saveShopArea.ModUseGbn = changeUseGbnList;
    saveShopArea.ModPayType = changePayTypeList;
    saveShopArea.CenterLon = '';
    saveShopArea.CenterLat = '';
    saveShopArea.InLon = [0, 0];
    saveShopArea.InLat = [0, 0];
    saveShopArea.PayType = '1';
    saveShopArea.Lon = 0;
    saveShopArea.Lat = 0;
    saveShopArea.ModName = commonParams.ModName;
    saveShopArea.DeleteMemo = '수정';
    dispatch(saveShopFeeAreaAsync.request(saveShopArea));
  };

  const deleteArea = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (gridApi != null) {
      const selectItem: any[] = gridApi.getSelectedNodes();

      confirmAlert({
        title: '삭제여부 확인',
        message: `총 ${selectItem.length}개의 구역요금을 삭제하시겠습니까?`,
        buttons: [
          {
            label: 'YES',
            onClick: () => {
              if (selectItem !== undefined) {
                if (selectItem.length === 0) {
                  setAlertText('삭제할 구역요금을 선택하세요!');
                  setOpenA((o) => !o);
                } else {
                  deleteAreaFeeSendData.ModSeq = [];
                  deleteAreaFeeSendData.ModAreaName = [];
                  deleteAreaFeeSendData.ModPayAMT = [];
                  deleteAreaFeeSendData.ModUseGbn = [];
                  deleteAreaFeeSendData.InLon = [];
                  deleteAreaFeeSendData.InLat = [];

                  deleteAreaFeeSendData.JobGbn = 'D';
                  deleteAreaFeeSendData.CCCode = commonParams.CCCode;
                  deleteAreaFeeSendData.ShopCode = selShop;
                  deleteAreaFeeSendData.AreaName = '';
                  deleteAreaFeeSendData.Seq = 0;
                  deleteAreaFeeSendData.PayAMT = 0;
                  deleteAreaFeeSendData.UseGbn = '';
                  selectItem.forEach((idata) => {
                    deleteAreaFeeSendData.ModSeq.push(Number(idata.data.SEQNO));
                    deleteAreaFeeSendData.ModAreaName.push(String(idata.data.AREA_NAME));
                    deleteAreaFeeSendData.ModPayAMT.push(Number(idata.data.PAY_AMT));
                    deleteAreaFeeSendData.ModUseGbn.push(String(idata.data.USE_YN));
                    deleteAreaFeeSendData.InLon.push(0);
                    deleteAreaFeeSendData.InLat.push(0);
                  });
                  deleteAreaFeeSendData.CenterLon = '';
                  deleteAreaFeeSendData.CenterLat = '';
                  deleteAreaFeeSendData.PayType = null;
                  deleteAreaFeeSendData.ModPayType = null;
                  deleteAreaFeeSendData.Lon = 0;
                  deleteAreaFeeSendData.Lat = 0;
                  deleteAreaFeeSendData.ModName = commonParams.ModName;
                  deleteAreaFeeSendData.DeleteMemo = '선택삭제';
                  dispatch(deleteAreaFeeAsync.request(deleteAreaFeeSendData));
                }
              }
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

  const doubleClickDeleteArea = (params: any) => {
    if (gridApi != null) {
      const selectItem = gridApi.getSelectedNodes();

      confirmAlert({
        title: '삭제여부 확인',
        message: `선택한 [${params.data.AREA_NAME}] 구역을 삭제하시겠습니까?`,
        buttons: [
          {
            label: 'YES',
            onClick: () => {
              if (selectItem !== undefined) {
                if (selectItem.length === 0) {
                  setAlertText('삭제할 구역요금을 선택하세요!');
                  setOpenA((o) => !o);
                } else {
                  deleteAreaFeeSendData.JobGbn = 'D';
                  deleteAreaFeeSendData.CCCode = commonParams.CCCode;
                  deleteAreaFeeSendData.ShopCode = selShop;
                  deleteAreaFeeSendData.AreaName = '';
                  deleteAreaFeeSendData.Seq = 0;
                  deleteAreaFeeSendData.PayAMT = 0;
                  deleteAreaFeeSendData.UseGbn = '';
                  selectItem.forEach((idata) => {
                    deleteAreaFeeSendData.ModSeq.push(Number(idata.data.SEQNO));
                    deleteAreaFeeSendData.ModAreaName.push(String(idata.data.AREA_NAME));
                    deleteAreaFeeSendData.ModPayAMT.push(Number(idata.data.PAY_AMT));
                    deleteAreaFeeSendData.ModUseGbn.push(String(idata.data.USE_YN));
                    deleteAreaFeeSendData.InLon.push(0);
                    deleteAreaFeeSendData.InLat.push(0);
                  });
                  deleteAreaFeeSendData.CenterLon = '';
                  deleteAreaFeeSendData.CenterLat = '';
                  deleteAreaFeeSendData.PayType = null;
                  deleteAreaFeeSendData.ModPayType = null;
                  deleteAreaFeeSendData.Lon = 0;
                  deleteAreaFeeSendData.Lat = 0;
                  deleteAreaFeeSendData.ModName = commonParams.ModName;
                  deleteAreaFeeSendData.DeleteMemo = '더블클릭삭제';
                  dispatch(deleteAreaFeeAsync.request(deleteAreaFeeSendData));
                }
              }
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

  const checkUseGbn = (params: any) => {
    setUseGbn(params.target.value);
  };

  const checkPayType = (params: any) => {
    setPayType(params.target.value);
  };

  useEffect(() => {
    if (!deleteAreaFeeDataLoading && deleteAreaData) {
      const result: string = String(deleteAreaData);
      const resultMessage: string[] = result.split('@');
      if (resultMessage.length > 1) {
        if (resultMessage[0] !== '00') {
          setAlertText('선택하신 가맹점 구역 삭제를 실패하였습니다');
        } else {
          setAlertText('선택하신 가맹점 구역 삭제를 성공하였습니다');
          searchShopFeeListData();
        }
        setOpenA((o) => !o);
      }
    }
  }, [deleteAreaFeeDataLoading, deleteAreaData]);

  useEffect(() => {
    searchShopFeeListData();
  }, [selShop, useGbn, payType]);

  const payTypeMappings = {
    '1': '기본요금',
    '3': '할증요금',
    '5': '배송불가',
  };
  const payTypes = extractValues(payTypeMappings);

  const useGbnMappings = {
    Y: '사용',
    N: '사용안함',
  };
  const useGbns = extractValues(useGbnMappings);

  function extractValues(mappings: any) {
    return Object.keys(mappings);
  }
  function lookupValue(mappings: any, key: any) {
    return mappings[key];
  }

  const [forceRefresh, setForceRefresh] = useState(false);

  const openCopyShop = () => {
    if (selShop) {
      setOpen((o) => !o);
    } else {
      setAlertText('가맹점을 선택해주세요.');
      setOpenA((o) => !o);
    }
  };

  useEffect(() => {
    if (forceRefresh) {
      setTimeout(() => gridApi?.refreshCells({ force: true }));
      setForceRefresh(false);
    }
  }, [forceRefresh]);

  return (
    <Split className="split" sizes={[17, 83]}>
      {getShopFeeLoading === true && (
        <Loader
          type="spinningBubbles"
          color="#000"
          backgroundColor="#00000061"
          message="Loading..."
        />
      )}
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
      <div className="left_box flex_section_column">
        <div className="flex_section_row">
          <div className="blueLabel mt05" style={{ width: '70px' }}>
            가맹점
          </div>
          <ShopSelect CCCode={commonParams.CCCode} setSelShop={setSelShop} />
          <div className="blueLabel ml05 mt05" style={{ width: '70px' }}>
            사용여부
          </div>
          <select
            id="useState"
            className="baseSelect mt05 ml05"
            style={{ width: '75px' }}
            onChange={checkUseGbn}
          >
            <option value="%">전체</option>
            <option value="Y">사용</option>
            <option value="N">사용안함</option>
          </select>
        </div>
        <div className="flex_section_row">
          <div className="blueLabel mt05" style={{ width: '70px' }}>
            요금종류
          </div>
          <select className="baseSelect mg05" style={{ width: '80px' }} onChange={checkPayType}>
            <option value="%">전체</option>
            <option value="1">기본요금</option>
            <option value="3">할증요금</option>
            <option value="5">배송불가</option>
          </select>
          <Button
            variant="contained"
            color="primary"
            size="small"
            style={{ width: '140px', height: '27px', marginTop: '5px' }}
            startIcon={<FileCopy />}
            onClick={openCopyShop}
          >
            가맹점 구역요금복사
          </Button>
          <Popup
            open={open}
            closeOnDocumentClick={false}
            onClose={closeModal}
            contentStyle={{ width: '1000px', height: '802px' }}
          >
            <div>
              <CopyShopfee
                selShop={selShop}
                CCCODE={commonParams.CCCode}
                ModUCode={commonParams.ModUCode}
                Mcode={commonParams.Mcode}
                closeModal={closeModal}
              />
            </div>
          </Popup>
        </div>
        <div className="flex_section_row mt05">
          <Button
            variant="contained"
            color="primary"
            size="small"
            style={{ width: '110px' }}
            startIcon={<NoteAdd />}
            onClick={setAllUsed}
          >
            전체 사용함
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="small"
            className="ml05"
            style={{ width: '110px' }}
            startIcon={<DeleteSweep />}
            onClick={setAllNotUsed}
          >
            전체 사용안함
          </Button>
          {/* <Button
                variant="contained"
                color="primary"
                size="small"
                className="ml05 mt05"
                style={{ width: '110px' }}
                startIcon={<CheckBox />}
                onClick={selectAllList}
              >
                전체 선택
              </Button>
              <Button
                variant="contained"
                color="primary"
                size="small"
                className="ml05 mt05"
                style={{ width: '110px' }}
                startIcon={<CheckBoxOutlined />}
                onClick={deselectAllList}
              >
                전체 취소
              </Button> */}
        </div>
        <div className="flex_section_row ">
          <Button
            variant="contained"
            color="primary"
            size="small"
            className="mt05"
            style={{ width: '110px' }}
            startIcon={<AddLocation />}
            onClick={setDest}
            ref={setBtn}
          >
            <div ref={setBtnText}>구역설정시작</div>
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="small"
            className="ml05 mt05"
            style={{ width: '110px' }}
            startIcon={<LocationOff />}
            onClick={cancelSetDest}
          >
            구역설정취소
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="small"
            className="ml05 mt05"
            style={{ width: '110px' }}
            startIcon={<Save />}
            onClick={editShopFeeList}
          >
            수정정보 저장
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="small"
            className="ml05 mt05"
            style={{ width: '110px' }}
            startIcon={<DeleteForever />}
            onClick={deleteArea}
          >
            선택삭제
          </Button>
        </div>
        <div className="flex_section_row mt10">
          <div className="blueLabelText"> * 구역명칭</div>
          <input
            type="text"
            className="baseInput ml05"
            style={{ width: '110px' }}
            ref={areaNameRef}
          />
          <div className="blueLabelText ml05"> * 구역요금</div>
          <input
            type="number"
            min="0"
            ref={areaFeeRef}
            className="baseInput ml05"
            style={{ width: '100px' }}
          />
        </div>
        <div className="flex_section_row mt05">
          <div className="blueLabelText"> 사용여부</div>
          <select className="baseSelect ml05" style={{ width: '122px' }} ref={areaUseGbnRef}>
            <option value="Y">사용</option>
            <option value="N">사용안함</option>
          </select>
          <div className="blueLabelText ml05"> 요금종류</div>
          <select className="baseSelect ml05" style={{ width: '112px' }} ref={areaPayTypeRef}>
            <option value="1">기본요금</option>
            <option value="3">할증요금</option>
            <option value="5">배송불가</option>
          </select>
        </div>
        <div
          className="flex_section_row stretch mt10"
          style={{
            height: '100%',
          }}
        >
          <div
            id="myGrid"
            style={{
              height: '99%',
              width: '98%',
            }}
            className="ag-theme-alpine"
          >
            <AgGridReact
              modules={AllModules}
              defaultColDef={{
                flex: 1,
                filter: true,
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
              onGridReady={onGridReady}
              rowData={areaDataSingle!}
              onRowClicked={selDest}
              rowSelection="multiple"
              headerHeight={40}
              singleClickEdit
              stopEditingWhenGridLosesFocus
              undoRedoCellEditing
              onRowDoubleClicked={doubleClickDeleteArea}
            >
              <AgGridColumn
                headerName=""
                field="check"
                minWidth={40}
                checkboxSelection
                headerCheckboxSelection
                headerCheckboxSelectionFilteredOnly
              />
              <AgGridColumn
                headerName="No"
                field="ORDER_NO"
                minWidth={80}
                columnsMenuParams={{
                  suppressColumnFilter: true,
                  suppressColumnSelectAll: true,
                  suppressColumnExpandAll: true,
                }}
                filter="agTextColumnFilter"
                valueGetter={hashValueGetter}
              />
              <AgGridColumn
                headerName="구역명"
                field="AREA_NAME"
                minWidth={150}
                editable
                columnsMenuParams={{ contractColumnSelection: true }}
                filter="agTextColumnFilter"
                cellRenderer={areaNameGetter}
                onCellValueChanged={(params: any) => {
                  const nameOverlap = areaNameList.current.filter(
                    (data) => data === params.newValue
                  );
                  if (!(Array.isArray(nameOverlap) && nameOverlap.length === 0)) {
                    searchShopFeeListData();
                    setAlertText(`이미 존재하는 구역명입니다! 다른 구역명칭을 입력하세요!`);
                    setOpenA((o: any) => !o);
                  }
                  setForceRefresh(true);
                }}
              />
              <AgGridColumn
                headerName="요금"
                field="PAY_AMT"
                minWidth={100}
                editable
                columnsMenuParams={{ contractColumnSelection: true }}
                filter="agTextColumnFilter"
                cellRenderer={payGetter}
                onCellValueChanged={(params: any) => {
                  const pay = Number(params.newValue);
                  if (pay < 0 || Math.ceil(pay) !== pay) {
                    searchShopFeeListData();
                    setAlertText('구역요금을 정확하게 입력해주세요!');
                    setOpenA((o: any) => !o);
                  }
                  setForceRefresh(true);
                }}
              />
              <AgGridColumn
                headerName="요금종류"
                field="PAY_TYPE"
                minWidth={120}
                editable
                cellEditor="select"
                cellEditorParams={{ values: payTypes }}
                filterParams={{
                  valueFormatter: (params: any) => {
                    return lookupValue(payTypeMappings, params.value);
                  },
                }}
                valueFormatter={(params: any) => {
                  return lookupValue(payTypeMappings, params.value);
                }}
                onCellValueChanged={() => {
                  setForceRefresh(true);
                }}
              />
              <AgGridColumn
                headerName="사용여부"
                field="USE_YN"
                minWidth={120}
                editable
                cellEditor="select"
                cellEditorParams={{ values: useGbns }}
                filterParams={{
                  valueFormatter: (params: any) => {
                    return lookupValue(useGbnMappings, params.value);
                  },
                }}
                valueFormatter={(params: any) => {
                  return lookupValue(useGbnMappings, params.value);
                }}
                onCellValueChanged={() => {
                  setForceRefresh(true);
                }}
              />
              {/* <AgGridColumn
                      headerName="원반경"
                      field="RIDER_NAME"
                      minWidth={100}
                      columnsMenuParams={{ contractColumnSelection: true }}
                      filter="agTextColumnFilter"
                    /> */}
            </AgGridReact>
          </div>
        </div>
      </div>

      <div className="right_box flex_section_column ml10 mt05">
        <div className="flex_section_row align_center ">
          <div className="blueText fontsize_13">
            ※ 구역설정방법 : 구역설정시작 클릭 -&gt; 구역정보입력(명칭) -&gt; 우측마우스 구역설정
            -&gt; 구역설정완료 클릭 <br />※ 구역이 겹치는경우 먼저등록된 구역이 적용됩니다. ※
            구역리스트 더블클릭시 구역정보삭제
          </div>
          <Button
            variant="contained"
            color="primary"
            size="small"
            className="ml10"
            style={{ width: '70px', height: '70px' }}
            startIcon={<Search />}
            onClick={searchShopFeeListData}
          >
            검색
          </Button>

          {/* <Button
              variant="contained"
              color="primary"
              size="small"
              className="mr10"
              style={{ width: '70px', height: '70px' }}
              startIcon={<Close />}
            >
              닫기
            </Button> */}
        </div>
        {/* <div className="flex_section_row">
            <div>
              <div className="blueLabelText fl ml05 mr05">지도확대</div>
              <input type="button" className="areaButton ml03 " value="1" />
              <input type="button" className="areaButton ml03 " value="2" />
              <input type="button" className="areaButton ml03 " value="3" />
              <input type="button" className="areaButton ml03 " value="4" />
              <input type="button" className="areaButton ml03 " value="5" />
              <input type="button" className="areaButton ml03 " value="6" />
              <input type="button" className="areaButton ml03 " value="7" />
              <input type="button" className="areaButton ml03 " value="8" />
              <input type="button" className="areaButton ml03 " value="9" />
              <input type="button" className="areaButton ml03 " value="10" />
              <input type="button" className="areaButton ml03 " value="11" />
              <input type="button" className="areaButton ml03 " value="12" />
              <input type="button" className="areaButton ml03 " value="13" />
            </div>
          </div> */}
        <div className="flex_section_row">
          {/* <SidoSelect ref={sido} style={{ width: '90px' }} />
            <GunGuSelect style={{ width: '90px' }} />
            <DongSelect style={{ width: '90px' }} />
            <RiSelector style={{ width: '90px' }} /> */}
          <input type="text" className="baseInput" style={{ width: '200px' }} />
          <Button
            variant="contained"
            color="primary"
            size="small"
            className="ml05"
            style={{ width: '100px' }}
            startIcon={<Home />}
          >
            지번검색
          </Button>
          {/* <Button
                variant="contained"
                color="primary"
                size="small"
                className="ml05"
                style={{ width: '100px' }}
                startIcon={<Spellcheck />}
                onClick={searchArea}
              >
                명칭검색
              </Button>
              <Button
                variant="contained"
                color="primary"
                size="small"
                className="ml05"
                style={{ width: '100px' }}
                startIcon={<Search />}
                onClick={searchHiddenOpen}
              >
                <div ref={searchText}>검색창열기</div>
              </Button> */}
        </div>
        <NaverMap
          style={{ height: '100%', width: '100%', marginTop: '10px' }}
          currentLat={currentLat}
          currentLon={currentLon}
          polygonData={polygonData}
          setPolygonData={setPolygonData}
          colorb={colorb}
          areaDataGroup={areaDataGroup!}
        />
      </div>
    </Split>
  );
};

export default React.memo(ShopFee);
