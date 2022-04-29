import axios from 'axios';

const domain = 'http://localhost:8000/';
const domainPrefix = 'api';

export const customHeaders = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
};


export const baseDomain = `${domain}`;
export const basePrefix = `${domainPrefix}`;

export const baseUrl = `${domain}`+`${domainPrefix}`;


export default axios.create( {
    baseUrl,
    headers: customHeaders
} );