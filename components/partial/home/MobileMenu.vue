<template>
    <div class="mobile-menu-container mobile-menu-light">
        <div class="mobile-menu-wrapper">
            <span class="mobile-menu-close" @click="hideMobileMenu">
                <i class="icon-close"></i>
            </span>
            <form action="#" method="get" class="mobile-search" @submit.prevent="submitSearchForm">
                <label for="mobile-search" class="sr-only">Search</label>
                <input
                    type="search"
                    class="form-control"
                    name="mobile-search"
                    id="mobile-search"
                    v-model="searchTerm"
                    placeholder="Search product ..."
                    required
                />
                <button class="btn btn-primary" type="submit">
                    <i class="icon-search"></i>
                </button>
            </form>
            <tabs class="nav-pills-mobile nav-border-anim text-center" :data="tabsData"></tabs>
            <div class="tab-content">
                <div class="tab-pane fade show active" id="mobile-nav">
                    <nav class="mobile-nav">
                        <ul class="mobile-menu">
                            <li class="item-cats-lead">
                                <nuxt-link to="/">Home</nuxt-link>
                            </li>
                            <li>
                                <nuxt-link to="/shop">Shop</nuxt-link>
                            </li>
                            <li>
                                <nuxt-link to="/blog">Blog</nuxt-link>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div class="tab-pane fade" id="mobile-categories">
                    <nav class="mobile-cats-nav">
                        <categories-menu :data-categories="getCategories" is-position="mobile"/>
                    </nav>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Tabs from '~/components/elements/Tabs';
import { mobileMenu } from '~/utilities/common.js';
import CategoriesMenu from '~/components/elements/CategoriesMenu';
import { mapGetters } from 'vuex';

export default {
    components: {
        Tabs,
        CategoriesMenu
    },
    data: function() {
        return {
            tabsData: [
                {
                    id: 'mobile-nav',
                    title: 'MENU',
                    active: true
                },
                {
                    id: 'mobile-categories',
                    title: 'CATEGORIES'
                }
            ],
            searchTerm: ''
        };
    },
    computed: {
        ...mapGetters('core', ['getCategories']),
        isFullwidth: function() {
            return this.$route.path.includes('fullwidth');
        },
    },
    mounted: function() {
        mobileMenu();
    },
    methods: {
        hideMobileMenu: function() {
            document.querySelector('body').classList.remove('mmenu-active');
        },
        submitSearchForm: function() {
            this.hideMobileMenu();
            this.$router.push({
                path: '/shop/sidebar/3cols',
                query: {
                    searchTerm: this.searchTerm
                }
            });
        }
    }
};
</script>