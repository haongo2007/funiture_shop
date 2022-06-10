import Repository, { baseUrl } from '~/repositories/repository.js';
import Cookies from 'js-cookie';

export const SET_INFO = 'SET_INFO';
export const SET_LANGUAGES = 'SET_LANGUAGES';
export const SET_CURRENCIES = 'SET_CURRENCIES';
export const SET_CURRENCY = 'SET_CURRENCY';
export const SET_LANG = 'SET_LANG';
export const SET_CATEGORIES = 'SET_CATEGORIES';
export const SET_SLIDER = 'SET_SLIDER';
export const SET_BRAND = 'SET_BRAND';
export const SET_BANNER = 'SET_BANNER';
export const SET_INFO_CHECKOUT = 'SET_INFO_CHECKOUT';

export const state = () => (
    {
        info: {},
        lang: {
            name:'',
            code:''
        },
        currency: {},
        languages: [],
        currencies: [],
        categories: [],
        slider:[],
        brand:[],
        banner:[],
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
    getLanguages: state => {
        return state.languages;
    },
    getCurrencies: state => {
        return state.currencies;
    },
    getLang: state => {
        return state.lang;
    },
    getCurrency: state => {
        return state.currency;
    },
    getCategories: state => {
        return state.categories;
    },
    getSlider: state => {
        return state.slider;
    },
    getBrand: state => {
        return state.brand;
    },
    getBanner: state => {
        return state.banner;
    },
    getShippingMethod: state => {
        return state.info.shipping_method;
    },
    getPaymentMethod: state => {
        return state.info.payment_method;
    }
}

export const actions = {
    setInfoStore: function ( { commit }, info ) {
        commit( SET_INFO, info );
    },
    setLanguages: function ({ commit },lang){
        commit( SET_LANGUAGES, lang );
    },
    setCurrencies: function ({ commit },currencies){
        commit( SET_CURRENCIES, currencies );
    },
    setCurrency: function ({ commit },currency){
        commit( SET_CURRENCY, currency );
    },
    setLang: function ({ commit },lang){
        commit( SET_LANG, lang );
    },
    setCategories: function ({commit},categories){
        commit( SET_CATEGORIES, categories );
    },
    setSlideHome: function ({commit},slider){
        commit( SET_SLIDER, slider );
    },
    setBrandHome:function ({commit},brand){
        commit( SET_BRAND, brand );
    },
    setBannerHome:function ({commit},banner){
        commit( SET_BANNER, banner );
    },
    async getInfoStore({ commit }){
        await Repository.get(`${baseUrl}/store/getInfo`)
        .then(response => {
            commit(SET_INFO,response.data.store)
            commit(SET_LANGUAGES,response.data.languages)
            commit(SET_CURRENCIES,response.data.currencies)
            commit(SET_CATEGORIES,response.data.categories)
            commit(SET_SLIDER,response.data.slider)
            commit(SET_BRAND,response.data.brands)
            commit(SET_BANNER,response.data.banner)
        })
        .catch(error => ({ error: JSON.stringify(error) })); 
    },
    setInfoCheckout:function({commit},info) {
        commit( SET_INFO_CHECKOUT, info );
    }
}

export const mutations = {
    [ SET_INFO ] ( state,info ) {
        if (!Cookies.get('f-store')) {
            Cookies.set('f-store', info.id);
        }
        state.info = info;
    },
    [ SET_LANGUAGES ] ( state,languages ) {
        state.languages = languages;
        if (!Cookies.get('f-language')) {
            let lang = languages[Object.keys(languages)[0]];
            state.lang.code = lang.code;
            state.lang.name = lang.name;
            Cookies.set('f-language', lang.code);  
        }
    },
    [ SET_CURRENCIES ] ( state,currencies ) {
        state.currencies = currencies;
        if (!Cookies.get('f-currency')) {
            let currency = currencies[Object.keys(currencies)[0]];
            state.currency = currency;
            Cookies.set('f-currency', currency.code);  
        }
    },
    [ SET_CURRENCY ] ( state,currency ) {
        state.currency = state.currencies[currency];
    },
    [ SET_LANG ] ( state,lang ) {
        state.lang.name = state.languages[lang].name;
        state.lang.code = state.languages[lang].code;
    },
    [ SET_CATEGORIES ] ( state,categories ) {
        state.categories = categories;
    },
    [ SET_SLIDER ] ( state,slider ) {
        state.slider = slider;
    },
    [ SET_BRAND ] ( state,brand ) {
        state.brand = brand;
    },
    [ SET_BANNER ] ( state,banner ) {
        state.banner = banner;
    },
}