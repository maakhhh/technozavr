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
        <ProductList :products="products" />

        <BasePagination v-model="page" :count="productsCount" :per-page="productsPerPage" />
      </section>
    </div>
  </main>
<!-- eslint-enable max-len -->
</template>

<script>
import products from '@/data/products';
import ProductList from '@/components/ProductList.vue';
import BasePagination from '@/components/BasePagination.vue';
import ProductFilter from '@/components/ProductFilter.vue';

export default {
  name: 'App',
  components: { ProductList, BasePagination, ProductFilter },
  data() {
    return {
      page: 1,
      productsPerPage: 3,
      categoryId: 0,
      priceFrom: 0,
      priceTo: 0,
      colorId: 0,
    };
  },
  computed: {
    filteredProducts() {
      let filterProducts = products;

      if (this.priceFrom > 0) {
        filterProducts = filterProducts.filter((product) => product.price > this.priceFrom);
      }

      if (this.priceTo > 0) {
        filterProducts = filterProducts.filter((product) => product.price < this.priceTo);
      }

      if (this.categoryId !== 0) {
        filterProducts = filterProducts.filter((product) => product.categoryId === this.categoryId);
      }

      if (this.colorId !== 0) {
        filterProducts = filterProducts.filter((product) => product.colorId.includes(this.colorId));
      }

      return filterProducts;
    },

    products() {
      const offset = (this.page - 1) * this.productsPerPage;

      return this.filteredProducts.slice(offset, offset + this.productsPerPage);
    },

    productsCount() {
      return this.filteredProducts.length;
    },
  },
};
</script>
