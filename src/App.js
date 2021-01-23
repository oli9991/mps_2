import React, { useEffect } from 'react';
import './styling/App.scss';
import Router from './components/router';
import 'antd/dist/antd.css';
import { interceptors } from './requests/interceptors';
import Context, { actions, initialState, reducer } from './context/context';
import { getUser } from './requests/function';
import { getToken } from './utils/localData';
import { Provider } from 'react-redux';
import store from './redux/store';
import Notifications from './components/custom_components/notifications';

function App() {
  interceptors.setupInterceptors();

  const [state, dispatch] = React.useReducer(reducer, initialState);

  useEffect(() => {
    getToken() && getUser(dispatch);
    getToken() && dispatch({ type: actions.login, payload: getToken() });
  }, []);

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
