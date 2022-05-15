<template>
    <div class="product product-sm align-items-center">
        <figure class="product-media">
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

        <div class="product-body py-0 pl-4">
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
                    >{{priceConvert(minPrice)}}&ndash;${{priceConvert(maxPrice)}}</div>
                </template>
            </template>
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
    methods:{
        priceConvert
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
    }
};
</script>