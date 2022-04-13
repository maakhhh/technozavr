<template>
  <ul class="cart__orders">
    <li class="cart__order" v-for="product in products" :key="product.key">
      <h3>{{ product.title }}</h3>
      <b>{{ product.price | numberFormat }} ₽</b>
      <span>Артикул: {{ product.id }}</span>
    </li>
  </ul>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';

export default {
  props: ['products'],
  filters: {
    numberFormat,
  },
};
</script>
