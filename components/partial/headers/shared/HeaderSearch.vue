<template>
    <div
        class="header-search header-search-extended header-search-visible header-search-no-radius d-none d-lg-block"
    >
        <a href="#" class="search-toggle" role="button">
            <i class="icon-search"></i>
        </a>
        <form
            action="#"
            method="get"
            @click.stop="showSearchForm"
        >
            <div class="header-search-wrapper search-wrapper-wide">
                <label for="q" class="sr-only">Search</label>
                <input
                    autocomplete="off"
                    type="text"
                    class="form-control"
                    name="q"
                    id="q"
                    placeholder="Search product ..."
                    required
                    v-model="searchTerm"
                    @input="searchProducts"
                />
                <button class="btn btn-primary" type="button" @click="submitSearchForm">
                    <span class="sr-only">Search</span>
                    <i class="icon-search"></i>
                </button>
            </div>

            <div class="live-search-list">
                <div
                    class="autocomplete-suggestions"
                    v-if="suggestions.length > 0"
                >
                    <nuxt-link
                        :to="item.path"
                        class="autocomplete-suggestion"
                        data-index="0"
                        v-for="(item,index) in suggestions"
                        :key="index"
                    >
                        <div class="search-name" v-html="matchEmphasize(item.name)"></div>
                        
                    </nuxt-link>
                </div>
            </div>
        </form>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
import Repository, { baseUrl } from '~/repositories/repository.js';

export default {
    data: function() {
        return {
            searchTerm: '',
            suggestions: [],
            timeouts: [],
            baseUrl: baseUrl
        };
    },
    computed: {
        routes() {
          return this.$router.options.routes;
        } 
    },
    mounted: function() {
        document
            .querySelector('body')
            .addEventListener('click', this.closeSearchForm);

        this.suggestions = [...this.routes].splice(0,12);
    },
    methods: {
        searchProducts: function() {
            if (this.searchTerm.length > 2) {
                var searchTerm = this.searchTerm;
                var data = [];
                this.timeouts.map(timeout => {
                    window.clearTimeout(timeout);
                });
                this.timeouts.push(
                    setTimeout(() => {
                        this.suggestions = this.routes.filter((item) => { return item.name.toLowerCase().includes(searchTerm.toLowerCase()) })
                    }, 1000)
                );
            } else {
                this.timeouts.map(timeout => {
                    window.clearTimeout(timeout);
                    this.suggestions = [];
                });
            }
        },
        matchEmphasize: function(name) {
            var regExp = new RegExp(this.searchTerm, 'i');
            return name.replace(
                regExp,
                match => '<strong>' + match + '</strong>'
            );
        },
        searchToggle: function(e) {
            document.querySelector('.header-search').classList.toggle('show');
            e.stopPropagation();
        },

        showSearchForm: function() {
            document
                .querySelector('.header .header-search')
                .classList.add('show');
        },
        closeSearchForm: function(e) {
            document
                .querySelector('.header .header-search')
                .classList.remove('show');
        },
        submitSearchForm: function () {
            let route = this.suggestions[0].path;
            this.$router.push({
                path: route
            })
        }
        // submitSearchForm: function(e) {
        //     this.closeSearchForm();
        //     this.$router.push({
        //         path: '/shop',
        //         query: {
        //             filter_keyword: this.searchTerm
        //         }
        //     });
        // }
    }
};
</script>