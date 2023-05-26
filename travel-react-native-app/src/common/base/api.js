import { API_URL } from '../../config/api.js';
import { httpRequest } from "./httpRequest.js";

const apiUrl = API_URL;

export default class BaseApi {

  controller = '';

  api() {
    return apiUrl + this.controller;
  }

  /**
   * Gọi hàm get httpRequest
   * @returns 
   */
  async get() {
    const url = this.api();

    return await httpRequest.get(url);
  }

  /**
   * Gọi hàm get httpRequest
   * @returns 
   */
  async get(id) {
    const url = this.api() + `/${id}`;

    return await httpRequest.get(url);
  }

  /**
   * Gọi api list
   * @returns 
   */
  async list(payload) {
    const url = this.api() + '/list';

    return await httpRequest.post(url, payload);
  }

}