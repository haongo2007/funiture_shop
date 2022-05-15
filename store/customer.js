import Repository, { baseUrl } from '~/repositories/repository.js';
import Cookies from 'js-cookie';

export const SET_TOKEN = 'SET_TOKEN';
export const SET_CUSTOMER = 'SET_CUSTOMER';

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
          const { data } = response;
          
          commit('SET_CUSTOMER', data);
        }).catch(error => {
          console.log(error);
        });
    },
    logout({ commit, state }) {
        commit('SET_CUSTOMER', {});
        commit('SET_TOKEN', '');
        Cookies.remove('f-token');
    }
}

export const mutations = {
    [ SET_TOKEN ] ( state,token ) {
        state.token = token;
    },
    [ SET_CUSTOMER ] ( state,customer ) {
        state.customer = customer;
    },
}