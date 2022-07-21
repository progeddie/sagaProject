import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import RiderControl from '../../components/rider/RiderControl';

interface MatchParams {
  commonParams: string;
}

const RiderControlContainer = ({ match }: RouteComponentProps<MatchParams>) => {
  console.log({ match });
  const enc = encodeURI(
    '{"CCCode":"%", "Mcode":38, "PickUpType" : "%", "Date" : "20210719", "UCode" : 0, "UserName" : "시스템"}'
  );
  const tt = btoa(enc);
  console.log(tt);
  return (
    <div>
      <RiderControl urlParams={match.params} />
    </div>
  );
};

export default React.memo(RiderControlContainer);
