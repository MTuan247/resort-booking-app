import BaseApi from "../base/api";
import { httpRequest } from "../base/httpRequest";
class OrderApi extends BaseApi {

  controller = '/api/orders';

  /**
   * Gọi hàm kiểm tra tình trạng phòng
   * @returns 
   */
  async status(payload) {
    const url = this.api() + '/status';

    return await httpRequest.post(url, payload);
  }


}

const orderApi = new OrderApi();

export default orderApi;