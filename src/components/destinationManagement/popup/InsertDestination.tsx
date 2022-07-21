import React, { useState, useEffect, useRef, MutableRefObject } from 'react';
import '@ag-grid-enterprise/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-enterprise/all-modules/dist/styles/ag-theme-alpine.css';

import Button from '@material-ui/core/Button';
import CheckCircle from '@material-ui/icons/CheckCircle';
import CloseRounded from '@material-ui/icons/CloseRounded';

import '../../../css/map/copypop.css';

const InsertDestination = (props: any, ref: any) => {
  const { setMapDestName } = props;
  const { setMapSelType } = props;
  const { setAlertText } = props;
  const { setOpenA } = props;
  const { closeModalSave } = props;
  const { closeModal } = props;

  const [destName, setDestName] = useState('');
  const [type, setType] = useState('');

  const optionArray: any = {
    명칭: 'A',
    빌딩: 'B',
    아파트: 'P',
    주택: 'H',
    연립: 'Y',
    원룸: 'O',
    모텔: 'M',
    맨션: 'S',
    학교: 'U',
    오피스텔: 'F',
    병원: 'C',
    관공서: 'G',
  };

  // 목적지 명 입력
  const conDestNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setDestName(e.target.value);
  };

  const selType = (e: React.ChangeEvent<HTMLInputElement>) => {
    setType(e.target.value);
  };

  const saveDestName = () => {
    if (destName === '') {
      setAlertText('목적지 명칭을 입력하세요!');
      setOpenA((o: any) => !o);
      return;
    }
    if (type === '') {
      setAlertText('목적지 타입을 선택하세요!');
      setOpenA((o: any) => !o);
      return;
    }
    setMapDestName(destName);
    const label = optionArray[type];
    setMapSelType(label);
    setTimeout(() => closeModalSave(), 500);
  };

  return (
    <div>
      <div className="wd100 ml05" style={{ height: '25px', backgroundColor: '#FFF' }}>
        <div className="fl">
          <img src="images/foodquick_new.ico" style={{ width: '20px', height: '20px' }} alt="1" />
        </div>
        <div className="fl ml04 mt02">명칭을 입력하세요.</div>
      </div>
      <div className="modal" style={{ width: '100%', height: '275px', backgroundColor: '#ebecef' }}>
        <button className="close" onClick={closeModal}>
          &times;
        </button>

        <div className="content">
          <div className="cb" />
          <div className="blueLabel fl mt05">목적지 명칭</div>
          <input
            type="text"
            className="fl mt05 ml03 wd70"
            style={{ height: '23px', lineHeight: '23px' }}
            onChange={conDestNameChange}
          />
          <div className="cb" />
          <div className="ml05 mt05">[목적지 타입]</div>
          <div
            className="mt05"
            style={{ width: '329px', height: '145px', backgroundColor: 'white' }}
          >
            <div>
              <div className="fl">
                <input
                  type="radio"
                  className="ml05 mt07"
                  name="type"
                  value="아파트"
                  onChange={selType}
                />
              </div>
              <div className="fl ml05 mt05">아파트</div>
            </div>
            <div className="cb" />
            <div>
              <div className="fl">
                <input
                  type="radio"
                  className="ml05 mt07"
                  name="type"
                  value="모텔"
                  onChange={selType}
                />
              </div>
              <div className="fl ml05 mt05">모텔</div>
            </div>
            <div className="cb" />
            <div>
              <div className="fl">
                <input
                  type="radio"
                  className="ml05 mt07"
                  name="type"
                  value="원룸"
                  onChange={selType}
                />
              </div>
              <div className="fl ml05 mt05">원룸</div>
            </div>
            <div className="cb" />
            <div>
              <div className="fl">
                <input
                  type="radio"
                  className="ml05 mt07"
                  name="type"
                  value="연립"
                  onChange={selType}
                />
              </div>
              <div className="fl ml05 mt05">연립</div>
            </div>
            <div className="cb" />
            <div>
              <div className="fl">
                <input
                  type="radio"
                  className="ml05 mt07"
                  name="type"
                  value="주택"
                  onChange={selType}
                />
              </div>
              <div className="fl ml05 mt05">주택</div>
            </div>
            <div className="cb" />
            <div>
              <div className="fl">
                <input
                  type="radio"
                  className="ml05 mt07"
                  name="type"
                  value="명칭"
                  onChange={selType}
                />
              </div>
              <div className="fl ml05 mt05">명칭</div>
            </div>
          </div>
          <Button
            variant="contained"
            color="primary"
            className="copyButton mt15 wd45"
            startIcon={<CheckCircle />}
            onClick={saveDestName}
          >
            저장
          </Button>
          <Button
            variant="contained"
            color="primary"
            className="copyButton mt15 wd45 ml20"
            startIcon={<CloseRounded />}
            onClick={closeModal}
          >
            닫기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InsertDestination;
