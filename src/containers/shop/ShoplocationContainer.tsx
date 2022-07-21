import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import ShopLocation from '../../components/shop/ShopLocation';

interface MatchParams {
  commonParams: string;
}

const ShoplocationContainer = ({ match }: RouteComponentProps<MatchParams>) => {
  // 이 과정으로 돌려서 url 테스트용 url을 만드세요
  // CCCode, ModName, UserID, McodeString
  const enc = encodeURI('{"CCCode":"3452","ModName":"김한욱", "ModUCode":13476}');

  const tt = btoa(enc);
  console.log(tt);

  return (
    <div>
      <ShopLocation urlParams={match.params} />
    </div>
  );
};

export default React.memo(ShoplocationContainer);
