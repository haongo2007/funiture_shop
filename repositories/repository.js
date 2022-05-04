import axios from 'axios';
import Cookies from 'js-cookie';

const domain = 'http://localhost:8000/';
const domainPrefix = 'api';

export const customHeaders = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
};

export const baseDomain = `${domain}`;
export const basePrefix = `${domainPrefix}`;

export const baseUrl = `${domain}`+`${domainPrefix}`;

// Create axios instance
const service = axios.create({
  baseUrl,
  headers: customHeaders,
  timeout: 10000, // Request timeout
});

// Request intercepter
service.interceptors.request.use(
  config => {
    if (Cookies.get('f-language')) {
      config.headers['x-localization'] = Cookies.get('f-language'); // Set Language
    }
    if (Cookies.get('f-store')) {
      config.headers['x-store'] = Cookies.get('f-store'); // Set store
    }
    if (Cookies.get('f-currency')) {
      config.headers['x-currency'] = Cookies.get('f-currency'); // Set store
    }
    return config;
  },
  error => {
    // Do something with request error
    Promise.reject(error);
  }
);


export default service;
