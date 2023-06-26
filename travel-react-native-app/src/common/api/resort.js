import BaseApi from "../base/api";
import { httpRequest } from "../base/httpRequest";
class ResortApi extends BaseApi {

  controller = '/api/resorts';

  /**
   * Gọi hàm tìm kiếm
   * @returns 
   */
  async search(payload) {
    const url = this.api() + '/search';

    return await httpRequest.post(url, payload);
  }

  /**
   * Lấy danh sách yêu thích
   * @returns 
   */
  async favourite(payload) {
    const url = this.api() + '/favourite';

    return await httpRequest.post(url, payload);
  }

  /**
   * Xử lý yêu thích
   * @returns 
   */
  async like(payload) {
    const url = this.api() + '/like';

    return await httpRequest.post(url, payload);
  }

  /**
   * Lấy danh sách đã đặt
   * @returns 
   */
  async order(payload) {
    const url = this.api() + '/order';

    return await httpRequest.post(url, payload);
  }

  /**
   * Lấy danh sách đã đặt
   * @returns 
   */
  async book(payload) {
    const url = this.api() + '/book';

    return await httpRequest.post(url, payload);
  }

  /**
   * Lấy danh sách đã đặt
   * @returns 
   */
  async suggestion(payload) {
    const url = this.api() + '/suggestion';

    return await httpRequest.get(url, payload);
  }

}

const resortApi = new ResortApi();

export default resortApi;