import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AddResource from './pages/add_resourse';
import Auth from './pages/auth';
import Home from './pages/home';
import Reservations from './pages/reservations';
import SelfReservations from './pages/self_reservations';
import Tables from './pages/tables';

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact component={Home} path='/' />
        <Route component={Auth} path='/login' />
        <Route component={Auth} path='/register' />
        <Route component={Reservations} path='/reservations' />
        <Route component={SelfReservations} path='/self' />
        <Route component={AddResource} path='/new' />
        <Route component={Tables} path='/tables' />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
