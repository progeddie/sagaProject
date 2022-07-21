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
import { relative } from 'path';
import { getShopListAsync } from '../../../modules/shop/actions';

// API
import { ShopListSendData } from '../../../api/interface/shop/shop';

import { RootState } from '../../../modules';

const ShopSelect = React.forwardRef((object: any, ref: any) => {
  const { loading, data, error } = useSelector((state: RootState) => state.shopList.shopList);
  const dispatch = useDispatch();
  const { CCCode } = object;

  const [gridApi, setGridApi] = useState<GridApi>();
  const onGridReady = (params: any) => {
    setGridApi(params.api);
    $('[aria-label="가맹점명 Filter Input"]')[0].focus();
  };

  const shopListSendData: ShopListSendData = {
    CCCode,
  };

  const onSelectionChanged = () => {
    if (gridApi != null) {
      const selectedRows = gridApi.getSelectedRows();
      $('#shopName').val(selectedRows.length === 1 ? selectedRows[0].SHOP_NAME : '');
      $('#shopCode').val(selectedRows.length === 1 ? selectedRows[0].SHOP_CD : '');
      object.setSelShop(selectedRows.length === 1 ? selectedRows[0].SHOP_CD : '');
    }
  };

  useEffect(() => {
    if (!loading && !data) {
      dispatch(getShopListAsync.request(shopListSendData));
    }
  }, [loading, data, dispatch]);

  return (
    <>
      <Popup
        trigger={
          <div>
            <input
              id="shopName"
              type="text"
              className="fl baseInput ml05 mt05"
              autoComplete="off"
              style={{ width: '200px' }}
              readOnly
            />
            <input id="shopCode" type="hidden" />
          </div>
        }
        position="bottom center"
        contentStyle={{
          width: '300px',
        }}
      >
        <div
          id="myGrid"
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
            onGridReady={onGridReady}
            rowSelection="multiple"
            headerHeight={40}
            containerStyle={{ borderRadius: '10px' }}
            onSelectionChanged={onSelectionChanged}
            rowData={data!}
          >
            <AgGridColumn
              headerName="가맹점명"
              field="SHOP_NAME"
              minWidth={100}
              columnsMenuParams={{ contractColumnSelection: true }}
              filter="agTextColumnFilter"
            />
            <AgGridColumn
              headerName="코드"
              field="SHOP_CD"
              minWidth={100}
              columnsMenuParams={{ contractColumnSelection: true }}
              filter="agTextColumnFilter"
              hide
            />
          </AgGridReact>
        </div>
      </Popup>
    </>
  );
});

export default ShopSelect;
