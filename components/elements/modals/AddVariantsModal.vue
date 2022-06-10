<template>
	<div class="modal-body m-3" v-if="Object.keys(curProduct).length > 0">
        <button type="button" class="close" @click="$emit('close')">
            <span aria-hidden="true">
                <i class="icon-close"></i>
            </span>
        </button>

        <div class="form-box">
            <template v-if="Object.keys(curProduct.variants).length > 0">
	            <div class="details-filter-row details-row-size" v-if="curProduct.variants.hasOwnProperty('color') && curProduct.variants.color.length > 0">
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

	            <div class="details-filter-row details-row-size" v-if="curProduct.variants.hasOwnProperty('size') && curProduct.variants.size.length > 0">
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
	            </div>
                <vue-slide-toggle :open="showClear">
                    <div class="product-price" >
                    {{ priceConvert(sumAttrbutePrice) }}
                    </div>
                </vue-slide-toggle>
                <div class="details-filter-row details-row-size mb-2">
                    <label for="size">Qty:</label>
                    <quantity-input :product="curProduct" @change-qty="changeQty"></quantity-input>
                </div>
	            <div class="product-details-action justify-content-center">
		            <button
                        :disabled="!activeAddCartButton"
						class="btn-cart btn-product"
                        @click.prevent="processCart(curProduct)">
						<span>add to cart</span>
					</button>
				</div>
	        </template>
        </div>
    </div>
</template>

<script>

import { VueSlideToggle } from 'vue-slide-toggle';
import QuantityInput from '~/components/elements/QuantityInput';
import { mapGetters, mapActions } from 'vuex';
import { priceConvert } from '~/utilities/common';

export default {
	components: {
        VueSlideToggle,
        QuantityInput
	},
    props: {
        product: Object,
        from: String,
    },
    data: function() {
        return {
            selectedVariant: {},
            selectedSize:null,
            curProduct:null,
            promoPrice: 0,
            qty: 1,
        };
    },
    created(){
    	this.curProduct = this.product;
        if (this.curProduct.sale_price) {
            this.promoPrice = this.curProduct.sale_price.price_promotion;
        }
    },
    computed:{
        showClear: function() {
            return this.checkEnought();
        },
        activeAddCartButton(){
            if (Object.keys(this.product.variants).length == Object.keys(this.selectedVariant).length) {
                return true;
            }
        },
        sumAttrbutePrice(){
            let sum = 0;
            for(let prop in this.selectedVariant){
                let val = this.selectedVariant[prop].value_index;
                sum += this.product.variants[prop][val].price;    
            }
            return (this.promoPrice > 0 ? this.promoPrice : this.product.price)+sum;
        },
    },
    methods: {
        priceConvert,
		...mapActions('wishlist', ['moveToCart']),
		...mapActions('cart', ['addToCart']),
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
        checkEnought(){
            let flag = true;
            if (Object.keys(this.selectedVariant).length == 0) {
                flag = false;
            }
            return flag;
        },
		processCart(){
			let newProduct = { ...this.curProduct };
            if (Object.keys(this.curProduct.variants).length > 0) {
                newProduct = {
                    ...this.curProduct,
                    name: this.curProduct.name,
                    selectedVariant: this.selectedVariant,
                    price: parseInt(this.promoPrice ? this.promoPrice : this.product.price)
                };
            }
            this.curProduct = {};
            this.selectedVariant = {};
            if (this.from == 'wishlist') {
	            this.moveToCart({ product: newProduct});
            }else if (this.from == 'shop') {
	            this.addToCart({ product: newProduct , qty: this.qty});
            }

            this.$emit('close');
		},
    }
};
</script>