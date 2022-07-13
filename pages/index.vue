<template>
    <div class="main home-page">
        <div class="intro-slider-container">
            <div class="swiper-carousel swiper-1" v-if="showCarousel1">
                <div v-swiper:swiper1="carouselSetting1">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" v-for="(item,index) in getSlider" :key="item.id">
                            <a :href="item.url">
                                <div class="intro-slide" v-lazy:background-image="baseDomain+item.image">
                                    <div class="container intro-content">
                                        <div v-if="item.html" v-html="item.html">
                                        
                                        </div>
                                        <div v-else>
                                            <h1 class="intro-title">
                                                {{item.title}}
                                            </h1>
                                            <a :href="item.url" class="btn btn-primary" :target="item.target">
                                                <span>Shop Now</span>
                                                <i class="icon-long-arrow-right"></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </a>
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
                        <nuxt-link :to="'/shop?brand='+brand.alias" class="brand">
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
                    <div class="col-sm-6 col-lg-5" v-if="getBanner.hasOwnProperty(0)">
                        <div class="banner banner-large banner-overlay banner-overlay-light banner-1" >
                            <a :href="getBanner[0].url">
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
                    <div class="col-sm-6 col-lg-3" v-if="getBanner.hasOwnProperty(1)">
                        <div class="banner banner-large banner-overlay banner-overlay-light banner-1" >
                            <a :href="getBanner[1].url">
                                <img
                                    v-lazy="baseDomain+getBanner[1].image"
                                    width="470"
                                    height="510"
                                    alt="Banner"
                                />
                            </a>
                            <div v-html="getBanner[1].html" v-if="getBanner[1].html"></div>
                            <div class="banner-content banner-content-top" v-else>

                                <h3 class="banner-title">{{ getBanner[1].title }}</h3>

                                <a :href="getBanner[1].url" class="btn btn-outline-gray banner-link">
                                    Shop Now
                                    <i class="icon-long-arrow-right"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-12 col-lg-4" v-if="getBanner.hasOwnProperty(2)">
                        <div class="row">
                            <div class="col-lg-12 col-md-6 col-sm-6">
                                <div class="banner banner-overlay banner-3">
                                    <a :href="getBanner[2].url">
                                        <img
                                            v-lazy="baseDomain+getBanner[2].image+'&=370'"
                                            width="370"
                                            height="245"
                                            alt="Banner"
                                        />
                                    </a>

                                    <div v-html="getBanner[2].html" v-if="getBanner[2].html"></div>
                                    <div class="banner-content banner-content-top" v-else>

                                        <h3 class="banner-title">{{ getBanner[2].title }}</h3>

                                        <a :href="getBanner[2].url" class="btn btn-outline-gray banner-link">
                                            Shop Now
                                            <i class="icon-long-arrow-right"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div class="col-lg-12 col-md-6 col-sm-6" v-if="getBanner.hasOwnProperty(3)">
                                <div class="banner banner-overlay banner-overlay-light banner-4">
                                    <a :href="getBanner[3].url">
                                        <img
                                            style="height: 245px;"
                                            v-lazy="baseDomain+getBanner[3].image+'&w=370'"
                                            :width="370"
                                            :height="245"
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
                </div>
            </div>
        </div>

        <special-collection :top-products="topProducts" :rated-products="topRatedProducts" :sale-products="saleProducts" v-if="loaded"></special-collection>

        <div class="bg-light deal-container pt-5 pb-3 mb-6">
            <div class="container">
                <div class="row">
                    <div class="col-lg-9" v-if="flashSaleProducts" v-for="(item,index) in flashSaleProducts" :key="index">
                        <div class="deal">
                            <div class="deal-content">
                                <h4>Limited Quantities</h4>
                                <h2>Deal of the Day</h2>

                                <h3 class="product-title">
                                    <nuxt-link :to="'/product/'+item.product.slug">{{ item.product.short_desc.name }}</nuxt-link>
                                </h3>

                                <div class="product-price">
                                    <span class="new-price">{{ priceConvert(item.product.sale_price.price_promotion) }}</span>
                                    <span class="old-price">Was {{ priceConvert(item.product.price) }}</span>
                                </div>

                                <count-down
                                    wrap="deal-countdown"
                                    :until="'+'+convertBetweenDateToSecond(new Date(),item.product.sale_price.date_end)+'s'"
                                    format="DHMS"
                                    :relative="true"
                                    :labelsShort="true"
                                ></count-down>

                                <nuxt-link :to="'/product/'+item.product.slug" class="btn btn-primary">
                                    <span>Shop Now</span>
                                    <i class="icon-long-arrow-right"></i>
                                </nuxt-link>
                            </div>

                            <div class="deal-image">
                                <nuxt-link
                                    :to="'/product/'+item.product.slug"
                                    class="justify-content-center d-flex"
                                >
                                    <img
                                        v-lazy="baseDomain+item.product.pictures[0]"
                                        width="440"
                                        height="auto"
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
                                    height="473"
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

        <top-collection :viewed-products="mostViewProducts" :latest-products="latestProducts" :bought-products="mostBuyProducts" v-if="loaded"></top-collection>

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
import { priceConvert } from '~/utilities/common';


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
            topProducts: [],
            latestProducts: [],
            mostViewProducts: [],
            mostBuyProducts: [],
            topRatedProducts: [],
            saleProducts: [],
            flashSaleProducts:[],
            blogs: [],
            reBanner: [],
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
        ...mapGetters('core', ['getSlider']),
        ...mapGetters('core', ['getBrand']),
        ...mapGetters('core', ['getBanner']),
    },
    created: function() {
        this.getProducts();
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
        priceConvert,
        convertBetweenDateToSecond(start,end){
            let diff = (new Date(start).getTime() - new Date(end).getTime()) / 1000;
            return Math.abs(Math.round(diff));
        },
        getProducts: async function() {
            this.loaded = false;
            await Repository.get(`${baseUrl}/product/special`,{
                params: {
                    'top': true,
                    'top_rated': true,
                    'sale': true,
                    'most_view': true,
                    'most_buy': true,
                    'flash_sale': true,
                    'latest': true,
                }
            })
                .then(({data}) => {
                    this.topProducts = data.topProducts;
                    this.topRatedProducts = data.topRatedProducts;
                    this.saleProducts = data.saleProducts;
                    this.mostViewProducts = data.mostViewProducts;
                    this.mostBuyProducts = data.mostBuyProducts;
                    this.flashSaleProducts = data.flashSaleProducts;
                    this.latestProducts = data.latestProducts;
                    this.loaded = true;
                })
                .catch(error => ({ error: JSON.stringify(error) }));
        }
    }
};
</script>