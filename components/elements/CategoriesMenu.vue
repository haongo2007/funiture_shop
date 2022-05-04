<template>
    <ul class="menu-vertical sf-arrows">
        <li v-for="(item,index) in categories" v-bind:key="item.id"
            v-on:mouseover="getCategoryChild(index,item.id)"
            class="item-lead"
            :class="{active: $route.query.category == item.alias}">
            <nuxt-link :to="'/store?category='+item.alias">{{ item.descriptions_with_lang_default.title }}</nuxt-link>
            <categories-menu v-if="item.child && item.child.length > 0" :data-categories="item.child" />
        </li>
    </ul>
</template>
<script>
import { mapGetters } from 'vuex';
import Repository, { baseUrl } from '~/repositories/repository.js';
export default {
    name: 'CategoriesMenu',
    props: {
        dataCategories: Array,
        default: []
    },
    computed:{
        ...mapGetters('store', ['getCategories']),
        categories(){
            if (this.dataCategories) {
                return this.dataCategories;
            }else{
                return this.getCategories;
            }
        },
    },
    methods: {
        getCategoryChild(index,idParent){
            Repository.get(
                `${baseUrl}/categories/${idParent}`,
            )
            .then(response => {
                let child = response.data.data;
                if (child.length) {
                    this.categories[index].child = child;
                }
            })
            .catch(error => ({ error: JSON.stringify(error) }));
        },
    }
};
</script>