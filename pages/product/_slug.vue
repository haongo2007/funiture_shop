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
import Repository, { baseUrl } from '~/repositories/repository.js';

export default {
    async asyncData({params,$axios}) {
        let { data } = await $axios.get(`${baseUrl}/product/${params.slug}`);
        return {
            product: data.data.product,
            prevProduct: data.data.prevProduct,
            nextProduct: data.data.nextProduct,
            relatedProducts: data.data.relatedProducts,
        }
    },
    head() {
        return Object.assign({},this.head);
    },
    components: {
        DetailOne,
        InfoOne,
        Breadcrumb,
        GalleryVertical,
        RelatedProductsOne
    },
    data: function() {
        return {
            head:{
                titleTemplate: '',
                title: '',
                meta: [
                    {
                        id: '',
                        name: '',
                        content:''
                    },
                    {
                        name: 'keywords',
                        content: ''
                    },
                ]
            },
            loaded: false,
            ProductDetail:'',
            ProductGallery:'',
        };
    },
    computed:{
        ...mapGetters('core', ['titlePage']),
        metaData(){
            if ( this.product != null) {
                return [this.product.name,this.titlePage];
            }
        }
    },
    watch:{
        metaData(newVal){
            if (newVal[0] != '' && newVal[1] != '' && this.head.title !== null) {
                this.head.titleTemplate = newVal[0] + ' | ' + newVal[1];
                this.head.title =  newVal[0] + ' | ' + newVal[1];
            }
        }
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