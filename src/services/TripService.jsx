import * as axios from "axios";
import { API_URL } from "../configs/baseURL";

class TripService {
    getTripById = (tripId) => {
        return axios({
            url: `${API_URL.BASE_URL}/trip/${tripId}`,
            method: "GET",
        });
    };
    getAvailableDrivers = (driverId, tripId) => {
        return axios({
            url: `${API_URL.BASE_URL}/available-drivers?driverId=${driverId}&tripId=${tripId}`,
            method: "GET",
        });
    }
}

export const tripService = new TripService();