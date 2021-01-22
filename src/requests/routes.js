const tunel = 'http://62eb17a259b9.ngrok.io';

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
  forUser: id => `/reservations/user/${id}`,
  add: '/addReservation'
};

const subscription_routes = {
  subscribe: '/subscribe',
  unsubscribe: '/unsubscribe'
};

const route = type => tunel + type;

export { auth_routes, resource_routes, subscription_routes, route };
