import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Popup from 'reactjs-popup';
import { Modal } from '@material-ui/core';
import ReactSelect from 'react-select';
import Split from 'react-split';

// CSS
import '../../css/map/destmanager.css';
import '../../css/map/copypop.css';

// confirm
import { confirmAlert } from 'react-confirm-alert';
// import 'react-confirm-alert/src/react-confirm-alert.css';
import '../../css/react-confirm-alert-nobg.css';

// Ag-Grid
import { AgGridReact, AgGridColumn } from '@ag-grid-community/react';
import { AllModules, GridApi } from '@ag-grid-enterprise/all-modules';
import '@ag-grid-enterprise/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-enterprise/all-modules/dist/styles/ag-theme-alpine.css';

// Material
import Button from '@material-ui/core/Button';
import Search from '@material-ui/icons/Search';
import Close from '@material-ui/icons/Close';
import AddCircle from '@material-ui/icons/AddCircle';
import CheckCircle from '@material-ui/icons/CheckCircle';
import SaveIcon from '@material-ui/icons/Save';
import Home from '@material-ui/icons/Home';
import Spellcheck from '@material-ui/icons/Spellcheck';
import AddLocation from '@material-ui/icons/AddLocation';
import LocationOff from '@material-ui/icons/LocationOff';
import DeleteForever from '@material-ui/icons/DeleteForever';

// alert
import Alert from '../common/Alert';

// 로딩화면
import Loader from '../common/Loader';

// Popup
import 'reactjs-popup/dist/index.css';

// NaverMap
import NaverMap, { IrefDestMarker } from '../common/naver/DestinationMarker';

// Components
import CopyDestination from './popup/CopyDestination';
import CopyDestinationPrivate from './popup/CopyDestinationPrivate';
import InsertDestination from './popup/InsertDestination';
import DaumSearchDest from './popup/DaumSearchDest';

// Action
import {
  getDestListAsync,
  deleteDestListAsync,
  insertDestListAsync,
} from '../../modules/destination/actions';

// API
import {
  destListSendData,
  deleteDestListSendData,
  insertDestListSendData,
} from '../../api/interface/destination/destination';

// Common
import { getNameShopListAsync, getDaumAddrAsync } from '../../modules/common/actions';
import {
  nameShopListSendData,
  nameShopList,
  daumAddrSendData,
  daumAddrResult,
} from '../../api/interface/common/area/area';

import SidoSelect from '../common/area/SidoSelect';
import GunGuSelect from '../common/area/GunGuSelect';
import DongSelect from '../common/area/DongSelect';
import RiSelector from '../common/area/RiSelector';

import { RootState } from '../../modules';
import { lonLat } from '../common/naver/interface/Coordinate';

// 목적지 타입용 리액트 셀렉트 스타일
const colourStyles = {
  control: (styles: any) => ({ ...styles, width: '135px', height: '10px', minheight: '5px' }),
};

export interface urlParam {
  CCCode: string;
  Ucode: number;
  UserName: string;
  Mcode: string;
  ModUCode: number;
  ModName: string;
}

const DestinationManagement = (props: any) => {
  const { urlParams } = props;
  let jsonString: urlParam = {
    CCCode: '',
    Ucode: 0,
    UserName: '',
    Mcode: '',
    ModUCode: 0,
    ModName: '',
  };
  try {
    jsonString = JSON.parse(decodeURI(atob(urlParams.commonParams)));
  } catch (e) {
    console.log(e);
  }

  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);

  const [openP, setOpenP] = useState(false);
  const closeModalP = () => setOpenP(false);

  const [openD, setOpenD] = useState(false);
  const closeModalD = () => setOpenD(false);

  const [openI, setOpenI] = useState(false);
  const closeModalI = () => {
    setOpenI(false);
  };

  // 커스텀 얼럿
  const [openA, setOpenA] = useState(false);
  const closeModalA = () => setOpenA(false);
  const [alertText, setAlertText] = useState('');
  const [alertType, setAlertType] = useState('');

  // 목적지 명
  const [curSeq, setCurSeq] = useState<number>();
  const [destName, setDestName] = useState<string>('');
  const [mapSelType, setMapSelType] = useState<string>('');
  const [clickName, setClickName] = useState<string>('');
  const [destJibunAddr, setDestJibunAddr] = useState<string>('');
  const [destRoadAddr, setDestRoadAddr] = useState<string>('');

  const [destData, setDestData] = useState<any[]>([]);

  const [selectedOption, setSelectedOption] = useState<any>(null);
  const options = [
    { value: 'A', label: `명칭` },
    { value: 'B', label: `빌딩` },
    { value: 'P', label: `아파트` },
    { value: 'H', label: `주택` },
    { value: 'Y', label: `연립` },
    { value: 'O', label: `원룸` },
    { value: 'M', label: `모텔` },
    { value: 'S', label: `맨션` },
    { value: 'U', label: `학교` },
    { value: 'F', label: `오피스텔` },
    { value: 'C', label: `병원` },
    { value: 'G', label: `관공서` },
  ];

  const optionArray: any = {
    A: '명칭',
    B: '빌딩',
    P: '아파트',
    H: '주택',
    Y: '연립',
    O: '원룸',
    M: '모텔',
    S: '맨션',
    U: '학교',
    F: '오피스텔',
    C: '병원',
    G: '관공서',
  };

  const [shopCurrentLat, setShopCurrentLat] = useState<number>(0);
  const [shopCurrentLon, setShopCurrentLon] = useState<number>(0);

  // 명칭 검색 선택저장
  const [shopStr, setShopStr] = useState<string | null>('');

  // 현재 좌표
  const [curLonLat, setCurLonLat] = useState<lonLat>({
    lat: 0,
    lon: 0,
  });

  const nameRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const sido = useRef() as React.MutableRefObject<HTMLSelectElement>;
  const sTypeRef = useRef() as React.MutableRefObject<HTMLSelectElement>;
  const searchHidden = useRef() as React.MutableRefObject<HTMLDivElement>;
  const searchText = useRef() as React.MutableRefObject<HTMLDivElement>;
  const destNameRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const closeModalSave = () => {
    setOpenI(false);
    childRef.current?.setDestination();
  };

  // 맵컴퍼넌트 내부참조
  // 네이버맵에서 좌표 입력시(클릭) 주소를 받아오기 위해 맵컴퍼넌트 내부연결
  const childRef = useRef<IrefDestMarker>(null);

  const [mapDestName, setMapDestName] = useState<string>('');
  const [refDestName, setRefDestName] = useState<string>('');

  const { loading, data, error } = useSelector((state: RootState) => state.destList.destList);
  const {
    loading: delDestLoading,
    data: delDestData,
    error: delDestError,
  } = useSelector((state: RootState) => state.deleteDestList.result);

  const {
    loading: insertDestLoading,
    data: insertDestData,
    error: insertDestError,
  } = useSelector((state: RootState) => state.insertDestList.result);

  const {
    loading: getDaumAddrLoading,
    data: getDaumAddrData,
    error: getDaumAddrError,
  } = useSelector((state: RootState) => state.getDaumAddr.result);

  const {
    loading: getNameShopLoading,
    data: nameShopData,
    error: nameShopError,
  } = useSelector((state: RootState) => state.cNameShopList.nameShopList);

  const dispatch = useDispatch();

  const searchDestination = useCallback(() => {
    const searchSendData: destListSendData = {
      JobGbn: '1',
      CCCode: jsonString.CCCode,
      DestType: '%',
      DestName: '%',
    };

    searchSendData.JobGbn = '1';
    searchSendData.CCCode = jsonString.CCCode;
    searchSendData.DestType = sTypeRef.current.value;
    searchSendData.DestName = destName === '' ? '%' : `%${destName}%`;

    dispatch(getDestListAsync.request(searchSendData));
  }, [dispatch, destName]);

  const nameShopSendData: nameShopListSendData = {
    JobGbn: '',
    SiDoCode: '',
    PlaceName: '',
  };

  // 최초 로드 시 미리 목적지 데이터 조회
  useEffect(() => {
    searchDestination();
  }, [searchDestination]);

  useEffect(() => {
    if (data && data.length > 0) {
      setDestData(data);
    }
  }, [data]);

  // 클릭시 이동 및 목적지 타입설정
  const selDest = (params: any) => {
    if (params.data.LAT !== 0 && params.data.LON !== 0) {
      const point: lonLat = {
        lat: params.data.LAT,
        lon: params.data.LON,
      };
      setCurLonLat(point);
    }

    setCurSeq(params.data.SEQNO);
    destNameRef.current.value = params.data.DEST_NAME;

    const type: string = params.data.DEST_TYPE;
    const label = optionArray[type];
    setSelectedOption({ value: type, label });
  };

  // 검색 버튼 클릭
  const onSearchClick = () => {
    searchDestination();
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

  // 목적지 명 입력
  const conDestNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setDestName(e.target.value);
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

  // 명칭검색 리스트 선택
  const nameSearchSelShop = (params: any) => {
    setShopStr(params.data.POI_NAME);
    setShopCurrentLat(params.data.LAT);
    setShopCurrentLon(params.data.LON);
  };

  // 목적지 저장
  const destTempSave = () => {
    // 체크포인트 Ucode, UserName
    const insertDestSendData: insertDestListSendData = {
      JobGbn: 'I',
      CCCode: jsonString.CCCode,
      DestType: '',
      DestName: '',
      Seq: 0,
      Seqs: null,
      Lon: 0,
      Lat: 0,
      SiDo: '',
      GunGu: '',
      Dong: '',
      GRS80Lon: 0,
      GRS80Lat: 0,
      JibunAddr: '',
      RoadAddr: '',
      Ucode: jsonString.Ucode,
      UserName: jsonString.UserName,
    };

    const destN = destNameRef.current.value;
    setClickName('목적지저장');
    // 중복 목적지 체크용
    const items: any = [];
    if (gridApi !== undefined) {
      gridApi.forEachNode((node) => {
        items.push(node.data);
      });
    }

    const sameResult: any[] = items.filter((d: any) => d.DEST_NAME === destN);
    if (destN === '') {
      setAlertText('목적지 명칭을 입력하세요!');
      setOpenA((o: any) => !o);
      return;
    }

    if (selectedOption === null) {
      setAlertText('목적지 타입을 선택하세요!');
      setOpenA((o: any) => !o);
      return;
    }

    if (sameResult.length > 0) {
      setAlertText(` ${sameResult[0].DEST_NAME} (은)는 이미 존재합니다.`);
      setOpenA((o: any) => !o);
      return;
    }

    insertDestSendData.JobGbn = 'I';
    insertDestSendData.DestType = selectedOption.value;
    insertDestSendData.DestName = destN;
    dispatch(insertDestListAsync.request(insertDestSendData));
  };

  // 위치확정
  const destPositionSave = () => {
    // 중복 목적지 체크용ma

    if (gridApi !== undefined) {
      const selectItem = gridApi.getSelectedNodes();
      const destN = destNameRef.current.value;
      setRefDestName(destNameRef.current.value);
      setClickName('위치확정');

      if (selectItem.length === 0) {
        setAlertText('목적지가 선택되지 않았습니다.');
        setOpenA((o: any) => !o);
        return;
      }

      if (selectItem.length > 1) {
        gridApi.deselectAll();
        setAlertText('하나의 목적지만 선택하세요.');
        setOpenA((o: any) => !o);
        return;
      }

      // 맵가운데 표시
      childRef.current?.setDestAddr();

      confirmAlert({
        title: '위치확정 확인',
        message: `이 좌표로 위치저장 하시겠습니까?`,
        buttons: [
          {
            label: 'YES',
            onClick: () => {
              childRef.current?.getDestAddr();
            },
          },
          {
            label: 'NO',
            onClick: () => {
              childRef.current?.cancelDestAddr();
            },
          },
        ],
      });
    }
  };

  // 좌표로 네이버맵 주소를 입력받아 다음주소를 받아옴
  useEffect(() => {
    if (destJibunAddr) {
      const daumAddrSend: daumAddrSendData = {
        JobGbn: '1',
        Addr: '',
      };

      daumAddrSend.Addr = destJibunAddr;
      dispatch(getDaumAddrAsync.request(daumAddrSend));
    }
  }, [destJibunAddr, dispatch]);

  // 맵클릭을 통한 insert
  useEffect(() => {
    if (mapDestName) {
      setClickName('맵클릭');
    }
  }, [mapDestName]);

  useEffect(() => {
    // 체크포인트 Ucode, UserName
    const insertDestSendData: insertDestListSendData = {
      JobGbn: 'I',
      CCCode: jsonString.CCCode,
      DestType: '',
      DestName: '',
      Seq: 0,
      Seqs: null,
      Lon: 0,
      Lat: 0,
      SiDo: '',
      GunGu: '',
      Dong: '',
      GRS80Lon: 0,
      GRS80Lat: 0,
      JibunAddr: '',
      RoadAddr: '',
      Ucode: jsonString.Ucode,
      UserName: jsonString.UserName,
    };

    if (!getDaumAddrLoading && getDaumAddrData) {
      if (clickName === '위치확정') {
        const result = getDaumAddrData;
        insertDestSendData.JobGbn = 'U';
        insertDestSendData.DestType = selectedOption.value;
        insertDestSendData.DestName = destNameRef.current.value;
        insertDestSendData.Seq = curSeq;
        insertDestSendData.Lat = Math.floor(curLonLat.lat * 360000);
        insertDestSendData.Lon = Math.floor(curLonLat.lon * 360000);
        insertDestSendData.SiDo = result[0].SIDO;
        insertDestSendData.GunGu = result[0].GUNGU;
        insertDestSendData.Dong = result[0].DONG;
        insertDestSendData.GRS80Lon = curLonLat.lon;
        insertDestSendData.GRS80Lat = curLonLat.lat;
        insertDestSendData.JibunAddr = destJibunAddr;
        insertDestSendData.RoadAddr = destRoadAddr;

        dispatch(insertDestListAsync.request(insertDestSendData));

        setDestJibunAddr('');
        setDestRoadAddr('');
      } else if (clickName === '위치해제') {
        const result = getDaumAddrData;
        insertDestSendData.JobGbn = 'U';
        insertDestSendData.DestType = selectedOption.value;
        insertDestSendData.DestName = destNameRef.current.value;
        insertDestSendData.Seq = curSeq;
        insertDestSendData.Lat = 0;
        insertDestSendData.Lon = 0;
        insertDestSendData.SiDo = result[0].SIDO;
        insertDestSendData.GunGu = result[0].GUNGU;
        insertDestSendData.Dong = result[0].DONG;
        insertDestSendData.GRS80Lon = 0.0;
        insertDestSendData.GRS80Lat = 0.0;
        insertDestSendData.JibunAddr = null;
        insertDestSendData.RoadAddr = null;

        dispatch(insertDestListAsync.request(insertDestSendData));

        setDestJibunAddr('');
        setDestRoadAddr('');
      } else if (clickName === '맵클릭') {
        const result = getDaumAddrData;
        insertDestSendData.JobGbn = 'I';
        insertDestSendData.DestType = mapSelType;
        insertDestSendData.DestName = mapDestName;
        insertDestSendData.Seq = 0;
        insertDestSendData.Lat = Math.floor(curLonLat.lat * 360000);
        insertDestSendData.Lon = Math.floor(curLonLat.lon * 360000);
        insertDestSendData.SiDo = result[0].SIDO;
        insertDestSendData.GunGu = result[0].GUNGU;
        insertDestSendData.Dong = result[0].DONG;
        insertDestSendData.GRS80Lon = curLonLat.lon;
        insertDestSendData.GRS80Lat = curLonLat.lat;
        insertDestSendData.JibunAddr = destJibunAddr;
        insertDestSendData.RoadAddr = destRoadAddr;

        dispatch(insertDestListAsync.request(insertDestSendData));

        setDestJibunAddr('');
        setDestRoadAddr('');
      }
    }
  }, [getDaumAddrLoading, getDaumAddrData]);

  // 위치해제
  const destPositionCancel = () => {
    if (gridApi !== undefined) {
      const selectItem = gridApi.getSelectedNodes();
      const destN = destNameRef.current.value;
      setRefDestName(destNameRef.current.value);
      setClickName('위치해제');

      if (selectItem.length === 0) {
        setAlertText('목적지가 선택되지 않았습니다.');
        setOpenA((o: any) => !o);
        return;
      }

      if (selectItem.length > 1) {
        gridApi.deselectAll();
        setAlertText('하나의 목적지만 선택하세요.');
        setOpenA((o: any) => !o);
        return;
      }

      // 맵가운데 표시
      childRef.current?.setDestAddr();

      confirmAlert({
        title: '위치해제 확인',
        message: `이 목적지의 좌표를 해제 하시겠습니까?`,
        buttons: [
          {
            label: 'YES',
            onClick: () => {
              childRef.current?.getDestAddr();
            },
          },
          {
            label: 'NO',
            onClick: () => {
              childRef.current?.cancelDestAddr();
            },
          },
        ],
      });
    }
  };

  const destNameClear = useCallback(() => {
    destNameRef.current.value = '';
    setSelectedOption(null);
  }, [setSelectedOption]);

  // 최초 로드 시 미리 목적지 데이터 조회
  useEffect(() => {
    if (!insertDestLoading && insertDestData) {
      const result: string = String(insertDestData);
      const resultMessage: string[] = result.split('@');
      let inStr: string = '';
      // 저장 방식은 총4개이다. 맵에서우클릭 / 목적지추가 / 위치확정 / 위치해제
      if (clickName === '목적지저장' || clickName === '맵클릭') {
        inStr = '저장';
      } else if (clickName === '개별삭제') {
        inStr = '삭제';
      } else {
        inStr = '수정';
      }
      if (resultMessage.length > 1) {
        if (resultMessage[0] !== '00') {
          setAlertText(`${inStr}에 실패 하였습니다.`);
          return;
        }
        setAlertText(`${inStr} 되었습니다.`);

        setOpenA((o: any) => !o);
        searchDestination();
        // cancelExecute();
      }
    }
  }, [insertDestLoading, searchDestination, insertDestData]);

  const hashValueGetter = (params: any) => {
    return params.node.rowIndex + 1;
  };

  // 좌표없는 리스트 색상구분
  const getRowStyle = (params: any) => {
    let color = 'black';
    if (params.data.LAT !== 0 && params.data.LAT !== null) {
      color = 'blue';
    }
    return { color };
  };

  // 리스트 호출 프로시져에서 좌표없는 리스트에 동명을 안지워서 처리
  const dongNameViewYN = (params: any) => {
    let dongName = '';
    if (params.data.LAT !== 0 && params.data.LAT !== null) {
      dongName = params.data.DONG_NAME;
    }
    return dongName;
  };

  const [gridApi, setGridApi] = useState<GridApi>();

  const onGridReady = (params: any) => {
    setGridApi(params.api);
  };

  const sendData: deleteDestListSendData = {
    Seqs: [],
  };

  const onSelectDelete = () => {
    if (gridApi != null) {
      const checkData: any[] = gridApi.getSelectedNodes();

      confirmAlert({
        title: '삭제여부 확인',
        message: `총 ${checkData.length}개의 목적지를 삭제하시겠습니까?`,
        buttons: [
          {
            label: 'YES',
            onClick: () => {
              if (checkData.length > 0) {
                if (sendData !== null) {
                  checkData.forEach((idata) => {
                    sendData.Seqs.push(String(idata.data.SEQNO));
                  });
                }

                dispatch(deleteDestListAsync.request(sendData));
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
    // 체크포인트 Ucode, UserName
    const insertDestSendData: insertDestListSendData = {
      JobGbn: 'I',
      CCCode: jsonString.CCCode,
      DestType: '',
      DestName: '',
      Seq: 0,
      Seqs: null,
      Lon: 0,
      Lat: 0,
      SiDo: '',
      GunGu: '',
      Dong: '',
      GRS80Lon: 0,
      GRS80Lat: 0,
      JibunAddr: '',
      RoadAddr: '',
      Ucode: jsonString.Ucode,
      UserName: jsonString.UserName,
    };
    setClickName('개별삭제');
    confirmAlert({
      title: '삭제여부 확인',
      message: `선택한 목적지를 삭제하시겠습니까?`,
      buttons: [
        {
          label: 'YES',
          onClick: () => {
            insertDestSendData.JobGbn = 'D';
            insertDestSendData.CCCode = params.data.CCCODE;
            insertDestSendData.DestType = params.data.DEST_TYPE;
            insertDestSendData.DestName = params.data.DEST_NAME;
            insertDestSendData.Seq = params.data.SEQNO;
            insertDestSendData.Seqs = null;
            insertDestSendData.Lon = 0;
            insertDestSendData.Lat = 0;
            insertDestSendData.SiDo = params.data.SIDO_NAME;
            insertDestSendData.GunGu = params.data.GUNGU_NAME;
            insertDestSendData.Dong = params.data.DONG_NAME;
            dispatch(insertDestListAsync.request(insertDestSendData));
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
    if (!delDestLoading && delDestData) {
      const result: string = String(delDestData);
      const resultMessage: string[] = result.split('@');
      if (resultMessage.length > 1) {
        if (resultMessage[0] !== '00') {
          setAlertText('삭제에 실패 하였습니다.');
        } else {
          setAlertText('삭제 하였습니다.');
        }
        setOpenA((o: any) => !o);
      }
      searchDestination();
      destNameClear();
    }
  }, [delDestLoading, delDestData, searchDestination, destNameClear]);

  // loading

  useEffect(() => {
    if (loading !== false) {
      searchDestination();
    }
  }, [loading, searchDestination]);

  return (
    <Split className="split" sizes={[17, 83]}>
      {loading === true && insertDestLoading === true && (
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
          <div className="blueLabel mt05">목적지</div>
          <input
            type="text"
            onChange={conDestNameChange}
            className="baseInput mg05"
            style={{ width: '145px' }}
          />
          <div className="blueLabel mt05 ml05">목적지 타입</div>
          <select ref={sTypeRef} className="baseSelect ml05 mt05" style={{ width: '100px' }}>
            <option value="%">-------선택-------</option>
            <option value="A">명칭</option>
            <option value="B">빌딩</option>
            <option value="P">아파트</option>
            <option value="H">주택</option>
            <option value="Y">연립</option>
            <option value="O">원룸</option>
            <option value="M">모텔</option>
            <option value="S">맨션</option>
            <option value="U">학교</option>
            <option value="F">오피스텔</option>
            <option value="C">병원</option>
            <option value="G">관공서</option>
          </select>
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

        {/* <Button
          variant="contained"
          color="primary"
          size="small"
          style={{ width: '300px', marginLeft: '10px' }}
          startIcon={<Search />}
          onClick={() => setOpenD((o) => !o)}
        >
          다음검색
        </Button> */}
        <Popup
          open={openD}
          closeOnDocumentClick={false}
          onClose={closeModalD}
          contentStyle={{ width: '600px', height: '660px' }}
        >
          <div>
            <DaumSearchDest closeModal={closeModalD} />
          </div>
        </Popup>
        <div className="flex_section_row">
          <Button
            variant="contained"
            color="primary"
            size="small"
            style={{ width: '220px' }}
            startIcon={<SaveIcon />}
            onClick={() => setOpen((o) => !o)}
          >
            목적지좌표 다른지점으로 복사
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="small"
            className="ml05"
            style={{ width: '220px' }}
            startIcon={<SaveIcon />}
            onClick={() => setOpenP((o) => !o)}
          >
            목적지좌표 다른지점으로 개별복사
          </Button>
          <Popup
            open={open}
            closeOnDocumentClick={false}
            onClose={closeModal}
            contentStyle={{ width: '662px', height: '820px' }}
          >
            <div>
              <CopyDestination
                CCCode={jsonString.CCCode}
                Mcode={jsonString.Mcode}
                ModUCode={jsonString.ModUCode}
                ModName={jsonString.ModName}
                closeModal={closeModal}
              />
            </div>
          </Popup>

          <Popup
            open={openP}
            closeOnDocumentClick={false}
            onClose={closeModalP}
            contentStyle={{ width: '960px', height: '820px' }}
          >
            <div>
              <CopyDestinationPrivate
                CCCode={jsonString.CCCode}
                Mcode={jsonString.Mcode}
                ModUCode={jsonString.ModUCode}
                ModName={jsonString.ModName}
                closeModal={closeModalP}
              />
            </div>
          </Popup>
        </div>
        <div className="flex_section_row mt10">
          <div className="blueText ml05">
            ※ 지도 마우스 우측버튼 클릭시 해당위치 목적지 등록가능.
          </div>
        </div>
        <div className="flex_section_row  mt10">
          <Button
            variant="contained"
            color="primary"
            size="small"
            style={{ width: '100px' }}
            startIcon={<AddCircle />}
            onClick={destNameClear}
          >
            목적지 추가
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="small"
            className="ml05"
            style={{ width: '100px' }}
            startIcon={<CheckCircle />}
            onClick={destTempSave}
          >
            목적지 저장
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="small"
            className="ml05"
            style={{ width: '100px' }}
            startIcon={<AddLocation />}
            onClick={destPositionSave}
          >
            위치확정
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="small"
            className=" ml05 mr10"
            style={{ width: '100px' }}
            startIcon={<LocationOff />}
            onClick={destPositionCancel}
          >
            위치해제
          </Button>
        </div>
        <div className="flex_section_row mt10">
          <div className="blueLabelText mt05 "> * 목적지</div>
          <input
            ref={destNameRef}
            type="text"
            className="baseInput mg05"
            style={{ width: '128px' }}
          />
          <Button
            variant="contained"
            color="primary"
            size="small"
            className="mt05 ml05"
            startIcon={<DeleteForever />}
            onClick={onSelectDelete}
            style={{ width: '100px', height: '25px' }}
          >
            선택삭제
          </Button>
        </div>
        <div className="flex_section_row">
          <div className="blueLabelText mt05" style={{ width: '80px', height: '20px' }}>
            목적지 타입
          </div>
          <ReactSelect
            className="ml05"
            options={options}
            value={selectedOption}
            onChange={setSelectedOption}
            styles={colourStyles}
          />
        </div>
        <div
          className="flex_section_row stretch mt05"
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
              onGridReady={onGridReady}
              rowData={destData!}
              rowSelection="multiple"
              headerHeight={70}
              onRowClicked={selDest}
              onRowDoubleClicked={rowDelete}
              getRowStyle={getRowStyle}
            >
              <AgGridColumn
                headerName=""
                field="check"
                minWidth={50}
                headerCheckboxSelection
                headerCheckboxSelectionFilteredOnly
                checkboxSelection
              />
              <AgGridColumn headerName="No" field="NO" minWidth={75} width={75} />
              <AgGridColumn
                headerName="목적지"
                field="DEST_NAME"
                minWidth={200}
                width={200}
                columnsMenuParams={{ contractColumnSelection: true }}
                filter="agTextColumnFilter"
              />
              <AgGridColumn
                headerName="동명"
                field="DONG_NAME"
                minWidth={100}
                columnsMenuParams={{ contractColumnSelection: true }}
                filter="agTextColumnFilter"
                cellRenderer={dongNameViewYN}
              />
              <AgGridColumn
                headerName="목적지 타입"
                field="DEST_TYPE"
                minWidth={100}
                columnsMenuParams={{ contractColumnSelection: true }}
                hide
              />
              <AgGridColumn
                headerName="경도"
                field="LON"
                minWidth={100}
                columnsMenuParams={{ contractColumnSelection: true }}
                hide
              />
              <AgGridColumn
                headerName="위도"
                field="LAT"
                minWidth={100}
                columnsMenuParams={{ contractColumnSelection: true }}
                hide
              />
            </AgGridReact>
          </div>
        </div>
      </div>
      <div className="flex_section_column right_box ml10 mt05">
        <div className="flex_section_row">
          <Button
            variant="contained"
            color="primary"
            size="small"
            style={{ width: '65px', height: '60px' }}
            startIcon={<Search />}
            onClick={onSearchClick}
          >
            검색
          </Button>
        </div>
        <div className="flex_section_row align_center mt30">
          {/* <div className="blueLabelText ml10 mt05 ">지도확대</div>
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

          {/* <SidoSelect ref={sido} />
          <GunGuSelect />
          <DongSelect />
          <RiSelector /> */}

          <input
            ref={nameRef}
            type="text"
            onClick={nameReset}
            onKeyUp={nameEnterInput}
            className="baseInput"
            style={{ width: '200px' }}
          />
          <Button
            variant="contained"
            color="primary"
            size="small"
            className="fl_width_90 ml05"
            startIcon={<Home />}
          >
            지번검색
          </Button>
          {/* <Button
              variant="contained"
              color="primary"
              size="small"
              className="ml05"
              style={{ width: '90px' }}
              startIcon={<Spellcheck />}
              onClick={nameSearch}
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
          setOpenI={setOpenI}
          mapDestName={mapDestName}
          refDestName={refDestName}
          curLonLat={curLonLat}
          setCurLonLat={setCurLonLat}
          shopCurrentLat={shopCurrentLat}
          shopCurrentLon={shopCurrentLon}
          setDestJibunAddr={setDestJibunAddr}
          setDestRoadAddr={setDestRoadAddr}
          shopStr={shopStr!}
          ref={childRef}
          data={data!}
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
      <Popup
        open={openI}
        closeOnDocumentClick={false}
        onClose={closeModalI || closeModalSave}
        contentStyle={{ width: '340px', height: '300px' }}
      >
        <div>
          <InsertDestination
            closeModal={closeModalI}
            closeModalSave={closeModalSave}
            setMapDestName={setMapDestName}
            setMapSelType={setMapSelType}
            setAlertText={setAlertText}
            setOpenA={setOpenA}
          />
        </div>
      </Popup>
    </Split>
  );
};

export default React.memo(DestinationManagement);
