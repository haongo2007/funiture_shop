<template>
    <div >
        <ul class="menu-vertical sf-arrows">
            <li v-for="(item,index) in dataCategories" :key="item.id"
                v-on:mouseover="getCategoryChild(item.id)"
                class="item-lead"
                :class="{active: $route.query.category == item.alias}">
                <nuxt-link :to="'/store?category='+item.alias">{{ item.descriptions_with_lang_default.title }}</nuxt-link>
                <categories-menu v-if="hasSubCategory" :data-categories="Catechild" />
            </li>
        </ul>
    </div>
</template>
<script>
import Repository, { baseUrl } from '~/repositories/repository.js';
export default {
    name: 'CategoriesMenu',
    props: {
        dataCategories: Array,
        default: []
    },
    data() {
        return {
            Catechild:[],
            hasSubCategory:false,
        };
    },
    computed: {
    },
    methods: {
        getCategoryChild(idParent){
            Repository.get(
                `${baseUrl}/categories/${idParent}`,
            )
            .then(response => {
                let child = response.data.data;
                if (child.length) {
                    this.hasSubCategory = true;
                    this.Catechild = child;
                }
            })
            .catch(error => ({ error: JSON.stringify(error) }));
        },
    }
};
</script>