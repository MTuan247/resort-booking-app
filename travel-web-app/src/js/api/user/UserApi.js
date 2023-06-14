import BaseAPI from '../base/BaseApi';

class UserApi extends BaseAPI {
  constructor() {
    super();
    this.api = "/api/users/"
  }

}

export default new UserApi