import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../modules';
import { IGunguInfo } from '../../../api/interface/common/area/area';
import { getGunguListAsync } from '../../../modules/common/actions';
import { setGungu } from '../../../modules/component/area/area';

const GunGuSelect = (object: any) => {
  const { style } = object;
  const { loading, data, error } = useSelector((state: RootState) => state.gunguList.gunguList);
  const dispatch = useDispatch();

  // 선택 시도
  const sido = useSelector((state: RootState) => state.areaStateInfo.sido);

  // 군구 선택
  const onChangeGungu = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    dispatch(setGungu(e.target.value));
  };

  useEffect(() => {
    if (!loading) {
      dispatch(
        getGunguListAsync.request({
          SiDo: sido,
        })
      );
    }
  }, [sido]);

  return (
    <>
      <select className="fl_width_100 baseSelect ml05 mt05" onChange={onChangeGungu} style={style}>
        {data && data.length > 0 && <option value="">------선택------</option>}
        {data &&
          data.length > 0 &&
          data.map((gungu: IGunguInfo) => (
            <option key={gungu.B_MIDDLE} value={gungu.B_MIDDLE}>
              {gungu.B_MIDDLE}
            </option>
          ))}
      </select>
    </>
  );
};

export default GunGuSelect;
