<template>
    <main class="main">
        <nav class="breadcrumb-nav border-0 mb-0">
            <div class="container">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item">
                        <nuxt-link to="/">Home</nuxt-link>
                    </li>
                    <li class="breadcrumb-item">
                        <a href="javascript:;">Pages</a>
                    </li>
                    <li class="breadcrumb-item active">Login</li>
                </ol>
            </div>
        </nav>

        <div
            class="login-page bg-image pt-8 pb-8 pt-md-12 pb-md-12 pt-lg-17 pb-lg-17"
            v-lazy:background-image="'./images/backgrounds/login-bg.jpg'"
        >
            <div class="container">
                <form-login/>
            </div>
        </div>
    </main>
</template>
<script>
import FormLogin from '~/components/elements/FormLogin';
import { mapGetters } from 'vuex';
export default {
    components: {
        FormLogin
    },
    data: function() {
        return {};
    },
    computed: {
        ...mapGetters('customer', ['getToken']),
    },
    watch: {
        getToken: function(value) {
            if (value != '') {
                this.$router.replace({
                    path: '/redirect/',
                });
            }
        }
    },
    created(){
        console.log(this.getToken);
        if (this.getToken != '') {
            this.$router.replace({
                path: '/redirect/',
            });
        }
    }
};
</script>
<style type="text/css">
    .form-box{
        max-width: 100%;
        height: unset!important;
        overflow-y: unset!important;
    }
    .form-box::-webkit-scrollbar {
        display: none;
    }
</style>