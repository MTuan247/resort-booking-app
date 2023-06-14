import axios from 'axios'

import BaseAPI from '../base/BaseApi';

class ResortApi extends BaseAPI {
  constructor() {
    super();
    this.api = "/api/resorts/"
  }

  uploadFile(files, data) {
    const formData = new FormData();
    for (const file of files) {
      formData.append("file", file);
    }
    for (const key in data) {
      formData.append(key, data[key]);
    }
    // formData.append("file", files);
    axios
      .post(this.getUrl() + '/upload', formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  /**
   * Api tìm kiếm
   * @param {*} param 
   * @returns 
   */
  async search(param) {
    var res = await axios({
      method: 'post',
      url: this.getUrl() + 'search',
      data: param
    });

    return res;
  }
}

export default new ResortApi