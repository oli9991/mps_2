import React, { useEffect } from 'react';
import './styling/App.scss';
import Router from './components/router';
import 'antd/dist/antd.css';
import { interceptors } from './requests/interceptors';
import Context, { actions, initialState, reducer } from './context/context';
import { getUser } from './requests/function';
import { getToken } from './utils/localData';

function App() {
  interceptors.setupInterceptors();

  const [state, dispatch] = React.useReducer(reducer, initialState);

  useEffect(() => {
    getToken() && getUser(dispatch);
    getToken() && dispatch({ type: actions.login, payload: getToken() });
  }, []);

  return (
    <Context.Provider value={{ state, dispatch }}>
      <div className='App'>
        <Router />
      </div>
    </Context.Provider>
  );
}

export default App;
