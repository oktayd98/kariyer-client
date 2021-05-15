import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Layout from '../components/Layout';
import Home from '../pages/Home';
import AdvertisementDetail from '../pages/AdvertisementDetail';

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Layout>
          <Route exact path="/" component={Home} />
          <Route path="/hiring/:id" component={AdvertisementDetail} />
          {/* <Route path="/searching/:id" component={Home} /> */}
        </Layout>
      </Switch>
    </Router>
  );
};

export default Routes;
