import * as axios from "axios";
import { API_URL } from "../configs/baseURL";

class NotificationService {
    getNotification = () => {
        return axios({
            url: `${API_URL.BASE_URL}/notification`,
            method: "GET",
        });
    }
}

export const notificationService = new NotificationService();