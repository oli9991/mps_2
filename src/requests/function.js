import axios from 'axios';
import { openNotification } from '../components/custom_components/notification';
import { actions } from '../context/context';
import { getToken } from '../utils/localData';
import { checkIfOld } from '../utils/utils';
import { route, auth_routes, resource_routes } from './routes';

const error = () =>
  openNotification(
    'error',
    'Ceva nu a mers bine...',
    'Va rugăm, contactați-ne cât mai rapid pentru rezolvarea problemei.'
  );

/** authentification and user related routes **/
const refreshToken = dispatch =>
  dispatch({ type: actions.login, payload: getToken() });

const getUser = dispatch =>
  axios
    .get(route(auth_routes.user))
    .then(({ data }) => {
      dispatch({ type: actions.setUser, payload: data });
    })
    .catch(() => error());

const login = (email, password, dispatch, callback = null) => {
  callback && callback();
  axios
    .post(route(auth_routes.login), { email, password })
    .then(({ data }) => {
      dispatch({ type: actions.login, payload: data });
      getUser(dispatch);
    })
    .catch(() => error());
};

const register = (
  email,
  firstName,
  lastName,
  password,
  role,
  callback = null
) => {
  axios
    .post(route(auth_routes.register), {
      email,
      firstName,
      lastName,
      password,
      role
    })
    .then(() => callback && callback())
    .catch(() => error());
};

/** reservations and resources related routes **/
const getAllReservations = callback =>
  axios.get(route(resource_routes.all)).then(({ data }) => callback(data));

const getReservation = (id, callback) =>
  axios.get(route(resource_routes.byId(id))).then(({ data }) => callback(data));

const getResource = (id, callback) =>
  axios
    .get(route(resource_routes.resource(id)))
    .then(({ data }) => callback && callback(data));

const updateFinished = (reservation, callback) => {
  checkIfOld(reservation) &&
    axios
      .put(route(resource_routes.update), { ...reservation, finished: true })
      .then(() => callback && callback())
      .catch(() => error());
};

export {
  login,
  register,
  refreshToken,
  getUser,
  getAllReservations,
  updateFinished,
  getReservation,
  getResource
};
