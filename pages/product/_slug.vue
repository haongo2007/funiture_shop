<template>
    <main class="main">
        <breadcrumb :prev-product="prevProduct" :next-product="nextProduct" current="Default"></breadcrumb>

        <div class="page-content">
            <div class="container skeleton-body">
                <div class="product-details-top">
                    <div class="row skel-pro-single" :class="{loaded: loaded}">
                        <div class="col-md-6">
                            <div class="skel-product-gallery"></div>
                            <components :is="ProductGallery" :product="product" />
                        </div>

                        <div class="col-md-6">
                            <div class="entry-summary row">
                                <div class="col-md-12">
                                    <div class="entry-summary1 mt-2 mt-md-0"></div>
                                </div>
                                <div class="col-md-12">
                                    <div class="entry-summary2"></div>
                                </div>
                            </div>
                            <components :is="ProductDetail" :product="product" />
                        </div>
                    </div>
                </div>

                <info-one v-if="product" :descriptions="product.short_desc" :product-id="product.id" :review-list="product.reviewList" :review-count="product.review ? product.review : 0"></info-one>

                <related-products-one :products="relatedProducts"></related-products-one>
            </div>
        </div>
    </main>
</template>
<script>
import { mapGetters } from 'vuex';

import GalleryVertical from '~/components/partial/product/gallery/GalleryVertical';
import DetailOne from '~/components/partial/product/details/DetailOne';
import InfoOne from '~/components/partial/product/info-tabs/InfoOne';
import Breadcrumb from '~/components/partial/product/BreadCrumb';
import RelatedProductsOne from '~/components/partial/product/related/RelatedProductsOne';
import { baseUrl } from '~/repositories/repository.js';

export default {
    async asyncData({params,$axios}) {
        let {data} = await $axios.get(`${baseUrl}/product/${params.slug}`);
        return {
            product: data.product,
            prevProduct: data.prevProduct,
            nextProduct: data.nextProduct,
            relatedProducts: data.relatedProducts,
        }
    },
    data: function() {
      return {
        loaded: false,
        ProductDetail:'',
        ProductGallery:'',
      };
    },
    head() {
      return {
        title: this.product.name,
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: 'Home page description'
          }
        ]
      }
    },
    components: {
        DetailOne,
        InfoOne,
        Breadcrumb,
        GalleryVertical,
        RelatedProductsOne
    },
    computed:{
        ...mapGetters('core', ['titlePage']),
    },
    created: function() {
        if (!Object.keys(this.product).length) {
            this.$router.push({path: '/pages/404'});
        }
        this.ProductDetail = 'DetailOne';
        this.ProductGallery = 'GalleryVertical';
        this.loaded = true;
        // this.getProduct();
    },
    methods: {
        getProduct: async function() {
            this.loaded = false;
            await Repository.get(
                `${baseUrl}/product/${this.$route.params.slug}`,
            )
                .then(response => {
                    this.product = { ...response.data.product };
                    if (!Object.keys(this.product).length) {
                        this.$router.push({path: '/pages/404'});
                    }
                    this.relatedProducts = [...response.data.relatedProducts];
                    this.prevProduct = response.data.prevProduct;
                    this.nextProduct = response.data.nextProduct;
                    this.ProductDetail = 'DetailOne';
                    this.ProductGallery = 'GalleryVertical';
                    this.loaded = true;
                })
                .catch(error => ({ error: JSON.stringify(error) }));
        }
    }
};
</script>
