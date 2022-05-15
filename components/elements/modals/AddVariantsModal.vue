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
	                        :class="{active: item.color[0] == selectedVariant.code, disabled: item.disabled}"
	                        :style="{'background-color': item.color[0]}"
	                        v-for="(item, index) in curProduct.variants.color"
	                        :key="index"
	                        @click.prevent="selectColor(item)"
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
                            @change="selectSize()"
                            v-model="selectedSize"
	                    >
	                        <option value="null">Select a size</option>
	                        <option
                                :selected="selectedVariant.size == item.name"
                                :value="item"
                                v-for="(item, index) in curProduct.variants.size"
	                            :key="index"
	                        >{{ item.name }}</option>
	                    </select>
	                </div>
	            </div>
                <vue-slide-toggle :open="showVariationPrice">
                    <div class="product-price" >
                    ${{ (parseInt(selectedVariant.price_size)+parseInt(selectedVariant.price_color)).toFixed(2) }}
                    </div>
                </vue-slide-toggle>
	            <div class="product-details-action justify-content-center">
		            <button
                        :disabled="!showVariationPrice"
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
import { mapGetters, mapActions } from 'vuex';

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
	},
    props: {
        product: Object,
        from: String,
    },
    data: function() {
        return {
            selectedVariant: Object.assign({},defaultVariant),
            selectedSize:null,
            parentVariant:null,
            curProduct:null,
        };
    },
    created(){
    	this.curProduct = this.product;
    },
    computed:{
        showVariationPrice: function() {
            return this.checkEnought();
        },
    },
    methods: {
		...mapActions('wishlist', ['moveToCart']),
		...mapActions('cart', ['addToCart']),
    	selectColor: function(item) {          
            if (item.color[0] == this.selectedVariant.code) {
                this.selectedVariant.price_color = null;
                this.selectedVariant.color = '';
                this.selectedVariant.code = '';
                if(item.hasOwnProperty('children') && Object.keys(item.children).length > 0) {
                    delete this.curProduct.variants.size;
                    this.selectedVariant.price_size = 0;
                    this.selectedVariant.size = null;
                    this.selectedSize = null;
                }
            } else {
                this.selectedVariant.price_color = item.price;
                this.selectedVariant.color = item.name;
                this.selectedVariant.code = item.color[0];
                if(item.hasOwnProperty('children') && Object.keys(item.children).length > 0) {
                    this.selectedVariant.price_size = 0;
                    this.selectedVariant.size = null;
                    this.selectedSize = null;
                    this.curProduct.variants.size = item.children.size;
                }
            }
        },
        selectSize: function() {
            let item = this.selectedSize;
            this.selectedVariant.price_size = item.price;
            this.selectedVariant.size = item.name;
            if(item.hasOwnProperty('children') && Object.keys(item.children).length > 0) {
                this.curProduct.variants.color = item.children.color;
            }
            if (this.parentVariant == 'size') {
                this.selectedVariant.price_color = 0;
                this.selectedVariant.color = null;
                if (this.selectedSize == 'null') {
                    delete this.curProduct.variants.color;
                }
            }
        },
        showClear: function() {
            return this.checkEnought();
        },
        checkEnought(){
            let flag = true;
            for(let index in this.selectedVariant){
                if (!this.selectedVariant[index] && this.selectedVariant[index] != 0) {
                    flag = false;
                }
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
                    price: parseInt(this.promoPrice ? this.promoPrice : this.curProduct.price)
                };
            }
            this.curProduct = {};
            this.selectedVariant = Object.assign({},defaultVariant);
            if (this.from == 'wishlist') {
	            this.moveToCart({ product: newProduct});
            }else if (this.from == 'shop') {
	            this.addToCart({ product: newProduct});
            }
            this.$emit('close');
		},
    }
};
</script>