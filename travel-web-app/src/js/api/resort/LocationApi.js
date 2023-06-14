import BaseAPI from '../base/BaseApi';

class LocationApi extends BaseAPI {
  constructor() {
    super();
    this.api = "/api/locations/"
  }
}

export default new LocationApi