import axios from 'axios';
import { getToken } from '../utils/localData';
import { auth_routes } from './routes';

/*interceptor request*/
export const interceptors = {
  setupInterceptors: () => {
    axios.interceptors.request.use(
      config => {
        const token = getToken();

        if (token) {
          config.headers['Authorization'] = 'Bearer ' + token;
        }

        return config;
      },
      error => {
        Promise.reject(error);
      }
    );

    /*interceptor response*/
    axios.interceptors.response.use(
      response => {
        return response;
      },
      async error => {
        const originalRequest = error.config;

        if (
          error.response &&
          error.response.status === 401 &&
          !originalRequest._retry
        ) {
          auth_routes.logout();
        } else {
          return Promise.reject(error);
        }
      }
    );
  }
};
