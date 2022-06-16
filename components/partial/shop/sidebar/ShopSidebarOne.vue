<template>
    <div class="sidebar-shop" :class="isSidebar ? 'sidebar-filter' : 'sidebar'">
        <div :class="{'sidebar-filter-wrapper' : isSidebar}">
            <div class="widget widget-clean">
                <label>Filters:</label>
                <a href="#" class="sidebar-filter-clear" @click.prevent="cleanAll">Clean All</a>
            </div>

            <div class="widget widget-collapsible">
                <h3 class="widget-title mb-2">
                    <a
                        href="#widget-1"
                        :class="{collapsed: !toggleStates[0]}"
                        @click.prevent="toggleSlide(0)"
                    >Category</a>
                </h3>

                <vue-slide-toggle :open="toggleStates[0]" class="show" :duration="200">
                    <div class="widget-body pt-0">
                        <categories-menu :data-categories="getCategories" is-position="shop"/>
                    </div>
                </vue-slide-toggle>
            </div>

            <!-- <div class="widget widget-collapsible">
                <h3 class="widget-title mb-2">
                    <a
                        href="#widget-2"
                        :class="{collapsed: !toggleStates[1]}"
                        @click.prevent="toggleSlide(1)"
                    >Size</a>
                </h3>

                <vue-slide-toggle :open="toggleStates[1]" class="show" :duration="200">
                    <div class="widget-body pt-0">
                        <div class="filter-items">
                            <div
                                class="filter-item"
                                v-for="(item, index) in filterData.sizes"
                                :key="index"
                            >
                                <div class="custom-control custom-checkbox">
                                    <input
                                        type="checkbox"
                                        class="custom-control-input"
                                        :id="'size-' + index"
                                        @click="setSizeFilter(item)"
                                        :checked="sizeChecked(item)"
                                    />
                                    <label
                                        class="custom-control-label"
                                        :for="'size-' + index"
                                    >{{ item.slug }}</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </vue-slide-toggle>
            </div>

            <div class="widget widget-collapsible">
                <h3 class="widget-title mb-2">
                    <a
                        href="#widget-3"
                        :class="{collapsed: !toggleStates[2]}"
                        @click.prevent="toggleSlide(2)"
                    >Colour</a>
                </h3>

                <vue-slide-toggle :open="toggleStates[2]" class="show" :duration="200">
                    <div class="widget-body pt-0">
                        <div class="filter-colors">
                            <nuxt-link
                                :to="getColorUrl(item)"
                                :style="{'background-color': item.color}"
                                v-for="(item, index) in filterData.colors"
                                :key="index"
                                :class="{selected: colorSelected(item)}"
                            >
                                <span class="sr-only">{{ item.color_name }}</span>
                            </nuxt-link>
                        </div>
                    </div>
                </vue-slide-toggle>
            </div> -->

            <div class="widget widget-collapsible" v-for="(item,index) in getAttributes" :key="index">
                <h3 class="widget-title mb-2">
                    <a
                        href="#widget-3"
                        :class="{collapsed: !toggleStates[index + 1]}"
                        @click.prevent="toggleSlide(index + 1)"
                    >{{ item.name }}</a>
                </h3>

                <vue-slide-toggle :open="toggleStates[index + 1]" class="show" :duration="200">
                    <div class="widget-body pt-0" v-if="item.type == 'radio'">
                        <div class="filter-colors">
                            <nuxt-link
                                v-for="(child, key) in item.attribute_details"
                                v-if="child.active_palette"
                                :to="getColorUrl(child)"
                                :style="{'background-color': child.active_palette.hex}"
                                :key="key"
                                :class="{selected: colorSelected(child)}"
                            >
                                <span class="sr-only">{{ child.name }}</span>
                            </nuxt-link>
                        </div>
                    </div>
                    <div class="widget-body pt-0" v-else-if="item.type == 'select'">
                        <div class="filter-items d-flex flex-wrap">
                            <div
                                style="width: 33%;"
                                class="filter-item"
                                v-for="(child, key) in item.attribute_details"
                                :key="key"
                            >
                                <div class="custom-control custom-checkbox">
                                    <input
                                        type="checkbox"
                                        class="custom-control-input"
                                        :id="item.name.toLowerCase()+'-' + key"
                                        @click="setSizeFilter(child)"
                                        :checked="sizeChecked(child)"
                                    />
                                    <label
                                        class="custom-control-label"
                                        :for="item.name.toLowerCase()+'-' + key"
                                    >{{ child.name }}</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </vue-slide-toggle>
            </div>


            <div class="widget widget-collapsible">
                <h3 class="widget-title mb-2">
                    <a
                        href="#widget-4"
                        :class="{collapsed: !toggleStates[3]}"
                        @click.prevent="toggleSlide(3)"
                    >Brand</a>
                </h3>

                <vue-slide-toggle :open="toggleStates[3]" class="show" :duration="200">
                    <div class="widget-body pt-0">
                        <div class="filter-items">
                            <div
                                class="filter-item"
                                v-for="(item, index) in getBrand"
                                :key="index"
                            >
                                <div class="custom-control custom-checkbox">
                                    <input
                                        type="checkbox"
                                        class="custom-control-input"
                                        :id="'brand-' + index"
                                        @click="setBrandFilter(item)"
                                        :checked="brandChecked(item)"
                                    />
                                    <label
                                        class="custom-control-label"
                                        :for="'brand-' + index"
                                    >{{ item.name }}</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </vue-slide-toggle>
            </div>

            <div class="widget widget-collapsible">
                <h3 class="widget-title mb-2">
                    <a
                        href="#widget-5"
                        :class="{collapsed: !toggleStates[4]}"
                        @click.prevent="toggleSlide(4)"
                    >Price</a>
                </h3>

                <vue-slide-toggle  v-if="getMaximumPrice" :open="toggleStates[4]" class="show" :duration="200">
                    <div class="widget-body pt-0">
                        <div class="filter-price">
                            <div class="filter-price-text d-flex justify-content-between">
                                <span>
                                    Price Range:
                                    <span id="filter-price-range">{{ priceRangeText }}</span>
                                </span>
                            </div>

                            <vue-nouislider
                                :config="priceSliderConfig"
                                :values="priceValues"
                                id="price-slider"
                                v-if="loaded"
                            ></vue-nouislider>
                        </div>
                            
                        <nuxt-link :to="priceFilterRoute" class="pr-2">
                            <a href="javascript:;" class="btn btn-outline-dark btn-rounded">Filter</a>
                        </nuxt-link>
                    </div>
                </vue-slide-toggle>
            </div>
        </div>
    </div>
</template>

<script>
import { VueSlideToggle } from 'vue-slide-toggle';
import { shopData } from '~/utilities/data';
import { mapGetters } from 'vuex';
import CategoriesMenu from '~/components/elements/CategoriesMenu';
import { priceConvert } from '~/utilities/common';

export default {
    components: {
        VueSlideToggle,
        CategoriesMenu
    },
    props: {
        isSidebar: Boolean
    },
    data: function() {
        return {
            loaded: true,
            priceValues: [0,0],
            priceSliderConfig: {
                connect: true,
                step: 50,
                margin: 50,
                range: {
                    min: 0,
                    max: 1000
                }
            },
            toggleStates: [true, true, true, true, true],
            filterData: shopData
        };
    },
    computed: {
        ...mapGetters('core', ['getBrand','getCategories','getMaximumPrice','getAttributes']),
        priceRangeText: function() {
            return (
                this.priceConvert(this.priceValues[0]) + ' - ' +
                this.priceConvert(this.priceValues[1])
            );
        },
        priceFilterRoute: function() {
            let query = {};
            if (this.$route.query.page) {
                for (let key in this.$route.query) {
                    if (key !== 'page') {
                        query[key] = this.$route.query[key];
                    }
                }
            } else {
                query = { ...this.$route.query };
            }

            return {
                path: this.$route.path,
                query: {
                    ...query,
                    minPrice: this.priceValues[0],
                    maxPrice: this.priceValues[1]
                }
            };
        }
    },
    watch: {
      getMaximumPrice: function(newVal) {
        this.priceValues = [0,newVal];
        this.priceSliderConfig.range.max = newVal;     
      },
      getAttributes: function(newVal) {

      },
    },
    created: function() {
        document
                .querySelector('body')
                .classList.remove('sidebar-filter-active');
        if (this.$route.query.minPrice && this.$route.query.maxPrice) {
            this.loaded = false;

            this.priceValues = [
                this.$route.query.minPrice,
                this.$route.query.maxPrice
            ];

            this.$nextTick(function() {
                this.loaded = true;
            });
        } else {
            this.loaded = false;
            this.$nextTick(function() {
                this.loaded = true;
            });

            this.priceValues = [0,this.getMaximumPrice];
            this.priceSliderConfig.range.max = this.getMaximumPrice;   
        }
    },
    methods: {
        priceConvert,
        cleanAll: function() {
            this.loaded = false;
            this.priceValues = [0, 1000];
            this.$nextTick(function() {
                this.orderBy = 'default';
                this.loaded = true;
                this.$router.push(this.$route.path);
            });
        },
        toggleSlide: function(index) {
            this.toggleStates = this.toggleStates.reduce((acc, cur, id) => {
                if (id == index) return [...acc, !cur];
                else return [...acc, cur];
            }, []);
        },
        sizeChecked: function(item) {
            return (
                this.$route.query.size &&
                this.$route.query.size.split(',').includes(item.name)
            );
        },
        brandChecked: function(item) {
            return (
                this.$route.query.brand &&
                this.$route.query.brand.split(',').includes(item.alias)
            );
        },
        colorSelected: function(item) {
            return (
                this.$route.query.color &&
                this.$route.query.color.split(',').includes(item.name)
            );
        },
        setSizeFilter: function(item) {
            let query = {};
            if (this.$route.query.page) {
                for (let key in this.$route.query) {
                    if (key !== 'page') {
                        query[key] = this.$route.query[key];
                    }
                }
            } else {
                query = { ...this.$route.query };
            }

            if (!this.$route.query.size) {
                query = {
                    ...query,
                    size: item.name
                };
            } else if (this.$route.query.size.split(',').includes(item.name)) {
                query = {
                    ...query,
                    size: query.size
                        .split(',')
                        .filter(slug => slug !== item.name)
                        .join(',')
                };
            } else {
                query = {
                    ...query,
                    size: [...query.size.split(','), item.name].join(',')
                };
            }

            this.$router.push({
                path: this.$route.path,
                query: query
            });
        },
        setBrandFilter: function(item) {
            let query = {};
            if (this.$route.query.page) {
                for (let key in this.$route.query) {
                    if (key !== 'page') {
                        query[key] = this.$route.query[key];
                    }
                }
            } else {
                query = { ...this.$route.query };
            }

            if (!this.$route.query.brand) {
                query = {
                    ...query,
                    brand: item.alias
                };
            } else if (this.$route.query.brand.split(',').includes(item.alias)) {
                query = {
                    ...query,
                    brand: query.brand
                        .split(',')
                        .filter(alias => alias !== item.alias)
                        .join(',')
                };
            } else {
                query = {
                    ...query,
                    brand: [...query.brand.split(','), item.alias].join(',')
                };
            }

            this.$router.push({
                path: this.$route.path,
                query: query
            });
        },
        getColorUrl: function(item) {
            let query = {};

            if (!this.$route.query.color) {
                query = {
                    ...this.$route.query,
                    color: item.name
                };
            } else if (
                this.$route.query.color.split(',').includes(item.name)
            ) {
                query = {
                    ...this.$route.query,
                    color: this.$route.query.color
                        .split(',')
                        .filter(slug => slug !== item.name)
                        .join(',')
                };
            } else {
                query = {
                    ...this.$route.query,
                    color: [
                        ...this.$route.query.color.split(','),
                        item.name
                    ].join(',')
                };
            }

            let temp = {};
            if (query.page) {
                for (let key in query) {
                    if (key !== 'page') {
                        temp[key] = query[key];
                    }
                }
            } else {
                temp = { ...query };
            }

            return {
                path: this.$route.path,
                query: temp
            };
        }
    }
};
</script>