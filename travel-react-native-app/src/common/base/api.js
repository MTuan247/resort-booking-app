import axios from "axios";
import { API_URL } from '../../config/api.js';

const apiUrl = API_URL;

export default class BaseApi {

  controller = '';

  api() {
    return apiUrl + this.controller;
  }

  /**
   * Gọi hàm get axios
   * @returns 
   */
  async get() {
    const url = this.api();

    return await axios.get(url);
  }

  /**
   * Gọi hàm get axios
   * @returns 
   */
  async get(id) {
    const url = this.api() + `/${id}`;

    return await axios.get(url);
  }

  /**
   * Gọi api list
   * @returns 
   */
  async list(payload) {
    const url = this.api() + '/list';

    return await axios.post(url, payload);
  }

}