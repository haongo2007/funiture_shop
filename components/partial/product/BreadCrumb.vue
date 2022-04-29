<template>
    <nav aria-label="breadcrumb" class="breadcrumb-nav border-0 mb-0">
        <div :class="'d-flex align-items-center ' + (fullWidth ? 'container-fluid' : 'container')">
            <ol class="breadcrumb">
                <li class="breadcrumb-item">
                    <nuxt-link to="/">Home</nuxt-link>
                </li>
                <li class="breadcrumb-item">
                    <nuxt-link to="/product/default/dark-yellow-lace-cut-out-swing-dress">Product</nuxt-link>
                </li>
                <li class="breadcrumb-item active">{{ current }}</li>
            </ol>

            <nav class="product-pager ml-auto" aria-label="Product">
                <nuxt-link
                    :to="prevProduct.slug"
                    class="product-pager-link product-pager-prev"
                    :class="{'prev-only': !nextProduct}"
                    v-if="prevProduct"
                >
                    <i class="icon-angle-left"></i>
                    <span>Prev</span>
                    <div class="product-detail">
                        <figure>
                            <img
                                v-lazy="`${baseDomain}${prevProduct.pictures[0]+'&w=150&h=150'}`"
                                alt="product"
                                width="150"
                                height="150"
                            />
                        </figure>
                        <h3 class="product-name">{{ prevProduct.name }}</h3>
                    </div>
                </nuxt-link>

                <nuxt-link
                    :to="nextProduct.slug"
                    class="product-pager-link product-pager-next"
                    v-if="nextProduct"
                >
                    <span>Next</span>
                    <i class="icon-angle-right"></i>
                    <div class="product-detail">
                        <figure>
                            <img
                                v-lazy="`${baseDomain}${nextProduct.pictures[0]+'&w=150&h=150'}`"
                                alt="product"
                                width="150"
                                height="150"
                            />
                        </figure>
                        <h3 class="product-name">{{ nextProduct.name }}</h3>
                    </div>
                </nuxt-link>
            </nav>
        </div>
    </nav>
</template>
<script>
import { baseDomain } from '~/repositories/repository';

export default {
    props: {
        prevProduct: null,
        nextProduct: null,
        current: String,
        fullWidth: {
            type: Boolean,
            default: function() {
                return false;
            }
        }
    },
    data: function() {
        return {
            baseDomain: baseDomain
        };
    }
};
</script>