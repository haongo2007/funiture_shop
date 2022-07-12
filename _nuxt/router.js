import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _65ec4220 = () => interopDefault(import('../pages/blog/index.vue' /* webpackChunkName: "pages/blog/index" */))
const _229ff885 = () => interopDefault(import('../pages/elements/index.vue' /* webpackChunkName: "pages/elements/index" */))
const _4ec27144 = () => interopDefault(import('../pages/shop/index.vue' /* webpackChunkName: "pages/shop/index" */))
const _56e64c08 = () => interopDefault(import('../pages/elements/accordions.vue' /* webpackChunkName: "pages/elements/accordions" */))
const _78c8193a = () => interopDefault(import('../pages/elements/banners.vue' /* webpackChunkName: "pages/elements/banners" */))
const _8dd78176 = () => interopDefault(import('../pages/elements/blog-posts.vue' /* webpackChunkName: "pages/elements/blog-posts" */))
const _fcdcf618 = () => interopDefault(import('../pages/elements/buttons.vue' /* webpackChunkName: "pages/elements/buttons" */))
const _296b4d79 = () => interopDefault(import('../pages/elements/categories.vue' /* webpackChunkName: "pages/elements/categories" */))
const _42a04d83 = () => interopDefault(import('../pages/elements/cta.vue' /* webpackChunkName: "pages/elements/cta" */))
const _68f2d042 = () => interopDefault(import('../pages/elements/icon-boxes.vue' /* webpackChunkName: "pages/elements/icon-boxes" */))
const _39d4247b = () => interopDefault(import('../pages/elements/portfolio.vue' /* webpackChunkName: "pages/elements/portfolio" */))
const _fa963bfe = () => interopDefault(import('../pages/elements/products.vue' /* webpackChunkName: "pages/elements/products" */))
const _0fa7719b = () => interopDefault(import('../pages/elements/tabs.vue' /* webpackChunkName: "pages/elements/tabs" */))
const _34a54dd1 = () => interopDefault(import('../pages/elements/testimonials.vue' /* webpackChunkName: "pages/elements/testimonials" */))
const _c2627910 = () => interopDefault(import('../pages/elements/titles.vue' /* webpackChunkName: "pages/elements/titles" */))
const _f3a289e8 = () => interopDefault(import('../pages/elements/typography.vue' /* webpackChunkName: "pages/elements/typography" */))
const _76872ea8 = () => interopDefault(import('../pages/elements/video-banners.vue' /* webpackChunkName: "pages/elements/video-banners" */))
const _648b3b72 = () => interopDefault(import('../pages/pages/404.vue' /* webpackChunkName: "pages/pages/404" */))
const _72a802c7 = () => interopDefault(import('../pages/pages/about.vue' /* webpackChunkName: "pages/pages/about" */))
const _631f5e2c = () => interopDefault(import('../pages/pages/about-2.vue' /* webpackChunkName: "pages/pages/about-2" */))
const _56fbdd81 = () => interopDefault(import('../pages/pages/coming-soon.vue' /* webpackChunkName: "pages/pages/coming-soon" */))
const _6b2f415a = () => interopDefault(import('../pages/pages/contact.vue' /* webpackChunkName: "pages/pages/contact" */))
const _56d143ff = () => interopDefault(import('../pages/pages/contact-2.vue' /* webpackChunkName: "pages/pages/contact-2" */))
const _107bde50 = () => interopDefault(import('../pages/pages/faq.vue' /* webpackChunkName: "pages/pages/faq" */))
const _5c0780a3 = () => interopDefault(import('../pages/pages/login.vue' /* webpackChunkName: "pages/pages/login" */))
const _046b0b9e = () => interopDefault(import('../pages/shop/cart.vue' /* webpackChunkName: "pages/shop/cart" */))
const _c83e1078 = () => interopDefault(import('../pages/shop/checkout.vue' /* webpackChunkName: "pages/shop/checkout" */))
const _29e08506 = () => interopDefault(import('../pages/shop/dashboard.vue' /* webpackChunkName: "pages/shop/dashboard" */))
const _bb89558c = () => interopDefault(import('../pages/shop/market.vue' /* webpackChunkName: "pages/shop/market" */))
const _331308c3 = () => interopDefault(import('../pages/shop/wishlist.vue' /* webpackChunkName: "pages/shop/wishlist" */))
const _20db9827 = () => interopDefault(import('../pages/blog/mask/grid.vue' /* webpackChunkName: "pages/blog/mask/grid" */))
const _6b20a874 = () => interopDefault(import('../pages/blog/mask/masonry.vue' /* webpackChunkName: "pages/blog/mask/masonry" */))
const _758573f8 = () => interopDefault(import('../pages/shop/account/address.vue' /* webpackChunkName: "pages/shop/account/address" */))
const _158019f1 = () => interopDefault(import('../pages/shop/account/detail.vue' /* webpackChunkName: "pages/shop/account/detail" */))
const _fd340af6 = () => interopDefault(import('../pages/shop/account/orders.vue' /* webpackChunkName: "pages/shop/account/orders" */))
const _668bb3d7 = () => interopDefault(import('../pages/shop/category/boxed.vue' /* webpackChunkName: "pages/shop/category/boxed" */))
const _39b5a878 = () => interopDefault(import('../pages/shop/category/fullwidth.vue' /* webpackChunkName: "pages/shop/category/fullwidth" */))
const _4d456b87 = () => interopDefault(import('../pages/blog/single/default/_slug.vue' /* webpackChunkName: "pages/blog/single/default/_slug" */))
const _461a0d9d = () => interopDefault(import('../pages/blog/single/fullwidth/_slug.vue' /* webpackChunkName: "pages/blog/single/fullwidth/_slug" */))
const _2f1c3ae2 = () => interopDefault(import('../pages/blog/single/sidebar/_slug.vue' /* webpackChunkName: "pages/blog/single/sidebar/_slug" */))
const _8b6c443c = () => interopDefault(import('../pages/blog/grid/_type.vue' /* webpackChunkName: "pages/blog/grid/_type" */))
const _0830e526 = () => interopDefault(import('../pages/blog/masonry/_type.vue' /* webpackChunkName: "pages/blog/masonry/_type" */))
const _70bd0bda = () => interopDefault(import('../pages/product/centered/_slug.vue' /* webpackChunkName: "pages/product/centered/_slug" */))
const _41988921 = () => interopDefault(import('../pages/product/default/_slug.vue' /* webpackChunkName: "pages/product/default/_slug" */))
const _3ca401c2 = () => interopDefault(import('../pages/product/extended/_slug.vue' /* webpackChunkName: "pages/product/extended/_slug" */))
const _721c2cb7 = () => interopDefault(import('../pages/product/fullwidth/_slug.vue' /* webpackChunkName: "pages/product/fullwidth/_slug" */))
const _a9286e1c = () => interopDefault(import('../pages/product/gallery/_slug.vue' /* webpackChunkName: "pages/product/gallery/_slug" */))
const _0c9b7c25 = () => interopDefault(import('../pages/product/masonry/_slug.vue' /* webpackChunkName: "pages/product/masonry/_slug" */))
const _236f587c = () => interopDefault(import('../pages/product/sidebar/_slug.vue' /* webpackChunkName: "pages/product/sidebar/_slug" */))
const _5ec93ee2 = () => interopDefault(import('../pages/product/sticky/_slug.vue' /* webpackChunkName: "pages/product/sticky/_slug" */))
const _588ba5f7 = () => interopDefault(import('../pages/shop/nosidebar/_type.vue' /* webpackChunkName: "pages/shop/nosidebar/_type" */))
const _0a366818 = () => interopDefault(import('../pages/shop/sidebar/_type.vue' /* webpackChunkName: "pages/shop/sidebar/_type" */))
const _4666af22 = () => interopDefault(import('../pages/product/_slug.vue' /* webpackChunkName: "pages/product/_slug" */))
const _52d03e37 = () => interopDefault(import('../pages/redirect/_.vue' /* webpackChunkName: "pages/redirect/_" */))
const _f8b8d852 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'link-active',
  linkExactActiveClass: 'active',
  scrollBehavior,

  routes: [{
    path: "/blog",
    component: _65ec4220,
    name: "blog"
  }, {
    path: "/elements",
    component: _229ff885,
    name: "elements"
  }, {
    path: "/shop",
    component: _4ec27144,
    name: "shop"
  }, {
    path: "/elements/accordions",
    component: _56e64c08,
    name: "elements-accordions"
  }, {
    path: "/elements/banners",
    component: _78c8193a,
    name: "elements-banners"
  }, {
    path: "/elements/blog-posts",
    component: _8dd78176,
    name: "elements-blog-posts"
  }, {
    path: "/elements/buttons",
    component: _fcdcf618,
    name: "elements-buttons"
  }, {
    path: "/elements/categories",
    component: _296b4d79,
    name: "elements-categories"
  }, {
    path: "/elements/cta",
    component: _42a04d83,
    name: "elements-cta"
  }, {
    path: "/elements/icon-boxes",
    component: _68f2d042,
    name: "elements-icon-boxes"
  }, {
    path: "/elements/portfolio",
    component: _39d4247b,
    name: "elements-portfolio"
  }, {
    path: "/elements/products",
    component: _fa963bfe,
    name: "elements-products"
  }, {
    path: "/elements/tabs",
    component: _0fa7719b,
    name: "elements-tabs"
  }, {
    path: "/elements/testimonials",
    component: _34a54dd1,
    name: "elements-testimonials"
  }, {
    path: "/elements/titles",
    component: _c2627910,
    name: "elements-titles"
  }, {
    path: "/elements/typography",
    component: _f3a289e8,
    name: "elements-typography"
  }, {
    path: "/elements/video-banners",
    component: _76872ea8,
    name: "elements-video-banners"
  }, {
    path: "/pages/404",
    component: _648b3b72,
    name: "pages-404"
  }, {
    path: "/pages/about",
    component: _72a802c7,
    name: "pages-about"
  }, {
    path: "/pages/about-2",
    component: _631f5e2c,
    name: "pages-about-2"
  }, {
    path: "/pages/coming-soon",
    component: _56fbdd81,
    name: "pages-coming-soon"
  }, {
    path: "/pages/contact",
    component: _6b2f415a,
    name: "pages-contact"
  }, {
    path: "/pages/contact-2",
    component: _56d143ff,
    name: "pages-contact-2"
  }, {
    path: "/pages/faq",
    component: _107bde50,
    name: "pages-faq"
  }, {
    path: "/pages/login",
    component: _5c0780a3,
    name: "pages-login"
  }, {
    path: "/shop/cart",
    component: _046b0b9e,
    name: "shop-cart"
  }, {
    path: "/shop/checkout",
    component: _c83e1078,
    name: "shop-checkout"
  }, {
    path: "/shop/dashboard",
    component: _29e08506,
    name: "shop-dashboard"
  }, {
    path: "/shop/market",
    component: _bb89558c,
    name: "shop-market"
  }, {
    path: "/shop/wishlist",
    component: _331308c3,
    name: "shop-wishlist"
  }, {
    path: "/blog/mask/grid",
    component: _20db9827,
    name: "blog-mask-grid"
  }, {
    path: "/blog/mask/masonry",
    component: _6b20a874,
    name: "blog-mask-masonry"
  }, {
    path: "/shop/account/address",
    component: _758573f8,
    name: "shop-account-address"
  }, {
    path: "/shop/account/detail",
    component: _158019f1,
    name: "shop-account-detail"
  }, {
    path: "/shop/account/orders",
    component: _fd340af6,
    name: "shop-account-orders"
  }, {
    path: "/shop/category/boxed",
    component: _668bb3d7,
    name: "shop-category-boxed"
  }, {
    path: "/shop/category/fullwidth",
    component: _39b5a878,
    name: "shop-category-fullwidth"
  }, {
    path: "/blog/single/default/:slug?",
    component: _4d456b87,
    name: "blog-single-default-slug"
  }, {
    path: "/blog/single/fullwidth/:slug?",
    component: _461a0d9d,
    name: "blog-single-fullwidth-slug"
  }, {
    path: "/blog/single/sidebar/:slug?",
    component: _2f1c3ae2,
    name: "blog-single-sidebar-slug"
  }, {
    path: "/blog/grid/:type?",
    component: _8b6c443c,
    name: "blog-grid-type"
  }, {
    path: "/blog/masonry/:type?",
    component: _0830e526,
    name: "blog-masonry-type"
  }, {
    path: "/product/centered/:slug?",
    component: _70bd0bda,
    name: "product-centered-slug"
  }, {
    path: "/product/default/:slug?",
    component: _41988921,
    name: "product-default-slug"
  }, {
    path: "/product/extended/:slug?",
    component: _3ca401c2,
    name: "product-extended-slug"
  }, {
    path: "/product/fullwidth/:slug?",
    component: _721c2cb7,
    name: "product-fullwidth-slug"
  }, {
    path: "/product/gallery/:slug?",
    component: _a9286e1c,
    name: "product-gallery-slug"
  }, {
    path: "/product/masonry/:slug?",
    component: _0c9b7c25,
    name: "product-masonry-slug"
  }, {
    path: "/product/sidebar/:slug?",
    component: _236f587c,
    name: "product-sidebar-slug"
  }, {
    path: "/product/sticky/:slug?",
    component: _5ec93ee2,
    name: "product-sticky-slug"
  }, {
    path: "/shop/nosidebar/:type?",
    component: _588ba5f7,
    name: "shop-nosidebar-type"
  }, {
    path: "/shop/sidebar/:type?",
    component: _0a366818,
    name: "shop-sidebar-type"
  }, {
    path: "/product/:slug?",
    component: _4666af22,
    name: "product-slug"
  }, {
    path: "/redirect/*",
    component: _52d03e37,
    name: "redirect-all"
  }, {
    path: "/",
    component: _f8b8d852,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
