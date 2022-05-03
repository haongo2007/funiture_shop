<template lang="html">
    <div>
        <div class="page-wrapper">
            <header-default></header-default>
            <nuxt></nuxt>
            <footer-default></footer-default>
            <button id="scroll-top" ref="scrollTop" title="Back to Top" @click.prevent="scrollTop">
                <i class="icon-arrow-up"></i>
            </button>
        </div>
        <div class="mobile-menu-overlay" @click="hideMobileMenu"></div>
        <mobile-menu></mobile-menu>
    </div>
</template>

<script>
import HeaderDefault from '~/components/partial/headers/HeaderDefault';
import FooterDefault from '~/components/partial/footers/FooterDefault';
import { isSafariBrowser, isEdgeBrowser } from '~/utilities/common';
import Repository, { baseUrl } from '~/repositories/repository.js';
import { mapGetters, mapActions } from 'vuex';

export default {
    head() {
        return Object.assign({},this.head);
    },
    data:function(){
        return {
            head:{
                titleTemplate: '',
                title: '',
                meta: [
                    {
                        hid: '',
                        name: '',
                        content:''
                    },
                    {
                        name: 'author',
                        content: ''
                    },
                    {
                        name: 'keywords',
                        content: ''
                    },
                    {
                        name: 'app-mobile-web-app-title',
                        content: ''
                    },
                    {
                        name: 'application-name',
                        content: '',
                    },
                ]
            }
        }
    },
    components: {
        HeaderDefault,
        FooterDefault: () =>
            import('~/components/partial/footers/FooterDefault'),
        MobileMenu: () => import('~/components/partial/home/MobileMenu')
    },
    mounted: function() {
        let scrollTop = this.$refs.scrollTop;
        document.addEventListener(
            'scroll',
            function() {
                if (window.pageYOffset >= 400) {
                    scrollTop.classList.add('show');
                } else {
                    scrollTop.classList.remove('show');
                }
            },
            false
        );
        if (Object.keys(this.info()).length === 0 ) {
            this.getInfoStore();
        }
    },
    methods: {
        ...mapGetters('store', ['info']),
        ...mapGetters('store', ['titlePage']),
        scrollTop: function() {
            if (isSafariBrowser() || isEdgeBrowser()) {
                let pos = window.pageYOffset;
                let timerId = setInterval(() => {
                    if (pos <= 0) clearInterval(timerId);
                    window.scrollBy(0, -120);
                    pos -= 120;
                }, 1);
            } else {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        },
        hideMobileMenu: function() {
            document.querySelector('body').classList.remove('mmenu-active');
        },
        getInfoStore(){
            Repository.get(`${baseUrl}/store/getInfo`)
                .then(response => {
                    this.$store.dispatch('store/setInfoStore',response.data.data);
                    this.head.titleTemplate = this.titlePage();
                    this.head.title = this.titlePage();
                })
                .catch(error => ({ error: JSON.stringify(error) }));
        }
    }
};
</script>