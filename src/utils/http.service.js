import axios from 'axios';

class httpService {
  axiosInstance
  static init(){
    this.axiosInstance = axios.create({
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
        },
        baseURL: process.env.REACT_APP_API
      });
  }
  static get() {
    return this.axiosInstance.get();
  }
}
export default httpService;
