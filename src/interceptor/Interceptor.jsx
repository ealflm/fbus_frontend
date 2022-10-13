import * as axios from 'axios';
import { LOCAL_STORAGE_KEY } from '../configs/baseURL';
import { getLocalStorageItem, removeLocalStorageItem } from '../utils/helper';
export const Interceptor = () => {
  axios.interceptors.request.use(
    (config) => {
      const token = getLocalStorageItem(LOCAL_STORAGE_KEY.TOKEN);
      if (token && token.length > 0) {
        config.headers = {
          Authorization: `Bearer ` + token,
        };
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  axios.interceptors.response.use(
    (res) => {
      return Promise.resolve(res);
    },
    (error) => {
      const errRes = error.response;
      console.log('Interceptor:', errRes);
      if (errRes.status === 401) {
        removeLocalStorageItem(LOCAL_STORAGE_KEY.TOKEN);
      }
      return Promise.reject(error);
    }
  );
};
