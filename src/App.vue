<template>
  <component :is="currentPageComponent" :params="currentPageParams"/>
</template>

<script>
import MainPage from '@/pages/MainPage.vue';
import ProductPage from '@/pages/ProductPage.vue';
import UndefinedPage from '@/pages/UndefinedPage.vue';
import eventBus from '@/eventBus';

const routes = {
  main: 'MainPage',
  product: 'ProductPage',
};

export default {
  name: 'App',
  data() {
    return {
      currentPage: 'main',
      currentPageParams: {},
    };
  },
  components: { MainPage, ProductPage, UndefinedPage },

  computed: {
    currentPageComponent() {
      return routes[this.currentPage] || 'UndefinedPage';
    },
  },

  methods: {
    gotoPage(page, params) {
      this.currentPage = page;
      this.currentPageParams = params || {};
    },
  },

  created() {
    eventBus.$on('gotoPage', (page, params) => this.gotoPage(page, params));
  },
};
</script>
