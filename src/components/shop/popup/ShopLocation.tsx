import React from 'react';
import { AgGridReact, AgGridColumn } from '@ag-grid-community/react';
import { AllModules } from '@ag-grid-enterprise/all-modules';
import '@ag-grid-enterprise/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-enterprise/all-modules/dist/styles/ag-theme-alpine.css';

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Close from '@material-ui/icons/Close';
import Search from '@material-ui/icons/Search';
import CheckCircle from '@material-ui/icons/CheckCircle';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const ShoplocationPop = (object: any) => {
  const { closeModal } = object;
  const classes = useStyles();
  return (
    <div>
      <div className="wd100 ml05" style={{ height: '25px', backgroundColor: '#FFF' }}>
        <div className="fl">
          <img src="images/foodquick_new.ico" style={{ width: '20px', height: '20px' }} alt="1" />
        </div>
        <div className="fl ml04 mt02">가맹점위치정보</div>
      </div>
      <div className="modal" style={{ width: '100%', height: '575px', backgroundColor: '#ebecef' }}>
        <button className="close" onClick={closeModal}>
          &times;
        </button>
        {/* <div className="header"> Modal Title </div> */}
        <div className="content">
          <div>
            <Button
              variant="contained"
              color="primary"
              size="small"
              className="fr mr10 mb05"
              style={{
                width: '65px',
                height: '65px',
              }}
              startIcon={<Close />}
              onClick={() => {
                closeModal();
              }}
            >
              종료
            </Button>
            <div className="cb" />
            <div
              style={{
                width: '620px',
                height: '488px',
                border: '1px solid',
                borderColor: '#c2c4cb',
                borderRadius: '2px',
              }}
            >
              <div className="blueLabelText fl ml30 mt05 ">지도확대</div>
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
              <input type="button" className="areaButton ml03 mt05" value="13" />
              <div
                className="mt02 ml02"
                style={{
                  width: '613px',
                  height: '429px',
                  border: '1px solid',
                  borderColor: '#c2c4cb',
                  borderRadius: '2px',
                }}
              />
              <div
                className="fl mt02 ml02"
                style={{
                  width: '313px',
                  height: '16px',
                  border: '1px solid',
                  borderColor: '#c2c4cb',
                  borderRadius: '2px',
                  backgroundColor: '#ffff78',
                  fontWeight: 'bold',
                }}
              >
                <div className="ml05">서울특별시 송파구 방이동</div>
              </div>
              <div
                className="fl mt02 ml02"
                style={{
                  width: '296px',
                  height: '16px',
                  border: '1px solid',
                  borderColor: '#c2c4cb',
                  borderRadius: '2px',
                  backgroundColor: '#6495ed',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoplocationPop;
