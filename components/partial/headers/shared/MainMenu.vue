<template>
    <nav class="main-nav">
        <ul class="menu sf-arrows">
            <li class="megamenu-container" :class="{active: current=='/'}">
                <nuxt-link to="/">Home</nuxt-link>
            </li>
            <li :class="{active: current=='shop'}">
                <nuxt-link to="/shop">Shop</nuxt-link>
            </li>
            <li :class="{active: current=='blog'}">
                <nuxt-link to="/blog">Blog</nuxt-link>
            </li>
        </ul>
    </nav>
</template>
<script>
export default {
    computed: {
        current: function() {
            if (this.$route.path.includes('shop')) return 'shop';
            if (this.$route.path.includes('blog')) return 'blog';
            return '/';
        }
    },
};
</script>