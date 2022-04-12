<template>
<!-- eslint-disable max-len -->
  <router-link class="header__cart corsina" aria-label="Корзина с товарами" :to="{name: 'cart'}">
    <svg width="30" height="21" fill="currentColor">
      <use xlink:href="#icon-cart"></use>
    </svg>
    <BaseLoader class="header_count loader" v-if="$store.state.productsLoading" />
    <span v-else class="header__count" aria-label="Количество товаров">{{ $store.state.cartProducts.length }}</span>
  </router-link>
<!-- eslint-enable max-len -->
</template>

<script>
import BaseLoader from '@/components/BaseLoader.vue';

export default {
  components: {
    BaseLoader,
  },
};
</script>

<style scoped>
  .corsina {
    position: relative;
  }

  .loader {
    position: absolute;
    top: -2px;
    right: 2px;

    border: 3px solid #f3f3f3;
    border-top: 3px solid #9eff00;

    margin: 0;
    width: 12px;
    height: 12px;
  }
</style>
