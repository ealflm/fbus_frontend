import * as axios from 'axios';
import { API_URL } from '../configs/baseURL';

class RouteService {
  getListRoutes = () => {
    return axios({
      url: `${API_URL.BASE_URL}/route`,
      method: 'GET',
    });
  };
  updateRoute = (route, routeId) => {
    return axios({
      url: `${API_URL.BASE_URL}/route/${routeId}`,
      method: 'PUT',
      data: route,
    });
  };
  createRoute = (route) => {
    return axios({
      url: `${API_URL.BASE_URL}/route`,
      method: 'POST',
      data: route,
    });
  };
}
export const routeService = new RouteService();
