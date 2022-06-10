<template>
    <div class="dropdown cart-dropdown">
        <nuxt-link to="/shop/cart" class="dropdown-toggle">
            <div class="icon">
                <i class="icon-shopping-cart"></i>
                <span class="cart-count">{{ qtyTotal }}</span>
            </div>
            <p>Cart</p>
        </nuxt-link>

        <div class="dropdown-menu dropdown-menu-right" v-if="cartList.length > 0" key="hasCart">
            <div class="dropdown-cart-products">
                <div class="product" v-for="(product, index) in cartList" :key="index">
                    <div class="product-cart-details w-100">
                        <h4 class="product-title">
                            <nuxt-link class="txt-ellipsis" :title="product.name" :to="'/product/default/' + product.slug">{{ product.name }}</nuxt-link>
                        </h4>

                        <span class="cart-product-info d-flex flex-wrap" >
                            <span class="cart-product-qty d-flex" style="margin-bottom: 2px;" v-for="(item,index) in product.selectedVariant" :key="index">

                                <span v-for="(item1,index1) in item.attributes" :key="index1" class="tip tip-new" style="margin-left:0;position: unset;padding:3px" :style="{'background': product.variants[index1][item1.value_index].color}">
                                    {{ product.variants[index1][item1.value_index].name }} {{ '('+ priceConvert(product.variants[index1][item1.value_index].price) +')' }} 
                                </span>
                            </span>
                        </span>
                    </div>

                    <figure class="product-image-container">
                        <nuxt-link :to="'/product/default/' + product.slug" class="product-image">
                            <img v-lazy="`${baseDomain}${product.pictures[0]}`+'&w=150&h=150'" alt="product" width="150" height="150" />
                        </nuxt-link>
                    </figure>
                    <a href="#"
                        class="btn-remove"
                        title="Remove Product"
                        @click.prevent="removeFromCart({product: product})" >
                        <i class="icon-close"></i>
                    </a>
                </div>
            </div>

            <div class="dropdown-cart-total">
                <span>Total</span>

                <span class="cart-total-price">{{ priceConvert(priceTotalWithVariant) }}</span>
            </div>

            <div class="dropdown-cart-action">
                <nuxt-link to="/shop/cart" class="btn btn-primary">View Cart</nuxt-link>
                <nuxt-link to="/shop/checkout" class="btn btn-outline-primary-2">
                    <span>Checkout</span>
                    <i class="icon-long-arrow-right"></i>
                </nuxt-link>
            </div>
        </div>
        <div class="dropdown-menu dropdown-menu-right" v-else key="noCart">
            <p class="text-center">No products in the cart.</p>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import { baseDomain } from '~/repositories/repository';
import { priceConvert } from '~/utilities/common';

export default {
    data: function() {
        return {
            baseDomain: baseDomain
        };
    },
    computed: {
        ...mapGetters('cart', ['cartList', 'priceTotalWithVariant', 'qtyTotal'])
    },
    methods: {
        priceConvert,
        ...mapActions('cart', ['removeFromCart'])
    }
};
</script>
<style type="text/css">
    .txt-ellipsis{
        display: block!important;
        width: 140px;
        white-space: nowrap;
        overflow: hidden !important;
        text-overflow: ellipsis;
    }
</style>