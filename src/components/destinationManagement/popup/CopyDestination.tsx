import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AgGridReact, AgGridColumn } from '@ag-grid-community/react';
import { AllModules, GridApi } from '@ag-grid-enterprise/all-modules';
import '@ag-grid-enterprise/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-enterprise/all-modules/dist/styles/ag-theme-alpine.css';

// confirm
import { confirmAlert } from 'react-confirm-alert';
import '../../../css/react-confirm-alert-popup.css';

import Button from '@material-ui/core/Button';
import Search from '@material-ui/icons/Search';
import CheckCircle from '@material-ui/icons/CheckCircle';
import '../../../css/map/copypop.css';
import { Modal } from '@material-ui/core';
import { useStyles } from '../../common/MaterialButton';

import {
  CdestListSendData,
  copyDestListSendData,
} from '../../../api/interface/destination/popup/copyDestination';
import { getCDestListAsync, copyDestListAsync } from '../../../modules/destination';
import { RootState } from '../../../modules';

// 로딩화면
import Loader from '../../common/Loader';

import { changePhoneNumber } from '../../../util/common';

const CopyDestination = (object: any) => {
  const { closeModal } = object;
  const { CCCode } = object;
  const { Mcode } = object;
  const { ModUCode } = object;
  const { ModName } = object;

  const dispatch = useDispatch();
  const [destName, setDestName] = useState<string>('');
  const [modalText, setModalText] = useState<string>('');
  const { loading, data, error } = useSelector((state: RootState) => state.CdestList.CdestList);
  const [gridApi, setGridApi] = useState<GridApi>();
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const onGridReady = (params: any) => {
    setGridApi(params.api);
  };

  const {
    loading: copyDestLoading,
    data: copyDestData,
    error: copyDestError,
  } = useSelector((state: RootState) => state.copyDestList.copyDest);

  const getCopyDestList: copyDestListSendData = {
    JobGbn: '%',
    CCCode: '%',
    CCCodes: [],
    Mcode: 0,
    ModUCode: 0,
    ModName: '%',
  };

  const destNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setDestName(e.target.value);
  };

  const searchCDestination = useCallback(() => {
    const getCDestListSendData: CdestListSendData = {
      JobGbn: '1',
      CCCode: '%',
      Mcode: 0,
      CCName: '%',
    };

    getCDestListSendData.JobGbn = '1';
    getCDestListSendData.CCCode = CCCode;
    getCDestListSendData.Mcode = Mcode;
    getCDestListSendData.CCName = destName === '' ? '%' : `%${destName}%`;
    dispatch(getCDestListAsync.request(getCDestListSendData));
  }, [destName, dispatch]);

  const changePhone = (params: any) => {
    return changePhoneNumber(params.data.TELNO);
  };

  const copyDestination = () => {
    confirmAlert({
      title: '복사여부 확인',
      message: '선택한 지점에 이미 등록된 목적지를 모두 삭제후 복사합니다.\n계속하시겠습니까?',
      buttons: [
        {
          label: 'YES',
          onClick: () => {
            if (gridApi != null) {
              const checkData: any[] = gridApi.getSelectedNodes();
              if (checkData.length > 0) {
                getCopyDestList.JobGbn = 'I';
                getCopyDestList.CCCode = CCCode;
                getCopyDestList.Mcode = Mcode;
                getCopyDestList.ModUCode = ModUCode;
                getCopyDestList.ModName = ModName;
                checkData.forEach((idata) => {
                  getCopyDestList.CCCodes.push(String(idata.data.CCCODE));
                });
                dispatch(copyDestListAsync.request(getCopyDestList));
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
    if (!copyDestLoading && copyDestData) {
      const copy1: string = String(copyDestData);
      const resultMessage: string[] = copy1.split('@');
      if (resultMessage.length > 1) {
        if (resultMessage[0] !== '00') {
          setModalText('선택하신 목적지 복사를 실패하였습니다');
        } else {
          setModalText('선택하신 목적지 복사를 성공하였습니다');
        }
        setOpen((o) => !o);
      }
    }
  }, [copyDestLoading, copyDestData]);

  const onSearchClick = () => {
    searchCDestination();
  };

  const onCopyClick = () => {
    copyDestination();
  };

  useEffect(() => {
    setOpen(false);
    searchCDestination();
  }, [searchCDestination]);

  return (
    <div>
      {loading === true && (
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
        <div className="fl ml04 mt02">목적지좌표 다른지점으로 복사</div>
      </div>
      <div className="modal" style={{ width: '100%', height: '778px', backgroundColor: '#ebecef' }}>
        <button className="close" onClick={closeModal}>
          &times;
        </button>

        <div className="content">
          <div className="cb" />
          <div className="popBlueLabel fl mt05">지점명</div>
          <input type="text" className="copyCenter fl mt05 ml03" onChange={destNameChange} />
          <Button
            variant="contained"
            color="primary"
            size="small"
            style={{ padding: '11px 25px', margin: '4px 0px 0px 5px' }}
            startIcon={<Search />}
            onClick={onSearchClick}
          >
            검색
          </Button>

          <div className="fl ml04 mt03 mb03" style={{ fontSize: '11px' }}>
            목적지를 복사할 지점을 선택하세요.
          </div>

          <div className="cb" />
          <div className="ag-theme-alpine AgGrid">
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
            >
              <AgGridColumn
                headerName="코드"
                field="CCCODE"
                minWidth={100}
                filter="agTextColumnFilter"
                headerCheckboxSelection
                headerCheckboxSelectionFilteredOnly
                checkboxSelection
              />
              <AgGridColumn
                headerName="지점명"
                field="CCNAME"
                minWidth={200}
                columnsMenuParams={{
                  suppressColumnFilter: true,
                  suppressColumnSelectAll: true,
                  suppressColumnExpandAll: true,
                }}
                filter="agTextColumnFilter"
              />
              <AgGridColumn
                headerName="관리자"
                field="OWNER"
                minWidth={100}
                columnsMenuParams={{ contractColumnSelection: true }}
                filter="agTextColumnFilter"
              />
              <AgGridColumn
                headerName="전화번호"
                field="TELNO"
                minWidth={100}
                columnsMenuParams={{ contractColumnSelection: true }}
                filter="agTextColumnFilter"
                cellRenderer={changePhone}
              />
            </AgGridReact>
          </div>
          <Button
            variant="contained"
            color="primary"
            className="copyButton mt15"
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

export default CopyDestination;
