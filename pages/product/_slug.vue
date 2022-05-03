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

                <info-one></info-one>

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
                        hid: '',
                        name: '',
                        content:''
                    },
                    {
                        name: 'keywords',
                        content: ''
                    },
                ]
            },
            product: null,
            prevProduct: null,
            nextProduct: null,
            relatedProducts: [],
            loaded: false,
            ProductDetail:'',
            ProductGallery:'',
        };
    },
    created: function() {
        this.getProduct();
    },
    methods: {
        ...mapGetters('store', ['titlePage']),
        getProduct: async function() {
            this.loaded = false;
            await Repository.get(
                `${baseUrl}/product/${this.$route.params.slug}`,
            )
                .then(response => {
                    this.product = { ...response.data.data.product };
                    if (Object.keys(this.product).length) {
                        this.head.titleTemplate = this.product.name + ' | ' + this.titlePage();
                        this.head.title =  this.product.name + ' | ' + this.titlePage();
                    }else{
                        this.head.titleTemplate = this.titlePage();
                        this.head.title = this.titlePage();
                    }
                    this.relatedProducts = [...response.data.data.relatedProducts];
                    this.prevProduct = response.data.data.prevProduct;
                    this.nextProduct = response.data.data.nextProduct;
                    this.ProductDetail = 'DetailOne';
                    this.ProductGallery = 'GalleryVertical';
                    this.loaded = true;
                })
                .catch(error => ({ error: JSON.stringify(error) }));
        }
    }
};
</script>