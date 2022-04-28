<template>
    <div class="wishlist">
        <nuxt-link to="/shop/wishlist" title="Wishlist">
            <div class="icon">
                <i class="icon-heart-o"></i>
                <span class="wishlist-count badge">{{ wishlistQty }}</span>
            </div>
            <p>Wishlist</p>
        </nuxt-link>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    computed: {
        ...mapGetters('wishlist', ['wishlistQty'])
    }
};
</script>