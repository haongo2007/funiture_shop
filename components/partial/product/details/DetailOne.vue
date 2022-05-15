<template>
    <div class="product-details" v-if="product">
        <h1 class="product-title">{{ product.name }}</h1>

        <div class="ratings-container">
            <div class="ratings">
                <div class="ratings-val" :style="{width: product.ratings * 20 + '%'}"></div>
                <span class="tooltip-text">{{ priceConvert(product.ratings) }}</span>
            </div>
            <span class="ratings-text mt-0">( {{ product.review }} Reviews )</span>
        </div>

        <div class="product-price" v-if="product.stock==0" key="outPrice">
            <span class="out-price">{{ priceConvert(product.price) }}</span>
        </div>

        <template v-else>
            <div class="product-price" v-if="promoPrice > 0">
                <span class="new-price">{{ priceConvert(promoPrice) }}</span>
                <span class="old-price">{{ priceConvert(product.price) }}</span>
            </div>
            <div class="product-price" v-else-if="maxPrice != minPrice">
                <div class="product-price" >{{ priceConvert(minPrice)}} - {{ priceConvert(maxPrice)}}</div>
            </div>
            <template v-else>
                <div class="product-price">
                    <span class="new-price">{{ priceConvert(product.price) }}</span>
                </div>
            </template>
        </template>

        <div class="product-content">
            <p>{{ product.short_desc.description }}</p>
        </div>

        <template v-if="Object.keys(product.variants).length > 0">
            <div class="details-filter-row details-row-size" v-if="product.variants.hasOwnProperty('color') && product.variants.color.length > 0">
                <label>Color:</label>

                <div class="product-nav product-nav-dots">
                    <a :title="item.name"
                        href="#"
                        :class="{active: item.color == selectedVariant.code, disabled: item.disabled}"
                        :style="{'background-color': item.color}"
                        v-for="(item, index) in product.variants.color"
                        :key="index"
                        @click.prevent="selectColor(item)"
                    ></a>
                </div>
            </div>

            <div class="details-filter-row details-row-size" v-if="product.variants.hasOwnProperty('size') && product.variants.size.length > 0">
                <label for="size">Size:</label>
                <div class="select-custom">
                    <select
                        name="size"
                        id="size"
                        class="form-control"
                        @change="selectSize()"
                        v-model="selectedSize"
                    >
                        <option value="null" :selected="selectedVariant.size == null">Select a size</option>
                        <option
                            :selected="selectedVariant.size == item.name"
                            :value="item"
                            v-for="(item, index) in product.variants.size"
                            :key="index"
                        >{{ item.name }}</option>
                    </select>
                </div>

                <a href="javascript:;" class="size-guide mr-4">
                    <i class="icon-th-list"></i>size guide
                </a>
                <a href="#" @click.prevent="clearSelection" v-if="showClear">clear</a>
            </div>
            <vue-slide-toggle :open="showVariationPrice">
                <div class="product-price" >
                    {{ priceConvert(parseInt(selectedVariant.price_size) + parseInt(selectedVariant.price_color)) }}
                </div>
            </vue-slide-toggle>
        </template>

        <div class="details-filter-row details-row-size">
            <label for="qty">Qty:</label>
            <quantity-input :product="product" @change-qty="changeQty"></quantity-input>
        </div>

        <div class="product-details-action">
            <a
                href="#"
                class="btn-product btn-cart"
                :class="{'btn-disabled': !canAddToCart(product, qty) || (Object.keys(product.variants).length > 0 && !showVariationPrice) }"
                @click.prevent="addCart(0)"
            >
                <span>add to cart</span>
            </a>

            <div class="details-action-wrapper">
                <a
                    href="#"
                    class="btn-product btn-wishlist"
                    title="Wishlist"
                    @click.prevent="addToWishlist({product: product})"
                    v-if="! isInWishlist(product)"
                    key="notInWishlist"
                >
                    <span>Add to Wishlist</span>
                </a>
                <nuxt-link
                    to="/shop/wishlist"
                    class="btn-product btn-wishlist added-to-wishlist"
                    title="Wishlist"
                    v-else
                    key="inWishlist"
                >
                    <span>Go to Wishlist</span>
                </nuxt-link>
            </div>
        </div>

        <div class="product-details-footer">
            <div class="product-cat w-100 text-truncate">
                <span>Category:</span>
                <span v-for="(cat, index) of product.category" :key="index">
                    <nuxt-link
                        :to="{path: '/shop?category=', query: {category: cat.alias}}"
                    >{{ cat.descriptions_with_lang_default.title }}</nuxt-link>
                    {{ index < product.category.length - 1 ? ',' : '' }}
                </span>
            </div>

            <div class="social-icons social-icons-sm">
                <span class="social-label">Share:</span>
                <a href="javascript:;" class="social-icon" title="Facebook" target="_blank">
                    <i class="icon-facebook-f"></i>
                </a>
                <a href="javascript:;" class="social-icon" title="Twitter" target="_blank">
                    <i class="icon-twitter"></i>
                </a>
                <a href="javascript:;" class="social-icon" title="Instagram" target="_blank">
                    <i class="icon-instagram"></i>
                </a>
                <a href="javascript:;" class="social-icon" title="Pinterest" target="_blank">
                    <i class="icon-pinterest"></i>
                </a>
            </div>
        </div>

        <div class="sticky-bar" :class="{ stickyShow: isSticky }">
            <div class="container">
                <div class="row">
                    <div class="col-6">
                        <figure class="product-media">
                            <nuxt-link :to="'/product/default/'+ product.slug">
                                <img
                                    v-lazy="`${baseDomain}${product.pictures[0]+'&w=150&h=150'}`"
                                    alt="Product"
                                    width="150"
                                    height="150"
                                />
                            </nuxt-link>
                        </figure>
                        <h3 class="product-title">
                            <nuxt-link :to="'/product/default/'+ product.slug">{{ product.name }}</nuxt-link>
                        </h3>
                    </div>
                    <div class="col-6 justify-content-end">
                        <template v-if="Object.keys(product.variants).length > 0">
                            <div class="details-filter-row details-row-size" style="margin-bottom: 0px;" 
                                v-if="product.variants.hasOwnProperty('color') && product.variants.color.length > 0">

                                <div class="product-nav product-nav-dots" style="margin-right:2rem;">
                                    <a :title="item.name"
                                        href="#"
                                        :class="{active: item.color == selectedVariant.code, disabled: item.disabled}"
                                        :style="{'background-color': item.color}"
                                        v-for="(item, index) in product.variants.color"
                                        :key="index"
                                        @click.prevent="selectColor(item)"
                                    ></a>
                                </div>
                            </div>  

                            <div style="margin-bottom:0px;" class="details-filter-row details-row-size" 
                                v-if="product.variants.hasOwnProperty('size') && product.variants.size.length > 0">
                                <div class="select-custom" style="margin-right: 2rem;">
                                    <select
                                        name="size"
                                        id="size"
                                        class="form-control"
                                        @change="selectSize()"
                                        v-model="selectedSize"
                                    >
                                        <option value="null" :selected="selectedVariant.size == null">Select a size</option>
                                        <option
                                            :selected="selectedVariant.size == item.name"
                                            :value="item"
                                            v-for="(item, index) in product.variants.size"
                                            :key="index"
                                        >{{ item.name }}</option>
                                    </select>
                                </div>
                            </div>
                            <vue-slide-toggle :open="showVariationPrice">
                                <div class="product-price" >
                                {{ priceConvert(parseInt(selectedVariant.price_size)+parseInt(selectedVariant.price_color)) }}
                                </div>
                            </vue-slide-toggle>
                            <a style="margin-right:2rem;" href="#" @click.prevent="clearSelection" v-if="showClear">clear</a>
                        </template>
                        <quantity-input :product="product" @change-qty="changeQty"></quantity-input>
                        <div class="product-details-action">
                            <a
                                href="#"
                                class="btn-product btn-cart"
                                :class="{'btn-disabled': !canAddToCart(product, qty) || (Object.keys(product.variants).length > 0 && !showVariationPrice) }"
                                @click.prevent="addCart(0)"
                            >
                                <span>add to cart</span>
                            </a>
                            <a
                                href="#"
                                class="btn-product btn-wishlist"
                                title="Wishlist"
                                @click.prevent="addToWishlist({product: product})"
                                v-if="! isInWishlist(product)"
                                key="notInWishlist"
                            >
                                <span>Add to Wishlist</span>
                            </a>
                            <nuxt-link
                                to="/shop/wishlist"
                                class="btn-product btn-wishlist added-to-wishlist"
                                title="Wishlist"
                                v-else
                                key="inWishlist"
                            >
                                <span>Go to Wishlist</span>
                            </nuxt-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import { VueSlideToggle } from 'vue-slide-toggle';
import QuantityInput from '~/components/elements/QuantityInput';
import { baseDomain } from '~/repositories/repository.js';
import { priceConvert } from '~/utilities/common';

const defaultVariant = {
        size: null,
        color: null,
        code: null,
        price_color: null,
        price_size: null,
}

export default {
    components: {
        VueSlideToggle,
        QuantityInput
    },
    props: {
        product: {
            type: Object
        }
    },
    data: function() {
        return {
            parentVariant:null,
            selectedSize:null,
            isSticky: false,
            baseDomain: baseDomain,
            selectedVariant: Object.assign({},defaultVariant),
            maxPrice: 0,
            minPrice: 0,
            promoPrice: 0,
            qty: 1,
        };
    },
    mounted: function() {
        let stickyContent = this.$el.lastChild;
        this.$el.style.height = stickyContent.offsetHeight + 'px';
        window.addEventListener('scroll', this.scrollHandler, {
            passive: true
        });
    },
    computed: {
        ...mapGetters('cart', ['canAddToCart']),
        ...mapGetters('wishlist', ['isInWishlist']),
        ...mapGetters('compare', ['isInCompare']),
        ...mapGetters('store', ['getCurrency']),
        showClear: function() {
            return this.checkEnought();
        },
        showVariationPrice: function() {
            return this.checkEnought();
        },
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
        if (Object.keys(this.product.variants).length < 2) {
            this.parentVariant = Object.keys(this.product.variants)[0]; 
        }
    },
    methods: {
        priceConvert,
        ...mapActions('cart', ['addToCart']),
        ...mapActions('wishlist', ['addToWishlist']),
        ...mapActions('compare', ['addToCompare']),
        checkEnought(){
            let flag = true;
            for(let index in this.selectedVariant){
                if (!this.selectedVariant[index] && this.selectedVariant[index] != 0) {
                    flag = false;
                }
            }
            return flag;
        },
        selectColor: function(item) {          
            if (item.color != null && item.color[0] == this.selectedVariant.code) {
                this.selectedVariant.price_color = null;
                this.selectedVariant.color = '';
                this.selectedVariant.code = '';
                if(item.hasOwnProperty('children') && Object.keys(item.children).length > 0) {
                    delete this.product.variants.size;
                    this.selectedVariant.price_size = 0;
                    this.selectedVariant.size = null;
                    this.selectedSize = null;
                }
            } else {
                this.selectedVariant.price_color = item.price;
                this.selectedVariant.color = item.name;
                this.selectedVariant.code = item.color != null ? item.color[0] : '';
                if(item.hasOwnProperty('children') && Object.keys(item.children).length > 0) {
                    this.selectedVariant.price_size = 0;
                    this.selectedVariant.size = null;
                    this.selectedSize = null;
                    this.product.variants.size = item.children.size;
                }
            }
        },
        selectSize: function() {
            let item = this.selectedSize;
            this.selectedVariant.price_size = item.price;
            this.selectedVariant.size = item.name;
            if(item.hasOwnProperty('children') && Object.keys(item.children).length > 0) {
                this.product.variants.color = item.children.color;
            }
            if (this.parentVariant == 'size') {
                this.selectedVariant.price_color = 0;
                this.selectedVariant.color = null;
                if (this.selectedSize == 'null') {
                    delete this.product.variants.color;
                }
            }
        },
        changeQty: function(current) {
            this.qty = current;
        },
        clearSelection: function() {
            this.selectedVariant = {
                ...this.selectedVariant,
                size: null,
                color: null,
                code: null,
                price_color: null,
                price_size: null,
            };
            this.selectedSize = null;
            if (this.parentVariant == 'size') {
                delete this.product.variants.color;
            }else if(this.parentVariant == 'color'){
                delete this.product.variants.size;
            }
        },
        addCart: function(index = 0) {
            let newProduct = { ...this.product };
            if (Object.keys(this.product.variants).length > 0) {
                newProduct = {
                    ...this.product,
                    name: this.product.name,
                    selectedVariant: this.selectedVariant,
                    price: parseInt(this.promoPrice ? this.promoPrice : this.product.price)
                };
            }
            this.addToCart({
                product: newProduct,
                qty: this.qty
            });
            this.selectedVariant = Object.assign({},defaultVariant);
            this.selectedSize = null;
        },
        scrollHandler: function() {
            let stickyContent = this.$el.lastChild;
            if (window.pageYOffset > 500) {
                if (!this.isSticky) {
                    this.isSticky = true;
                }
            } else if (this.isSticky) {
                this.isSticky = false;
            }
        },
    }
};
</script>
<style type="text/css">
    .sticky-bar{
        bottom: -200px;
        transition-duration: 300ms;
    }
    .stickyShow{
        transition-duration: 300ms;
        bottom: 0px;
    }
</style>