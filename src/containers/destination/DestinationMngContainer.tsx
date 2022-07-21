import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import DestinationManagement from '../../components/destinationManagement/DestinationManagement';

interface MatchParams {
  commonParams: string;
}

const DestinationMngContainer = ({ match }: RouteComponentProps<MatchParams>) => {
  const enc = encodeURI(
    '{"CCCode":"3452","Ucode":"1599","UserName":"어드민","Mcode":"6","ModUCode":"13476","ModName":"김한욱"}'
  );
  const tt = btoa(enc);
  console.log(tt);

  return (
    <div>
      <DestinationManagement urlParams={match.params} />
    </div>
  );
};

export default React.memo(DestinationMngContainer);
