import axios from 'axios';
import { openNotification } from '../components/custom_components/notification';
import { actions } from '../context/context';
import { getToken } from '../utils/localData';
import {
  route,
  auth_routes,
  resource_routes,
  subscription_routes
} from './routes';

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

const login = (
  email,
  password,
  dispatch,
  callback = null,
  escapeLoading = null
) => {
  axios
    .post(route(auth_routes.login), { email, password })
    .then(({ data }) => {
      callback && callback();
      dispatch({ type: actions.login, payload: data });
      getUser(dispatch);
    })
    .catch(err => {
      escapeLoading && escapeLoading();
      error();
    });
};

const register = (
  email,
  firstName,
  lastName,
  password,
  role,
  callback = null,
  escapeLoading = null
) => {
  axios
    .post(route(auth_routes.register), {
      email,
      firstName,
      lastName,
      password,
      role
    })
    .then(() => {
      callback && callback();
    })
    .catch(() => {
      error();
      escapeLoading && escapeLoading();
    });
};

/** reservations and resources related routes **/
const getAllReservations = callback =>
  axios
    .get(route(resource_routes.all))
    .then(({ data }) => callback && callback(data));

const getAllResources = callback =>
  axios
    .get(route(resource_routes.getResources))
    .then(({ data }) => callback && callback(data));

const getReservation = (id, callback) =>
  axios
    .get(route(resource_routes.byId(id)))
    .then(({ data }) => callback && callback(data));

const getReservationsForUser = (id, callback) =>
  axios
    .get(route(resource_routes.forUser(id)))
    .then(({ data }) => callback && callback(data));

const getResource = (id, callback) =>
  axios
    .get(route(resource_routes.resource(id)))
    .then(({ data }) => callback && callback(data));

const reserve = (resourceId, reason, start, end, callback) => {
  axios
    .post(route(resource_routes.add), { resourceId, reason, end, start })
    .then(() => {
      callback && callback();
    })
    .catch(() => error());
};

// const updateFinished = (reservation, callback) => {
//   checkIfOld(reservation) &&
//     axios
//       .put(route(resource_routes.update), { ...reservation, finished: true })
//       .then(() => callback && callback())
//       .catch(() => error());
// };
const addResource = (name, description, capacity, callback) => {
  axios
    .post(route(resource_routes.addResource), { name, description, capacity })
    .then(() => {
      getAllResources();
      callback && callback();
    });
};

const cancelReservation = (id, callback) =>
  axios
    .delete(route(resource_routes.cancelReservation(id)))
    .then(() => callback && callback())
    .catch(() => error());

/*subcribtion related requests */
const subscribe = (resourceId, callback) => {
  axios
    .put(route(subscription_routes.subscribe(resourceId)))
    .then(() => {
      callback && callback();
    })
    .catch(() => error());
};

const unsubscribe = (resourceId, callback) => {
  axios
    .put(route(subscription_routes.unsubscribe(resourceId)))
    .then(() => {
      callback && callback();
    })
    .catch(() => error());
};

export {
  login,
  register,
  refreshToken,
  getUser,
  getAllReservations,
  // updateFinished,
  getReservation,
  getResource,
  getAllResources,
  getReservationsForUser,
  addResource,
  reserve,
  cancelReservation,
  subscribe,
  unsubscribe
};
