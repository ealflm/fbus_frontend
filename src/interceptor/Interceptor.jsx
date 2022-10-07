import * as axios from 'axios';
import { LOCAL_STORAGE_KEY } from '../configs/baseURL';
import { getLocalStorageItem } from '../utils/helper';
export const interceptor = () => {
  axios.interceptors.request.use(
    (config) => {
      const token = getLocalStorageItem(LOCAL_STORAGE_KEY.TOKEN);
      if (token && token.length > 0) {
        config.headers = {
          Authorization: `Bearer ${token}`,
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
      // if (errRes) {
      // 	if (errRes.status === 401) {
      // 		const { data: { errors } } = errRes;

      // 		if (errors && errors[0]?.code === '4010001') {
      // 			const originalRequest = error.config;
      // 			handleRenewToken(originalRequest);
      // 		} else {
      // 			const { errors } = errRes.data;
      // 			dispatch(setErrorApi(errors));
      // 		}
      // 	}

      // 	if (errRes.status === 400 || errRes.status === 403) {
      // 		const { errors } = errRes.data;
      // 		dispatch(setErrorApi(errors));
      // 	}
      // }
      return Promise.reject(error);
    }
  );
};
