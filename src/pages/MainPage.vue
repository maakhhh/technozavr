<template>
<!-- eslint-disable max-len -->
  <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">
        Каталог
      </h1>
      <span class="content__info">
        152 товара
      </span>
    </div>

    <div class="content__catalog">

      <ProductFilter :color-id.sync="colorId" :price-to.sync="priceTo" :price-from.sync="priceFrom" :category-id.sync="categoryId" />

      <section class="catalog">
        <BaseLoader class="aligner" v-if="productsLoad" />
        <transition name="size">
          <ErrorNotify class="aligner" v-if="productsError" :message="errorMessage" />
        </transition>

        <ProductList :products="products" />

        <BasePagination v-model="page" :count="productsCount" :per-page="productsPerPage" />
      </section>
    </div>
  </main>
<!-- eslint-enable max-len -->
</template>

<script>
import ProductList from '@/components/ProductList.vue';
import BasePagination from '@/components/BasePagination.vue';
import ProductFilter from '@/components/ProductFilter.vue';
import BaseLoader from '@/components/BaseLoader.vue';
import ErrorNotify from '@/components/ErrorNotify.vue';
import axios from 'axios';
import API_BASE_URL from '@/config';

export default {
  name: 'App',
  components: {
    ProductList,
    BasePagination,
    ProductFilter,
    BaseLoader,
    ErrorNotify,
  },
  data() {
    return {
      page: 1,
      productsPerPage: 6,
      categoryId: 0,
      priceFrom: 0,
      priceTo: 0,
      colorId: 0,

      productsLoad: false,
      productsError: false,
      errorMessage: '',

      productsData: null,
    };
  },
  computed: {
    products() {
      return this.productsData
        ? this.productsData.items.map((product) => ({
          ...product,
          image: product.image.file.url,
        }))
        : [];
    },

    productsCount() {
      return this.productsData ? this.productsData.pagination.total : 0;
    },
  },

  methods: {
    loadProducts() {
      this.productsData = null;
      this.productsLoad = true;
      clearTimeout(this.loadTimer);
      this.loadTimer = setTimeout(() => {
        axios
          .get(`${API_BASE_URL}api/products`, {
            params: {
              page: this.page,
              limit: this.productsPerPage,
              colorId: this.colorId,
              categoryId: this.categoryId,
              minPrice: this.priceFrom,
              maxPrice: this.priceTo,
            },
          })
          .then((response) => { this.productsData = response.data; this.productsError = false; })
          .catch((error) => {
            this.errorMessage = error.response.data.error.message;
            this.productsError = true;
          })
          .then(() => { this.productsLoad = false; });
      }, 0);
    },
  },

  watch: {
    page() {
      this.loadProducts();
    },

    categoryId() {
      this.loadProducts();
    },

    colorId() {
      this.loadProducts();
    },

    priceFrom() {
      this.loadProducts();
    },

    priceTo() {
      this.loadProducts();
    },
  },

  created() {
    this.loadProducts();
  },
};
</script>

<style >
  .aligner {
    margin: auto;
  }

  .size-enter-active, .size-leave-active {
    transition: transform .5s;
  }
  .size-enter, .size-leave-to {
    transform: scale(0);
  }
</style>
