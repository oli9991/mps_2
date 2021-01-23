const tunel = 'http://2342f77163ce.ngrok.io';

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
  resource: id => `/resources/${id}`,
  cancelReservation: id => `/deleteReservation/${id}`
};

const subscription_routes = {
  subscribe: id => `/subscribe/${id}`,
  unsubscribe: id => `/unsubscribe/${id}`
};

const route = type => tunel + type;

export { auth_routes, resource_routes, subscription_routes, route };
