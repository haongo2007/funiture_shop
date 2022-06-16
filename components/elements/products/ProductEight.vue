<template>
    <div class="product product-list">
        <div class="row pr-2">
            <div class="col-lg-3 col-md-3 col-6">
                <figure class="product-media">
                    <span class="product-label label-new" v-if="product.new">New</span>
                    <span class="product-label label-sale" v-if="product.sale_price">Sale</span>
                    <span class="product-label label-top" v-if="product.top">Top</span>
                    <span class="product-label label-out" v-if="product.stock === 0">Out Of Stock</span>

                    <nuxt-link :to="'/product/'+ product.slug">
                        <img
                            v-lazy="`${baseDomain}${product.pictures[0]+'&w=150&h=150'}`"
                            alt="Product"
                            width="150"
                            height="150"
                            class="product-image"
                        />
                        <img
                            v-lazy="`${baseDomain}${product.pictures[1]+'&w=150&h=150'}`"
                            alt="Product"
                            width="150"
                            height="150"
                            class="product-image-hover"
                            v-if="product.pictures[1]"
                        />
                    </nuxt-link>
                </figure>
            </div>

            <div class="col-lg-6 col-md-6 order-last">
                <div class="product-body product-action-inner">
                    <div class="product-cat">
                        <span v-for="(cat, index) of product.category" :key="index">
                            <nuxt-link
                                :to="{path: '/shop/sidebar/list', query: {category: cat.slug}}"
                            >{{ cat.name }}</nuxt-link>
                            {{ index < product.category.length - 1 ? ',' : '' }}
                        </span>
                    </div>
                    <h3 class="product-title" style="max-width: 100%;">
                        <nuxt-link :to="'/product/'+ product.slug">{{ product.name }}</nuxt-link>
                    </h3>

                    <div class="product-content">
                        <p>{{ product.short_desc.description }}</p>
                    </div>

                    <div class="product-nav product-nav-dots" v-if="product.variants.length > 0">
                        <div class="row no-gutters">
                            <a
                                href="javascript:;"
                                :style="{'background-color': item.color}"
                                v-for="(item, index) in product.variants"
                                :key="index"
                            >
                                <span class="sr-only">Color name</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-lg-3 col-md-3 col-6 order-md-last order-lg-last">
                <div class="product-list-action">
                    <div class="product-price" v-if="product.stock==0" key="outPrice">
                        <span class="out-price">{{ priceConvert(product.price) }}</span>
                    </div>
                    
                    <template v-else>
                        <div class="product-price" v-if="product.sale_price">
                            <span class="new-price">{{ priceConvert(product.sale_price.price_promotion) }}</span>
                            <span class="old-price">{{ priceConvert(product.price) }}</span>
                        </div>
                        <template v-else>
                            <div class="product-price" v-if="maxPrice != minPrice">
                                <div class="product-price" >{{ priceConvert(minPrice)}} - {{ priceConvert(maxPrice)}}</div>
                            </div>
                            <div class="product-price" v-else>
                                <span class="new-price">{{ priceConvert(product.price) }}</span>
                            </div>
                        </template>
                    </template>
                    
                    <div class="product-nav product-nav-dots" style="margin-bottom: 1rem" 
                        v-if="Object.keys(product.variants).length > 0 && product.variants.hasOwnProperty('color') && product.variants.color.length">
                        <div class="row no-gutters">
                            <a
                                href="javascript:;"
                                :style="{'background-color': item.color}"
                                v-for="(item, index) in product.variants.color"
                                :key="index"
                            >
                                <span class="sr-only">Color name</span>
                            </a>
                        </div>
                    </div>

                    <div class="ratings-container">
                        <div class="ratings">
                            <div class="ratings-val" :style="{width: product.ratings * 20 + '%'}"></div>
                            <span class="tooltip-text">{{ product.ratings.toFixed(2) }}</span>
                        </div>
                        <span class="ratings-text">( {{ product.review }} Reviews )</span>
                    </div>
            
                    <div class="product-action">
                        <button
                            class="btn-product btn-quickview"
                            title="Quick view"
                            @click.prevent="quickView({product: product})"
                        >
                            <span>quick view</span>
                        </button>
                        <nuxt-link
                            to="/shop/wishlist"
                            class="btn-product btn-wishlist added-to-wishlist"
                            v-if="isInWishlist(product)"
                            key="inWishlist"
                        >
                            <span>wishlist</span>
                        </nuxt-link>
                        <a
                            href="javascript:;"
                            class="btn-product btn-wishlist"
                            @click.prevent="addToWishlist({product: product})"
                            v-else
                            key="notInWishlist"
                        >
                            <span>wishlist</span>
                        </a>
                    </div>

                    <nuxt-link
                        :to="'/product/' + product.slug"
                        class="btn-product btn-cart btn-select"
                        v-if="product.variants.length > 0"
                    >
                        <span>select options</span>
                    </nuxt-link>
                    <button
                        class="btn-product btn-cart"
                        :class="{'btn-disabled': !canAddToCart(product, 1)}"
                        @click.prevent="addToCart( {product: product} )"
                        v-else
                    >
                        <span>add to cart</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import { baseDomain } from '~/repositories/repository';
import { priceConvert } from '~/utilities/common';
export default {
    props: {
        product: Object
    },
    data: function() {
        return {
            baseDomain: baseDomain,
            maxPrice: 0,
            minPrice: 99999
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
        ...mapActions('compare', ['addToCompare']),
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