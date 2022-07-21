import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import DeliveryAvailable from '../../components/delivery/DeliveryAvailable';

// export interface TParams {
//   cccode: string;
//   name: string;
// }

interface MatchParams {
  commonParams: string;
}

const DeliveryAContainer = ({ match }: RouteComponentProps<MatchParams>) => {
  // console.log({ match });
  // console.log('tt', match.params.commonParams);
  // const DeliveryAContainer = (props) => {
  // console.log(match.params);

  // 이 과정으로 돌려서 url 테스트용 url을 만드세요
  // CCCode, ModName, UserID, McodeString
  const enc = encodeURI(
    '{"CCCode":"3452","ModName":"김한욱","UserID":"김한욱12","McodeString":"6"}'
  );
  const tt = btoa(enc);
  console.log(tt);

  return (
    <div>
      <DeliveryAvailable urlParams={match.params} />
      {/* <DeliveryAvailable /> */}
    </div>
  );
};

export default React.memo(DeliveryAContainer);
