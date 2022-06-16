<template>
    <div class="product-details-tab">
        <tabs class="nav-pills justify-content-center" :data="tabsData" :review-count="reviewCount"></tabs>
        <div class="tab-content">
            <div class="tab-pane fade show active" id="tab1">
                <div class="product-desc-content" v-html="descriptions.description">
                    
                </div>
            </div>

            <div class="tab-pane fade" id="tab2">
                <div class="product-desc-content" v-html="descriptions.content">
                </div>
            </div>

            <div class="tab-pane fade" id="tab3">
                <div class="product-desc-content">
                    <h3>Delivery & returns</h3>
                    <p>
                        We deliver to over 100 countries around the world. For full details of the delivery options we offer, please view our
                        <a
                            href="#"
                        >Delivery information</a>
                        <br />We hope you’ll love every purchase, but if you ever need to return an item you can do so within a month of receipt. For full details of how to make a return, please view our
                        <a
                            href="#"
                        >Returns information</a>
                    </p>
                </div>
            </div>

            <div class="tab-pane fade" id="tab4">
                <div class="reviews">
                    <h3>Reviews ({{ listRating.length }})</h3>
                    <div class="review p-0">
                        <div class="row no-gutters mb-2" v-for="(item,index) in listRating" :key="index">
                            <div class="col-auto">
                                <h4>
                                    <a href="#">{{ item.name }}</a>
                                </h4>
                                <div class="ratings-container">
                                    <div class="ratings">
                                        <div class="ratings-val" :style="{ width: item.point * 20 + '%' }"></div>
                                        <span class="tooltip-text">{{ item.point }}</span>
                                    </div>
                                </div>

                                <span class="review-date">{{ item.created_at }}</span>
                            </div>

                            <div class="col">
                                <h4>{{ item.point | statusRate }}</h4>

                                <div class="review-content">
                                    <p>{{ item.comment }}</p>
                                </div>

                                <div class="review-action">
                                    <a href="#">
                                        <i class="icon-thumbs-up"></i>Helpful (2)
                                    </a>
                                    <a href="#">
                                        <i class="icon-thumbs-down"></i>Unhelpful (0)
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="touch-container row justify-content-center" v-if="Object.keys(getCurrentCustomer).length > 0">
                        <div class="col-md-9 col-lg-7">
                            <div class="text-center">
                                <h2 class="title mb-1">Rate this product</h2>

                            </div>

                            <form action="#" class="contact-form mb-2">
                                <div class="ratings-container">
                                    <star-rating :star-size="20" :show-rating="false" v-model="temp.point"></star-rating>
                                </div>

                                <label for="cmessage" class="sr-only">Comment</label>
                                <textarea
                                    class="form-control"
                                    cols="30"
                                    rows="4"
                                    id="cmessage"
                                    required
                                    placeholder="Message *"
                                    v-model="temp.comment"
                                ></textarea>

                                <div class="text-center">
                                    <button
                                        :disabled="sending"
                                        @click="sendRatingReview"
                                        type="button"
                                        class="btn btn-outline-primary-2 btn-minwidth-sm"
                                    >

                                        <div class="spinner-border" role="status" v-if="sending">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                        <div v-else>
                                            <span>SUBMIT</span>
                                            <i class="icon-long-arrow-right"></i>
                                        </div>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="touch-container row justify-content-center" v-else>
                        <button type="button" class="btn btn-outline-primary-2 btn-minwidth-sm" @click.prevent="openSignInModal">
                            <div>
                                <span>Login to rating</span>
                                <i class="icon-long-arrow-right"></i>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Tabs from '~/components/elements/Tabs';
import StarRating from 'vue-star-rating'
import { mapGetters } from 'vuex';
import Repository,{ baseDomain,baseUrl } from '~/repositories/repository';
import Cookies from 'js-cookie';

export default {
    components: {
        Tabs,
        StarRating
    },
    filters:{
        statusRate(point){
            if (point <= 1 ) {
                return 'So bad, i hate it';
            }else if (point <= 2) {
                return 'Bad, i dont like it';
            }else if (point <= 3) {
                return 'Not bad, its ok';
            }else if (point <= 4) {
                return 'Good, i like it';
            }else if (point <= 5) {
                return 'So good, i love it';
            }
        }
    },
    props: {
        descriptions: {
            type: Object,
            default:{}
        },
        productId: {
            type: Number,
        },
        reviewList:{
            type: Array
        },
        reviewCount:{
            type: Number
        }
    },
    computed: {
        ...mapGetters('customer', ['getCurrentCustomer','getCurrentFullname']),
    },
    data: function() {
        return {
            temp:{
                point:0,
                comment:'',
                product_id:0,
            },
            listRating:[],
            sending:false,
            tabsData: [
                {
                    id: 'tab1',
                    title: 'Description',
                    active: true
                },
                {
                    id: 'tab2',
                    title: 'Additional Information'
                },
                {
                    id: 'tab3',
                    title: 'Shipping & Returns'
                },
                {
                    id: 'tab4',
                    title: 'Reviews'
                }
            ]
        };
    },
    created(){        
        this.temp.product_id = this.productId;
        this.listRating = this.reviewList;
    },
    methods: {
        openSignInModal() {
            this.$modal.show(
                () => import('~/components/elements/modals/SignInModal'),
                {},
                { width: '575', height: 'auto', adaptive: true }
            );
        },
        resetTmp(){
            this.temp = {
                point:0,
                comment:'',
                product_id:this.productId
            }
        },
        async sendRatingReview(){
            this.sending = true;
            await Repository.get(`${baseUrl}/system/sanctum/csrf-cookie`).then(() => {
                Repository.post(`${baseUrl}/product/rating`,this.temp).then((data)=>{
                    if (data.success) {
                        this.$vToastify.success( "Successful evaluation thank you <3" );
                        let newRating = {...this.temp};
                        newRating['name'] = this.getCurrentFullname;
                        newRating['created_at'] = 'Just now';
                        this.listRating.unshift(newRating);
                        this.resetTmp();
                    }
                    this.sending = false;
                }).catch(({error})=>{
                    if (typeof error == 'object') {
                        for(let er in error){
                            this.$vToastify.error(error[er][0]);
                        }
                    }else{
                        this.$vToastify.error(error);
                    }
                    this.sending = false;
                })
            })
        }
    }
};
</script>