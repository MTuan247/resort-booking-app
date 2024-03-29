import axios from 'axios'
import { API_URL } from '../../config/api.js';

import { store } from '../../redux/store';
import { formatDate } from '../function/format';

axios.defaults.timeout = 3000;

const httpRequest = {};

httpRequest.getServiceUrl = (action, controller) => {
  return `${API_URL}/api/${controller}/${action}`
}

httpRequest.send = (url, data, config = { method: "post" },) => {

  let customUrl = url;
  if (config.method.toLowerCase() === "get") {
    let i = 0;
    for(let key in data) {
      if (i === 0) {
        customUrl += '?'
      } else {
        customUrl += '&'
      }
      customUrl += `${key}=${data[key]}`;
      i++;
    }
  }

  console.log(`${formatDate(new Date(), 'DD/MM/yyyy hh:mm:ss a')} url: ${customUrl}`)

  let state = store.getState();

  let headers = {
    'Authorization': state.context.user?.token
  }

  return new Promise((resolve, reject) => {
    axios({
      ...config,
      url: customUrl,
      data: data,
      headers: headers
    }).then((res) => {
      resolve(res);
    }).catch(error => {
      console.error(error)
      reject(error);
    })
  })
}

httpRequest.post = (url, data, config) => {
  return httpRequest.send(url, data, {...config, method: "post"})
}

httpRequest.get = (url, data, config) => {
  return httpRequest.send(url, data, {...config, method: "get"})
}

httpRequest.put = (url, data, config) => {
  return httpRequest.send(url, data, {...config, method: "put"})
}

httpRequest.delete = (url, data, config) => {
  return httpRequest.send(url, data, {...config, method: "delete"})
}

export { httpRequest };