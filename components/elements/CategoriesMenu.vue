<template>
    <ul class="menu-vertical sf-arrows" v-if="isPosition == 'header'">
        <li v-for="(item,index) in dataCategories" v-bind:key="item.id"
            v-on:mouseover="getCategoryChild(index,item,item.id)"
            class="item-lead"
            :class="{active: $route.query.category == item.alias}">
            <nuxt-link :class="{'sf-with-ul': item.hasChild }" :to="'/shop?category='+item.alias">{{ item.name }}</nuxt-link>
            <categories-menu v-if="item.child && item.child.length > 0" :data-categories="item.child" />
        </li>
    </ul>
    <ul v-else-if="isPosition == 'mobile'" class="mobile-cats-menu" >
        <li class="item-cats-lead" v-for="(item,index) in dataCategories" v-bind:key="item.id">
            <div style="position: relative;" class="sf-with-ul">
                <nuxt-link :to="'/shop?category='+item.alias">
                    {{ item.name }}
                </nuxt-link>
                <span v-if="item.hasChild" class="mmenu-btn" @click.prevent="getCategoryChild(index,item,item.id)"></span>
            </div>
            <categories-menu v-if="item.child && item.child.length > 0" :data-categories="item.child" is-position="mobile"/>
            <ul v-else></ul>
        </li>
    </ul>
    <div v-else-if="isPosition == 'shop'" class="filter-items filter-items-count" >
        <div class="filter-item pr-0" v-for="(item, index) in dataCategories" :key="index">
                <div class="item-cats d-flex justify-content-between align-items-center" style="position: relative;">
                    <nuxt-link :to="{path: $route.path, query: {category: item.alias}}" :class="{active: categorySelected(item)}">
                        {{ item.name }}
                    </nuxt-link>
                    <span style="color:#000;" v-if="item.hasChild" class="mmenu-btn"  @click.prevent="getCategoryChild(index,item,item.id)"></span>
                </div>
                <vue-slide-toggle :open="toggleStates[item.id]" class="show" :duration="200">
                    <categories-menu style="margin-left: 10px;" v-if="item.child && item.child.length > 0" :data-categories="item.child" is-position="shop"/>
                </vue-slide-toggle>
        </div>
    </div>
</template>
<script>
import Repository, { baseUrl } from '~/repositories/repository.js';
import { VueSlideToggle } from 'vue-slide-toggle';
export default {
    name: 'CategoriesMenu',
    components: {
        VueSlideToggle
    },
    props: {
        dataCategories: {
            type: Array,
            default: [],
        },
        isPosition:{
            type: String,
            default:'header',
        },
    },
    data: function() {
        return {
            toggleStates: {},
        };
    },
    methods: {
        toggleSlide: function(index) {
            if (!this.toggleStates.hasOwnProperty(index)) {
                this.$set(this.toggleStates,index,false);
            }
            this.toggleStates[index] = !this.toggleStates[index];
        },
        categorySelected: function(item) {
            return (
                this.$route.query.category &&
                this.$route.query.category == item.slug
            );
        },
        getCategoryChild(index,item,idParent){
            if (this.isPosition == 'shop') {
                this.toggleSlide(idParent);
            }
            if (item.hasOwnProperty('child')) {
                return false;
            }
            Repository.get(
                `${baseUrl}/categories/${idParent}`,
            )
            .then(response => {
                let child = response.data;
                if (child.length) {
                    this.dataCategories[index].child = child;
                }else{
                    this.dataCategories[index].child = [];
                }
                this.$forceUpdate();
            })
            .catch(error => ({ error: JSON.stringify(error) }));
        },
    }
};
</script>