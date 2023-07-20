import BaseAPI from '../base/BaseApi';
import { httpRequest } from '../base/httpRequest';

class FeedbackApi extends BaseAPI {
  constructor() {
    super();
    this.api = "/api/feedbacks/"
  }

  /**
   * Api danh sách comment paging
   * @param {*} param 
   * @returns 
   */
  async paging(param) {
    var res = await httpRequest.post(this.getUrl() + 'paging', param);

    return res;
  }

}

export default new FeedbackApi