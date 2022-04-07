<template>
<!-- eslint-disable max-len -->
  <li class="catalog__item">
    <router-link class="catalog__pic" :to="{name: 'product', params: {id: product.id}}">
      <img :src="product.image" srcset="img/radio@2x.jpg 2x" :alt="product.title">
    </router-link>

    <h3 class="catalog__title">
      <router-link :to="{name: 'product', params: {id: product.id}}">
        {{ product.title }}
      </router-link>
    </h3>

    <span class="catalog__price">
      {{ product.price | numberFormat }} ₽
    </span>

    <ul class="colors colors--black">
      <li class="colors__item" v-for="colorId in product.colorId" :key="String(product.id) + String(colorId)">
        <label class="colors__label" required>
          <input class="colors__radio sr-only" type="radio" name="color-1" :value="colorId" checked="">
          <span class="colors__value" :style="{backgroundColor: getColor(colorId)}">
          </span>
        </label>
      </li>
    </ul>
  </li>
<!-- eslint-enable max-len -->
</template>

<script>
import colors from '@/data/colors';
import numberFormat from '@/helpers/numberFormat';

export default {
  name: 'ProductItem',
  props: ['product'],

  methods: {
    getColor(id) {
      return colors[id - 1].color;
    },
  },

  filters: {
    numberFormat,
  },
};
</script>
