<template>
    <div class="product product-11 text-center">
        <figure class="product-media">
            <span class="product-label label-circle label-new" v-if="product.new">New</span>
            <span class="product-label label-circle label-sale" v-if="product.sale_price">Sale</span>
            <span class="product-label label-circle label-top" v-if="product.top">Top</span>
            <span
                class="product-label label-circle label-out"
                v-if="product.stock === 0"
            >Out Of Stock</span>

            <nuxt-link :to="'/product/'+ product.slug">
                <img
                    v-lazy="`${baseDomain}${product.pictures[0]+'&w=350&h=350'}`"
                    alt="Product"
                    width="150"
                    height="150"
                    class="product-image"
                />
                <img
                    v-lazy="`${baseDomain}${product.pictures[1]+'&w=350&h=350'}`"
                    alt="Product"
                    width="150"
                    height="150"
                    class="product-image-hover"
                    v-if="product.pictures[1]"
                />
            </nuxt-link>
            <div class="product-action-vertical" v-if="product.stock !== 0">
                <nuxt-link
                    to="/shop/wishlist"
                    class="btn-product-icon btn-wishlist btn-expandable added-to-wishlist"
                    v-if="isInWishlist(product)"
                    key="inWishlist"
                >
                    <span>go to wishlist</span>
                </nuxt-link>
                <a
                    href="javascript:;"
                    class="btn-product-icon btn-wishlist btn-expandable"
                    @click.prevent="addToWishlist({product: product})"
                    v-else
                    key="notInWishlist"
                >
                    <span>add to wishlist</span>
                </a>
                <a
                    href="javascript:;"
                    class="btn-product-icon btn-quickview"
                    title="Quick view"
                    @click.prevent="quickView({product: product})"
                >
                    <span>Quick view</span>
                </a>
                <a
                    href="javascript:;"
                    class="btn-product-icon btn-compare added-to-compare"
                    title="Compare"
                    v-if="isInCompare(product)"
                    key="inCompare"
                >
                    <span>Compare</span>
                </a>
            </div>
        </figure>

        <div class="product-body">
            <div class="product-cat">
                <span v-for="(cat, index) of product.category" :key="index">
                    <nuxt-link
                        :to="{path: '/shop/sidebar/list', query: {category: cat.alias}}"
                    >{{ cat.descriptions_with_lang_default.title }}</nuxt-link>
                    {{ index < product.category.length - 1 ? ',' : '' }}
                </span>
            </div>
            <h3 class="product-title">
                <nuxt-link :to="'/product/'+ product.slug">{{ product.name }}</nuxt-link>
            </h3>

            <div class="product-price" v-if="product.stock==0" key="outPrice">
                <span class="out-price">{{ priceConvert(product.price) }}</span>
            </div>

            <template v-else>
                <div class="product-price" v-if="minPrice == maxPrice">{{ priceConvert(minPrice) }}</div>
                <template v-else>
                    <div class="product-price" v-if="product.variants.length == 0">
                        <span class="new-price">{{ priceConvert(minPrice) }}</span>
                        <span class="old-price">{{ priceConvert(maxPrice) }}</span>
                    </div>
                    <div
                        class="product-price"
                        v-else
                    >{{ priceConvert(minPrice) }} - {{ priceConvert(maxPrice) }}</div>
                </template>
            </template>

            <div class="ratings-container">
                <div class="ratings">
                    <div class="ratings-val" :style="{width: product.ratings * 20 + '%'}"></div>
                    <span class="tooltip-text">{{ product.ratings.toFixed(2) }}</span>
                </div>
                <span class="ratings-text">( {{ product.review }} Reviews )</span>
            </div>
        </div>

        <div class="product-action" v-if="product.stock !== 0">
            <nuxt-link
                :to="'/product/' + product.slug"
                class="btn-product btn-cart btn-select"
                v-if="product.variants.length > 0"
            >
                <span>select options</span>
            </nuxt-link>
            <button
                class="btn-product btn-cart"
                @click.prevent="addToCart( {product: product} )"
                v-else
            >
                <span>add to cart</span>
            </button>
        </div>
    </div>
</template>
<script>
import { baseDomain } from '~/repositories/repository.js';
import { mapGetters, mapActions } from 'vuex';
import { priceConvert } from '~/utilities/common';
export default {
    props: {
        product: Object
    },
    data: function() {
        return {
            baseDomain: baseDomain,
            maxPrice: 0,
            minPrice: 0
        };
    },
    computed: {
        ...mapGetters('cart', ['canAddToCart']),
        ...mapGetters('wishlist', ['isInWishlist']),
        ...mapGetters('compare', ['isInCompare'])
    },

    created: function() {
        let max = 0;
        let sumMax = [];
        for(let element in this.product.variants){
            this.product.variants[element].forEach( function(element, index) {
                if(index == 0){
                    max = element.price;
                }
                if (max < element.price) {
                    max = element.price;
                }
            });
            sumMax.push(max);
        }
        max = sumMax.reduce(function(a, b){ return a + b }, 0);
        if (this.product.sale_price) {
            this.promoPrice = this.product.sale_price.price_promotion;
        }
        if (this.product.variants.length == 0) {
            this.minPrice = this.product.price;
            this.maxPrice = this.product.price;
        }else{
            this.minPrice = this.product.price;
            this.maxPrice = this.product.price+max;
        }
    },
    methods: {
        priceConvert,
        ...mapActions('cart', ['addToCart']),
        ...mapActions('wishlist', ['addToWishlist']),
        quickView: function() {
            this.$modal.show(
                () => import('~/components/elements/modals/QuickViewModal'),
                {
                    product: this.product
                },
                { width: '1030', height: 'auto', adaptive: true }
            );
        }
    }
};
</script>