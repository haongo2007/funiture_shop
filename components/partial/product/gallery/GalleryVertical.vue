<template>
    <div class="product-gallery product-gallery-vertical" v-if="product">
        <div class="row m-0">
            <figure class="product-main-image">
                <span class="product-label label-new" v-if="product.new">New</span>
                <span class="product-label label-sale" v-if="product.sale_price">Sale</span>
                <span class="product-label label-top" v-if="product.top">Top</span>
                <span class="product-label label-out" v-if="product.stock === 0">Out Of Stock</span>
                <img
                    id="product-zoom"
                    v-lazy="`${baseDomain}${product.pictures[currentIndex]+'&w=575&h=575'}`"
                    alt="product"
                    width="575"
                    height="575"
                />

                <a
                    href="#"
                    id="btn-product-gallery"
                    class="btn-product-gallery"
                    @click.prevent="openLightBox"
                >
                    <i class="icon-arrows"></i>
                </a>
            </figure>

            <div id="product-zoom-gallery" class="product-image-gallery">
                <a
                    class="product-gallery-item h-100 h-lg-auto carousel-dot"
                    :class="{active: currentIndex== index}"
                    href="#"
                    v-for="(smPicture, index) in product.pictures"
                    :key="index"
                    @click.prevent="changePicture(index)"
                >
                    <img
                        :src="`${baseDomain}${smPicture+'&w=150&h=150'}`"
                        width="150"
                        height="150"
                        alt="product side"
                    />
                </a>
            </div>

            <light-box
                ref="lightbox"
                class="light-box"
                :media="lightBoxMedia"
                :show-caption="true"
                :show-light-box="false"
            ></light-box>
        </div>
    </div>
</template>
<script>
import LightBox from 'vue-image-lightbox';

import { VueLazyloadImage } from 'vue-lazyload';
import 'vue-image-lightbox/dist/vue-image-lightbox.min.css';
import { baseDomain } from '~/repositories/repository.js';

export default {
    components: {
        LightBox
    },
    props: {
        product: {
            type: Object,
            default: function() {
                return {
                    sm_pictures: [],
                    pictures: []
                };
            }
        }
    },
    data: function() {
        return {
            baseDomain: baseDomain,
            currentIndex: 0
        };
    },
    computed: {
        lightBoxMedia: function() {
            return this.product.pictures.reduce((acc, cur) => {
                return [
                    ...acc,
                    {
                        thumb: `${baseDomain}${cur}`,
                        src: `${baseDomain}${cur}`,
                        caption: this.product.name
                    }
                ];
            }, []);
        }
    },
    methods: {
        changePicture: function(index) {
            this.currentIndex = index;
        },
        openLightBox: function() {
            this.$refs.lightbox.showImage(this.currentIndex);
        }
    }
};
</script>