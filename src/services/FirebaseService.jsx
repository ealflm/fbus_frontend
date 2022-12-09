import * as axios from "axios";
import { API_URL } from "../configs/baseURL";

class FirebaseService {
    registrationToken = (notiToken) => {
        return axios({
            url: `${API_URL.BASE_URL}/noti-token`,
            method: "POST",
            data: notiToken,
        });
    }
}

export const firebaseService = new FirebaseService();