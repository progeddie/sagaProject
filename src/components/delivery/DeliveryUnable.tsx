import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Split from 'react-split';

// CSS
import '../../css/map/destmanager.css';
import '../../css/map/copypop.css';

// confirm
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

// Ag-Grid
import { AgGridReact, AgGridColumn } from '@ag-grid-community/react';
import { AllModules, GridApi } from '@ag-grid-enterprise/all-modules';
import '@ag-grid-enterprise/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-enterprise/all-modules/dist/styles/ag-theme-alpine.css';

// Material
import Button from '@material-ui/core/Button';
import Search from '@material-ui/icons/Search';
import Close from '@material-ui/icons/Close';
import NoteAdd from '@material-ui/icons/NoteAdd';
import DeleteSweep from '@material-ui/icons/DeleteSweep';
import CheckBox from '@material-ui/icons/CheckBox';
import CheckBoxOutlined from '@material-ui/icons/CheckBoxOutlined';
import Save from '@material-ui/icons/Save';

import Home from '@material-ui/icons/Home';
import Spellcheck from '@material-ui/icons/Spellcheck';
import AddLocation from '@material-ui/icons/AddLocation';
import LocationOff from '@material-ui/icons/LocationOff';
import DeleteForever from '@material-ui/icons/DeleteForever';

// NaverMap
import Popup from 'reactjs-popup';
import NaverMap from '../common/naver/Polygon';

// Popup
import 'reactjs-popup/dist/index.css';

// Alert
import Alert from '../common/Alert';

// 로딩화면
import Loader from '../common/Loader';

// Action
import {
  getAreaListAsync,
  getHelperCompanyListAsync,
  getMemberCompanyListAsync,
  getBranchCompanyListAsync,
  insertAreaAsync,
  updateAreaAsync,
  deleteAreaAsync,
  useAreaAsync,
} from '../../modules/delivery/actions';

// API
import {
  CenterUserInfoSendData,
  AreaListSendData,
  AreaInsertSendData,
  AreaUpdateSendData,
  AreaDeleteSendData,
  AreaUseSendData,
  AreaList,
  HelperCompany,
  MemberCompany,
  BranchCompany,
  AreaInsertResult,
  AreaUpdateResult,
  AreaDeleteResult,
  AreaUseResult,
} from '../../api/interface/delivery/delivery';

import { getNameShopListAsync } from '../../modules/common/actions';
import { nameShopListSendData, nameShopList } from '../../api/interface/common/area/area';

import SidoSelect from '../common/area/SidoSelect';
import GunGuSelect from '../common/area/GunGuSelect';
import DongSelect from '../common/area/DongSelect';
import RiSelector from '../common/area/RiSelector';

import { groupBy, changeDawlCoords, getPoligonCenter } from '../../util/common';

import { RootState } from '../../modules';

export interface urlParam {
  CCCode: string;
  ModName: string;
  UserID: string;
  McodeString: string;
}

const DeliveryUnable = (props: any) => {
  const { urlParams } = props;
  let jsonString: urlParam = {
    CCCode: '',
    ModName: '',
    UserID: '',
    McodeString: '',
  };
  try {
    jsonString = JSON.parse(decodeURI(atob(urlParams.commonParams)));
  } catch (e) {
    console.log(e);
  }

  const [currentLat, setCurrentLat] = useState<number>(0);
  const [currentLon, setCurrentLon] = useState<number>(0);
  const [shopCurrentLat, setShopCurrentLat] = useState<number>(0);
  const [shopCurrentLon, setShopCurrentLon] = useState<number>(0);
  const areaNameList = useRef<string[]>([]);
  const areaNameListOrigin = useRef<string[]>([]);
  const modSeqList = useRef<number[]>([]);
  const modPayAmt = useRef<number[]>([]);
  const modPayType = useRef<string[]>([]);
  const useGbnList = useRef<string[]>([]);
  const useGbnListOrigin = useRef<string[]>([]);
  const [colorb, setColorb] = useState<String>('#3f51b5');

  const [polygonData, setPolygonData] = useState<any>();
  const [areaDataGroup, setAreaDataGroup] = useState(new Map());
  const searchHidden = useRef() as React.MutableRefObject<HTMLDivElement>;
  const searchText = useRef() as React.MutableRefObject<HTMLDivElement>;
  const sido = useRef() as React.MutableRefObject<HTMLSelectElement>;
  const areaNameRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const nameRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const setBtn = useRef() as React.MutableRefObject<any>;
  const setBtnText = useRef() as React.MutableRefObject<HTMLDivElement>;

  // 명칭 검색 선택저장
  const [shopStr, setShopStr] = useState<string | null>('');

  // 커스텀 얼럿
  const [openA, setOpenA] = useState(false);
  const closeModalA = () => setOpenA(false);
  const [alertText, setAlertText] = useState('');
  const [alertType, setAlertType] = useState('');

  const {
    loading: getAreaListDataLoading,
    data: areaData,
    error: areaListError,
  } = useSelector((state: RootState) => state.areaList.areaList);

  const {
    loading: getHelperCompanyDataLoading,
    data: hcData,
    error: helperCompanyError,
  } = useSelector((state: RootState) => state.helperCompanyList.helperCompanyList);

  const {
    loading: getMemberCompanyDataLoading,
    data: mcData,
    error: memberCompanyError,
  } = useSelector((state: RootState) => state.memberCompanyList.memberCompanyList);

  const {
    loading: getBranchCompanyDataLoading,
    data: bcData,
    error: branchCompanyError,
  } = useSelector((state: RootState) => state.branchCompanyList.branchCompanyList);

  const {
    loading: InsertDataLoading,
    data: inResData,
    error: InsertDataError,
  } = useSelector((state: RootState) => state.insertArea.result);

  const {
    loading: UpdateDataLoading,
    data: upResData,
    error: UpdateDataError,
  } = useSelector((state: RootState) => state.updateArea.result);

  const {
    loading: delAreaLoading,
    data: delAreaData,
    error: delAreaError,
  } = useSelector((state: RootState) => state.deleteArea.result);

  const {
    loading: useAreaLoading,
    data: useAreaData,
    error: useAreaError,
  } = useSelector((state: RootState) => state.useArea.result);

  const {
    loading: getNameShopLoading,
    data: nameShopData,
    error: nameShopError,
  } = useSelector((state: RootState) => state.cNameShopList.nameShopList);

  const dispatch = useDispatch();

  const nameShopSendData: nameShopListSendData = {
    JobGbn: '',
    SiDoCode: '',
    PlaceName: '',
  };

  const areaInsertSendData: AreaInsertSendData = {
    JobGbn: 'I',
    CCCode: jsonString.CCCode,
    ShopCode: '0',
    AreaName: '',
    Seq: 0,
    PayAMT: -1,
    UseGbn: 'Y',
    ModSeq: [0],
    ModAreaName: ['1'],
    ModPayAMT: [0],
    ModUseGbn: ['1'],
    CenterLon: '',
    CenterLat: '',
    InLon: [],
    InLat: [],
    PayType: '1',
    ModPayType: ['1'],
    Lon: 0,
    Lat: 0,
    ModName: jsonString.ModName,
    DeleteMemo: null,
  };

  // 프로시져 수정후 개발
  const areaUpdateSendData: AreaUpdateSendData = {
    JobGbn: 'U',
    CCCode: jsonString.CCCode,
    ShopCode: '0',
    AreaName: '',
    Seq: 0,
    PayAMT: -1,
    UseGbn: 'Y',
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
    Lon: 0,
    Lat: 0,
    ModName: jsonString.ModName,
    DeleteMemo: '수정',
  };

  const areaDeleteSendData: AreaDeleteSendData = {
    JobGbn: 'D',
    CCCode: jsonString.CCCode,
    ShopCode: '0',
    AreaName: '',
    Seq: 0,
    PayAMT: -1,
    UseGbn: '',
    ModSeq: [],
    ModAreaName: [],
    ModPayAMT: [0, 0],
    ModUseGbn: [],
    CenterLon: '',
    CenterLat: '',
    InLon: [0, 0],
    InLat: [0, 0],
    PayType: null,
    ModPayType: null,
    Lon: 0,
    Lat: 0,
    ModName: jsonString.ModName,
    DeleteMemo: '삭제',
  };

  const areaUseSendData: AreaUseSendData = {
    JobGbn: 'A',
    CCCode: jsonString.CCCode,
    ShopCode: '0',
    AreaName: '',
    Seq: 0,
    PayAMT: -1,
    UseGbn: 'Y',
    ModSeq: [],
    ModAreaName: [''],
    ModPayAMT: [0],
    ModUseGbn: [],
    CenterLon: '',
    CenterLat: '',
    InLon: [0],
    InLat: [0],
    PayType: null,
    ModPayType: null,
    Lon: 0,
    Lat: 0,
    ModName: jsonString.ModName,
    DeleteMemo: null,
  };

  const selDest = (params: any) => {
    if (params.data.LAT !== 0 && params.data.LON !== 0) {
      setCurrentLat(params.data.LAT);
      setCurrentLon(params.data.LON);
    }
    // return params.node.rowIndex + 1;
  };

  const searchArea = useCallback(() => {
    const areaListSendData: AreaListSendData = {
      JobGbn: '1',
      CCCode: jsonString.CCCode,
      ShopCode: '0',
      UseGbn: '',
      PayType: '',
    };

    const centerUserSendData: CenterUserInfoSendData = {
      JobGbn: '1',
      UserID: jsonString.UserID,
      McodeString: '',
      CCCode: '',
      HelpCenter: '',
    };

    dispatch(getAreaListAsync.request(areaListSendData));

    dispatch(getHelperCompanyListAsync.request(centerUserSendData));
    centerUserSendData.JobGbn = '3';
    centerUserSendData.UserID = '';
    centerUserSendData.McodeString = jsonString.McodeString;
    centerUserSendData.CCCode = '';
    centerUserSendData.HelpCenter = 'HC900';

    // insertAreaAsync

    dispatch(getMemberCompanyListAsync.request(centerUserSendData));

    centerUserSendData.JobGbn = '5';
    centerUserSendData.UserID = '';
    centerUserSendData.McodeString = jsonString.McodeString;
    centerUserSendData.CCCode = jsonString.CCCode;
    centerUserSendData.HelpCenter = '';

    dispatch(getBranchCompanyListAsync.request(centerUserSendData));
  }, [dispatch]);

  // 최초 로드 시 미리 목적지 데이터 조회
  useEffect(() => {
    searchArea();
  }, [searchArea]);

  // 구역데이터 그룹핑(좌표 전체로 데이터 전송됨)
  useEffect(() => {
    if (getAreaListDataLoading === false && areaData && areaData.length > 0) {
      // 그룹핑
      const areaArr = groupBy(areaData, (data: any) => data.SEQNO);
      setAreaDataGroup(areaArr);

      let cnt = 0;
      // 수정정보 저장용 데이터저장
      areaArr.forEach((val: any, key: any, mapObject: any) => {
        if (val[0].PAY_AMT === -1 && val.length > 1) {
          areaNameListOrigin.current[cnt] = val[0].AREA_NAME;
          useGbnListOrigin.current[cnt] = val[0].USE_YN;
          cnt++;
        }
      });
    }
  }, [areaData]);

  const areaDataSingle: any[] = [];
  let count = 0;

  areaDataGroup.forEach((val: any, key: any, mapObject: any) => {
    if (val[0].PAY_AMT === -1 && val.length > 1) {
      areaDataSingle.push(val[0]);
      areaNameList.current[count] = val[0].AREA_NAME;
      modSeqList.current[count] = Number(val[0].SEQNO);
      modPayAmt.current[count] = Number(val[0].PAY_AMT);
      modPayType.current[count] = val[0].PAY_TYPE;
      useGbnList.current[count] = val[0].USE_YN;
      count++;
    }
  });

  const [forceRefresh, setForceRefresh] = useState(false);

  useEffect(() => {
    if (forceRefresh) {
      setTimeout(() => gridApi?.refreshCells({ force: true }));
      setForceRefresh(false);
    }
  }, [forceRefresh]);

  const useGbnMappings = {
    Y: '사용',
    N: '사용안함',
  };
  const useGbns = extractValues(useGbnMappings);

  function lookupValue(mappings: any, key: any) {
    return mappings[key];
  }

  function extractValues(mappings: any) {
    return Object.keys(mappings);
  }

  const editUAreaList = () => {
    const changeModSeqList: number[] = [];
    const changeAreaNameList: string[] = [];
    const changeUseGbnList: string[] = [];
    const changeModPayType: string[] = [];
    const changeModPayAmt: number[] = [];
    modSeqList.current.forEach((val: any, key: any) => {
      if (
        areaNameList.current[key] !== areaNameListOrigin.current[key] ||
        useGbnList.current[key] !== useGbnListOrigin.current[key]
      ) {
        changeModSeqList.push(modSeqList.current[key]);
        changeAreaNameList.push(areaNameList.current[key]);
        changeUseGbnList.push(useGbnList.current[key]);
        changeModPayAmt.push(modPayAmt.current[key]);
        changeModPayType.push(modPayType.current[key]);
      }
    });
    areaUpdateSendData.JobGbn = 'U';
    areaUpdateSendData.CCCode = jsonString.CCCode;
    areaUpdateSendData.ShopCode = '0';
    areaUpdateSendData.AreaName = '';
    areaUpdateSendData.Seq = 0;
    areaUpdateSendData.PayAMT = -1;
    areaUpdateSendData.UseGbn = '';
    areaUpdateSendData.ModSeq = changeModSeqList;
    areaUpdateSendData.ModAreaName = changeAreaNameList;
    areaUpdateSendData.ModUseGbn = changeUseGbnList;
    areaUpdateSendData.ModPayAMT = changeModPayAmt;
    areaUpdateSendData.ModPayType = changeModPayType;
    areaUpdateSendData.CenterLon = '';
    areaUpdateSendData.CenterLat = '';
    areaUpdateSendData.InLon = [0, 0];
    areaUpdateSendData.InLat = [0, 0];
    areaUpdateSendData.PayType = '1';
    areaUpdateSendData.Lon = 0;
    areaUpdateSendData.Lat = 0;
    areaUpdateSendData.ModName = jsonString.ModName;
    areaUpdateSendData.DeleteMemo = '수정';
    dispatch(updateAreaAsync.request(areaUpdateSendData));
  };

  // 검색 버튼 클릭
  const onSearchClick = () => {
    searchArea();
  };

  // 명칭 검색시 input 리셋
  const nameReset = () => {
    nameRef.current.value = '';
  };

  const nameEnterInput = (e: any) => {
    if (e.keyCode === 13) {
      nameSearch();
    }
  };

  const inLon: number[] = [];
  const inLat: number[] = [];
  const tempArr: any[] = [];
  // 구역설정 시작
  const setDest = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (colorb === '#3f51b5') {
      setBtn.current.style.backgroundColor = '#FF0000';
      setBtnText.current.innerText = '구역설정완료';
      setColorb('#FF0000');
    } else if (polygonData === undefined) {
      setAlertText('설정된 구역정보가없습니다! 구역설정을 하세요!');
      setOpenA((o: any) => !o);
    } else {
      // 데이터가 세개이상 있어야 그린거
      if (polygonData.getPath().getArray().length < 3) {
        setAlertText('설정된 구역정보가없습니다! 세개이상의 좌표를 찍어주세요!');
        setOpenA((o: any) => !o);
        return;
      }

      if (areaNameRef.current.value === '') {
        setAlertText('구역명칭을 입력하세요');
        setOpenA((o: any) => !o);
        return;
      }

      const nameOverlap = areaNameList.current.filter((data) => data === areaNameRef.current.value);
      if (!(Array.isArray(nameOverlap) && nameOverlap.length === 0)) {
        areaNameRef.current.value = '';
        setAlertText('이미 존재하는 구역명입니다! 다른 구역명칭을 입력하세요!');
        setOpenA((o: any) => !o);
        return;
      }

      const paths = polygonData.getPath().getArray();

      paths.forEach((data: any) => {
        tempArr.push({ LAT: data.y, LON: data.x });
        const coords = changeDawlCoords(data.y, data.x);
        inLon.push(coords.Lon);
        inLat.push(coords.Lat);
      });

      // 도형의 중심좌표 반환
      const res = getPoligonCenter(tempArr, 'N');

      areaInsertSendData.AreaName = areaNameRef.current.value;
      areaInsertSendData.InLon = inLon;
      areaInsertSendData.InLat = inLat;
      const coords = changeDawlCoords(res.LAT, res.LON);
      areaInsertSendData.CenterLon = coords.Lon.toString();
      areaInsertSendData.CenterLat = coords.Lat.toString();

      dispatch(insertAreaAsync.request(areaInsertSendData));
    }
  };

  // 최초 로드 시 미리 목적지 데이터 조회
  useEffect(() => {
    if (!InsertDataLoading && inResData) {
      const result: string = String(inResData);
      const resultMessage: string[] = result.split('@');
      if (resultMessage.length > 1) {
        if (resultMessage[0] !== '00') {
          setAlertText('입력에 실패 하였습니다.');
          return;
        }
        setAlertText('입력 되었습니다.');

        setOpenA((o: any) => !o);
        searchArea();
        cancelExecute();
      }
    }
  }, [InsertDataLoading, inResData, searchArea]);

  useEffect(() => {
    if (!UpdateDataLoading && upResData) {
      const result: string = String(upResData);
      const resultMessage: string[] = result.split('@');
      if (resultMessage.length > 1) {
        if (resultMessage[0] !== '00') {
          setAlertText('수정에 실패 하였습니다.');
          return;
        }
        setAlertText('수정 되었습니다.');

        setOpenA((o: any) => !o);
        searchArea();
        cancelExecute();
      }
    }
  }, [UpdateDataLoading, upResData, searchArea]);

  const onSelectDelete = () => {
    if (gridApi != null) {
      const checkData: any[] = gridApi.getSelectedNodes();

      if (checkData.length === 0) {
        setAlertText('삭제할 배송불가 구역을 선택하세요.');
        setOpenA((o: any) => !o);
        return;
      }

      confirmAlert({
        title: '삭제여부 확인',
        message: `총 ${checkData.length}개의 배송불가 요금을 삭제하시겠습니까?`,
        buttons: [
          {
            label: 'YES',
            onClick: () => {
              if (checkData.length > 0) {
                checkData.forEach((idata) => {
                  areaDeleteSendData.ModAreaName.push(String(idata.data.AREA_NAME));
                  areaDeleteSendData.ModSeq.push(idata.data.SEQNO);
                  areaDeleteSendData.ModUseGbn.push(String(idata.data.USE_YN));
                });
                dispatch(deleteAreaAsync.request(areaDeleteSendData));
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

  // 구역명칭 더블클릭시 한줄삭제
  const rowDelete = (params: any) => {
    confirmAlert({
      title: '삭제여부 확인',
      message: `선택한 [${params.data.AREA_NAME}] 구역을 삭제하시겠습니까?`,
      buttons: [
        {
          label: 'YES',
          onClick: () => {
            areaDeleteSendData.Seq = params.data.SEQNO;
            areaDeleteSendData.ModSeq.push(params.data.SEQNO);
            areaDeleteSendData.ModAreaName.push('');
            areaDeleteSendData.ModUseGbn.push('');
            dispatch(deleteAreaAsync.request(areaDeleteSendData));
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
  };

  useEffect(() => {
    if (!delAreaLoading && delAreaData) {
      const result: string = String(delAreaData);
      const resultMessage: string[] = result.split('@');
      if (resultMessage.length > 1) {
        if (resultMessage[0] !== '00') {
          setAlertText('삭제에 실패 하였습니다.');
          return;
        }
        setAlertText('삭제 하였습니다.');
        setOpenA((o: any) => !o);
      }
      searchArea();
    }
  }, [delAreaLoading, delAreaData, searchArea]);

  // 명칭검색 리스트 선택
  const nameSearchSelShop = (params: any) => {
    setShopStr(params.data.POI_NAME);
    setShopCurrentLat(params.data.LAT);
    setShopCurrentLon(params.data.LON);
  };

  // 구역설정 취소
  const cancelExecute = () => {
    setBtn.current.style.backgroundColor = '#3f51b5';
    areaNameRef.current.value = '';
    setBtnText.current.innerText = '구역설정시작';
    setColorb('#3f51b5');
  };

  // 구역설정 취소 버튼 클릭
  const cancelSetDest = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    cancelExecute();
  };

  const [gridApi, setGridApi] = useState<GridApi>();

  const onGridReady = (params: any) => {
    setGridApi(params.api);
  };

  // 검색창 열기 / 닫기
  const searchHiddenOpen = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    // console.log(searchHidden);

    e.preventDefault();
    if (searchHidden.current.style.display === 'block') {
      searchText.current.innerText = '검색창열기';
      searchHidden.current.style.display = 'none';
    } else {
      searchText.current.innerText = '검색창닫기';
      searchHidden.current.style.display = 'block';
    }
  };

  const hashValueGetter = (params: any) => {
    return params.node.rowIndex + 1;
  };

  const onUseClick = (e: any) => {
    areaDataSingle.forEach((val: any, key: any) => {
      areaUseSendData.ModSeq.push(val.SEQNO);
      areaUseSendData.ModUseGbn.push('Y');
    });
    areaUseSendData.UseGbn = 'Y';
    dispatch(useAreaAsync.request(areaUseSendData));
    setForceRefresh(true);
  };

  useEffect(() => {
    if (useAreaLoading !== false) {
      searchArea();
      setAlertText('변경되었습니다.');
      setOpenA((o: any) => !o);
    }
  }, [useAreaLoading, searchArea]);

  const onNotUseClick = (e: any) => {
    areaDataSingle.forEach((val: any, key: any) => {
      areaUseSendData.ModSeq.push(val.SEQNO);
      areaUseSendData.ModUseGbn.push('N');
    });
    areaUseSendData.UseGbn = 'N';
    dispatch(useAreaAsync.request(areaUseSendData));
    setForceRefresh(true);
  };

  // 명칭검색
  const nameSearch = () => {
    if (nameRef.current.value.length < 2) {
      setAlertText('명칭검색은 두글자 이상 입력하세요!');
      setOpenA((o: any) => !o);
      nameRef.current.focus();
      return;
    }
    nameShopSendData.SiDoCode = sido.current.value;
    nameShopSendData.PlaceName = nameRef.current.value;
    dispatch(getNameShopListAsync.request(nameShopSendData));
    searchText.current.innerText = '검색창닫기';
    searchHidden.current.style.display = 'block';
  };

  return (
    <Split className="split" sizes={[17, 83]}>
      {(getAreaListDataLoading === true || InsertDataLoading === true) && (
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
      <div className="left_box flex_section_column">
        <div className="flex_section_row">
          <div className="blueLabel mt05">지사명</div>
          <select className="baseSelect mg05" style={{ width: '150px' }}>
            {bcData &&
              bcData.length > 0 &&
              bcData.map((bc: BranchCompany) => (
                <option key={bc.CCCODE} value={bc.CCNAME}>
                  {bc.CCNAME}
                </option>
              ))}
          </select>
        </div>
        <div className="flex_section_row mt10">
          <Button
            variant="contained"
            color="primary"
            size="small"
            style={{ width: '110px' }}
            startIcon={<NoteAdd />}
            onClick={onUseClick}
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
            onClick={onNotUseClick}
          >
            전체 사용안함
          </Button>
        </div>
        <div className="flex_section_row">
          {/* <Button
            variant="contained"
            color="primary"
            size="small"
            className="fl ml10 mt05"
            style={{ width: '110px' }}
            startIcon={<CheckBox />}
          >
            전체 선택
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="small"
            className="fl ml05 mt05"
            style={{ width: '110px' }}
            startIcon={<CheckBoxOutlined />}
          >
            전체 취소
          </Button>
          <div className="blueLabelText fl ml05 mt05 ">지도확대</div>
          <input type="button" className="areaButton ml03 mt05" value="1" />
          <input type="button" className="areaButton ml03 mt05" value="2" />
          <input type="button" className="areaButton ml03 mt05" value="3" />
          <input type="button" className="areaButton ml03 mt05" value="4" />
          <input type="button" className="areaButton ml03 mt05" value="5" />
          <input type="button" className="areaButton ml03 mt05" value="6" />
          <input type="button" className="areaButton ml03 mt05" value="7" />
          <input type="button" className="areaButton ml03 mt05" value="8" />
          <input type="button" className="areaButton ml03 mt05" value="9" />
          <input type="button" className="areaButton ml03 mt05" value="10" />
          <input type="button" className="areaButton ml03 mt05" value="11" />
          <input type="button" className="areaButton ml03 mt05" value="12" />
          <input type="button" className="areaButton ml03 mt05" value="13" /> */}
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
            onClick={editUAreaList}
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
            onClick={onSelectDelete}
          >
            선택삭제
          </Button>
          {/* <div className="fl">
            <SidoSelect ref={sido} />
            <GunGuSelect />
            <DongSelect />
            <RiSelector />
          </div> */}
        </div>

        <div className="flex_section_row mt10">
          <div className="blueLabelText mt02"> * 구역명칭</div>
          <input
            type="text"
            className="baseInput ml05 mt02"
            style={{ width: '200px' }}
            ref={areaNameRef}
          />
        </div>

        {/* <div className="blueLabelText fl ml10 mt05 "> 그리기남은횟수</div>
          <input
            type="text"
            className="fl baseInput mg05"
            value="100"
            style={{ width: '28px', color: '#c92929' }}
          /> */}

        <div
          className="flex_section_row mt10 stretch"
          style={{
            height: '100%',
          }}
        >
          <div
            id="myGrid"
            style={{
              height: '99%',
              width: '97.5%',
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
              onRowDoubleClicked={rowDelete}
              rowSelection="multiple"
              headerHeight={40}
              singleClickEdit
              stopEditingWhenGridLosesFocus
              undoRedoCellEditing
            >
              <AgGridColumn
                headerName=""
                field="check"
                minWidth={40}
                headerCheckboxSelection
                headerCheckboxSelectionFilteredOnly
                checkboxSelection
              />
              <AgGridColumn
                headerName="No"
                field="IDX"
                minWidth={100}
                columnsMenuParams={{
                  suppressColumnFilter: true,
                  suppressColumnSelectAll: true,
                  suppressColumnExpandAll: true,
                }}
                valueGetter={hashValueGetter}
                filter="agNumberColumnFilter"
              />
              <AgGridColumn
                headerName="구역명"
                field="AREA_NAME"
                minWidth={180}
                editable
                columnsMenuParams={{ contractColumnSelection: true }}
                filter="agTextColumnFilter"
                onCellValueChanged={(params: any) => {
                  const nameOverlap = areaNameList.current.filter(
                    (data) => data === params.newValue
                  );
                  if (!(Array.isArray(nameOverlap) && nameOverlap.length === 0)) {
                    searchArea();
                    setAlertText('이미 존재하는 구역명입니다! 다른 구역명칭을 입력하세요!');
                    setOpenA((o: any) => !o);
                  }
                  setForceRefresh(true);
                }}
              />
              <AgGridColumn
                headerName="사용여부"
                field="USE_YN"
                minWidth={120}
                cellEditor="select"
                editable
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
            </AgGridReact>
          </div>
        </div>
      </div>
      <div className="right_box flex_section_column ml10" style={{ height: '100%' }}>
        <div className="flex_section_row align_center ">
          <div className="blueText fontsize_13 mt04">
            ※ 구역설정방법 : 구역설정시작 클릭 -&gt; 구역정보입력(명칭) -&gt; 우측마우스 구역설정
            -&gt; 구역설정완료 클릭 <br />※ 구역이 겹치는경우 먼저등록된 구역이 적용됩니다. ※
            구역리스트 더블클릭시 구역정보삭제
          </div>
          {/* <Button
            variant="contained"
            color="primary"
            size="small"
            className="fr mr10 mt05"
            style={{ width: '70px', height: '70px' }}
            startIcon={<Close />}
          >
            닫기
          </Button> */}
          <Button
            variant="contained"
            color="primary"
            size="small"
            className=" mt06 ml10"
            style={{ width: '65px', height: '60px' }}
            startIcon={<Search />}
            onClick={onSearchClick}
          >
            검색
          </Button>
        </div>
        <div className="flex_section_row mt50">
          <input
            type="text"
            ref={nameRef}
            className="baseInput"
            style={{ width: '200px' }}
            onClick={nameReset}
            onKeyUp={nameEnterInput}
          />
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
            className="fl ml05 mt05"
            style={{ width: '100px' }}
            startIcon={<Spellcheck />}
            onClick={nameSearch}
          >
            명칭검색
          </Button>

          <Button
            variant="contained"
            color="primary"
            size="small"
            className="fl ml05 mt05"
            style={{ width: '100px' }}
            startIcon={<Search />}
            onClick={searchHiddenOpen}
          >
            <div ref={searchText}>검색창열기</div>
          </Button> */}
        </div>
        <NaverMap
          style={{ height: '100%', width: '100%', marginTop: '10px', marginBottom: '10px' }}
          currentLat={currentLat}
          currentLon={currentLon}
          shopCurrentLat={shopCurrentLat}
          shopCurrentLon={shopCurrentLon}
          shopStr={shopStr!}
          polygonData={polygonData!}
          setPolygonData={setPolygonData}
          colorb={colorb}
          areaDataGroup={areaDataGroup!}
          type={-1}
        />
        <div
          ref={searchHidden}
          style={{
            position: 'absolute',
            top: '180px',
            height: '731px',
            width: '300px',
            display: 'none',
            overflowY: 'scroll',
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
            rowData={nameShopData!}
            onRowClicked={nameSearchSelShop}
            rowSelection="multiple"
            headerHeight={40}
          >
            <AgGridColumn
              headerName="No"
              field="IDX"
              minWidth={100}
              columnsMenuParams={{
                suppressColumnFilter: true,
                suppressColumnSelectAll: true,
                suppressColumnExpandAll: true,
              }}
              filter="agNumberColumnFilter"
              valueGetter={hashValueGetter}
            />
            <AgGridColumn
              headerName="구역명"
              field="POI_NAME"
              minWidth={250}
              columnsMenuParams={{ contractColumnSelection: true }}
              filter="agTextColumnFilter"
            />
            <AgGridColumn
              headerName="주소"
              field="ADDR"
              minWidth={250}
              columnsMenuParams={{ contractColumnSelection: true }}
              filter="agTextColumnFilter"
            />
          </AgGridReact>
        </div>
      </div>
    </Split>
  );
};

export default React.memo(DeliveryUnable);
