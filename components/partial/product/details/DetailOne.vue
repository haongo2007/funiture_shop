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

        <div class="product-cat w-100 text-truncate">
            <span>Category:</span>
            <span v-for="(cat, index) of product.category" :key="index">
                <nuxt-link
                    :to="{path: '/shop?category=', query: {category: cat.alias}}"
                >{{ cat.descriptions_with_lang_default.title }}</nuxt-link>
                {{ index < product.category.length - 1 ? ',' : '' }}
            </span>
        </div>

        <div class="product-content">
            <p>{{ product.short_desc.description }}</p>
        </div>

        <template v-if="Object.keys(product.variants).length > 0">
            <div class="details-filter-row details-row-size" v-if="product.variants.hasOwnProperty('color') && product.variants.color.length > 0">
                <label>Color:</label>

                <div class="product-nav product-nav-dots">
                    <a :title="item.name"
                        href="#"
                        v-for="(item, index) in product.variants.color"
                        :class="{active: selectedVariant.hasOwnProperty(item.type) && index == selectedVariant[item.type].value_index, disabled: item.disabled}"
                        :style="{'background-color': item.color}"
                        :key="index"
                        @click.prevent="selectAtttribute(item)"
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
                        @change="selectAtttribute()"
                        v-model="selectedSize"
                    >
                        <option value="null" :selected="!selectedVariant.size">Select a size</option>
                        <option
                            v-for="(item, index) in product.variants.size"
                            :selected="selectedVariant.hasOwnProperty(item.type) && index == selectedVariant[item.type].value_index"
                            :value="item"
                            :key="index"
                        >{{ item.name }}</option>
                    </select>
                </div>

                <a href="javascript:;" class="size-guide mr-4">
                    <i class="icon-th-list"></i>size guide
                </a>
                <a href="#" @click.prevent="clearSelection" v-if="showClear">clear</a>
            </div>
            <vue-slide-toggle :open="showClear">
                <div class="product-price" >
                    {{ priceConvert(sumAttrbutePrice) }}
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
                :class="{'btn-disabled': !canAddToCart(product, qty) || (Object.keys(product.variants).length > 0 && !activeAddCartButton) }"
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
                                    height="auto"
                                />
                            </nuxt-link>
                        </figure>
                        <h3 class="product-title">
                            <nuxt-link class="txt-ellipsis" style="width: 340px;" :to="'/product/default/'+ product.slug">{{ product.name }}</nuxt-link>
                        </h3>
                    </div>
                    <div class="col-6 justify-content-end">
                        <template v-if="Object.keys(product.variants).length > 0">
                            <div class="details-filter-row details-row-size" style="margin-bottom: 0px;" 
                                v-if="product.variants.hasOwnProperty('color') && product.variants.color.length > 0">

                                <div class="product-nav product-nav-dots" style="margin-right:2rem;">
                                    <a :title="item.name"
                                        href="#"
                                        :class="{active: selectedVariant.hasOwnProperty(item.type) && index == selectedVariant[item.type].value_index, disabled: item.disabled}"
                                        :style="{'background-color': item.color}"
                                        v-for="(item, index) in product.variants.color"
                                        :key="index"
                                        @click.prevent="selectAtttribute(item)"
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
                                        @change="selectAtttribute()"
                                        v-model="selectedSize"
                                    >
                                        <option value="null" :selected="selectedVariant.size == null">Select a size</option>
                                        <option
                                            :selected="selectedVariant.hasOwnProperty(item.type) && index == selectedVariant[item.type].value_index"
                                            :value="item"
                                            v-for="(item, index) in product.variants.size"
                                            :key="index"
                                        >{{ item.name }}</option>
                                    </select>
                                </div>
                            </div>
                            <vue-slide-toggle :open="showClear">
                                <div class="product-price" >
                                {{ priceConvert(sumAttrbutePrice) }}
                                </div>
                            </vue-slide-toggle>
                            <a style="margin-right:2rem;" href="#" @click.prevent="clearSelection" v-if="showClear">clear</a>
                        </template>
                        <quantity-input :product="product" @change-qty="changeQty"></quantity-input>
                        <div class="product-details-action">
                            <a
                                href="#"
                                class="btn-product btn-cart"
                                :class="{'btn-disabled': !canAddToCart(product, qty) || (Object.keys(product.variants).length > 0 && !activeAddCartButton) }"
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
            selectedSize:null,
            isSticky: false,
            baseDomain: baseDomain,
            selectedVariant:{},
            maxPrice: 0,
            minPrice: 0,
            promoPrice: 0,
            qty: 1,
        };
    },
    mounted: function() {
        window.addEventListener('scroll', this.scrollHandler, {
            passive: true
        });
    },
    computed: {
        ...mapGetters('cart', ['canAddToCart']),
        ...mapGetters('wishlist', ['isInWishlist']),
        ...mapGetters('compare', ['isInCompare']),
        ...mapGetters('core', ['getCurrency']),
        showClear: function() {
            return this.checkEnought();
        },
        sumAttrbutePrice(){
            let sum = 0;
            for(let prop in this.selectedVariant){
                let val = this.selectedVariant[prop].value_index;
                sum += this.product.variants[prop][val].price;    
            }
            return (this.promoPrice > 0 ? this.promoPrice : this.product.price)+sum;
        },
        activeAddCartButton(){
            if (Object.keys(this.product.variants).length == Object.keys(this.selectedVariant).length) {
                return true;
            }
        }
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
        checkEnought(){
            let flag = true;
            if (Object.keys(this.selectedVariant).length == 0) {
                flag = false;
            }
            return flag;
        },
        selectAtttribute: function(item = null) {         
            if (item == null) {
                item = this.selectedSize;
            }
            if (item == 'null') {
                this.selectedVariant = {};
                return false;
            }
            let type_index = this.product.variants[item.type].findIndex((res) => { return item.id == res.id; })
            
            this.$set(this.selectedVariant ,item.type,{ group_id : item.group_id , value_index : type_index });
            if(item.hasOwnProperty('children')){
                let key = Object.keys(item.children)[0];
                this.product.variants = {...this.product.variants,...item.children};
                if (this.selectedVariant.hasOwnProperty(key)) {
                    delete this.selectedVariant[key];
                }
                if (key == 'size') {
                    this.selectedSize = null;
                }
            }
        },
        changeQty: function(current) {
            this.qty = current;
        },
        clearSelection: function() {
            this.selectedVariant = {};
            this.selectedSize = null;
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
            this.selectedVariant = {};
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