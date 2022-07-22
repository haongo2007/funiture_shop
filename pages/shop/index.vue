<template>
    <main class="main">
        <page-header :title="head.title" subtitle="Shop"></page-header>
        <nav aria-label="breadcrumb" class="breadcrumb-nav mb-2">
            <div :class="containerClass">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item">
                        <nuxt-link to="/">Home</nuxt-link>
                    </li>
                    <li class="breadcrumb-item active">
                        Shop
                    </li>
                    <li class="breadcrumb-item" v-if="$route.query.searchTerm">
                        <span>Search - {{ $route.query.searchTerm }}</span>
                    </li>
                </ol>
            </div>
        </nav>

        <div class="page-content">
            <div :class="containerClass">
                <div class="toolbox">
                    <div class="toolbox-left">
                        <a href="#" class="sidebar-toggler mr-0 mr-md-5" @click.prevent="showSidebar">
                            <i class="icon-bars"></i>Filters
                        </a>
                    </div>
                    <div class="toolbox-right">
                        <div class="toolbox-sort">
                            <label for="sortby">Sort by:</label>
                            <div class="select-custom">
                                <select
                                    name="sortby"
                                    id="sortby"
                                    class="form-control"
                                    @change.prevent="getProducts"
                                    v-model="orderBy"
                                >
                                    <option value="default">Default</option>
                                    <option value="featured">Most Popular</option>
                                    <option value="rating">Most Rated</option>
                                    <option value="new">Date</option>
                                </select>
                            </div>
                        </div>
                        <div class="toolbox-layout">
                            <a
                                href="javascript:;"
                                @click="changeView('list')"
                                class="btn-layout"
                                :class="{active: type == 'list'}"
                            >
                                <svg width="16" height="10">
                                    <rect x="0" y="0" width="4" height="4" />
                                    <rect x="6" y="0" width="10" height="4" />
                                    <rect x="0" y="6" width="4" height="4" />
                                    <rect x="6" y="6" width="10" height="4" />
                                </svg>
                            </a>

                            <a
                                href="javascript:;"
                                @click="changeView('2cols')"
                                class="btn-layout"
                                :class="{active: type == '2cols'}"
                            >
                                <svg width="10" height="10">
                                    <rect x="0" y="0" width="4" height="4" />
                                    <rect x="6" y="0" width="4" height="4" />
                                    <rect x="0" y="6" width="4" height="4" />
                                    <rect x="6" y="6" width="4" height="4" />
                                </svg>
                            </a>

                            <a
                                href="javascript:;"
                                @click="changeView('3cols')"
                                class="btn-layout"
                                :class="{active: type == '3cols'}"
                            >
                                <svg width="16" height="10">
                                    <rect x="0" y="0" width="4" height="4" />
                                    <rect x="6" y="0" width="4" height="4" />
                                    <rect x="12" y="0" width="4" height="4" />
                                    <rect x="0" y="6" width="4" height="4" />
                                    <rect x="6" y="6" width="4" height="4" />
                                    <rect x="12" y="6" width="4" height="4" />
                                </svg>
                            </a>

                            <a
                                @click="changeView('4cols')"
                                href="javascript:;"
                                class="btn-layout"
                                :class="{active: type == '4cols'}"
                            >
                                <svg width="22" height="10">
                                    <rect x="0" y="0" width="4" height="4" />
                                    <rect x="6" y="0" width="4" height="4" />
                                    <rect x="12" y="0" width="4" height="4" />
                                    <rect x="18" y="0" width="4" height="4" />
                                    <rect x="0" y="6" width="4" height="4" />
                                    <rect x="6" y="6" width="4" height="4" />
                                    <rect x="12" y="6" width="4" height="4" />
                                    <rect x="18" y="6" width="4" height="4" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>

                <shop-list-one
                    :products="products"
                    :per-page="perPage"
                    :loaded="loaded"
                    :class="{loaded: loaded}"
                    :type="type"
                    class="skeleton-body skel-shop-products"
                ></shop-list-one>

                <div class="load-more-container text-center">
                    <a
                        href="#"
                        class="btn btn-outline-darker btn-load-more"
                        @click.prevent="loadMore"
                        v-if="loadMoreLoading || hasMore"
                    >
                        More Products
                        <i
                            class="icon-refresh"
                            :class="{'load-more-rotating' : loadMoreLoading}"
                        ></i>
                    </a>
                </div>
                <div class="sidebar-filter-overlay" @click="hideSidebar"></div>
                <shop-sidebar-one :is-sidebar="true"></shop-sidebar-one>
            </div>
        </div>
    </main>
</template>
<script>
import { mapGetters } from 'vuex';

import PageHeader from '~/components/elements/PageHeader';
import ShopListOne from '~/components/partial/shop/list/ShopListOne';
import ShopSidebarOne from '~/components/partial/shop/sidebar/ShopSidebarOne';

import Repository, { baseUrl } from '~/repositories/repository.js';
import { scrollToPageContent } from '~/utilities/common';

export default {
    components: {
        PageHeader,
        ShopListOne,
        ShopSidebarOne
    },
    head() {
      return {
        titleTemplate: '',
            title: '',
            meta: [
          {
            hid: '',
            name: '',
            content:''
          },
          {
            name: 'keywords',
            content: ''
          },
        ]
      }
    },
    data: function() {
        return {
            pageTitle:'Shop',
            products: [],
            perPage: 0,
            type: '4cols',
            totalCount: 0,
            orderBy: 'default',
            isSidebar: true,
            loaded: false,
            loadMoreLoading: false
        };
    },
    computed: {
        ...mapGetters('core', ['titlePage','getProducListDisplay']),
        containerClass: function() {
            if (this.$route.params.type === 'fullwidth')
                return 'container-fluid';
            else return 'container';
        },
        hasMore: function() {
            return this.perPage <= this.totalCount;
        }
    },
    watch: {
        $route: function() {
            this.getProducts(true);
        },
        getProducListDisplay:function (newVal) {
            if (this.perPage === 0) {
                this.perPage = parseInt(this.getProducListDisplay.value);
                this.getProducts();
            }
        }
    },
    created() {
        if (this.getProducListDisplay) {
            this.perPage = parseInt(this.getProducListDisplay.value);
            this.getProducts();
        }
    },
    methods: {
        changeView(type){
            this.type = type;
        },
        getProducts: async function(samePage = false, loadMore = false) {
            if (!loadMore) this.loaded = false;
            await Repository.get(`${baseUrl}/product`, {
                params: {
                    ...this.$route.query,
                    orderBy: this.orderBy,
                    perPage: this.perPage
                }
            })
                .then(response => {
                    this.products = response.data;
                    this.totalCount = response.meta.total;

                    this.head.titleTemplate = this.pageTitle+' | ' + this.titlePage;
                    this.head.title =  this.pageTitle+' | ' + this.titlePage;

                    this.loaded = true;
                    if (samePage) {
                        scrollToPageContent();
                    }
                })
                .catch(error => ({ error: JSON.stringify(error) }));

        },
        toggleSidebar: function() {
            if (
                document
                    .querySelector('body')
                    .classList.contains('sidebar-filter-active')
            ) {
                document
                    .querySelector('body')
                    .classList.remove('sidebar-filter-active');
            } else {
                document
                    .querySelector('body')
                    .classList.add('sidebar-filter-active');
            }
        },

        showSidebar: function() {
            document
                .querySelector('body')
                .classList.add('sidebar-filter-active');
        },

        hideSidebar: function() {
            document
                .querySelector('body')
                .classList.remove('sidebar-filter-active');
        },

        loadMore: function() {
            if (this.perPage < this.totalCount) {
                this.perPage += parseInt(this.getProducListDisplay.value);
                this.loadMoreLoading = true;
                setTimeout(() => {
                    this.getProducts(false, true);
                    this.loadMoreLoading = false;
                }, 400);
            }
        }
    }
};
</script>
