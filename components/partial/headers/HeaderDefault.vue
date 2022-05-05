<template>
	<header class="header header-2 header-intro-clearance">
		<div class="header-top">
			<div :class="isFullwidth ? 'container-fluid' : 'container'">
				<div class="header-left overflow-hidden mr-3 mr-sm-0">
					<div class="welcome-msg d-flex flex-nowrap">
						<p>Special collection already available.</p>
						<a href="#">&nbsp;Read more ...</a>
					</div>
				</div>

				<div class="header-right">
					<ul class="top-menu">
						<li>
							<a href="#">Links</a>
							<ul>
								<li>
									<div class="header-dropdown">
										<a href="#">{{ getCurrency.name }}</a>
										<div class="header-menu">
											<ul>
												<li v-for="item in getCurrencies" :key="item.id">
													<a @click="changeCurrency(item.code)" href="#" :class="item.code == getCurrency.code ? 'disabled' : ''">{{ item.name }}</a>
												</li>
											</ul>
										</div>
									</div>
								</li>
								<li>
									<div class="header-dropdown">
										<a href="#">{{ getLang.name }}</a>
										<div class="header-menu">
											<ul>
												<li v-for="item in getLanguages" :key="item.id">
													<a @click="changeLanguage(item.code)" href="#" :class="item.code == getLang.code ? 'disabled' : ''">{{ item.name }}</a>
												</li>
											</ul>
										</div>
									</div>
								</li>
								<li>
									<a
										href="#signin-modal"
										@click.prevent="openSignInModal"
									>Sign in / Sign up</a>
								</li>
							</ul>
						</li>
					</ul>
				</div>
			</div>
		</div>

		<div class="header-middle">
			<div :class="isFullwidth ? 'container-fluid' : 'container'">
				<div class="header-left">
					<button
						class="mobile-menu-toggler"
						@click="openMobileMenu"
					>
						<span class="sr-only">Toggle mobile menu</span>
						<i class="icon-bars"></i>
					</button>

					<nuxt-link
						to="/"
						class="logo"
					>
						<img
							v-lazy="logo"
							class="bg-transparent"
							alt="Molla Logo"
							width="104"
							height="27"
						/>
					</nuxt-link>
				</div>

				<div class="header-center">
					<header-search></header-search>
				</div>

				<div class="header-right">
					<div class="account">
						<nuxt-link
							to="/shop/dashboard"
							title="My account"
						>
							<div class="icon">
								<i class="icon-user"></i>
							</div>
							<p>Account</p>
						</nuxt-link>
					</div>

					<wishlist-menu></wishlist-menu>

					<cart-menu></cart-menu>
				</div>
			</div>
		</div>

		<sticky-header>
			<div class="header-bottom sticky-header">
				<div :class="isFullwidth ? 'container-fluid' : 'container'">
					<div class="header-left">
						<div class="dropdown category-dropdown">
							<a
								href="javascript:;"
								class="dropdown-toggle"
								title="Browse Categories"
							>Browse Categories</a>

							<div class="dropdown-menu">
								<nav class="side-nav">
									<categories-menu :data-categories="getCategories"/>
								</nav>
							</div>
						</div>
					</div>

					<div class="header-center">
						<main-menu></main-menu>
					</div>

					<div class="header-right overflow-hidden">
						<i class="la la-lightbulb-o"></i>
						<p class="text-truncate">
							Clearance
							<span class="highlight">&nbsp;Up to 30% Off</span>
						</p>
					</div>
				</div>
			</div>
		</sticky-header>
	</header>
</template>

<script>
import CartMenu from '~/components/partial/headers/shared/CartMenu';
import WishlistMenu from '~/components/partial/headers/shared/WishlistMenu';
import MainMenu from '~/components/partial/headers/shared/MainMenu';
import HeaderSearch from '~/components/partial/headers/shared/HeaderSearch';
import StickyHeader from '~/components/elements/StickyHeader';
import CategoriesMenu from '~/components/elements/CategoriesMenu';
import { mapGetters, mapActions } from 'vuex';
import Cookies from 'js-cookie';

export default {
	components: {
		CartMenu,
		WishlistMenu,
		MainMenu,
		HeaderSearch,
		StickyHeader,
		CategoriesMenu
	},
	computed: {
        ...mapGetters('store', ['logo']),
        ...mapGetters('store', ['getLanguages']),
        ...mapGetters('store', ['getCurrencies']),
        ...mapGetters('store', ['getLang']),
        ...mapGetters('store', ['getCurrency']),
        ...mapGetters('store', ['getCategories']),
		isFullwidth: function() {
			return this.$route.path.includes('fullwidth');
		},
	},
	watch: {
	  '$store.state.store.info': function() {

	  }
	},
	created(){
	},
	methods: {
		changeCurrency(code){
			Cookies.set('f-currency',code);
            this.$store.dispatch('store/setCurrency',code);
		},
		changeLanguage(code){
			Cookies.set('f-language',code);
            this.$store.dispatch('store/setLang',code);
		},
		openSignInModal() {
			this.$modal.show(
				() => import('~/components/elements/modals/SignInModal'),
				{},
				{ width: '575', height: 'auto', adaptive: true }
			);
		},
		openMobileMenu: function() {
			document.querySelector('body').classList.add('mmenu-active');
		}
	}
};
</script>
<style type="text/css">
	.disabled{
		pointer-events: none !important;
		color: #a6c76c !important;
	}
</style>