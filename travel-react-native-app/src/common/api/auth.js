import BaseApi from "../base/api";
import { httpRequest } from "../base/httpRequest";

class AuthApi extends BaseApi {

  controller = '/auth';

  /**
   * Đăng nhập
   * @returns 
   */
  async login(payload) {
    const url = this.api() + '/login';

    return await httpRequest.post(url, payload);
  }

  /**
   * Đăng ký
   * @returns 
   */
  async register(payload) {
    const url = this.api() + '/register';

    return await httpRequest.post(url, payload);
  }

}

export default new AuthApi();