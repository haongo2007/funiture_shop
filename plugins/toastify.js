import Vue from 'vue';
import VueToastify from "vue-toastify";

Vue.use( VueToastify,{
            withBackdrop: false,
            position: "top-right",
            successDuration: 1500,
        });