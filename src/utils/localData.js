const local = localStorage;

const getToken = () => local.getItem('token');
const setToken = token => local.setItem('token', token);
const removeToken = () => local.removeItem('token');

const fullName = user => user && `${user.firstName} ${user.lastName}`;

export { getToken, setToken, removeToken, fullName };
