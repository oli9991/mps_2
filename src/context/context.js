import React from 'react';
import { setToken, removeToken } from '../utils/localData';

const actions = {
  login: 'login',
  register: 'register',
  logout: 'logout',
  setUser: 'setUser'
};

const initialState = { token: null, user: null };

const reducer = (state = initialState, action) => {
  if (action.type === actions.login) {
    setToken(action.payload);
    return { ...state, token: action.payload };
  }
  if (action.type === actions.setUser) {
    return { ...state, user: action.payload };
  }
  if (action.type === actions.logout) {
    removeToken();
    return { ...state, token: null };
  }
  return state;
};

const Context = React.createContext();

export default Context;
export { reducer, initialState, actions };
