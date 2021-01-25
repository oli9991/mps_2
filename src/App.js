import React, { useEffect } from 'react';
import './styling/App.scss';
import Router from './components/router';
import 'antd/dist/antd.css';
import { interceptors } from './requests/interceptors';
import Context, { actions, initialState, reducer } from './context/context';
import {
  getAllReservations,
  getAllResources,
  getUser
} from './requests/function';
import { getToken } from './utils/localData';
import { Provider } from 'react-redux';
import store from './redux/store';
import Notifications from './components/custom_components/notifications';
import { updateResources } from './redux/resources';
import { updateReservations } from './redux/reservations';

function App() {
  interceptors.setupInterceptors();

  const [state, dispatch] = React.useReducer(reducer, initialState);
  const dispatchRedux = store.dispatch;

  useEffect(() => {
    getToken() && getUser(dispatch);
    getToken() && dispatch({ type: actions.login, payload: getToken() });
    getToken() &&
      getAllReservations(data => dispatchRedux(updateReservations(data)));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setInterval(() => {
      getToken() &&
        getAllResources(data => dispatchRedux(updateResources(data)));
      /*1 minutes in miliseconds*/
    }, 60000);
  });

  return (
    <Context.Provider value={{ state, dispatch }}>
      <Provider store={store}>
        <div className='App'>
          <Notifications />
          <Router />
        </div>
      </Provider>
    </Context.Provider>
  );
}

export default App;
