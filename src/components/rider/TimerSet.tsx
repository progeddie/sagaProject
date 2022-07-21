import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

/* 체크박스 */
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

/* 슬라이더 */
import Typography from '@material-ui/core/Typography';
import Slider, { SliderTypeMap } from '@material-ui/core/Slider';

/* 프로그래스 */
import LinearProgress from '@material-ui/core/LinearProgress';

const TimerSet = (props: any) => {
  const { searchRiderProcess } = props;
  const { stateC } = props;
  const { setStateC } = props;
  const [progress, setProgress] = useState(0);

  // 자동조회 타이머 / 슬라이더
  const sTimerReference = useRef() as React.MutableRefObject<HTMLInputElement>;
  const sliderReferencd = useRef() as React.MutableRefObject<HTMLSpanElement>;

  interface time {
    time: number;
  }
  const [diff, setDiff] = useState(10);

  const refTimer = useRef<any>();
  const refTimerTick = useRef<number>(0);

  const autoCheck = useRef<boolean>(false);

  // 자동조회용 시간설정
  const changeSec = () => {
    setDiff(parseInt(sliderReferencd.current.innerText, 10));
    setProgress(0);
  };

  useEffect(() => {
    if (autoCheck.current === true) {
      refTimerTick.current = 0;
      clearInterval(refTimer.current);
      changeAutoSearchTime(autoCheck.current);
    }
  }, [diff]);

  const changeAutoSearchTime = (checked: boolean) => {
    const increment = Math.round(100 / diff);
    if (checked === true) {
      refTimer.current = setInterval(() => {
        if (refTimerTick.current === 100) {
          refTimerTick.current = 0;
          setProgress(0);
          searchRiderProcess();
        } else {
          refTimerTick.current += increment;
          setProgress(refTimerTick.current);
        }
      }, 1000);
    } else {
      setProgress(0);
      refTimerTick.current = 0;
      refTimer.current = null;
      clearInterval(refTimer.current);
    }
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    autoCheck.current = event.target.checked;
    setStateC({ ...stateC, [event.target.name]: event.target.checked });
    if (event.target.checked === false) {
      clearInterval(refTimer.current);
    }
    changeAutoSearchTime(autoCheck.current);
  };

  return (
    <>
      <div className="flex_section_row mt05">
        <div className="flex_section_row ">
          <FormControlLabel
            control={<Checkbox checked={stateC.checkedB} onChange={handleChange} name="checkedB" />}
            label="자동조회"
          />
        </div>
      </div>
      <div
        className="ml05 flex_section_row"
        style={{
          width: '100px',
        }}
      >
        <Typography id="discrete-slider" gutterBottom className="ml05 mt06">
          시간설정
        </Typography>
        <Slider
          ref={sliderReferencd}
          defaultValue={10}
          aria-labelledby="discrete-slider"
          valueLabelDisplay="auto"
          className="ml10 mt08"
          step={5}
          marks
          min={5}
          max={60}
          onClick={changeSec}
          onChange={changeSec}
        />
      </div>
      <div className="flex_section_column ml30">
        <div className="flex_section_row mt07">
          <input
            type="text"
            ref={sTimerReference}
            value={diff}
            className=""
            style={{ width: '20px', height: '12px' }}
          />
          <div className="mt03 ml03">초</div>
        </div>
        <div className="mt10" style={{ width: '100px' }}>
          <LinearProgress variant="determinate" value={progress} />
        </div>
      </div>
    </>
  );
};

export default React.memo(TimerSet);
