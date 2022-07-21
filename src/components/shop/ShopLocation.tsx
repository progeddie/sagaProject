import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Split from 'react-split';

// Popup
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

// confirm
import { confirmAlert } from 'react-confirm-alert';
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

import Home from '@material-ui/icons/Home';
import Spellcheck from '@material-ui/icons/Spellcheck';
import AddLocation from '@material-ui/icons/AddLocation';
import LocationOff from '@material-ui/icons/LocationOff';

// CSS
import '../../css/map/destmanager.css';
import '../../css/map/copypop.css';

// API
import {
  searchShopLocListAsync,
  getShopItemListAsync,
  setShopAddrAsync,
} from '../../modules/shopLocation/actions';
import {
  searchShopLocSendData,
  shopItemSendData,
  shopItemList,
  setShopAddrSendData,
} from '../../api/interface/shopLocation/shopLocation';

import NaverMap, { IrefShopLocMarker } from '../common/naver/ShopLocationMaker';

import SidoSelect from '../common/area/SidoSelect';
import GunGuSelect from '../common/area/GunGuSelect';
import DongSelect from '../common/area/DongSelect';
import RiSelector from '../common/area/RiSelector';

import ShopLocationPop from './popup/ShopLocation';

// Common
import {
  getNameShopListAsync,
  getDongListAsync,
  getDaumAddrAsync,
} from '../../modules/common/actions';
import {
  nameShopListSendData,
  nameShopList,
  daumAddrSendData,
  daumAddrResult,
} from '../../api/interface/common/area/area';

// Alert
import Alert from '../common/Alert';

// 로딩화면
import Loader from '../common/Loader';

import { RootState } from '../../modules';
import { shopLonLat, lonLat } from '../common/naver/interface/Coordinate';

import { changePhoneNumber } from '../../util/common';

export interface urlParam {
  CCCode: string;
  ModName: string;
  ModUCode: number;
}

const ShopLocation = (props: any) => {
  const { urlParams } = props;
  let jsonString: urlParam = {
    CCCode: '',
    ModName: '',
    ModUCode: 0,
  };
  try {
    jsonString = JSON.parse(decodeURI(atob(urlParams.commonParams)));
  } catch (e) {
    console.log(e);
  }

  const [open, setOpen] = useState(false);
  const [openI, setOpenI] = useState(false);
  const closeModal = () => setOpen(false);
  const [chkShop, setChkShop] = useState(false);
  const [currentItem, setCurrentItem] = useState('');
  const [shopCurrentLat, setShopCurrentLat] = useState<number>(0);
  const [shopCurrentLon, setShopCurrentLon] = useState<number>(0);
  const [clickName, setClickName] = useState<string>('');

  const [gridApi, setGridApi] = useState<GridApi>();

  // 명칭 검색 선택저장
  const [shopStr, setShopStr] = useState<string | null>('');

  // 커스텀 얼럿
  const [openA, setOpenA] = useState(false);
  const closeModalA = () => setOpenA(false);
  const [alertText, setAlertText] = useState('');
  const [alertType, setAlertType] = useState('');
  const [destJibunAddr, setDestJibunAddr] = useState<string>('');
  const [destRoadAddr, setDestRoadAddr] = useState<string>('');
  const [currShopCD, setCurrShopCD] = useState<string>('');

  const childRef = useRef<IrefShopLocMarker>(null);
  const searchHidden = useRef() as React.MutableRefObject<HTMLDivElement>;
  const searchText = useRef() as React.MutableRefObject<HTMLDivElement>;
  const sido = useRef() as React.MutableRefObject<HTMLSelectElement>;
  const areaNameRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const nameRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const shopItemRef = useRef() as React.MutableRefObject<HTMLSelectElement>;
  const lonlngYNRef = useRef() as React.MutableRefObject<HTMLSelectElement>;
  const shopNameRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const salesRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const shopAddrRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  // 가맹점 좌표
  const [curLonLat, setCurLonLat] = useState<shopLonLat>({
    lat: 0,
    lon: 0,
    shopName: '',
  });

  // 포커스 좌표
  const [curFLonLat, setCurFLonLat] = useState<lonLat>({
    lat: 0,
    lon: 0,
  });

  const dispatch = useDispatch();
  const { loading, data, error } = useSelector(
    (state: RootState) => state.searchShopLocList.searchShopLocList
  );

  const {
    loading: itemLoading,
    data: itemData,
    error: itemLoadingError,
  } = useSelector((state: RootState) => state.getShopItemList.shopItemList);

  const {
    loading: getNameShopLoading,
    data: nameShopData,
    error: nameShopError,
  } = useSelector((state: RootState) => state.cNameShopList.nameShopList);

  const {
    loading: getDaumAddrLoading,
    data: getDaumAddrData,
    error: getDaumAddrError,
  } = useSelector((state: RootState) => state.getDaumAddr.result);

  const {
    loading: setShopAddrLoading,
    data: setShopAddrData,
    error: setShopAddrError,
  } = useSelector((state: RootState) => state.setShopAddr.result);

  const nameShopSendData: nameShopListSendData = {
    JobGbn: '',
    SiDoCode: '',
    PlaceName: '',
  };

  const searchShopList = useCallback(() => {
    const searchShopLocData: searchShopLocSendData = {
      JobGbn: '1',
      CCCode: jsonString.CCCode,
      ShopName: '%',
      Mcode: 0,
      UseGbn: 'Y',
      ItemCD: '%',
      SalesName: '%',
      GpsGbn: '%',
    };

    searchShopLocData.JobGbn = '1';
    searchShopLocData.CCCode = jsonString.CCCode;
    searchShopLocData.ShopName = shopNameRef.current.value ? shopNameRef.current.value : '%';
    searchShopLocData.Mcode = 6;
    searchShopLocData.UseGbn = 'Y';
    searchShopLocData.ItemCD = shopItemRef.current.value;
    searchShopLocData.SalesName = salesRef.current.value ? salesRef.current.value : '%';
    searchShopLocData.GpsGbn = lonlngYNRef.current.value;
    dispatch(searchShopLocListAsync.request(searchShopLocData));
    setCurrentItem(shopItemRef.current.value);
    shopAddrRef.current.value = '';
  }, [dispatch]);

  // 조회 버튼 클릭
  const onCheckClick = useCallback(() => {
    searchShopList();
  }, [searchShopList]);

  const onGridReady = (params: any) => {
    setGridApi(params.api);
  };

  // 명칭검색 리스트 선택
  const nameSearchSelShop = (params: any) => {
    setShopStr(params.data.POI_NAME);
    setShopCurrentLat(params.data.LAT);
    setShopCurrentLon(params.data.LON);
  };

  const hashValueGetter = (params: any) => {
    return params.node.rowIndex + 1;
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

  const changePhone = (params: any) => {
    return changePhoneNumber(params.data.TELNO);
  };

  const getRowStyle = (params: any) => {
    let color = 'black';
    if (params.data.LAT !== 0 && params.data.LAT !== null) {
      color = 'blue';
    }
    return { color };
  };

  useEffect(() => {
    const shopItemData: shopItemSendData = {
      JobGbn: '10',
    };

    onCheckClick();
    dispatch(getShopItemListAsync.request(shopItemData));
  }, [onCheckClick, dispatch]);

  const selShop = (params: any) => {
    const addr1: string = params.data.ADDR1 === null ? '' : params.data.ADDR1;
    const addr2: string = params.data.ADDR2 === null ? '' : params.data.ADDR2;
    if (params.data.LAT !== 0 && params.data.LON !== 0) {
      const point: shopLonLat = {
        lat: params.data.LAT,
        lon: params.data.LON,
        shopName: params.data.SHOP_NAME,
      };

      setCurLonLat(point);
      shopAddrRef.current.value = `${addr1} ${addr2}`;
    } else {
      shopAddrRef.current.value = '';
    }

    setCurrShopCD(params.data.SHOP_CD);
  };

  // 위치확정
  const destPositionSave = () => {
    if (gridApi !== undefined) {
      const selectItem = gridApi.getSelectedNodes();
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

      if (curFLonLat.lon === 0 && curFLonLat.lat === 0) {
        setAlertText(`맵을 클릭해주세요!`);
        setOpenA((o: any) => !o);
        return;
      }

      confirmAlert({
        title: '위치확정 확인',
        message: `이 좌표로 위치저장 하시겠습니까?`,
        buttons: [
          {
            label: 'YES',
            onClick: () => {
              childRef.current?.getShopLocation();
              // childRef.current?.getDestAddr();
            },
          },
          {
            label: 'NO',
            onClick: () => {
              // childRef.current?.cancelDestAddr();
            },
          },
        ],
      });
    }
  };

  useEffect(() => {
    if (destJibunAddr) {
      const daumAddrSend: daumAddrSendData = {
        JobGbn: '1',
        Addr: '',
      };

      daumAddrSend.Addr = destJibunAddr;
      dispatch(getDaumAddrAsync.request(daumAddrSend));
    }
  }, [destJibunAddr]);

  useEffect(() => {
    const setShopSend: setShopAddrSendData = {
      JobGbn: '1',
      CCCode: jsonString.CCCode,
      ShopCode: '',
      Mcode: 0,
      Lon: 0,
      Lat: 0,
      SiDo: '',
      GunGu: '',
      Dong: '',
      ModUCode: jsonString.ModUCode,
      ModName: jsonString.ModName,
    };

    if (!getDaumAddrLoading && getDaumAddrData) {
      if (clickName === '위치확정') {
        const result = getDaumAddrData;
        setShopSend.ShopCode = currShopCD;
        setShopSend.Lon = Math.floor(curFLonLat.lon * 360000);
        setShopSend.Lat = Math.floor(curFLonLat.lat * 360000);
        setShopSend.SiDo = result[0].SIDO;
        setShopSend.GunGu = result[0].GUNGU;
        setShopSend.Dong = result[0].DONG;
        dispatch(setShopAddrAsync.request(setShopSend));

        setDestJibunAddr('');
        setDestRoadAddr('');
        setCurrShopCD('');
      } else if (clickName === '위치해제') {
        const result = getDaumAddrData;
        setShopSend.ShopCode = currShopCD;
        setShopSend.Lon = 0;
        setShopSend.Lat = 0;
        setShopSend.SiDo = result[0].SIDO;
        setShopSend.GunGu = result[0].GUNGU;
        setShopSend.Dong = result[0].DONG;
        dispatch(setShopAddrAsync.request(setShopSend));

        setDestJibunAddr('');
        setDestRoadAddr('');
        setCurrShopCD('');
        shopAddrRef.current.value = '';
      }
    }
  }, [getDaumAddrLoading, getDaumAddrData]);

  useEffect(() => {
    if (!setShopAddrLoading && setShopAddrData) {
      const result: string = String(setShopAddrData);
      const resultMessage: string[] = result.split('@');
      let inStr: string = '';
      // 저장 방식은 총4개이다. 맵에서우클릭 / 목적지추가 / 위치확정 / 위치해제
      if (clickName === '위치확정') {
        inStr = '위치저장';
      } else {
        inStr = '위치해제';
      }
      if (resultMessage.length > 1) {
        if (resultMessage[0] !== '00') {
          setAlertText(`${inStr} 에 실패 하였습니다.`);
          return;
        }
        setAlertText(`${inStr} 되었습니다.`);

        setOpenA((o: any) => !o);
        searchShopList();
      }
    }
  }, [setShopAddrLoading, setShopAddrData]);

  // 위치해제
  const destPositionCancel = () => {
    if (gridApi !== undefined) {
      const selectItem = gridApi.getSelectedNodes();
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

      confirmAlert({
        title: '위치해제 확인',
        message: `위치해제 하시겠습니까?`,
        buttons: [
          {
            label: 'YES',
            onClick: () => {
              childRef.current?.getShopAddr();
            },
          },
          {
            label: 'NO',
            onClick: () => {
              // childRef.current?.cancelDestAddr();
            },
          },
        ],
      });
    }
  };

  return (
    <Split className="split" sizes={[17, 83]}>
      {(loading === true || setShopAddrLoading === true) && (
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
          <div className="blueLabel mt05">업종</div>
          <select ref={shopItemRef} className="baseSelect mg05">
            <option value="%">전체</option>
            {itemData &&
              itemData.map((d: shopItemList) => (
                <option key={d.ITEM_CD} value={d.ITEM_CD}>
                  {d.ITEM_NAME}
                </option>
              ))}
          </select>
          <div className="blueLabel mt05 ml05">가맹점명</div>
          <input
            ref={shopNameRef}
            type="text"
            className="baseInput mg05"
            style={{ width: '150px' }}
          />
        </div>
        <div className="flex_section_row">
          <div className="blueLabel">좌표</div>
          <select ref={lonlngYNRef} className="baseSelect ml05">
            <option value="%">전체</option>
            <option value="Y">있음</option>
            <option value="N">없음</option>
          </select>
          <div className="blueLabel ml10">영업사원</div>
          <input ref={salesRef} type="text" className="baseInput ml05" style={{ width: '150px' }} />
        </div>

        <div className="flex_section_row mt10">
          <div className="blueLabelText mt05">가맹점 주소</div>
          <input
            ref={shopAddrRef}
            type="text"
            className="baseInput ml05 mt05"
            style={{ width: '140px' }}
          />
          <Button
            variant="contained"
            color="primary"
            size="small"
            className="ml05 mt05"
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
            className="ml05 mt05"
            style={{ width: '100px' }}
            startIcon={<LocationOff />}
            onClick={destPositionCancel}
          >
            위치해제
          </Button>
        </div>

        <div className="flex_section_row mt20 ml05">
          <input type="checkbox" onChange={() => setChkShop(!chkShop)} />
          <div className="ml05 blueText fontsize_13"> 선택한 가맹점만 보기</div>
        </div>

        <div
          className="flex_section_row stretch mt10"
          style={{
            height: '99%',
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
              rowData={data!}
              rowSelection="multiple"
              headerHeight={40}
              onRowClicked={selShop}
              getRowStyle={getRowStyle}
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
                headerName="지점명"
                field="CCNAME"
                minWidth={180}
                columnsMenuParams={{
                  suppressColumnFilter: true,
                  suppressColumnSelectAll: true,
                  suppressColumnExpandAll: true,
                }}
                filter="agTextColumnFilter"
              />
              <AgGridColumn
                headerName="가맹점명"
                field="SHOP_NAME"
                minWidth={180}
                columnsMenuParams={{ contractColumnSelection: true }}
                filter="agTextColumnFilter"
              />
              <AgGridColumn
                headerName="전화번호"
                field="TELNO"
                minWidth={180}
                columnsMenuParams={{ contractColumnSelection: true }}
                cellRenderer={changePhone}
                filter="agTextColumnFilter"
              />
            </AgGridReact>
          </div>
        </div>
      </div>
      <div className="right_box flex_section_column ml10">
        <div className="flex_section_row ml0">
          {/* <Button
            variant="contained"
            color="primary"
            size="small"
            className="mr10 mt05"
            style={{ width: '70px', height: '70px' }}
            startIcon={<Close />}
          >
            종료
          </Button> */}
          <Button
            variant="contained"
            color="primary"
            size="small"
            className="mr05 mt05"
            style={{ width: '70px', height: '60px' }}
            onClick={onCheckClick}
            startIcon={<Search />}
          >
            조회
          </Button>
          {/* <Button
            variant="contained"
            color="primary"
            size="small"
            className="mr15 mt40"
            style={{ width: '200px' }}
            startIcon={<Search />}
            onClick={() => setOpen((o) => !o)}
          >
            다음검색
          </Button> */}
          {/* <div className="blueLabelText ml05 mt05 ">지도확대</div>
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
          {/* <div className="cb" />
          <div className="fl" style={{ marginLeft: '200px' }}>
            <SidoSelect ref={sido} style={{ width: '90px' }} />
            <GunGuSelect style={{ width: '90px' }} />
            <DongSelect style={{ width: '90px' }} />
            <RiSelector style={{ width: '90px' }} />
          </div> */}
        </div>

        <div className="flex_section_row mt10">
          <input
            type="text"
            ref={nameRef}
            className="baseInput mt05"
            style={{ width: '200px' }}
            onClick={nameReset}
            onKeyUp={nameEnterInput}
          />
          <Button
            variant="contained"
            color="primary"
            size="small"
            className="ml05 mt05"
            style={{ width: '90px' }}
            startIcon={<Home />}
          >
            지번검색
          </Button>
          {/* <Button
              variant="contained"
              color="primary"
              size="small"
              className="ml05 mt05"
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
              className="ml05 mt05"
              style={{ width: '100px' }}
              startIcon={<Search />}
              onClick={searchHiddenOpen}
            >
              <div ref={searchText}>검색창열기</div>
            </Button> */}

          <Popup
            open={open}
            closeOnDocumentClick
            onClose={closeModal}
            contentStyle={{ width: '632px', height: '600px' }}
          >
            <div>
              <ShopLocationPop closeModal={closeModal} />
            </div>
          </Popup>
        </div>
        <NaverMap
          style={{ height: '100%', width: '100%', marginTop: '10px' }}
          check={chkShop}
          setOpenI={setOpenI}
          curLonLat={curLonLat}
          setCurFLonLat={setCurFLonLat}
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
    </Split>
  );
};

export default React.memo(ShopLocation);
