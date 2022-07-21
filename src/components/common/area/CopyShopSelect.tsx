import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import $ from 'jquery';
// Popup
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

// Ag-Grid
import { AgGridReact, AgGridColumn } from '@ag-grid-community/react';
import { AllModules, GridApi } from '@ag-grid-enterprise/all-modules';
import '@ag-grid-enterprise/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-enterprise/all-modules/dist/styles/ag-theme-alpine.css';

// Action
import { getCallCenterInfoAsync } from '../../../modules/shopFee/actions';

// API
import { getCallCenterInfotData } from '../../../api/interface/shopFee/shopFee';

import { RootState } from '../../../modules';

const CopyShopSelect = React.forwardRef((object: any, ref: any) => {
  const { loading, data, error } = useSelector(
    (state: RootState) => state.getCallCenterInfo.callCeterInfo
  );
  const dispatch = useDispatch();

  const [gridApi, setgridApi] = useState<GridApi>();
  const onGridReady2 = (params: any) => {
    setgridApi(params.api);
    $('[aria-label="가맹점명. Filter Input"]')[0].focus();
  };

  const getCallCenterInfo: getCallCenterInfotData = {
    JobGbn: '',
    CCCode: '%',
    MCode: 6,
  };

  const onSelectionChanged = () => {
    if (gridApi != null) {
      const selectedRows = gridApi.getSelectedRows();
      $('#copyShopName').val(selectedRows.length === 1 ? selectedRows[0].CCNAME : '');
      object.setSelCC(selectedRows.length === 1 ? selectedRows[0].CCCODE : '');
    }
  };

  useEffect(() => {
    if (!loading && !data) {
      dispatch(getCallCenterInfoAsync.request(getCallCenterInfo));
    }
  }, [loading, data, dispatch]);

  return (
    <Popup
      trigger={
        <input
          id="copyShopName"
          type="text"
          className="fl baseInput ml05 mt05"
          style={{ width: '200px' }}
          defaultValue=""
          autoComplete="off"
          readOnly
        />
      }
      // closeOnDocumentClick={false}
      position="bottom center"
      contentStyle={{ width: '300px' }}
    >
      <div
        id="myGrid2"
        style={{
          height: '300px',
          width: '300px',
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
          onGridReady={onGridReady2}
          rowSelection="single"
          headerHeight={40}
          containerStyle={{ borderRadius: '10px' }}
          onSelectionChanged={onSelectionChanged}
          rowData={data!}
        >
          <AgGridColumn
            headerName="코드"
            field="CCCODE"
            minWidth={100}
            columnsMenuParams={{ contractColumnSelection: true }}
            filter="agTextColumnFilter"
            hide
          />
          <AgGridColumn
            headerName="가맹점명."
            field="CCNAME"
            minWidth={100}
            columnsMenuParams={{ contractColumnSelection: true }}
            filter="agTextColumnFilter"
          />
          <AgGridColumn
            headerName="레벨"
            field="CLEVEL"
            minWidth={100}
            columnsMenuParams={{ contractColumnSelection: true }}
            filter="agTextColumnFilter"
            hide
          />
        </AgGridReact>
      </div>
    </Popup>
  );
});

export default CopyShopSelect;
