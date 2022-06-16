<template>
    <div class="container">
        <div class="heading heading-center">
            <h2 class="title">Top Selling Products</h2>
        </div>
        <tabs
            class="nav-pills nav-pills nav-dark nav-border-anim justify-content-center mb-3"
            :data="tabsData"
            id="tab2"
        ></tabs>
        <div class="tab-content">
            <div class="tab-pane fade show active p-0" id="tab2-latest">
                <div class="products">
                    <div class="row">
                        <div
                            class="col-6 col-md-4 col-lg-3 col-xl-5col mb-n4"
                            v-for="(product, index) in latestProducts"
                            :key="index"
                        >
                            <product-twelve :product="product"></product-twelve>
                        </div>
                    </div>
                </div>
            </div>

            <div class="tab-pane fade p-0" id="tab2-viewed">
                <div class="products">
                    <div class="row">
                        <div
                            class="col-6 col-md-4 col-lg-3 col-xl-5col mb-n4"
                            v-for="(product, index) in viewedProducts"
                            :key="index"
                        >
                            <product-twelve :product="product"></product-twelve>
                        </div>
                    </div>
                </div>
            </div>

            <div class="tab-pane fade p-0" id="tab2-bought">
                <div class="products">
                    <div class="row">
                        <div
                            class="col-6 col-md-4 col-lg-3 col-xl-5col mb-n4"
                            v-for="(product, index) in boughtProducts"
                            :key="index"
                        >
                            <product-twelve :product="product"></product-twelve>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <hr class="mt-1 mb-6" />
    </div>
</template>
<script>
import Tabs from '~/components/elements/Tabs';
import ProductTwelve from '~/components/elements/products/ProductTwelve';
import { catFilter } from '~/utilities/common';

export default {
    components: {
        Tabs,
        ProductTwelve
    },
    props: {
        latestProducts: Array,
        viewedProducts: Array,
        boughtProducts: Array
    },
    data: function() {
        return {
            tabsData: [
                {
                    id: 'latest',
                    title: 'Latest',
                    active: true
                },
                {
                    id: 'viewed',
                    title: 'Most view',
                },
                {
                    id: 'bought',
                    title: 'Hot'
                },
            ]
        };
    },
    computed: {
        // furniture: function() {
        //     return catFilter(this.products, ['furniture']);
        // },
        // decoration: function() {
        //     return catFilter(this.products, ['decoration']);
        // },
        // lighting: function() {
        //     return catFilter(this.products, ['lighting']);
        // }
    }
};
</script>