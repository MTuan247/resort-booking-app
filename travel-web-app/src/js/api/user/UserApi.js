import BaseAPI from '../base/BaseApi';
import { httpRequest } from '../base/httpRequest';

class UserApi extends BaseAPI {
  constructor() {
    super();
    this.api = "/api/users/"
  }

  /**
   * Danh sách
   * @returns 
   */
  async list(param) {
    let res = await httpRequest.post(this.getUrl() + 'list', param);

    return res;
  }

  /**
   * Danh sách chức danh
   * @returns 
   */
  async findRoles() {
    let res = await httpRequest.get(this.getUrl() + 'role');

    return res;
  }

  /**
   * Xác nhận
   * @returns 
   */
  async approve(param) {
    let res = await httpRequest.post(this.getUrl() + 'approve', param);

    return res;
  }

  /**
   * Xác nhận
   * @returns 
   */
  async reject(param) {
    let res = await httpRequest.post(this.getUrl() + 'reject', param);

    return res;
  }

}

export default new UserApi