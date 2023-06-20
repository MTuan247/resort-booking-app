import BaseAPI from '../base/BaseApi';
import { httpRequest } from '../base/httpRequest';

class UserApi extends BaseAPI {
  constructor() {
    super();
    this.api = "/api/users/"
  }

  /**
   * Danh sách chức danh
   * @returns 
   */
  async findRoles() {
    let res = await httpRequest.get(this.getUrl() + 'role');

    return res;
  }

}

export default new UserApi