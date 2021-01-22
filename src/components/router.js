import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Auth from './pages/auth';
import Home from './pages/home';
import Reservations from './pages/reservations';
import SelfReservations from './pages/self_reservations';

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact component={Home} path='/' />
        <Route component={Auth} path='/login' />
        <Route component={Auth} path='/register' />
        <Route component={Reservations} path='/reservations' />
        <Route component={SelfReservations} path='/self' />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
