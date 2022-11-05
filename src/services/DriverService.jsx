import * as axios from 'axios';
import { API_URL } from '../configs/baseURL';

class DriverService {
  getListDrivers = () => {
    return axios({
      url: `${API_URL.BASE_URL}/driver`,
      method: 'GET',
    });
  };
  updateDriver = (driver, driverId) => {
    return axios({
      url: `${API_URL.BASE_URL}/driver/${driverId}`,
      method: 'PUT',
      data: driver,
    });
  };
  createDriver = (driver) => {
    return axios({
      url: `${API_URL.BASE_URL}/driver`,
      method: 'POST',
      data: driver,
    });
  };
}
export const driverService = new DriverService();
