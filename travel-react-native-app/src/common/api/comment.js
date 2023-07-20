import BaseApi from "../base/api";
import { httpRequest } from "../base/httpRequest";
class CommentApi extends BaseApi {

  controller = '/api/feedbacks';

  /**
   * Gọi hàm info httpRequest
   * @returns 
   */
  async info(payload) {
    const url = this.api() + '/info';

    return await httpRequest.post(url, payload);
  }

}

const commentApi = new CommentApi();

export default commentApi;