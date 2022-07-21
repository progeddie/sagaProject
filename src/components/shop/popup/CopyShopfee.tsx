import React, { useState, useEffect, createRef, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AgGridReact, AgGridColumn } from '@ag-grid-community/react';
import { AllModules, GridApi } from '@ag-grid-enterprise/all-modules';
import '@ag-grid-enterprise/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-enterprise/all-modules/dist/styles/ag-theme-alpine.css';

// Popup
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Close from '@material-ui/icons/Close';
import Search from '@material-ui/icons/Search';
import DeleteForever from '@material-ui/icons/DeleteForever';
import FileCopy from '@material-ui/icons/FileCopy';
import CheckBox from '@material-ui/icons/CheckBox';
import CheckBoxOutlined from '@material-ui/icons/CheckBoxOutlined';
import { confirmAlert } from 'react-confirm-alert';

import { groupBy, changePhoneNumber, makeComma } from '../../../util/common';

// Alert
import Alert from '../../common/Alert';

// 로딩화면
import Loader from '../../common/Loader';

import CopyShopSelect from '../../common/area/CopyShopSelect';

// Action
import {
  getCopyShopInfoAsync,
  getAreaAmtListAsync,
  getShopPayCheckAsync,
  copyAreaAmtAsync,
} from '../../../modules/shopFee/actions';

// confirm
import 'react-confirm-alert/src/react-confirm-alert.css';

// API
import {
  getCopyShopInfoData,
  getAreaAmtListData,
  getShopPayCheckSendData,
  copyAreaAmtSendData,
} from '../../../api/interface/shopFee/shopFee';

import {
  resetResponsePayCheck,
  getResponsePayCheck,
  resetResponseAreaAmt,
  getResponseAreaAmt,
  copyAreaAmtExec,
} from '../../../api/shopFee/shopFee';

import { RootState } from '../../../modules';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const CopyShopfee = (props: any) => {
  const [selCC, setSelCC] = useState('');
  const [areaDataGroup, setAreaDataGroup] = useState(new Map());
  const { closeModal } = props;
  const { CCCODE } = props;
  const { selShop } = props;
  const { ModUCode } = props;
  const { ModUName } = props;
  const { Mcode } = props;

  const [procCnt, setProcCnt] = useState(0);
  const [procCnt2, setProcCnt2] = useState(0);
  const [procCnt3, setProcCnt3] = useState(0);
  const [clickName, setClickName] = useState('');

  // 경고창이 3줄이 필요할때
  const [alertText, setAlertText] = useState('');
  const [alertText2, setAlertText2] = useState('');
  const [alertText3, setAlertText3] = useState('');

  const [alertType, setAlertType] = useState('');
  const [inLock, setInLock] = useState(false);
  const [inLock2, setInLock2] = useState(false);
  const [openA, setOpenA] = useState(false);
  const closeModalA = () => setOpenA(false);

  const deleteTextRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const shopNameRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const classes = useStyles();

  const { loading, data, error } = useSelector(
    (state: RootState) => state.getCopyShopInfo.copyShopInfo
  );

  const {
    loading: getAreaAmtLoading,
    data: getAreaAmtData,
    error: getAreaAmtError,
  } = useSelector((state: RootState) => state.getAreaAmtList.areaAmtList);

  const {
    loading: getShopPayCheckLoading,
    data: getShopPayCheckData,
    error: getShopPayCheckError,
  } = useSelector((state: RootState) => state.getShopPayCheckExec.shopPayCheck);

  const {
    loading: copyAreaAmtLoading,
    data: copyAreaAmtData,
    error: copyAreaAmtError,
  } = useSelector((state: RootState) => state.copyAreaAmtExec.copyAreaAmt);

  const dispatch = useDispatch();

  const [gridApi, setGridApi] = useState<GridApi>();
  const [areaGridApi, setAreaGridApi] = useState<GridApi>();
  const onGridReady = (params: any) => {
    setGridApi(params.api);
  };

  const onAreaGridReady = (params: any) => {
    setAreaGridApi(params.api);
  };

  const getCopyShopInfo: getCopyShopInfoData = {
    JobGbn: '1',
    CCCode: CCCODE,
    OrgCCCode: CCCODE,
    ShopCode: selShop,
    ShopName: '%%',
    Mcode: 0,
    Distance: 0,
    OriDistance: 0,
    Seq: 0,
    ModUCode: 0,
  };

  const getAreaAmtList: getAreaAmtListData = {
    JobGbn: '1',
    CCCode: CCCODE,
    ShopCode: selShop,
    UseGbn: '%',
  };

  const getShopPayCheck: getShopPayCheckSendData = {
    JobGbn: 'PAYAREA',
    CCCode: CCCODE,
    ShopCode: '',
    DestName: '',
    Seq: 0,
  };

  const copyAreaAmtSend: copyAreaAmtSendData = {
    JobGbn: 'I',
    CCCode: CCCODE,
    ShopCode: selShop,
    ModName: '',
    Seq: 0,
    DeleteMemo: '',
  };

  const areaDataSingle: any[] = [];
  let count = 0;

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

  const payGetter = (params: any) => {
    const money = params.data.PAY_AMT;
    return makeComma(money);
  };

  const selectAllList2 = () => {
    if (areaGridApi !== undefined) {
      areaGridApi.selectAll();
    }
  };

  const deselectAllList2 = () => {
    if (areaGridApi !== undefined) {
      areaGridApi.deselectAll();
    }
  };

  const changePhone = (params: any) => {
    return changePhoneNumber(params.data.TELNO);
  };

  const areaFeeDelete = () => {
    if (gridApi !== undefined) {
      const selectItem = gridApi.getSelectedNodes();

      resetResponseAreaAmt();
      setInLock2(false);

      if (selectItem.length === 0) {
        setAlertText('삭제할 가맹점을 선택하세요!');
        setOpenA((o) => !o);
        return;
      }

      confirmAlert({
        title: '삭제여부 확인',
        message: `총 ${selectItem.length}개의 가맹점을 모두 삭제하시겠습니까?`,
        buttons: [
          {
            label: 'YES',
            onClick: () => {
              deleteTextRef.current.innerHTML = '요금삭제 처리중입니다...';
              setClickName('삭제');
              let i = 0;
              selectItem.forEach((val: any, key: any) => {
                copyAreaAmtSend.JobGbn = 'ALLDEL';
                copyAreaAmtSend.Seq = 0;
                copyAreaAmtSend.CCCode = val.data.CCCODE;
                copyAreaAmtSend.ShopCode = val.data.SHOP_CD;
                copyAreaAmtSend.ModName = '김한욱';
                copyAreaAmtSend.DeleteMemo = '';
                dispatch(copyAreaAmtAsync.request(copyAreaAmtSend));
                i++;
              });
              setProcCnt2(i);
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

  const areaFeeCopy = () => {
    if (gridApi !== undefined && areaGridApi !== undefined) {
      const selectItem = gridApi.getSelectedNodes();
      const areaSelectItem = areaGridApi.getSelectedNodes();

      setClickName('복사');

      resetResponsePayCheck();
      resetResponseAreaAmt();
      setInLock(false);
      setInLock2(false);

      if (selectItem.length === 0) {
        setAlertText('복사할 가맹점을 선택하세요!');
        setOpenA((o) => !o);
        return;
      }
      if (areaSelectItem.length === 0) {
        setAlertText('선택된 복사하실 구역요금이 없습니다!');
        setOpenA((o) => !o);
        return;
      }

      // 구역요금 중복 자체 체크 (시작)
      let sameStr: string = '';
      let sameYn: string = 'N';

      const gData: Map<any, any> = groupBy(areaDataSingle, (temp: any) => temp.AREA_NAME);
      gData.forEach((val: any, key: any) => {
        if (val.length > 1) {
          sameStr += `${key} `;
          sameYn = 'Y';
        }
      });

      if (sameYn === 'Y') {
        setAlertText(`복사하려는 구역명이 동일한 이름을 가질수 없습니다. 구역명 : ${sameStr}`);
        setAlertText2('구역명이 중복되지 않도록 설정후 다시 시도하여 주십시오.');
        setOpenA((o: any) => !o);
        return;
      }
      // 구역요금 중복 자체 체크 (끝)

      confirmAlert({
        title: '복사여부 확인',
        message: `총 ${selectItem.length}개의 가맹점으로 복사 하시겠습니까?`,
        buttons: [
          {
            label: 'YES',
            onClick: () => {
              let i = 0;
              selectItem.forEach((val: any, key: any) => {
                areaSelectItem.forEach((v: any, k: any) => {
                  getShopPayCheck.ShopCode = val.data.SHOP_CD;
                  getShopPayCheck.DestName = v.data.AREA_NAME;
                  getShopPayCheck.Seq = Number(v.data.SEQNO);
                  dispatch(getShopPayCheckAsync.request(getShopPayCheck));
                  i++;
                });
              });
              setProcCnt(i);
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

  // 중복체크 결과 반환
  // 경로 : api/shopFee/shopFee 에 함수구현
  useEffect(() => {
    if (
      getResponsePayCheck().length !== 0 &&
      procCnt === getResponsePayCheck().length &&
      inLock === false
    ) {
      setInLock(true);

      const repeatArr: string[] = [];
      const resArr: string[] = getResponsePayCheck();
      // 중복체크
      resArr.forEach((val: any, key: any) => {
        const Arrtemp: string[] = val.split('|');
        if (Number(Arrtemp[0]) > 0) {
          repeatArr.push(Arrtemp[1]);
        }
      });

      // 중복제거
      const set = new Set(repeatArr);
      const uniqueArr = [...set];
      let repeatString: string = '';

      uniqueArr.forEach((val: any, key: any) => {
        if (key === 0) repeatString += `구역명 : ${val}`;
        else repeatString += ` \n구역명 : ${val}`;
      });

      // 복사실행
      if (repeatString === '') {
        areaFeeCopyProc();
      } else {
        confirmAlert({
          title: '구역요금 복사여부 확인',
          message: `중복되는 가맹점의 구역요금이 있습니다. \n\n${repeatString}\n\n 위 구역을 제외하고 복사 하시겠습니까?`,
          buttons: [
            {
              label: 'YES',
              onClick: () => {
                areaFeeCopyProc();
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
    }
  }, [procCnt, getResponsePayCheck().length]);

  const areaFeeCopyProc = () => {
    const i = copyAreaAmtExec(CCCODE, selShop);

    if (i === 0) {
      setAlertText('복사할 구역요금이 없습니다.');
      setOpenA((o: any) => !o);
    } else {
      setProcCnt3(i);
    }
  };

  // 구역요금 삭제 결과 처리
  // 경로 : api/shopFee/shopFee 에 함수구현
  useEffect(() => {
    if (
      getResponseAreaAmt().length !== 0 &&
      procCnt2 === getResponseAreaAmt().length &&
      inLock2 === false
    ) {
      setInLock2(true);

      const resArr: string[] = getResponseAreaAmt();
      // 중복체크
      let okCheck: boolean = true;
      resArr.forEach((val: any, key: any) => {
        const Arrtemp: string[] = val.split('@');
        // 00 이 아니면 비정상결과
        if (Arrtemp[0] !== '00') {
          okCheck = false;
        }
      });

      if (okCheck === true) {
        setAlertText(`삭제가 완료 되었습니다.`);
        setOpenA((o: any) => !o);
        deleteTextRef.current.innerHTML = '선택가맹점 구역요금 전체삭제';
      } else {
        setAlertText(`삭제가 비정상 동작 하였습니다. 관리자에게 문의해 주세요.`);
        setOpenA((o: any) => !o);
      }
    }
  }, [procCnt2, getResponseAreaAmt().length]);

  useEffect(() => {
    if (procCnt3 > 0) {
      setProcCnt3(0);
      const resArr: string[] = getResponseAreaAmt();
      // 중복체크
      let okCheck: boolean = true;
      resArr.forEach((val: any, key: any) => {
        const Arrtemp: string[] = val.split('@');
        // 00 이 아니면 비정상결과
        if (Arrtemp[0] !== '00') {
          okCheck = false;
        }
      });

      if (okCheck === true) {
        setAlertText(`복사가 완료 되었습니다.`);
        setOpenA((o: any) => !o);
      } else {
        setAlertText(`복사가 비정상 동작 하였습니다. 관리자에게 문의해 주세요.`);
        setOpenA((o: any) => !o);
      }
    }
  }, [procCnt3]);

  useEffect(() => {
    setAreaDataGroup(groupBy(getAreaAmtData, (temp: any) => temp.AREA_NAME));
  }, [getAreaAmtData]);

  areaDataGroup.forEach((val: any, key: any, mapObject: any) => {
    areaDataSingle[count] = val[0];
    count++;
  });

  // 지점 선택시 좌측리스트 재호출
  useEffect(() => {
    if (selCC) {
      searchShopInfo(selCC);
    }
  }, [selCC]);

  const searchShopInfo = (selCCCode: string) => {
    getCopyShopInfo.CCCode = selCCCode !== '' ? selCCCode : CCCODE;
    getCopyShopInfo.ShopName =
      shopNameRef.current.value !== '' ? `%${shopNameRef.current.value}%` : '%%';
    dispatch(getCopyShopInfoAsync.request(getCopyShopInfo));
  };

  const searchClick = () => {
    searchShopInfo(selCC);
  };

  useEffect(() => {
    if (CCCODE) {
      dispatch(getAreaAmtListAsync.request(getAreaAmtList));
    }
  }, [CCCODE]);

  // 바닥페이지에서 선택한 가맹점은 리스트에서 제외
  useEffect(() => {
    if (!loading && data) {
      let sliceKey: number = 0;
      data.forEach((val: any, key: any) => {
        if (val.SHOP_CD === selShop) {
          sliceKey = key;
        }
      });
      data.splice(sliceKey, 1);
    }
  }, [data, loading]);

  const closeProc = () => {
    setOpenA(false);
    resetResponsePayCheck();
    resetResponseAreaAmt();
    closeModal();
  };

  useEffect(() => {
    const handleEsc = (event: any) => {
      if (event.keyCode === 27) {
        closeProc();
      }
    };
    window.addEventListener('keydown', handleEsc);

    dispatch(getCopyShopInfoAsync.request(getCopyShopInfo));
  }, []);

  return (
    <div>
      {getAreaAmtLoading === true && (
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
          <Alert
            closeModal={closeModalA}
            text={alertText}
            text2={alertText2}
            text3={alertText3}
            type={alertType}
          />
        </div>
      </Popup>
      <div className="wd100 ml05" style={{ height: '25px', backgroundColor: '#FFF' }}>
        <div className="fl">
          <img
            src="../../../images/foodquick_new.ico"
            style={{ width: '20px', height: '20px' }}
            alt="1"
          />
        </div>
        <div className="fl ml04 mt02">가맹점 구역요금 복사</div>
      </div>
      <div className="modal" style={{ width: '100%', height: '778px', backgroundColor: '#ebecef' }}>
        <button className="close" onClick={closeProc}>
          &times;
        </button>
        {/* <div className="header"> Modal Title </div> */}
        <div className="content">
          <div style={{ height: '72px' }}>
            <div className="wd50 fl">
              <div className="blueLabel fl mt05">지점명</div>
              <CopyShopSelect selCC={selCC} setSelCC={setSelCC} style={{ width: '50px' }} />
              <Button
                variant="contained"
                color="primary"
                size="small"
                className={classes.button}
                style={{
                  width: '192px',
                  marginLeft: '4px',
                  marginTop: '5px',
                  marginRight: '2px',
                }}
                startIcon={<DeleteForever />}
                onClick={areaFeeDelete}
              >
                <div ref={deleteTextRef}>선택가맹점 구역요금 전체삭제</div>
              </Button>
              <div className="cb" />
              <div className="blueLabel fl mt05">가맹점명</div>
              <input
                type="text"
                ref={shopNameRef}
                className="baseInput fl mg05"
                style={{ width: '200px' }}
              />
              <Button
                variant="contained"
                color="primary"
                size="small"
                className="fl mt05"
                style={{ width: '93px' }}
                startIcon={<CheckBox />}
                onClick={selectAllList}
              >
                전체 선택
              </Button>
              <Button
                variant="contained"
                color="primary"
                size="small"
                className="fl ml03 mt05"
                style={{ width: '93px' }}
                startIcon={<CheckBoxOutlined />}
                onClick={deselectAllList}
              >
                전체 취소
              </Button>
            </div>
            <div className="wd50 fl">
              <Button
                variant="contained"
                color="primary"
                size="small"
                className={classes.button}
                style={{
                  width: '155px',
                  height: '35px',
                  marginLeft: '3px',
                  marginTop: '5px',
                  marginRight: '1px',
                }}
                startIcon={<FileCopy />}
                onClick={areaFeeCopy}
              >
                복사하기
              </Button>
              <Button
                variant="contained"
                color="primary"
                size="small"
                className={classes.button}
                style={{
                  width: '155px',
                  height: '35px',
                  marginLeft: '10px',
                  marginTop: '5px',
                  marginRight: '1px',
                }}
                startIcon={<Search />}
                onClick={searchClick}
              >
                검색
              </Button>
              <Button
                variant="contained"
                color="primary"
                size="small"
                className={classes.button}
                style={{
                  width: '155px',
                  height: '35px',
                  marginTop: '5px',
                  marginLeft: '10px',
                }}
                startIcon={<Close />}
                onClick={closeProc}
              >
                창닫기
              </Button>
              <div className="cb" />

              <Button
                variant="contained"
                color="primary"
                size="small"
                className="fr mr10"
                style={{ width: '95px' }}
                startIcon={<CheckBoxOutlined />}
                onClick={deselectAllList2}
              >
                전체 취소
              </Button>
              <Button
                variant="contained"
                color="primary"
                size="small"
                className="fr mr05"
                style={{ width: '95px' }}
                startIcon={<CheckBox />}
                onClick={selectAllList2}
              >
                전체 선택
              </Button>
            </div>
          </div>
          <div className="shopFeeContent">
            <div
              style={{
                height: '684px',
                width: '490px',
              }}
              className="ag-theme-alpine fl mt03 ml03"
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
                rowSelection="multiple"
                headerHeight={70}
                onGridReady={onGridReady}
                rowData={data!}
              >
                <AgGridColumn
                  headerName=""
                  field="check"
                  minWidth={10}
                  maxWidth={35}
                  headerCheckboxSelection
                  headerCheckboxSelectionFilteredOnly
                  checkboxSelection
                />
                <AgGridColumn
                  headerName="가맹점명"
                  field="SHOP_NAME"
                  minWidth={180}
                  columnsMenuParams={{
                    suppressColumnFilter: true,
                    suppressColumnSelectAll: true,
                    suppressColumnExpandAll: true,
                  }}
                  filter="agTextColumnFilter"
                />
                <AgGridColumn
                  headerName="전화번호"
                  field="TELNO"
                  minWidth={180}
                  columnsMenuParams={{ contractColumnSelection: true }}
                  filter="agTextColumnFilter"
                  cellRenderer={changePhone}
                />
                <AgGridColumn
                  headerName="대표자"
                  field="OWNER"
                  minWidth={170}
                  columnsMenuParams={{ contractColumnSelection: true }}
                  filter="agTextColumnFilter"
                />
                <AgGridColumn
                  headerName="주소"
                  field="ADDR1"
                  minWidth={270}
                  columnsMenuParams={{ contractColumnSelection: true }}
                  filter="agTextColumnFilter"
                />
              </AgGridReact>
            </div>
            <div className="fl" style={{ fontSize: '40px', marginTop: '345px' }}>
              &#129168;
            </div>
            <div className="tabmenu fl ml02" style={{ width: '489px' }}>
              <div className="tabCon">
                <div
                  style={{
                    height: '684px',
                    width: '480px',
                  }}
                  className="ag-theme-alpine ml03 mt03 mb03"
                >
                  <AgGridReact
                    modules={AllModules}
                    defaultColDef={{
                      flex: 1,
                      resizable: true,
                      menuTabs: ['columnsMenuTab'],
                      columnsMenuParams: {
                        suppressSyncLayoutWithGrid: true,
                      },
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
                    rowSelection="multiple"
                    headerHeight={70}
                    rowData={areaDataSingle!}
                    onGridReady={onAreaGridReady}
                    singleClickEdit
                  >
                    <AgGridColumn
                      headerName=""
                      field="check"
                      minWidth={20}
                      maxWidth={35}
                      headerCheckboxSelection
                      headerCheckboxSelectionFilteredOnly
                      checkboxSelection
                    />
                    <AgGridColumn
                      headerName="구역명"
                      field="AREA_NAME"
                      minWidth={170}
                      columnsMenuParams={{
                        suppressColumnFilter: true,
                        suppressColumnSelectAll: true,
                        suppressColumnExpandAll: true,
                      }}
                      filter="agTextColumnFilter"
                    />
                    <AgGridColumn
                      headerName="요금"
                      field="PAY_AMT"
                      minWidth={100}
                      columnsMenuParams={{ contractColumnSelection: true }}
                      filter="agTextColumnFilter"
                      cellRenderer={payGetter}
                    />
                    <AgGridColumn
                      headerName="사용여부"
                      field="USE_YN"
                      cellEditor="select"
                      minWidth={100}
                      columnsMenuParams={{ contractColumnSelection: true }}
                      cellEditorParams={{ values: useGbns }}
                      filter="agTextColumnFilter"
                      filterParams={{
                        valueFormatter: (params: any) => {
                          return lookupValue(useGbnMappings, params.value);
                        },
                      }}
                      valueFormatter={(params: any) => {
                        return lookupValue(useGbnMappings, params.value);
                      }}
                    />
                  </AgGridReact>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CopyShopfee;
