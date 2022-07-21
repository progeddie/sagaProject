import React from 'react';
import '@ag-grid-enterprise/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-enterprise/all-modules/dist/styles/ag-theme-alpine.css';
import MaterialAlert from './MaterialAlert';

const Alert = (object: any) => {
  const { closeModal } = object;
  const { type } = object;
  const { text } = object;
  const { text2 } = object;
  const { text3 } = object;
  const { text4 } = object;
  const { text5 } = object;
  return (
    <div>
      <div className="modal" style={{ width: '100%' }}>
        <button className="close" onClick={closeModal}>
          &times;
        </button>
        {/* <div className="header"> Modal Title </div> */}
        <div className="content">
          <MaterialAlert
            type={type}
            text={text}
            text2={text2}
            text3={text3}
            text4={text4}
            text5={text5}
          />
        </div>
      </div>
    </div>
  );
};

export default Alert;
