import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../modules';
import { IRiInfo } from '../../../api/interface/common/area/area';
import { getRiListAsync } from '../../../modules/common/actions';

const RiSelector = (object: any) => {
  const { style } = object;
  const { loading, data, error } = useSelector((state: RootState) => state.riList.riList);
  const dispatch = useDispatch();

  // 선택 시도
  const sido = useSelector((state: RootState) => state.areaStateInfo.sido);
  // 선택 군구
  const gungu = useSelector((state: RootState) => state.areaStateInfo.gungu);
  // 동 선택
  const dong = useSelector((state: RootState) => state.areaStateInfo.dong);

  useEffect(() => {
    if (!loading) {
      dispatch(
        getRiListAsync.request({
          SiDo: sido,
          GunGu: gungu,
          Dong: dong,
        })
      );
    }
  }, [sido, gungu, dong, dispatch]);

  return (
    <>
      <select className="fl_width_100 baseSelect ml05 mt05" style={style}>
        {data && data.length > 0 && <option value="">------선택------</option>}
        {data &&
          data.length > 0 &&
          data.map((ri: IRiInfo) => (
            <option key={ri.B_DETAIL} value={ri.B_DETAIL}>
              {ri.B_DETAIL}
            </option>
          ))}
      </select>
    </>
  );
};

export default RiSelector;
