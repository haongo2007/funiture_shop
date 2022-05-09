<template>
	<main class="main">
		<page-header
			title="Wishlist"
			subtitle="Shop"
		></page-header>
		<nav class="breadcrumb-nav">
			<div class="container">
				<ol class="breadcrumb">
					<li class="breadcrumb-item">
						<nuxt-link to="/">Home</nuxt-link>
					</li>
					<li class="breadcrumb-item">
						<nuxt-link to="/shop/sidebar/list">Shop</nuxt-link>
					</li>
					<li class="breadcrumb-item active">Wishlist</li>
				</ol>
			</div>
		</nav>

		<div class="page-content">
			<div
				class="container"
				v-if="wishItems.length > 0"
				key="hasWishlist"
			>
				<table class="table table-wishlist table-mobile">
					<thead>
						<tr>
							<th>Product</th>
							<th>Price</th>
							<th>Stock Status</th>
							<th></th>
							<th></th>
						</tr>
					</thead>

					<tbody>
						<tr
							v-for="(product, index) in wishItems"
							:key="index"
						>
							<td class="product-col">
								<div class="product">
									<figure class="product-media">
										<nuxt-link :to="'/product/default/' + product.slug">
											<img
												v-lazy="`${baseDomain}${product.pictures[0]}`+'&w=150&h=150'"
												alt="Product"
												width="150"
												height="150"
											/>
										</nuxt-link>
									</figure>

									<h3 class="product-title">
										<nuxt-link :to="'/product/default/' + product.slug">{{ product.name }}</nuxt-link>
									</h3>
								</div>
							</td>
							<td class="price-col">
								<div
									class="product-price mb-0"
									v-if="product.stock==0"
									key="outPrice"
								>
									<span class="out-price">${{ product.price.toFixed(2) }}</span>
								</div>

								<template v-else>
									<div
										class="product-price d-inline-block mb-0"
										v-if="product.minPrice == product.maxPrice"
									>${{ product.minPrice.toFixed(2) }}</div>
									<template v-else>
										<div
											class="product-price d-inline-block mb-0"
											v-if="product.variants.length == 0"
										>
											<span class="new-price">${{ product.minPrice.toFixed(2) }}</span>
											<span class="old-price">${{ product.maxPrice.toFixed(2) }}</span>
										</div>
										<div
											class="product-price d-inline-block mb-0"
											v-else
										>${{product.minPrice.toFixed(2)}}&ndash;${{product.maxPrice.toFixed(2)}}</div>
									</template>
								</template>
							</td>
							<td class="stock-col">
								<span :class="product.stock && product.stock == 0 ? 'out-of-stock' : 'in-stock'">{{ product.stock && product.stock == 0 ? 'Out of stock' : 'In stock' }}</span>
							</td>
							<td class="action-col">
								<div class="dropdown">
									<nuxt-link
										class="btn btn-block btn-outline-primary-2"
										:to="'/product/default/' + product.slug"
										v-if="product.variants.length > 0"
									>
										<i class="icon-list-alt"></i>Select Options
									</nuxt-link>
									<button
										href="#variant-modal"
										class="btn btn-block btn-outline-primary-2"
										@click.prevent="openConfirmVariant(product)"
										v-else
									>
										<i class="icon-cart-plus"></i>Add to Cart
									</button>
								</div>
							</td>
							<td class="remove-col">
								<button class="btn-remove" @click.prevent="removeFromWishlist({product: product})">
									<i class="icon-close"></i>
								</button>
							</td>
						</tr>
					</tbody>
				</table>

				<div class="wishlist-share">
					<div class="social-icons social-icons-sm mb-2">
						<label class="social-label">Share on:</label>
						<a
							href="#"
							class="social-icon"
							title="Facebook"
							target="_blank"
						>
							<i class="icon-facebook-f"></i>
						</a>
						<a
							href="#"
							class="social-icon"
							title="Twitter"
							target="_blank"
						>
							<i class="icon-twitter"></i>
						</a>
						<a
							href="#"
							class="social-icon"
							title="Instagram"
							target="_blank"
						>
							<i class="icon-instagram"></i>
						</a>
						<a
							href="#"
							class="social-icon"
							title="Youtube"
							target="_blank"
						>
							<i class="icon-youtube"></i>
						</a>
						<a
							href="#"
							class="social-icon"
							title="Pinterest"
							target="_blank"
						>
							<i class="icon-pinterest"></i>
						</a>
					</div>
				</div>
			</div>

			<div
				class="container"
				v-else
				key="noWishlist"
			>
				<div class="text-center">
					<i class="icon-heart-o wishlist-empty d-block"></i>
					<span class="d-block mt-2">No products added to wishlist</span>
					<nuxt-link
						to="/shop/sidebar/list"
						class="btn btn-primary mt-2"
					>Go Shop</nuxt-link>
				</div>
			</div>
		</div>
		<modal name="variant-modal" >
			<div class="modal-body m-3" v-if="Object.keys(product).length > 0">
		        <button type="button" class="close" @click="$emit('close')">
		            <span aria-hidden="true">
		                <i class="icon-close"></i>
		            </span>
		        </button>

		        <div class="form-box">
		            <template v-if="Object.keys(product.variants).length > 0">
			            <div class="details-filter-row details-row-size" v-if="product.variants.color.length > 0">
			                <label>Color:</label>

			                <div class="product-nav product-nav-dots">
			                    <a :title="item.name"
			                        href="#"
			                        :class="{active: item.color[0] == selectedVariant.code, disabled: item.disabled}"
			                        :style="{'background-color': item.color[0]}"
			                        v-for="(item, index) in product.variants.color"
			                        :key="index"
			                        @click.prevent="selectColor(item)"
			                    ></a>
			                </div>
			            </div>

			            <div class="details-filter-row details-row-size" v-if="product.variants.size.length > 0">
			                <label for="size">Size:</label>
			                <div class="select-custom">
			                    <select
			                        name="size"
			                        id="size"
			                        class="form-control"
			                        @change="selectSize($event)"
			                    >
			                        <option value="null">Select a size</option>
			                        <option
			                            :selected="selectedVariant.size == item.name"
			                            :value="item.name+'__'+item.price"
			                            v-for="(item, index) in product.variants.size"
			                            :key="index"
			                        >{{ item.name }}</option>
			                    </select>
			                </div>
			            </div>
			            <vue-slide-toggle :open="showVariationPrice">
			                <div class="product-price" >
			                    ${{ selectedVariant.price_size && selectedVariant.price_color ? (parseInt(selectedVariant.price_size)+parseInt(selectedVariant.price_color)).toFixed(2) : 0 }}
			                </div>
			            </vue-slide-toggle>
			            <div class="product-details-action justify-content-center">
				            <button
	                            :disabled="!showVariationPrice"
								class="btn-cart btn-product"
	                            @click.prevent="addToCart(product)">
								<span>add to cart</span>
							</button>
						</div>
			        </template>
		        </div>
		    </div>
	    </modal>
	</main>
</template>
<script>
import { VueSlideToggle } from 'vue-slide-toggle';
import { mapGetters, mapActions } from 'vuex';
import PageHeader from '~/components/elements/PageHeader';
import { baseDomain } from '~/repositories/repository.js';

const tempVariant = {
            size: null,
            color: null,
            code: null,
            price_color: null,
            price_size: null,
        };

export default {
	components: {
		PageHeader,
        VueSlideToggle,
	},
	data: function() {
		return {
			baseDomain: baseDomain,
			product:{},
            selectedVariant: Object.assign({},tempVariant),
		};
	},
	computed: {
		...mapGetters('wishlist', ['wishlistQty', 'wishlist']),
        showVariationPrice: function() {
            return this.checkEnought();
        },
		wishItems: function() {
			return this.wishlist.reduce((acc, product) => {
				let min = product.price;
				let max = 0;
		        let sumMax = [];
		        if (Object.keys(product.variants).length > 0) {
			        for(let element in product.variants){
			            product.variants[element].forEach( function(element, index) {
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
			    }
		        if (product.sale_price) {
		            max = product.sale_price.price_promotion;
		        }else{
			        if (Object.keys(product.variants).length == 0) {
			            max = product.price;
			        }else{
			            max = product.price+max;
			        }
		        }

				return [
					...acc,
					{
						...product,
						minPrice: min,
						maxPrice: max
					}
				];
			}, []);

		}
	},
	methods: {
        selectColor: function(item) {
            if (item.color[0] == this.selectedVariant.code) {
                this.selectedVariant.price_color = 0;
                this.selectedVariant.color = '';
                this.selectedVariant.code = '';
            } else {
                this.selectedVariant.price_color = item.price;
                this.selectedVariant.color = item.name;
                this.selectedVariant.code = item.color[0];
            }
        },
        selectSize: function(e) {
            let val = e.target.value.split('__');
            this.selectedVariant.size = val[0];
            this.selectedVariant.price_size = val[1];
        },
        showClear: function() {
            return this.checkEnought();
        },
        checkEnought(){
            let flag = true;
            for(let index in this.selectedVariant){
                if (!this.selectedVariant[index] ) {
                    flag = false;
                }
            }
            return flag;
        },
		openConfirmVariant(product) {
			this.product = product;
			this.$modal.show('variant-modal');
		},
		addToCart(){
			let newProduct = { ...this.product };
            if (Object.keys(this.product.variants).length > 0) {
                newProduct = {
                    ...this.product,
                    size: this.selectedVariant.size,
                    color: this.selectedVariant.color,
                    name: this.product.name + ' - ' + this.selectedVariant.color + ' (' + this.selectedVariant.size + ')',
                    price: parseInt(this.product.price) + parseInt(this.selectedVariant.price_color) + parseInt(this.selectedVariant.price_size) 
                };
            }
            this.product = {};
            this.selectedVariant = Object.assign({},tempVariant);
            this.$modal.hide('variant-modal');
            this.moveToCart({ product: newProduct});
		},
		...mapActions('wishlist', ['removeFromWishlist', 'moveToCart'])
	}
};
</script>