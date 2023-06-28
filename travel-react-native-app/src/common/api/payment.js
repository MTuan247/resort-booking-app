import { httpRequest } from "../base/httpRequest";

class PaymentApi {

  controller = '/api/payment';

  /**
   * Tạo giao dịch
   * @returns 
   */
  async createPaymentUrl(payload) {
    const url = this.api() + '/createPaymentUrl';

    return await httpRequest.post(url, payload);
  }

}

const paymentApi = new PaymentApi();

export default paymentApi;