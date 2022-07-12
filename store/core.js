import Repository, { baseUrl } from '~/repositories/repository.js';
import Cookies from 'js-cookie';

export const SET_SHOP = 'SET_SHOP';
export const SET_LOCALIZED = 'SET_LOCALIZED';
export const SET_METHOD = 'SET_METHOD';
export const SET_DISPLAY = 'SET_DISPLAY';
export const SET_CURRENCY = 'SET_CURRENCY';
export const SET_LANG = 'SET_LANG';

export const state = () => (
    {
        shop: {},
        localized:{},
        method:{},
        display:{},
    }
);

export const getters = {
    shop_info: state => {
        return state.shop.info;
    },
    logo: state => {
        if (Object.keys(state.shop).length > 0) {
            return state.shop.info.logo;
        }
        return '';
    },
    titlePage: state => {
        if (Object.keys(state.shop).length > 0) {
            return state.shop.info.descriptions_current_lang[0].title;
        }
        return '';
    },
    getLanguages: state => {
        return state.localized.languages;
    },
    getCurrencies: state => {
        return state.localized.currencies;
    },
    getLang: state => {
        if (Object.keys(state.localized).length > 0) {
            return state.localized.lang;
        }
        return '';
    },
    getCurrency: state => {
        if (Object.keys(state.localized).length > 0) {
            return state.localized.currency;
        }
        return '';
    },
    getCategories: state => {
        if (Object.keys(state.shop).length > 0) {
            return state.shop.categories;
        }
        return [];
    },
    getSlider: state => {
        return state.display.slider;
    },
    getBrand: state => {
        return state.shop.brands;
    },
    getBanner: state => {
        if (Object.keys(state.display).length > 0) {
            return state.display.banner;
        }
        return [];
    },
    getShippingMethod: state => {
        if (Object.keys(state.method).length > 0) {
            return state.method.shipping;
        }
        return [];
    },
    getPaymentMethod: state => {
        if (Object.keys(state.method).length > 0) {
            return state.method.payment;
        }
        return [];
    },
    getMaximumPrice: state => {
        if (Object.keys(state.shop).length > 0) {
            return state.shop.max_price_product;
        }
        return 0;
    },
    getAttributes: state => {
        if (Object.keys(state.shop).length > 0) {
            return state.shop.attributes;
        }
        return [];
    },
    getProducListDisplay: state => {
        if (Object.keys(state.display).length > 0) {
            return state.display.product.product_list;
        }
        return 0;
    },
    getProducTopDisplay: state => {
        if (Object.keys(state.display).length > 0) {
            return state.display.product.product_top;
        }
        return 0;
    }
}

export const actions = {
    async getInfoStore({ commit }){
        await Repository.get(`${baseUrl}/store/getInfo`)
        .then(({data}) => {
            commit(SET_SHOP,data.shop)
            commit(SET_LOCALIZED,data.localized)
            commit(SET_METHOD,data.method)
            commit(SET_DISPLAY,data.display)
            commit(SET_PRIMARY,data.id)
        })
        .catch(error => ({ error: JSON.stringify(error) })); 
    },
    setCurrency({ commit },currency){
        commit(SET_CURRENCY,currency)
    },
    setLang({ commit },lang){
        commit(SET_LANG,lang)
    }
}

export const mutations = {
    [ SET_SHOP ] ( state,shop ) {
        if (!Cookies.get('f-store')) {
            Cookies.set('f-store', shop.info.id);
        }
        state.shop = shop;
    },
    [ SET_LOCALIZED ] ( state,localized ) {
        let languages = localized.languages;
        if (!Cookies.get('f-language')) {
            let langDefault = state.shop.info.language;
            Cookies.set('f-language', langDefault);  
        }
        let language = languages[Cookies.get('f-language')];


        let currencies = localized.currencies;
        if (!Cookies.get('f-currency')) {
            let currencyDefault = state.shop.info.currency;
            Cookies.set('f-currency', currencyDefault); 
        }
        let currency = currencies[Cookies.get('f-currency')];

        localized.lang     = language;
        localized.currency = currency;

        state.localized = localized;
    },
    [ SET_METHOD ] ( state,method ) {
        state.method = method;
    },
    [ SET_DISPLAY ] ( state,display ) {
        state.display = display;
    },
    [ SET_CURRENCY ] ( state,currency ) {
        let found = state.localized.currencies[currency];
        state.localized.currency = found;
    },
    [ SET_LANG ] ( state,lang ) {
        let found = state.localized.languages[lang];
        state.localized.lang = found; 
    },
}