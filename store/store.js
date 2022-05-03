export const SET_INFO = 'SET_INFO';
export const state = () => (
    {
        info: {}
    }
);

export const getters = {
    info: state => {
        return state.info;
    },
    logo: state => {
        return state.info.logo;
    },
    titlePage: state => {
        return state.info.descriptions_current_lang[0].title;
    },
}

export const actions = {
    setInfoStore: function ( { commit }, info ) {
        commit( SET_INFO, info );
    },
}

export const mutations = {
    [ SET_INFO ] ( state,info ) {
        state.info = info;
    },
}

