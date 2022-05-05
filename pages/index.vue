<template>
    <div class="main home-page">
        <div class="intro-slider-container">
            <div class="swiper-carousel swiper-1" v-if="showCarousel1">
                <div v-swiper:swiper1="carouselSetting1">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide"  v-for="(item,index) in getSlider" :key="item.id">
                            <div class="intro-slide" v-lazy:background-image="baseDomain+item.image">
                                <div class="container intro-content">
                                    <div v-if="item.html" v-html="item.html">
                                    
                                    </div>
                                    <div v-else>
                                        <h1 class="intro-title">
                                            {{item.title}}
                                        </h1>
                                    </div>

                                    <a :href="item.url" class="btn btn-primary" :target="item.target">
                                        <span>Shop Now</span>
                                        <i class="icon-long-arrow-right"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="swiper-dots swiper-dots-inner"></div>
            </div>
        </div>
        <div class="swiper-carousel brands-border swiper-2 mb-3 mb-lg-5">
            <div v-swiper:swiper2="carouselSetting2">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="(brand, index) in getBrand" :key="index">
                        <nuxt-link :to="'/store?brands='+brand.alias" class="brand">
                            <img
                                v-lazy="baseDomain+brand.image"
                                class="bg-white"
                                alt="Brand"
                                width="100"
                                height="30"
                            />
                        </nuxt-link>
                    </div>
                </div>
            </div>
        </div>

        <div class="banner-group">
            <div class="container">
                <div class="row">
                    <div class="col-sm-6 col-lg-5" v-if="getBanner[0]">
                        <div class="banner banner-large banner-overlay banner-overlay-light banner-1">
                            <a :href="getBanner[1].url">
                                <img
                                    v-lazy="baseDomain+getBanner[0].image"
                                    width="470"
                                    height="510"
                                    alt="Banner"
                                />
                            </a>
                            <div v-html="getBanner[0].html" v-if="getBanner[0].html"></div>
                            <div class="banner-content banner-content-top" v-else>

                                <h3 class="banner-title">{{ getBanner[0].title }}</h3>

                                <a :href="getBanner[0].url" class="btn btn-outline-gray banner-link">
                                    Shop Now
                                    <i class="icon-long-arrow-right"></i>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div class="col-sm-6 col-lg-3" v-if="getBanner[1]">
                        <div class="banner banner-overlay banner-2">
                            <a :href="getBanner[1].url">
                                <img
                                    v-lazy="baseDomain+getBanner[1].image"
                                    width="290"
                                    height="510"
                                    alt="Banner"
                                />
                            </a>

                            <div v-html="getBanner[1].html" v-if="getBanner[1].html"></div>

                            <div class="banner-content banner-content-bottom" v-else>

                                <h3 class="banner-title text-white">
                                    {{ getBanner[1].title }}
                                </h3>

                                <a :href="getBanner[1].url" class="btn btn-outline-white banner-link" >
                                    Discover Now
                                    <i class="icon-long-arrow-right"></i>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div class="col-sm-12 col-md-12 col-lg-4" v-if="getBanner[2]">
                        <div class="row">
                            <div class="col-lg-12 col-md-6 col-sm-6">
                                <div class="banner banner-overlay banner-3">
                                    <a :href="getBanner[2].url">
                                        <img
                                            v-lazy="baseDomain+getBanner[2].image"
                                            width="370"
                                            height="245"
                                            alt="Banner"
                                        />
                                    </a>

                                    <div v-html="getBanner[2].html" v-if="getBanner[2].html"></div>

                                    <div class="banner-content banner-content-top" v-else>
                                        <h4 class="banner-subtitle text-grey">New Arrivals</h4>

                                        <h3 class="banner-title text-white">
                                            {{ getBanner[2].title }}
                                        </h3>

                                        <a :href="getBanner[2].url" class="btn btn-outline-white banner-link">
                                            Discover Now
                                            <i class="icon-long-arrow-right"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div class="col-lg-12 col-md-6 col-sm-6" v-if="getBanner[3]">
                                <div class="banner banner-overlay banner-overlay-light banner-4">
                                    <a :href="getBanner[3].url">
                                        <img
                                            v-lazy="baseDomain+getBanner[3].image"
                                            width="370"
                                            height="245"
                                            alt="Banner"
                                        />
                                    </a>

                                    <div v-html="getBanner[3].html" v-if="getBanner[3].html"></div>

                                    <div class="banner-content banner-content-top" v-else>

                                        <h3 class="banner-title">{{ getBanner[3].title }}</h3>

                                        <a :href="getBanner[3].url" class="btn btn-outline-gray banner-link">
                                            Shop Now
                                            <i class="icon-long-arrow-right"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-sm-6 col-lg-3" v-if="getBanner[5]" v-for="(item,index) in getBanner">
                        <div class="banner banner-large banner-overlay banner-overlay-light banner-1" v-if="index > 4">
                            <a :href="item.url">
                                <img
                                    v-lazy="baseDomain+item.image"
                                    width="470"
                                    height="510"
                                    alt="Banner"
                                />
                            </a>
                            <div v-html="item.html" v-if="item.html"></div>
                            <div class="banner-content banner-content-top" v-else>

                                <h3 class="banner-title">{{ item.title }}</h3>

                                <a :href="item.url" class="btn btn-outline-gray banner-link">
                                    Shop Now
                                    <i class="icon-long-arrow-right"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <special-collection :products="products" v-if="loaded"></special-collection>

        <div class="bg-light deal-container pt-5 pb-3 mb-6">
            <div class="container">
                <div class="row">
                    <div class="col-lg-9">
                        <div class="deal">
                            <div class="deal-content">
                                <h4>Limited Quantities</h4>
                                <h2>Deal of the Day</h2>

                                <h3 class="product-title">
                                    <nuxt-link to="/shop/sidebar/list">POÄNG</nuxt-link>
                                </h3>

                                <div class="product-price">
                                    <span class="new-price">$149.00</span>
                                    <span class="old-price">Was $240.00</span>
                                </div>

                                <count-down
                                    wrap="deal-countdown"
                                    until="+10h"
                                    format="HMS"
                                    :relative="true"
                                    :labelsShort="true"
                                ></count-down>

                                <nuxt-link to="/shop/sidebar/list" class="btn btn-primary">
                                    <span>Shop Now</span>
                                    <i class="icon-long-arrow-right"></i>
                                </nuxt-link>
                            </div>

                            <div class="deal-image">
                                <nuxt-link
                                    to="/shop/sidebar/list"
                                    class="justify-content-center d-flex"
                                >
                                    <img
                                        v-lazy="'./images/home/deal/product-1.jpg'"
                                        width="440"
                                        height="460"
                                        alt="image"
                                    />
                                </nuxt-link>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-3">
                        <div
                            class="banner banner-overlay banner-overlay-light text-center d-none d-lg-block"
                        >
                            <nuxt-link to="/shop/sidebar/list">
                                <img
                                    v-lazy="'./images/home/banners/banner-5.jpg'"
                                    alt="Banner"
                                    width="280"
                                    height="500"
                                />
                            </nuxt-link>

                            <div class="banner-content banner-content-top banner-content-center">
                                <h4 class="banner-subtitle">The Best Choice</h4>
                                <h3 class="banner-title">AGEN</h3>
                                <div class="banner-text text-primary">$49.99</div>
                                <nuxt-link
                                    to="/shop/sidebar/list"
                                    class="btn btn-outline-gray banner-link"
                                >
                                    Shop Now
                                    <i class="icon-long-arrow-right"></i>
                                </nuxt-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <top-collection :products="topProducts" v-if="loaded"></top-collection>

        <blog-section :blogs="blogs" v-if="loaded"></blog-section>
        <div class="icon-boxes-container">
            <div class="container">
                <div class="row">
                    <div class="col-sm-6 col-lg-3">
                        <div class="icon-box icon-box-side">
                            <span class="icon-box-icon text-dark">
                                <i class="icon-rocket"></i>
                            </span>
                            <div class="icon-box-content">
                                <h3 class="icon-box-title">Free Shipping</h3>

                                <p>orders $50 or more</p>
                            </div>
                        </div>
                    </div>

                    <div class="col-sm-6 col-lg-3">
                        <div class="icon-box icon-box-side">
                            <span class="icon-box-icon text-dark">
                                <i class="icon-rotate-left"></i>
                            </span>

                            <div class="icon-box-content">
                                <h3 class="icon-box-title">Free Returns</h3>

                                <p>within 30 days</p>
                            </div>
                        </div>
                    </div>

                    <div class="col-sm-6 col-lg-3">
                        <div class="icon-box icon-box-side">
                            <span class="icon-box-icon text-dark">
                                <i class="icon-info-circle"></i>
                            </span>

                            <div class="icon-box-content">
                                <h3 class="icon-box-title">Get 20% Off 1 Item</h3>

                                <p>When you sign up</p>
                            </div>
                        </div>
                    </div>

                    <div class="col-sm-6 col-lg-3">
                        <div class="icon-box icon-box-side">
                            <span class="icon-box-icon text-dark">
                                <i class="icon-life-ring"></i>
                            </span>

                            <div class="icon-box-content">
                                <h3 class="icon-box-title">We Support</h3>

                                <p>24/7 amazing services</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer-newsletter bg-image" v-lazy:background-image="'./images/backgrounds/bg-2.jpg'">
            <div class="container">
                <div class="heading text-center">
                    <h3 class="title">Get The Latest Deals</h3>

                    <p class="title-desc">
                        and receive
                        <span>$20 coupon</span> for first shopping
                    </p>
                </div>

                <div class="row">
                    <div class="col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
                        <form action="#">
                            <div class="input-group">
                                <input
                                    type="email"
                                    class="form-control"
                                    placeholder="Enter your Email Address"
                                    aria-label="Email Adress"
                                    aria-describedby="newsletter-btn"
                                    required
                                />
                                <div class="input-group-append">
                                    <button
                                        class="btn btn-primary"
                                        type="submit"
                                        id="newsletter-btn"
                                    >
                                        <span>Subscribe</span>
                                        <i class="icon-long-arrow-right"></i>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';

import CountDown from '~/components/elements/CountDown';
import SpecialCollection from '~/components/partial/home/SpecialCollection';
import TopCollection from '~/components/partial/home/TopCollection';
import BlogSection from '~/components/partial/home/BlogSection';
import NewsletterModal from '~/components/elements/modals/NewsletterModal';

import Repository, { baseUrl,baseDomain } from '~/repositories/repository.js';
import { attrFilter } from '~/utilities/common';
import {
    carouselSettingSingle,
    carouselSettingDefault
} from '~/utilities/carousel';
// import { homeData } from '~/utilities/data';

export default {
    components: {
        CountDown,
        BlogSection,
        TopCollection,
        SpecialCollection
    },
    data: function() {
        return {
            baseDomain:baseDomain,
            loaded: false,
            products: [],
            topProducts: [],
            blogs: [],
            showCarousel1:false,
            carouselSetting1:{
                ...carouselSettingSingle,
                pagination: {
                    el: '.swiper-1 .swiper-dots',
                    clickable: true
                }
            },
            carouselSetting2: {
                ...carouselSettingDefault,
                slidesPerView: 7,
                spaceBetween: 0,
                breakpoints: {
                    992: {
                        slidesPerView: 6
                    },
                    768: {
                        slidesPerView: 5
                    },
                    576: {
                        slidesPerView: 3
                    },
                    480: {
                        slidesPerView: 2
                    }
                }
            },
        };
    },
    computed: {
        ...mapGetters('demo', ['newsletterShow']),
        ...mapGetters('store', ['getSlider']),
        ...mapGetters('store', ['getBrand']),
        ...mapGetters('store', ['getBanner'])
    },
    watch: {
      '$store.state.store.slider': function() {
        
      }
    },
    created: function() {
        // this.getProducts();
        this.showCarousel1 = true;
    },
    mounted: function() {
        // if (this.newsletterShow) {
        //     setTimeout(() => {
        //         if (this.$route.path == '/' && this.newsletterShow) {
        //             this.$modal.show(
        //                 NewsletterModal,
        //                 {},
        //                 { width: '970', height: 'auto', adaptive: true }
        //             );
        //         }
        //     }, 8000);
        // }
    },
    methods: {
        getProducts: async function() {
            this.loaded = false;
            await Repository.get(`${baseUrl}/product/beege-bage`)
                .then(response => {
                    this.products = response.data.products;
                    this.topProducts = attrFilter(this.products, 'top');
                    this.blogs = response.data.blogs;
                    this.loaded = true;
                })
                .catch(error => ({ error: JSON.stringify(error) }));
        }
    }
};
</script>