import * as axios from "axios";
import { API_URL, GOONG_MAP_KEY } from "../configs/baseURL";

class StationService {
  getListStations = () => {
    return axios({
      url: `${API_URL.BASE_URL}/station`,
      method: "GET",
    });
  };
  getStationDetail = (id) => {
    return axios({
      url: `${API_URL.BASE_URL}/station/${id}`,
      method: "GET",
    });
  };
  updateStation = (station, stationId) => {
    return axios({
      url: `${API_URL.BASE_URL}/station/${stationId}`,
      method: "PUT",
      data: station,
    });
  };
  createStation = (station) => {
    return axios({
      url: `${API_URL.BASE_URL}/station`,
      method: "POST",
      data: station,
    });
  };
  deleteStation = (stationId) => {
    return axios({
      url: `${API_URL.BASE_URL}/station/${stationId}`,
      method: "DELETE",
    });
  };
  getAddressRecommend = (latitude, longitude) => {
    return axios({
      url: `${API_URL.GOONG_MAP_DIRECTION}/Geocode?latlng=${latitude},%20${longitude}&api_key=${GOONG_MAP_KEY}`,
      method: "GET",
    });
  };
}
export const stationService = new StationService();
