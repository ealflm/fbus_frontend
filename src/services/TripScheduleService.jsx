import * as axios from "axios";
import { API_URL } from "../configs/baseURL";

class TripScheduleService {
  getListTripSchedules = () => {
    return axios({
      url: `${API_URL.BASE_URL}/trip`,
      method: "GET",
    });
  };
  updateTripSchedule = (trip, tripId) => {
    return axios({
      url: `${API_URL.BASE_URL}/trip/${tripId}`,
      method: "PUT",
      data: trip,
    });
  };
  createTripSchedule = (trip) => {
    return axios({
      url: `${API_URL.BASE_URL}/trip`,
      method: "POST",
      data: trip,
    });
  };
  deleteTripSchedule = (tripId) => {
    return axios({
      url: `${API_URL.BASE_URL}/trip/${tripId}`,
      method: "DELETE",
    });
  };
}
export const tripScheduleService = new TripScheduleService();
