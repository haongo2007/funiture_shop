import Vue from 'vue';
import VueToastify from "vue-toastify";

Vue.use( VueToastify,{
            withBackdrop: false,
            position: "bottom-left",
            successDuration: 1500,
        });