import React from 'react';
import { Route, Switch, HashRouter } from 'react-router-dom';
import DestinationMngContainer from './containers/destination/DestinationMngContainer';
import DeliveryAContainer from './containers/delivery/DeliveryAContainer';
import DeliveryUContainer from './containers/delivery/DeliveryUContainer';
import RiderControlContainer from './containers/rider/RiderControlContainer';
import ShopfeeContainer from './containers/shop/ShopfeeContainer';
import ShoplocationContainer from './containers/shop/ShoplocationContainer';

function App() {
  return (
    <Switch>
      <Route
        component={DeliveryAContainer}
        path={['/', '/1/:commonParams', '/deliverya/:commonParams']}
        exact
      />
      <Route
        component={DeliveryUContainer}
        path={['/2/:commonParams', '/deliveryu/:commonParams']}
        exact
      />
      <Route
        component={DestinationMngContainer}
        path={['/3/:commonParams', '/destination/:commonParams']}
        exact
      />
      <Route
        component={RiderControlContainer}
        path={['/4/:commonParams', '/rider/:commonParams']}
        exact
      />
      <Route
        component={ShopfeeContainer}
        path={['/5/:commonParams', '/shopfee/:commonParams']}
        exact
      />
      <Route
        component={ShoplocationContainer}
        path={['/6/:commonParams', '/shoplocation/:commonParams']}
        exact
      />
    </Switch>
  );
}

export default App;
