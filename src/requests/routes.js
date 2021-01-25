const tunel = 'http://864f424f8e9d.ngrok.io';

const auth_routes = {
  login: '/loginUser',
  register: '/registerUser',
  user: `/users/userProfile`
};

const resource_routes = {
  getResources: '/resources',
  update: '/updateResource',
  all: '/reservations',
  byId: id => `/reservations/${id}`,
  forUser: id => `/reservations/users/${id}`,
  add: '/addReservation',
  addResource: '/addResource',
  resource: id => `/resources/${id}`,
  cancelReservation: id => `/deleteReservation/${id}`
};

const subscription_routes = {
  subscribe: id => `/subscribe/${id}`,
  unsubscribe: id => `/unsubscribe/${id}`
};

const route = type => tunel + type;

export { auth_routes, resource_routes, subscription_routes, route };
