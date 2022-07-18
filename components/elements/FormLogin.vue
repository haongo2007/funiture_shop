<template>
    <div class="form-box">
        <div class="form-tab">
            <tabs class="nav-pills nav-fill" :data="tabsData"></tabs>
            <div class="tab-content">
                <div class="tab-pane fade show active" id="sign-in">
                    <form action="#" v-model="temp">
                        <div class="form-group">
                            <label for="singin-email">Email address *</label>
                            <input
                                v-model="temp.email"
                                type="text"
                                class="form-control"
                                id="singin-email"
                                required
                            />
                        </div>

                        <div class="form-group">
                            <label for="singin-password">Password *</label>
                            <input
                                v-model="temp.password"
                                type="password"
                                class="form-control"
                                id="singin-password"
                                required
                            />
                        </div>

                        <div class="form-footer">
                            <button type="button" @click="submitLogin()" class="btn btn-outline-primary-2" :disabled="loginState">
                                <div class="spinner-border" role="status" v-if="loginState">
                                    <span class="sr-only">Loading...</span>
                                </div>
                                <span v-else>LOG IN <i class="icon-long-arrow-right"></i></span>
                            </button>

                            <div class="custom-control custom-checkbox">
                                <input
                                    v-model="temp.remember"
                                    type="checkbox"
                                    class="custom-control-input"
                                    id="signin-remember"
                                />
                                <label
                                    class="custom-control-label"
                                    for="signin-remember"
                                >Remember Me</label>
                            </div>

                            <a href="javascript:;" class="forgot-link">Forgot Your Password?</a>
                        </div>
                    </form>
                    <div class="form-choice">
                        <p class="text-center">or sign in with</p>
                        <div class="row">
                            <div class="col-sm-6">
                                <a href="javascript:;" class="btn btn-login btn-g">
                                    <i class="icon-google"></i>
                                    Login With Google
                                </a>
                            </div>

                            <div class="col-sm-6">
                                <a href="javascript:;" class="btn btn-login btn-f">
                                    <i class="icon-facebook-f"></i>
                                    Login With Facebook
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="tab-pane fade" id="register">
                    <form action="#" v-model="temp">
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="singin-email">First name *</label>
                                <input
                                    v-model="temp.first_name"
                                    type="text"
                                    class="form-control"
                                    id="singin-email"
                                    required
                                />
                            </div>
                            <div class="form-group col-md-6">
                                <label for="singin-email">Last name *</label>
                                <input
                                    v-model="temp.last_name"
                                    type="text"
                                    class="form-control"
                                    id="singin-email"
                                    required
                                />
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="singin-email">Email address *</label>
                            <input
                                v-model="temp.email"
                                type="text"
                                class="form-control"
                                id="singin-email"
                                required
                            />
                        </div>
                        <div class="form-group">
                            <label for="singin-email">Phone num *</label>
                            <input
                                v-model="temp.phone"
                                type="text"
                                class="form-control"
                                id="singin-email"
                                required
                            />
                        </div>
                        <div class="form-group">
                            <label for="singin-email">Province *</label>
                            <input
                                v-model="temp.address1"
                                type="text"
                                class="form-control"
                                id="singin-email"
                                required
                            />
                        </div>
                        <div class="form-group">
                            <label for="singin-email">District *</label>
                            <input
                                v-model="temp.address2"
                                type="text"
                                class="form-control"
                                id="singin-email"
                                required
                            />
                        </div>
                        <div class="form-group">
                            <label for="singin-email">Ward *</label>
                            <input
                                v-model="temp.address3"
                                type="text"
                                class="form-control"
                                id="singin-email"
                                required
                            />
                        </div>
                        <div class="form-group">
                            <label for="singin-email">Country *</label>
                            <input
                                v-model="temp.country"
                                type="text"
                                class="form-control"
                                id="singin-email"
                                required
                            />
                        </div>
                        <div class="form-group">
                            <label for="singin-email">Password *</label>
                            <input
                                v-model="temp.password"
                                type="password"
                                class="form-control"
                                id="singin-email"
                                required
                            />
                        </div>

                        <div class="form-group">
                            <label for="singin-password">Password confirm *</label>
                            <input
                                v-model="temp.password_confirm"
                                type="password"
                                class="form-control"
                                id="singin-password"
                                required
                            />
                        </div>

                        <div class="form-footer">
                            <button type="button" @click="submitRegis()" class="btn btn-outline-primary-2" :disabled="loginState">
                                <div class="spinner-border" role="status" v-if="loginState">
                                    <span class="sr-only">Loading...</span>
                                </div>
                                <span v-else>REGISTRATION<i class="icon-long-arrow-right"></i></span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Tabs from '~/components/elements/Tabs';
    import FormLogin from '~/components/elements/FormLogin';
    import Repository,{ baseDomain,baseUrl } from '~/repositories/repository';
    import Cookies from 'js-cookie';
    export default {
        components: {
            Tabs,
            FormLogin
        },
        data: function() {
            return {
                tabsData: [
                    {
                        id: 'sign-in',
                        title: 'Sign In',
                        active: true
                    },
                    {
                        id: 'register',
                        title: 'Register'
                    }
                ],
                temp:{
                    email:'',
                    password:'',
                    remember:false,
                },
                loginState:false,
            };
        },
        methods:{
            async submitLogin(){
                if (this.temp.email != '' && this.temp.password != '') {
                    this.loginState = true;
                }else{
                    return false;
                }
                await Repository.get(`${baseUrl}/system/sanctum/csrf-cookie`).then(() => {
                    Repository.post(`${baseUrl}/auth/login`,this.temp).then((data)=>{

                        if (data.access_token) {
                            this.$store.dispatch('customer/setToken',data.access_token);
                            this.$store.dispatch('customer/getCustomer');

                            this.$vToastify.success( "successful login" );
                            this.$root.$emit('close', )
                        }else{
                            this.$vToastify.error( data.message );
                        }
                        this.loginState = false;
                    }).catch((error)=>{
                        console.log(error);
                    })
                })
            }
        }
    };
    </script>
</script>
<style type="text/css">
    .form-box{
        height: 42vh;
        overflow-y: scroll;
    }
    .form-box::-webkit-scrollbar {
        display: none;
    }
</style>
