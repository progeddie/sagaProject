import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AgGridReact, AgGridColumn } from '@ag-grid-community/react';
import { AllModules, GridApi } from '@ag-grid-enterprise/all-modules';
import '@ag-grid-enterprise/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-enterprise/all-modules/dist/styles/ag-theme-alpine.css';

import Button from '@material-ui/core/Button';
import Search from '@material-ui/icons/Search';
import CheckCircle from '@material-ui/icons/CheckCircle';

// confirm
import { confirmAlert } from 'react-confirm-alert';
import '../../../css/react-confirm-alert-popup.css';

import { Modal } from '@material-ui/core';
import { useStyles } from '../../common/MaterialButton';

import '../../../css/map/copypop.css';
import {
  DestPrivateSendData,
  PointPrivateSendData,
  copyPrivateSendData,
} from '../../../api/interface/destination/popup/copyDestinationPrivate';
import {
  getDestPrivateAsync,
  getPointPrivateAsync,
  copyPrivateDataAsync,
} from '../../../modules/destination';
import { RootState } from '../../../modules';

// 로딩화면
import Loader from '../../common/Loader';

import { changePhoneNumber } from '../../../util/common';

const CopyDestinationPrivate = (object: any) => {
  const { closeModal } = object;
  const { CCCode } = object;
  const { Mcode } = object;
  const { ModUCode } = object;
  const { ModName } = object;

  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [destName, setDestName] = useState<string>('');
  const [modalText, setModalText] = useState<string>('');
  const [gridDestApi, setGridDestApi] = useState<GridApi>();
  const [gridPointApi, setGridPointApi] = useState<GridApi>();

  const {
    loading: destloading,
    data: destData,
    error: destError,
  } = useSelector((state: RootState) => state.searchDestPrivate.destPrivate);
  const {
    loading: pointloading,
    data: pointData,
    error: pointError,
  } = useSelector((state: RootState) => state.searchPointPrivate.pointPrivate);
  const {
    loading: copyloading,
    data: copyData,
    error: copyError,
  } = useSelector((state: RootState) => state.copyDataPrivate.copyPrivate);
  const onDestGridReady = (params: any) => {
    setGridDestApi(params.api);
  };
  const onPointGridReady = (params: any) => {
    setGridPointApi(params.api);
  };

  const destNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setDestName(e.target.value);
  };

  const getCopyPrivateData: copyPrivateSendData = {
    JobGbn: '%',
    CCCode: '%',
    CCCodes: [],
    Seqnos: [],
    Mcode: 0,
    ModUCode: 0,
    ModName: '%',
  };

  const searchDestPrivate = useCallback(() => {
    const getDestPrivate: DestPrivateSendData = {
      JobGbn: '1',
      CCCode: '%',
      DestType: '%',
      DestName: '%',
    };
    getDestPrivate.JobGbn = '1';
    getDestPrivate.CCCode = CCCode;
    getDestPrivate.DestType = '%';
    getDestPrivate.DestName = '%';
    dispatch(getDestPrivateAsync.request(getDestPrivate));
  }, [dispatch]);

  const searchPointPrivate = useCallback(() => {
    const getPointPrivate: PointPrivateSendData = {
      JobGbn: '1',
      CCCode: '%',
      Mcode: 0,
      CCName: '%',
    };
    getPointPrivate.JobGbn = '1';
    getPointPrivate.CCCode = CCCode;
    getPointPrivate.Mcode = Mcode;
    getPointPrivate.CCName = destName === '' ? '%' : `%${destName}%`;
    dispatch(getPointPrivateAsync.request(getPointPrivate));
  }, [dispatch, destName]);

  const hashValueGetter = (params: any) => {
    return params.node.rowIndex + 1;
  };

  const changePhone = (params: any) => {
    return changePhoneNumber(params.data.TELNO);
  };

  const copyCheckPrivateData = () => {
    confirmAlert({
      title: '복사여부 확인',
      message: '선택한 지점에 선택하신 목적지를 복사합니다.\n계속하시겠습니까?',
      buttons: [
        {
          label: 'YES',
          onClick: () => {
            if (gridDestApi != null && gridPointApi != null) {
              const checkDestData: any[] = gridDestApi.getSelectedNodes();
              const checkPointData: any[] = gridPointApi.getSelectedNodes();
              if (checkDestData.length > 0 && checkPointData.length > 0) {
                getCopyPrivateData.JobGbn = 'I';
                getCopyPrivateData.CCCode = CCCode;
                getCopyPrivateData.Mcode = Mcode;
                getCopyPrivateData.ModUCode = ModUCode;
                getCopyPrivateData.ModName = ModName;
                checkDestData.forEach((idata) => {
                  getCopyPrivateData.Seqnos.push(String(idata.data.SEQNO));
                });
                checkPointData.forEach((idata) => {
                  getCopyPrivateData.CCCodes.push(String(idata.data.CCCODE));
                });
                dispatch(copyPrivateDataAsync.request(getCopyPrivateData));
              }
            }
          },
        },
        {
          label: 'NO',
          onClick: () => {},
        },
      ],
    });
  };

  useEffect(() => {
    if (!copyloading && copyData) {
      const copy: string = String(copyData);
      const resultMessage: string[] = copy.split('@');
      if (resultMessage.length > 1) {
        if (resultMessage[0] !== '00') {
          setModalText('선택하신 목적지 복사를 실패하였습니다');
        } else {
          setModalText('선택하신 목적지  복사를 성공하였습니다');
        }
        setOpen((o) => !o);
      }
    }
  }, [copyloading, copyData]);

  const onSearchClick = () => {
    searchDestPrivate();
    searchPointPrivate();
  };

  const onCopyClick = () => {
    copyCheckPrivateData();
  };

  useEffect(() => {
    setOpen(false);
    searchDestPrivate();
    searchPointPrivate();
  }, [searchDestPrivate, searchPointPrivate]);

  return (
    <div>
      {destloading === true && (
        <Loader
          type="spinningBubbles"
          color="#000"
          backgroundColor="#00000061"
          message="Loading..."
        />
      )}
      <div className="wd100 ml05" style={{ height: '25px', backgroundColor: '#FFF' }}>
        <div className="fl">
          <img src="images/foodquick_new.ico" style={{ width: '20px', height: '20px' }} alt="1" />
        </div>
        <div className="fl ml04 mt02">목적지좌표 다른지점으로 개별복사</div>
      </div>
      <div className="modal" style={{ width: '100%', height: '778px', backgroundColor: '#ebecef' }}>
        <button className="close" onClick={closeModal}>
          &times;
        </button>
        <div className="content">
          <div className="popBlueLabel fl mt05">지점명</div>
          <input type="text" className="eachCopyCenter fl mt05 ml03" onChange={destNameChange} />
          <Button
            variant="contained"
            color="primary"
            size="small"
            style={{ margin: '4px 0px 0px 4px', padding: '10px 25px' }}
            startIcon={<Search />}
            onClick={onSearchClick}
          >
            검색
          </Button>

          <div className="cb" />
          <div className="ag-theme-alpine fl eachAgGrid mt03">
            <div className="mt03 mb03" style={{ fontSize: '11px' }}>
              복사할 목적지를 선택하세요.
            </div>
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
              onGridReady={onDestGridReady}
              rowData={destData!}
              rowSelection="multiple"
              headerHeight={40}
            >
              <AgGridColumn
                headerName="No"
                field="IDX"
                minWidth={70}
                columnsMenuParams={{
                  suppressColumnFilter: true,
                  suppressColumnSelectAll: true,
                  suppressColumnExpandAll: true,
                }}
                filter="agTextColumnFilter"
                valueGetter={hashValueGetter}
                headerCheckboxSelection
                headerCheckboxSelectionFilteredOnly
                checkboxSelection
              />
              <AgGridColumn
                headerName="목적지"
                field="DEST_NAME"
                minWidth={170}
                columnsMenuParams={{ contractColumnSelection: true }}
                filter="agTextColumnFilter"
              />
              <AgGridColumn
                headerName="동명"
                field="DONG_NAME"
                minWidth={170}
                columnsMenuParams={{ contractColumnSelection: true }}
                filter="agTextColumnFilter"
              />
              <AgGridColumn
                headerName="SEQ"
                field="SEQNO"
                minWidth={70}
                columnsMenuParams={{ contractColumnSelection: true }}
                filter="agTextColumnFilter"
                hide
              />
            </AgGridReact>
          </div>
          <div className="fl ArrowDiv">▶</div>
          <div className="ag-theme-alpine fl eachAgGrid">
            <div className="mt03 mb03" style={{ fontSize: '11px' }}>
              목적지를 복사할 지점을 선택하세요.
            </div>
            <AgGridReact
              modules={AllModules}
              defaultColDef={{
                flex: 1,
                resizable: true,
                menuTabs: ['columnsMenuTab'],
                columnsMenuParams: { suppressSyncLayoutWithGrid: true },
                floatingFilter: true,
              }}
              onGridReady={onPointGridReady}
              rowData={pointData!}
              rowSelection="multiple"
              headerHeight={40}
            >
              <AgGridColumn
                headerName="코드"
                field="CCCODE"
                minWidth={120}
                columnsMenuParams={{
                  suppressColumnFilter: true,
                  suppressColumnSelectAll: true,
                  suppressColumnExpandAll: true,
                }}
                filter="agTextColumnFilter"
                headerCheckboxSelection
                headerCheckboxSelectionFilteredOnly
                checkboxSelection
              />
              <AgGridColumn
                headerName="지점명"
                field="CCNAME"
                minWidth={170}
                columnsMenuParams={{ contractColumnSelection: true }}
                filter="agTextColumnFilter"
              />
              <AgGridColumn
                headerName="관리자"
                field="OWNER"
                minWidth={170}
                columnsMenuParams={{ contractColumnSelection: true }}
                filter="agTextColumnFilter"
              />
              <AgGridColumn
                headerName="전화번호"
                field="TELNO"
                minWidth={170}
                columnsMenuParams={{ contractColumnSelection: true }}
                filter="agTextColumnFilter"
                cellRenderer={changePhone}
              />
            </AgGridReact>
          </div>
          <Button
            variant="contained"
            color="primary"
            className="eachCopyButton"
            startIcon={<CheckCircle />}
            onClick={onCopyClick}
          >
            복사하기
          </Button>
          <Modal
            open={open}
            aria-labelledby="server-modal-title"
            aria-describedby="server-modal-description"
            className={classes.modal}
          >
            <div className={classes.paper} style={{ textAlign: 'center' }}>
              <h3>{modalText}</h3>
              <Button
                variant="contained"
                color="primary"
                size="small"
                className="ml05 mt10"
                onClick={() => setOpen((o) => !o)}
              >
                확인
              </Button>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default CopyDestinationPrivate;
