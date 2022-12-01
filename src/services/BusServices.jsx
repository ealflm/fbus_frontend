import * as axios from "axios";
import { API_URL } from "../configs/baseURL";
class BusService {
  getListBusVehicle = () => {
    return axios({
      url: `${API_URL.BASE_URL}/bus`,
      method: "GET",
    });
  };
  getDetailsBus = (busId) => {
    return axios({
      url: `${API_URL.BASE_URL}/bus/${busId}`,
      method: "GET",
    });
  };
  createBusVehicle = (busVehicle) => {
    return axios({
      url: `${API_URL.BASE_URL}/bus`,
      method: "POST",
      data: busVehicle,
    });
  };
  updateBusVehicle = (busVehicle, busId) => {
    return axios({
      url: `${API_URL.BASE_URL}/bus/${busId}`,
      method: "PUT",
      data: busVehicle,
    });
  };
  deleteBus = (busId) => {
    return axios({
      url: `${API_URL.BASE_URL}/bus/${busId}`,
      method: "DELETE",
    });
  };
}
export const busService = new BusService();
