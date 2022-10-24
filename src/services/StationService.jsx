import * as axios from 'axios';
import { API_URL } from '../configs/baseURL';

class StationService {
  getListStations = () => {
    return axios({
      url: `${API_URL.BASE_URL}/station`,
      method: 'GET',
    });
  };
  updateStation = (station, stationId) => {
    return axios({
      url: `${API_URL.BASE_URL}/station/${stationId}`,
      method: 'PUT',
      data: stationId,
    });
  };
  createStation = (station) => {
    return axios({
      url: `${API_URL.BASE_URL}/station`,
      method: 'POST',
      data: station,
    });
  };
}
export const stationService = new StationService();
