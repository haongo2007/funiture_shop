<template>
    <main class="main">
        <page-header title="My Account" subtitle="Shop"></page-header>
        <nav class="breadcrumb-nav">
            <div class="container">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item">
                        <nuxt-link to="/">Home</nuxt-link>
                    </li>
                    <li class="breadcrumb-item">
                        <nuxt-link to="/shop/sidebar/list">Shop</nuxt-link>
                    </li>
                    <li class="breadcrumb-item active">My Account</li>
                </ol>
            </div>
        </nav>

        <div class="page-content">
            <div class="dashboard">
                <div class="container">
                    <div class="row">
                        <aside class="col-md-4 col-lg-3">
                            <tabs class="nav-dashboard flex-column mb-3 mb-md-0" :data="tabsData"></tabs>
                        </aside>

                        <div class="col-md-8 col-lg-9">
                            <div class="tab-content">
                                <div class="tab-pane fade show active" id="tab1">
                                    <p>
                                        Hello
                                        <span class="font-weight-normal text-dark">{{ getCurrentCustomer.name }}</span> 
                                        <br />From your account dashboard you can view your
                                        <a
                                            href="#tab-orders"
                                            class="tab-trigger-link link-underline"
                                            @click.prevent="toOrder"
                                        >recent orders</a>, manage your
                                        <a
                                            href="#tab-address"
                                            class="tab-trigger-link"
                                            @click.prevent="toAddress"
                                        >shipping and billing addresses</a>, and
                                        <a
                                            href="#tab-account"
                                            class="tab-trigger-link"
                                            @click.prevent="toAccount"
                                        >edit your password and account details</a>.
                                    </p>
                                </div>

                                <div class="tab-pane fade" id="tab2">
                                    <account-orders></account-orders>
                                </div>

                                <div class="tab-pane fade" id="tab3">
                                    <account-address></account-address>
                                </div>

                                <div class="tab-pane fade" id="tab4">
                                    <account-detail></account-detail>
                                </div>

                                <div class="tab-pane fade" id="tab5">
                                    <p>No downloads available yet.</p>
                                    <nuxt-link
                                        to="/shop/sidebar/3cols"
                                        class="btn btn-outline-primary-2"
                                    >
                                        <span>GO SHOP</span>
                                        <i class="icon-long-arrow-right"></i>
                                    </nuxt-link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>
<script>
import PageHeader from '~/components/elements/PageHeader';
import Tabs from '~/components/elements/Tabs';
import { mapGetters } from 'vuex';
import AccountOrders from './account/orders';
import AccountAddress from './account/address';
import AccountDetail from './account/detail';

export default {
    components: {
        Tabs,
        PageHeader,
        AccountOrders,
        AccountAddress,
        AccountDetail
    },
    computed: {
        ...mapGetters('customer', ['getToken']),
        ...mapGetters('customer', ['getCurrentCustomer']),
    },
    data: function() {
        return {
            tabsData: [
                {
                    id: 'tab1',
                    title: 'Dashboard',
                    active: true
                },
                {
                    id: 'tab2',
                    title: 'Orders'
                },
                {
                    id: 'tab3',
                    title: 'Addresses'
                },
                {
                    id: 'tab4',
                    title: 'Account Details'
                },
                {
                    id: 'tab5',
                    title: 'Downloads'
                },
            ]
        };
    },
    watch: {
        getToken: function(value) {
            if (value == '') {
                this.$router.replace({
                    path: '/redirect/',
                });
            }
        }
    },
    created(){
        if (this.getToken == '' || this.getToken == undefined) {
            this.$router.replace({
                path: '/redirect/',
            });
        }
    },
    methods: {
        toOrder: function() {
            document
                .querySelector('.nav-dashboard .nav-item:nth-child(2) a')
                .click();
        },
        toAddress: function() {
            document
                .querySelector('.nav-dashboard .nav-item:nth-child(4) a')
                .click();
        },
        toAccount: function() {
            document
                .querySelector('.nav-dashboard .nav-item:nth-child(5) a')
                .click();
        }
    }
};
</script>