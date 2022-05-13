<template>
	<div>
		<form action="#">
            <div class="row">
                <div class="col-sm-6">
                    <label>First Name *</label>
                    <input type="text" class="form-control" required v-model="temp.first_name"/>
                </div>

                <div class="col-sm-6">
                    <label>Last Name *</label>
                    <input type="text" class="form-control" required v-model="temp.last_name"/>
                </div>
            </div>

            <label>Display Name *</label>
            <input type="text" class="form-control" required v-model="temp.name"/>
            <small class="form-text">This will be how your name will be displayed in the account section and in reviews</small>

            <label>Email address *</label>
            <input type="email" class="form-control" required v-model="temp.email"/>

            <label>Current password (leave blank to leave unchanged)</label>
            <input type="password" class="form-control" />

            <label>New password (leave blank to leave unchanged)</label>
            <input type="password" class="form-control" />

            <label>Confirm new password</label>
            <input type="password" class="form-control mb-2" />

            <button type="submit" class="btn btn-outline-primary-2">
                <span>SAVE CHANGES</span>
                <i class="icon-long-arrow-right"></i>
            </button>
        </form>
	</div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
	name:'AccountDetail',
    computed: {
        ...mapGetters('customer', ['getCurrentCustomer']),
    },
    data: function() {
        return {
            temp:{
                first_name:'',
                last_name:'',
                name:'',
                email:'',
            }
        };
    },
    watch: {
        '$store.state.customer.customer': function(value) {
            this.temp = Object.assign(this.temp,value);
        }
    },
    created(){
        this.temp = Object.assign(this.temp,this.getCurrentCustomer);
    },
    methods: {
        
    }
};
</script>