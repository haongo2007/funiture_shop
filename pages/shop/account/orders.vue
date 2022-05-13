<template>
	<div>
        <div v-if="hasOrder">
            <p>No order has been made yet.</p>
            <nuxt-link
                to="/shop/sidebar/3cols"
                class="btn btn-outline-primary-2">
                <span>GO SHOP</span>
                <i class="icon-long-arrow-right"></i>
            </nuxt-link>
        </div>
        <div v-else class="page-content">
            <table class="table table-mobile">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>ID</th>
                        <th>Total</th>
                        <th>Created</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                    </tr>
                </tbody>
            </table>
        </div>
	</div>
</template>
<script>
export default {
	name:'AccountOrders',
    computed: {
    },
    data: function() {
        return {
            hasOrder:false,
        };
    },
    watch: {
    },
    created(){

    },
    methods: {
        
    }
};
</script>