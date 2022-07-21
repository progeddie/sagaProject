import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../modules';
import { IDongInfo } from '../../../api/interface/common/area/area';
import { getDongListAsync } from '../../../modules/common/actions';
import { setDong } from '../../../modules/component/area/area';

const DongSelect = (object: any) => {
  const { style } = object;
  const { loading, data, error } = useSelector((state: RootState) => state.dongList.dongList);
  const dispatch = useDispatch();

  // 선택 시도
  const sido = useSelector((state: RootState) => state.areaStateInfo.sido);
  // 선택 군구
  const gungu = useSelector((state: RootState) => state.areaStateInfo.gungu);

  // 동 선택
  const onChangeDong = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    dispatch(setDong(e.target.value));
  };

  useEffect(() => {
    if (!loading) {
      dispatch(
        getDongListAsync.request({
          SiDo: sido,
          GunGu: gungu,
        })
      );
    }
  }, [sido, gungu, dispatch]);

  return (
    <>
      <select className="fl_width_100 baseSelect ml05 mt05" onChange={onChangeDong} style={style}>
        {data && data.length > 0 && <option value="">------선택------</option>}
        {data &&
          data.length > 0 &&
          data.map((dong: IDongInfo) => (
            <option key={dong.B_SMALL} value={dong.B_SMALL}>
              {dong.B_SMALL}
            </option>
          ))}
      </select>
    </>
  );
};

export default DongSelect;
