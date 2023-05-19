import BaseApi from "../base/api";
import axios from "axios";

class LocationApi extends BaseApi {

  controller = '/api/locations';

  /**
   * Gọi hàm get axios
   * @returns 
   */
  async search(payload) {
    const url = this.api() + '/search';

    return await axios.post(url, payload);
  }

}

const locationApi = new LocationApi();

export default locationApi;