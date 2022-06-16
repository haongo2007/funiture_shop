import Repository, { baseUrl } from '~/repositories/repository.js';
import Cookies from 'js-cookie';

export const SET_TOKEN = 'SET_TOKEN';
export const SET_CUSTOMER = 'SET_CUSTOMER';
export const LOGOUT = 'LOGOUT';

export const state = () => (
    {
        customer: {},
        token: '',
    }
);

export const getters = {
    getToken: state => {
        return state.token;
    },
    getCurrentCustomer: state => {
        return state.customer;
    },
    getCurrentFullname: state => {
        return state.customer.first_name+' '+state.customer.last_name;
    }
}

export const actions = {
    setToken: function ( { commit }, token ) {
        Cookies.set('f-token',token);
        commit( SET_TOKEN, token );
    },
    // get info customer
    getCustomer({ commit, state }) {
        Repository.get(`${baseUrl}/customer`)
        .then(response => {
            let {data} = response;
            commit('SET_CUSTOMER', data);
        }).catch(error => {
            commit('LOGOUT');
        });
    },
    logout({ commit, state }) {
        commit('LOGOUT');
    }
}

export const mutations = {
    [ SET_TOKEN ] ( state,token ) {
        state.token = token;
    },
    [ SET_CUSTOMER ] ( state,customer ) {
        state.customer = customer;
    },
    [ LOGOUT ] ( state ) {
        state.token = '';
        state.customer = {};
        Cookies.remove('f-token');
    },
}