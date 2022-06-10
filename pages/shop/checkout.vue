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
                    <form action="#">
                        <div class="row">
                            <div class="col-lg-9">
                                <div v-if="Object.keys(getCurrentCustomer).length == 0">
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

                                    <div class="row" v-if="invoice.customer.createAccount">
                                        <div class="col-sm-6">
                                            <label class="required">Password * <span>{{ errors.first('password') }}</span></label>
                                            <input data-vv-as="Password" :class="{'is-danger': errors.has('password') }" data-vv-validate-on="blur" v-validate="'required'" name="password" type="password" class="form-control" v-model="invoice.customer.password"/>
                                        </div>

                                        <div class="col-sm-6">
                                            <label class="required">Password confirm * <span>{{ errors.first('password_confirm') }}</span></label>
                                            <input data-vv-as="Password confirm" :class="{'is-danger': errors.has('password_confirm') }" data-vv-validate-on="blur" v-validate="'required'" name="password_confirm" type="password" class="form-control" v-model="invoice.customer.password_confirm"/>
                                        </div>
                                    </div>

                                    <div class="custom-control custom-checkbox" >
                                        <input
                                            v-model="invoice.customer.createAccount"
                                            type="checkbox"
                                            class="custom-control-input"
                                            id="checkout-create-acc"
                                        />
                                        <label
                                            class="custom-control-label"
                                            for="checkout-create-acc"
                                        >Create an account?</label>
                                    </div>
                                </div>
                                <div v-else>
                                    <div class="row">
                                        <div class="col-lg-12">
                                            <div class="summary mb-0">
                                                <div class="card-body p-0">
                                                    <h3 class="summary-title">Billing Address</h3>

                                                    <table class="table table-summary">
                                                        <tbody>
                                                            <tr>
                                                                <td>Customer:</td>
                                                                <td class="text-left">{{ invoice.customer.first_name + invoice.customer.last_name }}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Phone:</td>
                                                                <td class="text-left">{{ invoice.customer.phone }}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Email:</td>
                                                                <td class="text-left">{{ invoice.customer.email}}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Company:</td>
                                                                <td class="text-left">{{ invoice.customer.company }}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Country:</td>
                                                                <td class="text-left">{{ invoice.customer.country }}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Address:</td>
                                                                <td class="text-left">{{ invoice.customer.address1 +','+ invoice.customer.address2 +','+ invoice.customer.address3 }}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Postcode:</td>
                                                                <td class="text-left">{{ invoice.customer.postcode }}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>

                                                    <nuxt-link :to="'/shop/dashboard'">Edit<i class="icon-edit"></i></nuxt-link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="custom-control custom-checkbox p-0">

                                    <div class="col-sm-12 p-0" v-if="useOtherAddress">
                                        <label class="required">Shipping Address * <span>{{ errors.first('shippingAddress') }}</span></label>
                                        <input name="shippingAddress" type="text" class="form-control" placeholder="House number and Street name" :class="{'is-danger': errors.has('shippingAddress') }" data-vv-validate-on="blur" v-validate="'required'" v-model="invoice.customer.shippingAddress"/>
                                    </div>
                                    <div class="col-sm-12 pl-5">
                                        <input
                                            type="checkbox"
                                            class="custom-control-input"
                                            id="checkout-diff-address"
                                            @click="changeShippingAddress($event)"/>
                                        <label class="custom-control-label" for="checkout-diff-address">Ship to a different address?</label>
                                    </div>
                                </div>

                                <label>Order notes (optional)</label>
                                <textarea
                                    v-model="invoice.customer.comment"
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
                                            <tr v-for="(product, index) in invoice.products" :key="index">
                                                <td>
                                                    <nuxt-link :to="'/product/default/' + product.slug" :title="product.name" class="txt-ellipsis" style="width: 175px">{{ product.name }}</nuxt-link>
                                                </td>
                                                <td>{{ priceConvert(product.sum + product.sumVariantPrice) }}</td>
                                            </tr>

                                            <tr class="summary-subtotal" v-if="priceTax > 0">
                                                <td>Tax:</td>
                                                <td>{{ priceConvert(priceTax) }}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <table class="table table-summary mt-2" v-if="getCoupon.length > 0">
                                        <thead>
                                            <tr>
                                                <th>Discount</th>
                                                <th>Reward</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            
                                            <tr v-for="item in getCoupon" :key="item.id">
                                                <td>
                                                    <div class="coupon-checkout">
                                                        <div class="coupon-info">
                                                            <div>{{ item.code }}</div>
                                                            <div class="border-ticket"></div>
                                                        </div>
                                                        <div class="coupon-desc txt-ellipsis">
                                                            {{ item.data }}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>{{ priceConvert(item.value) }}</td>
                                            </tr>

                                        </tbody>
                                    </table>
                                    <table class="table table-summary  mb-2">

                                        <tbody>
                                            
                                            <tr class="summary-subtotal">
                                                <td>Subtotal:</td>
                                                <td>{{ priceConvert(invoice.priceSubtotal) }}</td>
                                            </tr>

                                        </tbody>
                                    </table>

                                    <div class="accordion-summary mb-0" :class="{'method-danger': errors.has('shipping') }">
                                        <div class="card" v-for="(item,index) in getShippingMethod" :key="index">
                                            <div class="card-header">
                                                <div class="custom-control custom-radio m-2" >
                                                    <input
                                                        v-validate="'required'" 
                                                        type="radio"
                                                        id="express-shipping"
                                                        name="shipping"
                                                        class="custom-control-input"
                                                        v-model="invoice.shippingMethod"
                                                        :value="index"
                                                        @change="changeToggleShipping(item)"
                                                    />
                                                    <label
                                                        class="custom-control-label"
                                                        for="express-shipping"
                                                    >{{ index }}:</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    <table class="table table-summary">
                                        <tbody>

                                            <tr class="summary-total">
                                                <td>Total:</td>
                                                <td>{{ priceConvert(invoice.priceTotal) }}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div class="accordion-summary" :class="{'method-danger': errors.has('payment') }">
                                        <!-- <div class="card">
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
                                        </div> -->
                                        <div class="card" v-for="(item,index) in getPaymentMethod" :key="index">
                                            <div class="card-header">
                                                <h2 class="card-title">
                                                    <a
                                                        v-validate="'required'" 
                                                        name="shipping"
                                                        class="toggle-button"
                                                        :class="{expanded: togglePayment[index], collapsed: !togglePayment[index]}"
                                                        @click.prevent="changeTogglePayment(index)"
                                                        href="#"
                                                    >{{ item.title }}</a>
                                                    <input type="hidden" name="payment" v-model="invoice.paymentMethod" v-validate="'required'">
                                                </h2>
                                            </div>

                                            <vue-slide-toggle :open="togglePayment[index]">
                                                <div
                                                    class="card-body"
                                                >Quisque volutpat mattis eros. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros.</div>
                                            </vue-slide-toggle>
                                        </div>

                                       <!--  <div class="card">
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
                                        </div> -->
                                    </div>

                                    <button
                                        type="button"
                                        class="btn btn-outline-primary-2 btn-order btn-block"
                                        @click="checkOut()"
                                    >
                                        <div class="spinner-border" role="status" v-if="proceedCheckout">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                        <div v-else>
                                            <span class="btn-text">Place Order</span>
                                            <span class="btn-hover-text">Proceed to Checkout</span>
                                        </div>
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
import { priceConvert } from '~/utilities/common';

export default {
    components: {
        VueSlideToggle,
        PageHeader
    },
    data: function() {
        return {
            togglePayment: {},
            proceedCheckout:false,
            useOtherAddress:false,
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
                    comment:'',
                    password:'',
                    password_confirm:'',
                    shippingAddress:'',
                    createAccount:false,
                },
                paymentMethod:'',
                shippingMethod:'',
                couponInUse:[],
                products:[],
                priceSubtotal:0,
                priceTotal:0,
                priceTax:0,
            }
        };
    },
    computed: {
        ...mapGetters('store', ['getShippingMethod','getPaymentMethod']),
        ...mapGetters('customer', ['getCurrentCustomer']),
        ...mapGetters('cart', ['cartList', 'priceTotal', 'qtyTotal','priceTax']),
        ...mapGetters('coupon', ['getCoupon']),
    },
    watch: {
      getCurrentCustomer: function(newVal) {
        this.handleSetCurCustomer(newVal)
      },
      '$store.state.store.info': function(newVal) {
        if (newVal) {
            for(let prop in newVal.payment_method) {
                this.$set(this.togglePayment,prop,false);
            }
        }
      },
      cartList: function(newVal) {
        if (newVal.length == 0) {
            this.$router.replace({
                path: '/redirect/',
            });
        }
        this.invoice.products = [...this.cartList];
        this.invoice.priceSubtotal = this.priceTotal;
        this.invoice.priceTotal = this.priceTotal;
        this.invoice.priceTax = this.priceTax;
      },
      getCoupon: function(newVal) {
        this.invoice.couponInUse = this.getCoupon;
        let sum = this.getCoupon.reduce( ( acc, cur ) => {
            return acc + cur.value;
        }, 0 );
        this.invoice.priceSubtotal = this.invoice.priceSubtotal + sum; 
        this.invoice.priceTotal = this.invoice.priceSubtotal + sum;
      },
    },
    created(){
        if (this.getCurrentCustomer) {
            this.handleSetCurCustomer(this.getCurrentCustomer)
        }
        if (this.getPaymentMethod) {
            for(let prop in this.getPaymentMethod) {
                this.$set(this.togglePayment,prop,false);
            }
        }
        this.invoice.products = [...this.cartList];
        this.invoice.priceSubtotal = this.priceTotal;
        this.invoice.priceTotal = this.priceTotal;
        this.invoice.priceTax = this.priceTax;
        if (this.getCoupon.length) {
            let sum = this.getCoupon.reduce( ( acc, cur ) => {
                return acc + cur.value;
            }, 0 );
            this.invoice.priceSubtotal = this.invoice.priceSubtotal + sum;
            this.invoice.priceTotal = this.invoice.priceTotal + sum;
        }
    },
    methods: {
        ...mapGetters('coupon', ['addCoupon','deleteCoupon']),
        priceConvert,
        changeShippingAddress(){
            this.useOtherAddress = !this.useOtherAddress;
        },
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
        changeTogglePayment: function(index1) {
            for(let prop in this.togglePayment){
                this.togglePayment[prop] = false;
            }
            this.togglePayment[index1] = true; 
            this.invoice.paymentMethod = this.getPaymentMethod[index1].key;
        },
        changeToggleShipping: function(item) {
            if (this.invoice.priceTotal < item.shipping_free || item.shipping_free == 0) {
                this.invoice.priceTotal += item.fee;
            }
        },
        async applyCoupon(){
            if (this.coupon == '') {
                return false;
            }
            if (this.getCoupon.length && this.getCoupon.filter((item) => { item.code.toLowerCase().trim() == this.coupon.toLowerCase().trim()})) {
                this.$vToastify.error( 'This coupon has already been applied' );
                return false
            }
            await Repository.get(`${baseUrl}/system/sanctum/csrf-cookie`).then(() => {
                Repository.post(`${baseUrl}/discount/checkCoupon`,{code:this.coupon,total:this.invoice.priceTotal}).then((data)=>{
                    this.addCoupon(data.data)
                    this.invoice.priceSubtotal = this.invoice.priceSubtotal + data.data.value;
                    this.invoice.priceTotal = this.invoice.priceTotal + data.data.value;
                    this.$vToastify.success( data.message );
                }).catch(({response:{data}})=>{
                    this.$vToastify.error( data.error );
                })
            })
        },
        checkOut(){
            this.$validator.validate().then(valid => {
                if (valid) {
                    this.proceedCheckout = true;
                    Repository.get(`${baseUrl}/system/sanctum/csrf-cookie`).then(() => {
                        Repository.post(`${baseUrl}/checkout/store`,this.invoice).then((data)=>{
                            if (data.success) {
                                this.$store.commit('cart/CLEAR_CART');
                                this.$store.commit('coupon/CLEAR_COUPON');
                                this.$vToastify.setSettings( {
                                    withBackdrop: false,
                                    position: "top-right",
                                    canTimeout: false,
                                } );
                                this.$vToastify.success(data.data.message);
                            }
                        }).catch(({data})=>{
                            this.proceedCheckout = false;
                            this.$vToastify.error('Order failed!');
                        })
                    })
                }
            });
        }
    }
};
</script>

<style type="text/css">
    .coupon-checkout {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border: 1px solid #a6c76c;
        border-left: 0;
    }
    .coupon-checkout .coupon-info{
        color: #fff;
        margin-left: 3px;
        background: #a6c76c;
        position: relative;
        padding: 2px 5px 2px 10px;
        border-right: 1px solid #a6c76c;
    }
    .coupon-checkout .coupon-info .border-ticket{
        top: 0;
        width: 5px;
        height: 100%;
        left: -3px;
        position: absolute;
        background: radial-gradient(circle at 0 0.25rem,transparent 0,transparent 0.2rem,#a6c76c 0);
        background-size: 0.3rem 0.6rem;
        background-repeat: repeat-y;
    }
    .coupon-checkout .coupon-desc{
        font-size: 12px;
        width: 100px!important;
        margin-right: 5px;
    }
    .is-danger{
        border-color: #e02b27 !important;
    }
    .method-danger{
        border-radius: 4px;
        padding: 0 8px;
        border:1px solid #e02b27 !important;
    }
</style>