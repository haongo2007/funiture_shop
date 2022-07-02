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
            <li :class="{active: current=='contact'}">
                <nuxt-link to="/pages/contact">Contact</nuxt-link>
            </li>
            <li :class="{active: current=='about-us'}">
                <nuxt-link to="/pages/about">About us</nuxt-link>
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
            if (this.$route.path.includes('contact')) return 'contact';
            if (this.$route.path.includes('about-us')) return 'about-us';
            return '/';
        }
    },
};
</script>