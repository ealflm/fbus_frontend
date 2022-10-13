import * as axios from 'axios';
import { API_URL } from '../configs/baseURL';
class BusService {
  getListBusVehicle = () => {
    return axios({
      url: `${API_URL.BASE_URL}/bus`,
      method: 'GET',
    });
  };
  createBusVehicle = (busVehicle) => {
    return axios({
      url: `${API_URL.BASE_URL}/bus`,
      method: 'POST',
      data: busVehicle,
    });
  };
}
export const busService = new BusService();
