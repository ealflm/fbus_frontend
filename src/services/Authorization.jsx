import * as axios from 'axios';
import { API_URL } from '../configs/baseURL';

class AuthorizationService {
  login = (username, password) => {
    return axios({
      url: `${API_URL.BASE_URL}/authorization/login`,
      method: 'POST',
      data: {
        userName: username,
        password: password,
      },
    });
  };
}
export const authService = new AuthorizationService();
