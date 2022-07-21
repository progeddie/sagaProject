import React from 'react';
import ReactLoading from 'react-loading';

const Loader = (props: any) => {
  const { type } = props;
  const { color } = props;
  const { backgroundColor } = props;
  const { message } = props;

  return (
    // 로딩 이미지는 아래의 종류가 있음
    // blank/balls/bars/bubbles/cubes/cylon/spin/spinningBubbles/spokes
    // <div className="contentWrap" style={{ backgroundColor }}>
    <div className="contentWrap">
      <div
        style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
      >
        <div style={{ fontSize: '30px' }}>{message}</div>
        <ReactLoading type={type} color={color} height="80%" width="80%" />
      </div>
    </div>
  );
};

export default Loader;
