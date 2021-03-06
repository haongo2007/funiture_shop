import Repository, { baseUrl } from './repositories/repository.js';

const buildRoutes = async () => {
    const [r1] = await Promise.all([
        Repository.get(`${baseUrl}/product`).then(res => {
            return res.data.map(product => {
                return {
                    route: `/product/${product.alias}`,
                    payload: product,
                };
            });
        }),
    ]);

    return [...r1];
};
export default {
    head: {
        titleTemplate(titleChunk) {
            return titleChunk ? titleChunk : this.$store.getters['core/titleStore']
        },
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1'
            },
            {
                name: 'msapplication-TileColor',
                content: '#cc9966'
            },
            {
                name: 'msapplication-config',
                content: '/images/icons/browserconfig.xml'
            }
        ],
        link: [
            {
                rel: 'dns-prefetch',
                href: "//fonts.googleapis.com"
            },
            {
                rel: 'icon',
                type: 'image/png',
                sizes: '32x32',
                href:
                    './images/icons/favicon-32x32.png'
            },
            {
                rel: 'icon',
                type: 'image/png',
                sizes: '16x16',
                href:
                    './images/icons/favicon-16x16.png'
            },
            {
                rel: 'shortcut icon',
                href:
                    './images/icons/favicon.ico'
            },
            {
                rel: 'apple-touch-icon',
                sizes: '180x180',
                href:
                    './images/icons/apple-touch-icon.png'
            },
            {
                rel: 'manifest',
                href:
                    './images/icons/site.webmanifest'
            },
            {
                rel: 'mask-icon',
                color: '#666666',
                href:
                    './images/icons/safari-pinned-tab.svg'
            },
            {
                rel: 'stylesheet',
                href:
                    'https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700%7CPoppins:300,400,500,600,700',
                defer: true
            }
        ],
    },
    css: [
        '~/static/vendor/line-awesome/css/line-awesome.min.css',
        'swiper/dist/css/swiper.css',
        '~/static/css/fonts-molla.min.css',
        '~/static/css/bootstrap.min.css',
        '~/assets/scss/style.scss',
    ],
    mode:'universal',
    plugins: [
        { src: '~/plugins/swiper.js', ssr: false },
        { src: '~/plugins/localStorage.js', ssr: false },
        { src: '~/plugins/modal.js', ssr: false },
        { src: '~/plugins/axios.js', ssr: false },
        { src: '~/plugins/lazyLoad.js', ssr: false },
        { src: '~/plugins/toastify.js', ssr: false },
        { src: '~/plugins/nouislider.js', ssr: false },
        { src: '~/plugins/debounce.js', ssr: false },
        { src: '~/plugins/validate.js', ssr: false },
        { src: '~/plugins/sticky.js', ssr: false },
        { src: '~/plugins/i18n.js', ssr: false }
    ],
    modules: [ '@nuxtjs/axios' ],
    axios: {
        proxy: true,
    },

    router: {
        mode: 'hash',
        base: '/',
        linkActiveClass: 'link-active',
        linkExactActiveClass: 'active',
    },
    buildDir: '.nuxt',

    build: {
        // publicPath: '.nuxt/dist/'
    },

    generate: {
        routes: buildRoutes,
        subFolders: false,
        fallback: false
    },

    ssr: true,

    server: {
        port: 3000,
        host: 'localhost'
    },
    env: {
        apiSecret: process.env.API_SECRET,
    }
};
