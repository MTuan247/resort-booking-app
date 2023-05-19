import BaseApi from "../base/api";
import axios from "axios";

class ResortApi extends BaseApi {

  controller = '/api/resorts';

  /**
   * Gọi hàm get axios
   * @returns 
   */
  async search(payload) {
    const url = this.api() + '/search';

    return await axios.post(url, payload);
  }

}

const resortApi = new ResortApi();

export default resortApi;