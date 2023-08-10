import { httpRequest } from '../base/httpRequest';

export default class BaseAPI {

  constructor() {
    this.host = "http://localhost:5678";
    this.api = "/";
  }

  getUrl() {
    return this.host + this.api;
  }

  async get(param) {
    var res = await httpRequest.get(this.getUrl(), param);

    return res;
  }

  async getById(id) {
    var res = await httpRequest.get(this.getUrl() + id, {});

    return res;
  }

  async list(param) {
    var res = await httpRequest.post(this.getUrl() + 'list', param);

    return res;
  }

  async post(param) {
    var res = await httpRequest.post(this.getUrl(), param);

    return res;
  }

  async put(param) {
    var res = await httpRequest.put(this.getUrl(), param);

    return res;
  }

  async delete(param) {
    var res = await httpRequest.post(this.getUrl() + '/delete', param);

    return res;
  }


}