<template>
    <div class="modal-body m-3">
        <button type="button" class="close" @click="$emit('close')">
            <span aria-hidden="true">
                <i class="icon-close"></i>
            </span>
        </button>

        <div class="form-box">
            <div class="form-tab">
                <tabs class="nav-pills nav-fill" :data="tabsData"></tabs>
                <div class="tab-content">
                    <div class="tab-pane fade show active" id="sign-in">
                        <form action="#" v-model="temp">
                            <div class="form-group">
                                <label for="singin-email">Username or email address *</label>
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
                                <button type="button" @click="submitForm()" class="btn btn-outline-primary-2">
                                    <span>LOG IN</span>
                                    <i class="icon-long-arrow-right"></i>
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

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Tabs from '~/components/elements/Tabs';
import Repository,{ baseDomain,baseUrl } from '~/repositories/repository';
export default {
    components: {
        Tabs
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
            }
        };
    },
    methods:{
        async submitForm(){
            await Repository.get(`${baseUrl}/system/sanctum/csrf-cookie`).then(() => {
                Repository.post(`${baseUrl}/auth/login`,this.temp).then(({data})=>{
                    console.log(data);
                }).catch(({response:{data}})=>{
                    console.log(data);
                })
            })
        }
    }
};
</script>