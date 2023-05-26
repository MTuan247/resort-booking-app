import BaseApi from "../base/api";
import { httpRequest } from "../base/httpRequest";

class LocationApi extends BaseApi {

  controller = '/api/locations';

  /**
   * Gọi hàm get httpRequest
   * @returns 
   */
  async search(payload) {
    const url = this.api() + '/search';

    return await httpRequest.post(url, payload);
  }

}

const locationApi = new LocationApi();

export default locationApi;