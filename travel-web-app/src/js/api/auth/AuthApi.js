import BaseAPI from '../base/BaseApi';
import axios from 'axios'

class AuthApi extends BaseAPI {
  constructor() {
    super();
    this.api = "/auth/"
  }

  async login(param) {
    var res = await axios({
      method: 'post',
      url: this.getUrl() + 'login',
      data: param
    });

    return res;
  }

  async register(param) {
    var res = await axios({
      method: 'post',
      url: this.getUrl() + 'register',
      data: param
    });

    return res;
  }
}

export default new AuthApi