import Repository, { baseUrl } from '~/repositories/repository.js';
// coupon
export const ADD_COUPON = 'ADD_COUPON';
export const CLEAR_COUPON = 'CLEAR_COUPON';
export const DELETE_COUPON = 'DELETE_COUPON';

export const state = () => (
    {
        data: []
    }
);


export const getters = {
    getCoupon: state => {
        return state.data
    },
}

export const actions = {
    addCoupon: function ( { commit, getters }, payload ) {
        commit(ADD_COUPON,payload)
    },
    deleteCoupon: function ( { commit, getters }, payload ) {
        commit(DELETE_COUPON,payload)
    },
}

export const mutations = {

    [ ADD_COUPON ] ( state, payload ) {
        state.data.push(payload);
    },
    [ CLEAR_COUPON ] ( state, payload ) {
        state.data = [];
    },
    [ DELETE_COUPON ] ( state, payload ) {
        state.data.splice(payload,1);
    },
}
