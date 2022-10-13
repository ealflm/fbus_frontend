import * as axios from 'axios';
import { API_URL } from '../configs/baseURL';

class CustomerService {
  getListCustomers = () => {
    return axios({
      url: `${API_URL.BASE_URL}/student/list`,
      method: 'GET',
    });
  };
}
export const customerService = new CustomerService();
