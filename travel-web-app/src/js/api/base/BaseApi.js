import axios from 'axios'

export default class BaseAPI {

  constructor() {
    this.host = "http://localhost:5678";
    this.api = "/";
  }

  getUrl() {
    return this.host + this.api;
  }

  async get(param) {
    var res = await axios({
      method: 'get',
      url: this.getUrl(),
      data: param
    });

    return res;
  }

  async getById(id) {
    var res = await axios({
      method: 'get',
      url: this.getUrl() + id,
      data: id
    });

    return res;
  }

  async list(param) {
    var res = await axios({
      method: 'post',
      url: this.getUrl() + 'list',
      data: param
    });

    return res;
  }

  async post(param) {
    var res = await axios({
      method: 'post',
      url: this.getUrl(),
      data: param
    });

    return res;
  }

  async put(param) {
    var res = await axios({
      method: 'put',
      url: this.getUrl(),
      data: param
    });

    return res;
  }

  async delete(param) {
    var res = await axios({
      method: 'post',
      url: this.getUrl() + '/delete',
      data: param
    });

    return res;
  }


}