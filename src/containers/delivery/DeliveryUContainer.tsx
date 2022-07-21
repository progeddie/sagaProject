import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import DeliveryUnable from '../../components/delivery/DeliveryUnable';

interface MatchParams {
  commonParams: string;
}

const DeliveryUContainer = ({ match }: RouteComponentProps<MatchParams>) => {
  // 이 과정으로 돌려서 url 테스트용 url을 만드세요
  // CCCode, ModName, UserID, McodeString
  const enc = encodeURI(
    '{"CCCode":"3452","ModName":"김한욱","UserID":"김한욱12","McodeString":"6"}'
  );
  const tt = btoa(enc);
  console.log(tt);

  return (
    <div>
      <DeliveryUnable urlParams={match.params} />
    </div>
  );
};

export default React.memo(DeliveryUContainer);
