<template>
    <ul class="menu-vertical sf-arrows">
        <li v-for="(item,index) in dataCategories" v-bind:key="item.id"
            v-on:mouseover="getCategoryChild(index,item,item.id)"
            class="item-lead"
            :class="{active: $route.query.category == item.alias}">
            <nuxt-link :class="{'sf-with-ul': item.hasChild }" :to="'/shop?category='+item.alias">{{ item.name }}</nuxt-link>
            <categories-menu v-if="item.child && item.child.length > 0" :data-categories="item.child" />
        </li>
    </ul>
</template>
<script>
import Repository, { baseUrl } from '~/repositories/repository.js';
export default {
    name: 'CategoriesMenu',
    props: {
        dataCategories: Array,
        default: []
    },
    methods: {
        getCategoryChild(index,item,idParent){
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