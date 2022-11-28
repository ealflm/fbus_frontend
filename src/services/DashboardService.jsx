import * as axios from 'axios';
import { API_URL } from '../configs/baseURL';

class DashboardService {
    getStudentAccounts = () => {
        return axios({
            url: `${API_URL.BASE_URL}/dashboard/students`,
            method: "GET",
        });
    };
    getDriverAccounts = () => {
        return axios({
            url: `${API_URL.BASE_URL}/dashboard/drivers`,
            method: "GET",
        });
    };
    getBusVehicles = () => {
        return axios({
            url: `${API_URL.BASE_URL}/dashboard/bus-vehicles`,
            method: "GET",
        });
    };
    getNewUsers = () => {
        return axios({
            url: `${API_URL.BASE_URL}/dashboard/new-students`,
            method: "GET",
        });
    };
    getBookingTickets = () => {
        return axios({
            url: `${API_URL.BASE_URL}/dashboard/booking-tickets`,
            method: "GET",
        });
    };
    getCompleteTickets = () => {
        return axios({
            url: `${API_URL.BASE_URL}/dashboard/complete-tickets`,
            method: "GET",
        });
    };
    getCancelTickets = () => {
        return axios({
            url: `${API_URL.BASE_URL}/dashboard/cancel-tickets`,
            method: "GET",
        });
    };
    getNumberOfTicketsByDay = () => {
        return axios({
            url: `${API_URL.BASE_URL}/dashboard/ticket-by-day`,
            method: "GET",
        });
    }
}

export const dashboardService = new DashboardService();