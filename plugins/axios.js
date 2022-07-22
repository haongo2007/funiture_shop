import Cookies from "js-cookie";
import service from "~/repositories/repository";

export default function ( { $axios, redirect } ) {
    $axios.onError( error => {
        const code = parseInt( error.response && error.response.status );
        if ( code === 400 ) {
            redirect( '/pages/404' );
        }
    } );
    $axios.interceptors.request.use(
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
            if (Cookies.get('f-token')) {
                config.headers['Authorization'] = "Bearer "+Cookies.get('f-token'); // Set token
            }
            return config;
        },
        error => {
            // Do something with request error
            Promise.reject(error);
        }
    );
    // response pre-processing
    $axios.interceptors.response.use(
        response => {
            return response.data;
        },
        error => {
            return Promise.reject(error.response.data);
        }
    );
}
