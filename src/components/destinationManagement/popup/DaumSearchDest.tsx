import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AgGridReact, AgGridColumn } from '@ag-grid-community/react';
import { AllModules, GridApi } from '@ag-grid-enterprise/all-modules';
import '@ag-grid-enterprise/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-enterprise/all-modules/dist/styles/ag-theme-alpine.css';

import Button from '@material-ui/core/Button';
import Search from '@material-ui/icons/Search';
import Close from '@material-ui/icons/Close';
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

const DaumSearchDest = (object: any) => {
  const { closeModal } = object;

  const dispatch = useDispatch();
  const [destName, setDestName] = useState<string>('');
  const [modalText, setModalText] = useState<string>('');

  const [gridApi, setGridApi] = useState<GridApi>();
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const onGridReady = (params: any) => {
    setGridApi(params.api);
  };

  const { loading, data, error } = useSelector((state: RootState) => state.CdestList.CdestList);

  const { loading: copyDestLoading, data: copyDestData, error: copyDestError } = useSelector(
    (state: RootState) => state.copyDestList.copyDest
  );

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
    getCDestListSendData.CCCode = '3452';
    getCDestListSendData.Mcode = 6;
    getCDestListSendData.CCName = destName === '' ? '%' : `%${destName}%`;
    dispatch(getCDestListAsync.request(getCDestListSendData));
  }, [destName, dispatch]);

  const copyDestination = () => {
    if (gridApi != null) {
      const checkData: any[] = gridApi.getSelectedNodes();
      if (checkData.length > 0) {
        getCopyDestList.JobGbn = 'I';
        getCopyDestList.CCCode = '3452';
        getCopyDestList.Mcode = 6;
        getCopyDestList.ModUCode = 13476;
        getCopyDestList.ModName = '김한욱';
        checkData.forEach((idata) => {
          getCopyDestList.CCCodes.push(String(idata.data.CCCODE));
        });
        dispatch(copyDestListAsync.request(getCopyDestList));
      }
    }
  };

  useEffect(() => {
    if (!copyDestLoading && copyDestData) {
      const copy1: string = String(copyDestData);
      const resultMessage: string[] = copy1.split('@');
      console.log(resultMessage);
      if (resultMessage.length > 1) {
        if (resultMessage[0] !== '00') {
          setModalText('선택하신 목적지 복사를 실패하였습니다');
        } else {
          setModalText('선택하신 목적지 복사를 성공하였습니다');
        }
        setOpen((o) => !o);
      }
      console.log(resultMessage);
    }
  }, [copyDestLoading, copyDestData]);

  const onSearchClick = () => {
    searchCDestination();
  };

  const onCopyClick = () => {
    copyDestination();
  };

  useEffect(() => {
    searchCDestination();
  }, [searchCDestination]);

  return (
    <div>
      <div className="wd100 ml05" style={{ height: '25px', backgroundColor: '#FFF' }}>
        <div className="fl">
          <img src="images/foodquick_new.ico" style={{ width: '20px', height: '20px' }} alt="1" />
        </div>
        <div className="fl ml04 mt02">위치검색</div>
      </div>
      <div className="modal" style={{ width: '100%', height: '635px', backgroundColor: '#ebecef' }}>
        <button className="close" onClick={closeModal}>
          &times;
        </button>

        <div className="content">
          <div className="fr">
            <Button
              variant="contained"
              color="primary"
              size="small"
              className="fr mr10"
              style={{ width: '70px', height: '70px' }}
              startIcon={<Close />}
            >
              닫기
            </Button>
            <Button
              variant="contained"
              color="primary"
              size="small"
              className="fr mr05"
              style={{ width: '70px', height: '70px' }}
              startIcon={<Search />}
              onClick={onSearchClick}
            >
              검색
            </Button>
          </div>
          <div className="popContent">
            <div className="fl blueLabel mg05" style={{ width: '120px' }}>
              명칭
            </div>
            <input type="text" className="fl baseInput mt05" style={{ width: '280px' }} />
            <div className="cb" />
            <div
              className="fl blueLabel ml05"
              style={{ width: '120px', height: '70px', lineHeight: '70px' }}
            >
              목적지 타입
            </div>
            <div className="fl ml05 destBorder">
              <div className="fl">
                <input
                  type="radio"
                  className="ml05 mt03"
                  name="type"
                  value="아파트"
                  defaultChecked
                />
              </div>
              <div className="fl ml05 mt01  wd20">아파트</div>
              <div className="fl">
                <input type="radio" className="ml05 mt03" name="type" value="주택" />
              </div>
              <div className="fl ml05 mt01 wd20">주택</div>
              <div className="fl">
                <input type="radio" className="ml05 mt03" name="type" value="맨션" />
              </div>
              <div className="fl ml05 mt01 wd20">맨션</div>
              <div className="cb" />
              <div className="fl">
                <input type="radio" className="ml05 mt03" name="type" value="모텔" />
              </div>
              <div className="fl ml05 mt01  wd20">모텔</div>
              <div className="fl">
                <input type="radio" className="ml05 mt03" name="type" value="빌딩" />
              </div>
              <div className="fl ml05 mt01 wd20">빌딩</div>
              <div className="fl">
                <input type="radio" className="ml05 mt03" name="type" value="명칭" />
              </div>
              <div className="fl ml05 mt01 wd20">명칭</div>
              <div className="cb" />
              <div className="fl">
                <input type="radio" className="ml05 mt03" name="type" value="원룸" />
              </div>
              <div className="fl ml05 mt01  wd20">원룸</div>
              <div className="fl">
                <input type="radio" className="ml05 mt03" name="type" value="학교" />
              </div>
              <div className="fl ml05 mt01 wd20">학교</div>
              <div className="cb" />
              <div className="fl">
                <input type="radio" className="ml05 mt03" name="type" value="연립" />
              </div>
              <div className="fl ml05 mt01  wd20">연립</div>
              <div className="fl">
                <input type="radio" className="ml05 mt03" name="type" value="오피스텔" />
              </div>
              <div className="fl ml05 mt01 wd30">오피스텔</div>
            </div>
            <div className="fl ml05 mt02 blue str" style={{ fontSize: '14px' }}>
              목적지 타입은 <br /> 저장시 사용합니다.
            </div>
            <div className="cb" />
            <div
              style={{
                height: '409px',
                width: '578px',
              }}
              className="ml05 mt05 ag-theme-alpine"
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
                rowSelection="multiple"
                headerHeight={30}
              >
                <AgGridColumn headerName="No" field="NO" minWidth={75} width={75} />
                <AgGridColumn
                  headerName="명칭"
                  field="DEST_NAME"
                  minWidth={200}
                  width={200}
                  columnsMenuParams={{ contractColumnSelection: true }}
                  filter="agTextColumnFilter"
                />
                <AgGridColumn
                  headerName="주소"
                  field="DONG_NAME"
                  minWidth={400}
                  columnsMenuParams={{ contractColumnSelection: true }}
                  filter="agTextColumnFilter"
                />
              </AgGridReact>
            </div>
          </div>

          <Modal
            open={open}
            aria-labelledby="server-modal-title"
            aria-describedby="server-modal-description"
            className={classes.modal}
          >
            <div className={classes.paper}>
              <h2>{modalText}</h2>
              <Button
                variant="contained"
                color="primary"
                size="small"
                className="fr ml05 mt05"
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

export default DaumSearchDest;
