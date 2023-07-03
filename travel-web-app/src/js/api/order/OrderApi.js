import BaseAPI from '../base/BaseApi';
import { httpRequest } from '../base/httpRequest';

class OrderApi extends BaseAPI {
  constructor() {
    super();
    this.api = "/api/orders/"
  }

  /**
   * Api danh sách trạng thái khu nghỉ dưỡng
   * @param {*} param 
   * @returns 
   */
  async resortStatus(param) {
    var res = await httpRequest.post(this.getUrl() + 'resorts', param);

    return res;
  }

}

export default new OrderApi