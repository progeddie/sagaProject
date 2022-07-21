import React, { useEffect, useRef, CElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../modules';
import { ISidoInfo } from '../../../api/interface/common/area/area';
import { getSidoListAsync } from '../../../modules/common/actions';
import { setSido } from '../../../modules/component/area/area';

const SidoSelect = React.forwardRef((object: any, ref: any) => {
  const { loading, data, error } = useSelector((state: RootState) => state.sidoList.sidoList);
  const dispatch = useDispatch();
  const { style } = object;

  // 시도 선택
  const onChangeSido = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    const { selectedIndex: sIndex } = e.target;
    const value = e.target.options[sIndex].innerHTML;
    dispatch(setSido(value));
  };

  useEffect(() => {
    dispatch(getSidoListAsync.request(''));
  }, []);

  return (
    <>
      <select
        className="fl_width_100 baseSelect ml05 mt05"
        onChange={onChangeSido}
        style={style}
        ref={ref}
      >
        {data &&
          data.map((sido: ISidoInfo) => (
            <option key={sido.B_CODE} value={sido.B_CODE}>
              {sido.B_LARGE}
            </option>
          ))}
      </select>
    </>
  );
});

export default SidoSelect;
