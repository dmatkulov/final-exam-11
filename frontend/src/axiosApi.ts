import axios from 'axios';
import {apiURL} from './helpers/constants';

const axiosApi = axios.create({
  baseURL: apiURL,
});

export default axiosApi;
