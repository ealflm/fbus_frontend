import * as axios from "axios";
import {
  API_URL,
  GOONG_MAP_KEY,
  MAPBOX_ACCESS_TOKEN,
} from "../configs/baseURL";

class RouteService {
  getListRoutes = () => {
    return axios({
      url: `${API_URL.BASE_URL}/route`,
      method: "GET",
    });
  };
  getRouteDetail = (id) => {
    return axios({
      url: `${API_URL.BASE_URL}/route/${id}`,
      method: "GET",
    });
  };
  updateRoute = (route, routeId) => {
    return axios({
      url: `${API_URL.BASE_URL}/route/${routeId}`,
      method: "PUT",
      data: route,
    });
  };
  createRoute = (route) => {
    return axios({
      url: `${API_URL.BASE_URL}/route`,
      method: "POST",
      data: route,
    });
  };
  deleteRoute = (routeId) => {
    return axios({
      url: `${API_URL.BASE_URL}/route/${routeId}`,
      method: "DELETE",
    });
  };
  // mapBoxRenderRoute = (coordinate) => {
  //   return axios({
  //     url: `${API_URL.MAP_BOX_DIRECTION}/${coordinate}?alternatives=false&continue_straight=true&geometries=geojson&language=en&overview=full&steps=true&access_token=${MAPBOX_ACCESS_TOKEN}`,
  //     method: "GET",
  //   });
  // };
  mapBoxRenderRoute = (origin, coordinate) => {
    return axios({
      url: `${API_URL.GOONG_MAP_DIRECTION}/Direction?vehicle=car&alternatives=false&api_key=${GOONG_MAP_KEY}&origin=${origin}&destination=${coordinate}`,
      method: "GET",
    });
  };
}
export const routeService = new RouteService();
