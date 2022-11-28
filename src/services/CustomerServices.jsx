import * as axios from "axios";
import { API_URL } from "../configs/baseURL";

class CustomerService {
  getListCustomers = () => {
    return axios({
      url: `${API_URL.BASE_URL}/student/list`,
      method: "GET",
    });
  };
  getDetailCustomer = (studentId) => {
    return axios({
      url: `${API_URL.BASE_URL}/student/${studentId}`,
      method: "GET",
    });
  };
  updateCustomer = (student, studentId) => {
    return axios({
      url: `${API_URL.BASE_URL}/student/${studentId}`,
      method: "PUT",
      data: student,
    });
  };
}
export const customerService = new CustomerService();
