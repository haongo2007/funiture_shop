export const SET_INFO = 'SET_INFO';
export const SET_LANGUAGES = 'SET_LANGUAGES';
export const SET_CURRENCIES = 'SET_CURRENCIES';
export const SET_CURRENCY = 'SET_CURRENCY';
export const SET_LANG = 'SET_LANG';
export const SET_CATEGORIES = 'SET_CATEGORIES';
export const SET_SLIDER = 'SET_SLIDER';
export const SET_BRAND = 'SET_BRAND';
export const SET_BANNER = 'SET_BANNER';

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
}

export const mutations = {
    [ SET_INFO ] ( state,info ) {
        state.info = info;
    },
    [ SET_LANGUAGES ] ( state,lang ) {
        state.languages = lang;
        state.lang.name = lang[0].name;
        state.lang.code = lang[0].code;
    },
    [ SET_CURRENCIES ] ( state,currencies ) {
        state.currencies = currencies;
        state.currency.name = currencies[0].name;
        state.currency.code = currencies[0].code;
    },
    [ SET_CURRENCY ] ( state,currency ) {
        state.currency = state.currencies.filter((item) => item.code == currency)[0];
    },
    [ SET_LANG ] ( state,lang ) {
        state.lang.name = state.languages.filter((item) => item.code == lang)[0].name;
        state.lang.code = lang;
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