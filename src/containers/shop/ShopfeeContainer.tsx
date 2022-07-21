import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import ShopFee from '../../components/shop/ShopFee';

interface MatchParams {
  commonParams: string;
}

const ShopfeeContainer = ({ match }: RouteComponentProps<MatchParams>) => {
  // console.log({ match });
  // console.log('tt', match.params.commonParams);
  // const DeliveryAContainer = (props) => {
  // console.log(match.params);

  // 이 과정으로 돌려서 url 테스트용 url을 만드세요
  // CCCode, ModName, UserID, McodeString
  const enc = encodeURI('{"CCCode":"3452","ModName":"김한욱","Mcode":"0","ModUCode":"0"}');

  const tt = btoa(enc);
  console.log(tt);

  return (
    <div>
      <ShopFee urlParams={match.params} />
    </div>
  );
};

export default React.memo(ShopfeeContainer);
