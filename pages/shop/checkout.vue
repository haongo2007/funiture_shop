<template>
    <main class="main">
        <page-header title="Checkout" subtitle="Shop"></page-header>
        <nav class="breadcrumb-nav">
            <div class="container">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item">
                        <nuxt-link to="/">Home</nuxt-link>
                    </li>
                    <li class="breadcrumb-item">
                        <nuxt-link to="/shop/sidebar/list">Shop</nuxt-link>
                    </li>
                    <li class="breadcrumb-item active">Checkout</li>
                </ol>
            </div>
        </nav>

        <div class="page-content">
            <div class="checkout">
                <div class="container">
                    <div class="checkout-discount">
                        <input
                            type="text"
                            class="form-control"
                            v-model="coupon"
                            required
                            id="checkout-discount-input"
                            v-debounce:1s="applyCoupon" :debounce-events="['keyup']"
                            @click="clickCoupon($event)"
                        />
                        <label for="checkout-discount-input" class="text-truncate">
                            Have a coupon?
                            <span>Click here to enter your code</span>
                        </label>
                    </div>
                    <div class="coupon mb-1" v-for="item in invoice.couponInUse" :key="item.id">
                        <div class="coupon-info">
                            <div>{{ item.code }}</div>
                            <div class="border-ticket"></div>
                        </div>
                        <div class="coupon-desc">
                            {{ item.data }}
                        </div>
                    </div>
                    <form action="#">
                        <div class="row">
                            <div class="col-lg-9">
                                <h2 class="checkout-title">Billing Details</h2>

                                <div class="row">
                                    <div class="col-sm-6">
                                        <label class="required">First Name * <span>{{ errors.first('first_name') }}</span></label>
                                        <input data-vv-as="First Name" :class="{'is-danger': errors.has('first_name') }" data-vv-validate-on="blur" v-validate="'required'" name="first_name" type="text" class="form-control" v-model="invoice.customer.first_name"/>
                                    </div>

                                    <div class="col-sm-6">
                                        <label class="required">Last Name * <span>{{ errors.first('last_name') }}</span></label>
                                        <input data-vv-as="Last Name" :class="{'is-danger': errors.has('last_name') }" data-vv-validate-on="blur" v-validate="'required'" name="last_name" type="text" class="form-control" v-model="invoice.customer.last_name"/>
                                    </div>
                                </div>

                                <label>Company Name (Optional)</label>
                                <input type="text" class="form-control" v-model="invoice.customer.company"/>

                                <label class="required">Country * <span>{{ errors.first('country') }}</span></label>
                                <input data-vv-as="Country" :class="{'is-danger': errors.has('country') }" data-vv-validate-on="blur" v-validate="'required'" name="country" type="text" class="form-control" v-model="invoice.customer.country"/>

                                <label class="required">Street address * <span>{{ errors.first('address1') }}</span></label>
                                <input
                                    data-vv-as="Street address" :class="{'is-danger': errors.has('address1') }" data-vv-validate-on="blur" v-validate="'required'" name="address1" 
                                    type="text"
                                    class="form-control"
                                    placeholder="House number and Street name"
                                    v-model="invoice.customer.address1"
                                />

                                <div class="row">
                                    <div class="col-sm-6">
                                        <label class="required">Town / City * <span>{{ errors.first('address2') }}</span></label>
                                        <input data-vv-as="Town / City" :class="{'is-danger': errors.has('address2') }" data-vv-validate-on="blur" v-validate="'required'" name="address2" type="text" class="form-control" v-model="invoice.customer.address2"/>
                                    </div>

                                    <div class="col-sm-6">
                                        <label class="required">State / County  * <span>{{ errors.first('address3') }}</span></label>
                                        <input data-vv-as="State / County" :class="{'is-danger': errors.has('address3') }" data-vv-validate-on="blur" v-validate="'required'" name="address3" type="text" class="form-control" v-model="invoice.customer.address3"/>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-sm-6">
                                        <label class="required">Postcode / ZIP * <span>{{ errors.first('postcode') }}</span></label>
                                        <input data-vv-as="State / County" :class="{'is-danger': errors.has('postcode') }" data-vv-validate-on="blur" v-validate="'required'" name="postcode" type="text" class="form-control" v-model="invoice.customer.postcode"/>
                                    </div>

                                    <div class="col-sm-6">
                                        <label class="required">Phone * <span>{{ errors.first('phone') }}</span></label>
                                        <input data-vv-as="Phone" :class="{'is-danger': errors.has('phone') }" data-vv-validate-on="blur" v-validate="'required'" name="phone" type="tel" class="form-control" v-model="invoice.customer.phone"/>
                                    </div>
                                </div>

                                <label class="required">Email address * <span>{{ errors.first('email') }}</span></label>
                                <input data-vv-as="Email address" :class="{'is-danger': errors.has('email') }" data-vv-validate-on="blur" v-validate="'required'" name="email" type="email" class="form-control" v-model="invoice.customer.email"/>

                                <div class="row" v-if="createAccount">
                                    <div class="col-sm-6">
                                        <label class="required">Password * <span>{{ errors.first('password') }}</span></label>
                                        <input data-vv-as="Password" :class="{'is-danger': errors.has('password') }" data-vv-validate-on="blur" v-validate="'required'" name="password" type="password" class="form-control" v-model="invoice.customer.password"/>
                                    </div>

                                    <div class="col-sm-6">
                                        <label class="required">Password confirm * <span>{{ errors.first('password_confirm') }}</span></label>
                                        <input data-vv-as="Password confirm" :class="{'is-danger': errors.has('password_confirm') }" data-vv-validate-on="blur" v-validate="'required'" name="password_confirm" type="password" class="form-control" v-model="invoice.customer.password_confirm"/>
                                    </div>
                                </div>

                                <div class="custom-control custom-checkbox" v-if="Object.keys(getCurrentCustomer).length == 0">
                                    <input
                                        v-model="createAccount"
                                        type="checkbox"
                                        class="custom-control-input"
                                        id="checkout-create-acc"
                                    />
                                    <label
                                        class="custom-control-label"
                                        for="checkout-create-acc"
                                    >Create an account?</label>
                                </div>

                                <div class="custom-control custom-checkbox">
                                    <input
                                        type="checkbox"
                                        class="custom-control-input"
                                        id="checkout-diff-address"
                                    />
                                    <label
                                        class="custom-control-label"
                                        for="checkout-diff-address"
                                    >Ship to a different address?</label>
                                </div>

                                <label>Order notes (optional)</label>
                                <textarea
                                    v-model="invoice.customer.notes"
                                    class="form-control"
                                    cols="30"
                                    rows="4"
                                    placeholder="Notes about your order, e.g. special notes for delivery"
                                ></textarea>
                            </div>

                            <aside class="col-lg-3">
                                <div class="summary">
                                    <h3 class="summary-title">Your Order</h3>

                                    <table class="table table-summary">
                                        <thead>
                                            <tr>
                                                <th>Product</th>
                                                <th>Total</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            <tr v-for="(product, index) in this.invoice.products" :key="index">
                                                <td>
                                                    <nuxt-link
                                                        :to="'/product/default/' + product.slug"
                                                    >{{ product.name }}</nuxt-link>
                                                </td>
                                                <td>${{ product.sum }}</td>
                                            </tr>

                                            <tr class="summary-subtotal">
                                                <td>Subtotal:</td>
                                                <td>${{ priceTotal }}</td>
                                            </tr>

                                            <tr>
                                                <td>Shipping:</td>
                                                <td>Free shipping</td>
                                            </tr>
                                            <tr class="summary-total">
                                                <td>Total:</td>
                                                <td>${{ priceTotal }}</td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    <div class="accordion-summary">
                                        <div class="card">
                                            <div class="card-header">
                                                <h2 class="card-title">
                                                    <a
                                                        class="toggle-button"
                                                        :class="{expanded: toggleState[0], collapsed: !toggleState[0]}"
                                                        @click.prevent="changeToggle(0)"
                                                        href="#"
                                                    >Direct bank transfer</a>
                                                </h2>
                                            </div>

                                            <vue-slide-toggle :open="toggleState[0]">
                                                <div
                                                    class="card-body"
                                                >Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.</div>
                                            </vue-slide-toggle>
                                        </div>

                                        <div class="card">
                                            <div class="card-header">
                                                <h2 class="card-title">
                                                    <a
                                                        class="toggle-button"
                                                        :class="{expanded: toggleState[1], collapsed: !toggleState[1]}"
                                                        @click.prevent="changeToggle(1)"
                                                        href="#"
                                                    >Check payments</a>
                                                </h2>
                                            </div>

                                            <vue-slide-toggle :open="toggleState[1]">
                                                <div
                                                    class="card-body"
                                                >Ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis.</div>
                                            </vue-slide-toggle>
                                        </div>

                                        <div class="card">
                                            <div class="card-header">
                                                <h2 class="card-title">
                                                    <a
                                                        class="toggle-button"
                                                        :class="{expanded: toggleState[2], collapsed: !toggleState[2]}"
                                                        @click.prevent="changeToggle(2)"
                                                        href="#"
                                                    >Cash on delivery</a>
                                                </h2>
                                            </div>

                                            <vue-slide-toggle :open="toggleState[2]">
                                                <div
                                                    class="card-body"
                                                >Quisque volutpat mattis eros. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros.</div>
                                            </vue-slide-toggle>
                                        </div>

                                        <div class="card">
                                            <div class="card-header">
                                                <h2 class="card-title">
                                                    <a
                                                        class="toggle-button"
                                                        :class="{expanded: toggleState[3], collapsed: !toggleState[3]}"
                                                        @click.prevent="changeToggle(3)"
                                                        href="#"
                                                    >
                                                        PayPal
                                                        <small
                                                            class="float-right paypal-link"
                                                        >What is PayPal?</small>
                                                    </a>
                                                </h2>
                                            </div>

                                            <vue-slide-toggle :open="toggleState[3]">
                                                <div
                                                    class="card-body"
                                                >Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum.</div>
                                            </vue-slide-toggle>
                                        </div>

                                        <div class="card">
                                            <div class="card-header">
                                                <h2 class="card-title">
                                                    <a
                                                        class="toggle-button"
                                                        :class="{expanded: toggleState[4], collapsed: !toggleState[4]}"
                                                        @click.prevent="changeToggle(4)"
                                                        href="#"
                                                    >
                                                        Credit Card (Stripe)
                                                        <img
                                                            v-lazy="'./images/payments-summary.png'"
                                                            alt="payments cards"
                                                            class="bg-white"
                                                        />
                                                    </a>
                                                </h2>
                                            </div>

                                            <vue-slide-toggle :open="toggleState[4]">
                                                <div
                                                    class="card-body"
                                                >Donec nec justo eget felis facilisis fermentum.Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Lorem ipsum dolor sit ame.</div>
                                            </vue-slide-toggle>
                                        </div>
                                    </div>

                                    <button
                                        type="button"
                                        class="btn btn-outline-primary-2 btn-order btn-block"
                                        @click="checkOut()"
                                    >
                                        <span class="btn-text">Place Order</span>
                                        <span class="btn-hover-text">Proceed to Checkout</span>
                                    </button>
                                </div>
                            </aside>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </main>
</template>
<script>
import { mapGetters } from 'vuex';
import Repository,{ baseUrl } from '~/repositories/repository';
import { VueSlideToggle } from 'vue-slide-toggle';
import PageHeader from '~/components/elements/PageHeader';
import { ValidationProvider } from 'vee-validate';

export default {
    components: {
        VueSlideToggle,
        PageHeader
    },
    data: function() {
        return {
            toggleState: [true, false, false, false, false],
            createAccount:false,
            coupon:'',
            config:[],
            invoice:{
                customer:{
                    first_name:'',
                    last_name:'',
                    company:'',
                    country:'',
                    address1:'',
                    address2:'',
                    address3:'',
                    postcode:'',
                    phone:'',
                    email:'',
                    notes:'',
                    password:'',
                    password_confirm:''
                },
                couponInUse:[],
                products:[]
            }
        };
    },
    computed: {
        ...mapGetters('customer', ['getCurrentCustomer']),
        ...mapGetters('store', ['getConfig']),
        ...mapGetters('cart', ['cartList', 'priceTotal', 'qtyTotal'])
    },
    watch: {
      '$store.state.customer.customer': function(newVal) {
        this.handleSetCurCustomer(newVal)
      },
      '$store.state.cart.data': function(newVal) {
        this.invoice.products = newVal;
      }
    },
    created(){
        if (this.getCurrentCustomer) {
            this.handleSetCurCustomer(this.getCurrentCustomer)
        }
    },
    methods: {
        handleSetCurCustomer(val){
            let cur_cus = {...val};
            this.invoice.customer = Object.assign(this.invoice.customer,cur_cus);
        },
        updateCart: function() {
            this.updateCart(this.cartItems);
        },
        clickCoupon(event) {
            event.currentTarget.parentElement.querySelector('label').style =
                'opacity: 0';
        },
        changeToggle: function(index1) {
            this.toggleState = this.toggleState.reduce((acc, cur, index) => {
                if (index == index1) return [...acc, !cur];
                return [...acc, false];
            }, []);
        },
        async applyCoupon(){
            if (this.coupon == '') {
                return false;
            }
            console.log(this.coupon);
            if (this.invoice.couponInUse.filter((item) => item.code == this.coupon.trim()).length > 0) {
                this.$vToastify.error( 'This coupon has already been applied' );
                return false
            }
            await Repository.get(`${baseUrl}/system/sanctum/csrf-cookie`).then(() => {
                Repository.post(`${baseUrl}/discount/checkCoupon`,{code:this.coupon}).then((data)=>{
                    this.invoice.couponInUse.push(data.data);
                    this.$vToastify.success( data.message );
                }).catch(({response:{data}})=>{
                    this.$vToastify.error( data.error );
                })
            })
        },
        checkOut(){
            this.$validator.validate().then(valid => {
                if (valid) {
                    return false;
                }
            });
        }
    }
};
</script>

<style type="text/css">
    .coupon {
        display: flex;
        width: 30%;
        justify-content: space-between;
        align-items: center;
        border: 1px solid #a6c76c;
        border-left: 0;
    }
    .coupon .coupon-info{
        color: #fff;
        margin-left: 3px;
        background: #a6c76c;
        position: relative;
        padding: 2px 5px 2px 10px;
        border-right: 1px solid #a6c76c;
    }
    .coupon .coupon-info .border-ticket{
        top: 0;
        width: 5px;
        height: 100%;
        left: -3px;
        position: absolute;
        background: radial-gradient(circle at 0 0.25rem,transparent 0,transparent 0.2rem,#a6c76c 0);
        background-size: 0.3rem 0.6rem;
        background-repeat: repeat-y;
    }
    .coupon .coupon-desc{
        margin-right: 10px;
    }
    .is-danger{
        border-color: #e02b27 !important;
    }
</style>