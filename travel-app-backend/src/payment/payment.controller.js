const config = require("../config/vnpay.config");
const moment = require("moment");

class PaymentController {
  constructor() {
  }

  /**
   * Xử lý param
   * @param {*} obj 
   * @returns 
   */
  handleParam(obj) {
    let sorted = {};
    let str = [];
    let key;
    for (key in obj){
      if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key));
      }
    }
    str.sort();
      for (key = 0; key < str.length; key++) {
          sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
      }
      return sorted;
  }

  /**
   * Tạo giao dịch thanh toán
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  createPaymentUrl(req, res, next) {

    let date = new Date();
    let createDate = moment(date).format('YYYYMMDDHHmmss');

    let ipAddr = req.headers['x-forwarded-for'] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress;

    let amount = req.body.amount;
    let bankCode = req.body.bankCode;
    let locale = req.body.language;
    if (locale === null || locale === '') {
      locale = 'vn';
    }

    let tmnCode = config.vnp_TmnCode;
    let secretKey = config.vnp_HashSecret;
    let vnpUrl = config.vnp_Url;
    let returnUrl = config.vnp_ReturnUrl;
    let orderId = moment(date).format('DDHHmmss');

    let currCode = 'VND';
    let vnp_Params = {};
    vnp_Params['vnp_Version'] = '2.1.0';
    vnp_Params['vnp_Command'] = 'pay';
    vnp_Params['vnp_TmnCode'] = tmnCode;
    vnp_Params['vnp_Locale'] = locale;
    vnp_Params['vnp_CurrCode'] = currCode;
    vnp_Params['vnp_TxnRef'] = orderId;
    vnp_Params['vnp_OrderInfo'] = 'Thanh toan cho ma GD:' + orderId;
    vnp_Params['vnp_OrderType'] = 'other';
    vnp_Params['vnp_Amount'] = amount * 100;
    vnp_Params['vnp_ReturnUrl'] = returnUrl;
    vnp_Params['vnp_IpAddr'] = ipAddr;
    vnp_Params['vnp_CreateDate'] = createDate;
    if (bankCode !== null && bankCode !== '') {
      vnp_Params['vnp_BankCode'] = bankCode;
    }

    vnp_Params = this.handleParam(vnp_Params);

    let querystring = require('qs');
    let signData = querystring.stringify(vnp_Params, { encode: false });
    let crypto = require("crypto");
    let hmac = crypto.createHmac("sha512", secretKey);
    let signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");
    vnp_Params['vnp_SecureHash'] = signed;
    vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });

    res.send(vnpUrl)
  }

  /**
   * Return sau khi thanh toán
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  callback(req, res, next) {
    let vnp_Params = req.query;

    let secureHash = vnp_Params['vnp_SecureHash'];

    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];

    vnp_Params = this.handleParam(vnp_Params);

    let tmnCode = config.vnp_TmnCode;
    let secretKey = config.vnp_HashSecret;

    let querystring = require('qs');
    let signData = querystring.stringify(vnp_Params, { encode: false });
    let crypto = require("crypto");
    let hmac = crypto.createHmac("sha512", secretKey);
    let signed = hmac.update(Buffer.from(signData, 'utf-8')).digest("hex");

    if (secureHash === signed && vnp_Params['vnp_ResponseCode'] == '00') {
      //Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket qua
      console.log({
        success: true,
        code: vnp_Params['vnp_ResponseCode']
      });
      res.sendFile(__dirname + "/views/payment_success.html");
    } else {
      console.error({
        success: false,
        code: '97'
      });
      res.sendFile(__dirname + "/views/payment_fail.html");
    }
  }

}

module.exports = new PaymentController();