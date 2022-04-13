<template>
<!-- eslint-disable max-len -->
  <li class="cart__item product">
  <div class="product__pic">
    <img :src="item.product.image" width="120" height="120" srcset="img/pic-square-2@2x.jpg 2x" alt="Название товара">
  </div>
  <h3 class="product__title">
    {{ item.product.title }}
  </h3>
  <!-- <p class="product__info product__info--color">
    Цвет:
    <span>
      <i :style="{backgroundColor: color.code}"></i>
      {{ color.title }}
    </span>
  </p> -->
  <span class="product__code">
    Артикул: {{ item.product.id }}
  </span>

  <div class="product__counter form__counter">
    <button type="button" aria-label="Убрать один товар" @click.prevent="updateAmount()">
      <svg width="10" height="10" fill="currentColor">
        <use xlink:href="#icon-minus"></use>
      </svg>
    </button>

    <input type="text" v-model.number="amount" name="count" disabled>

    <button type="button" aria-label="Добавить один товар" @click.prevent="amount++">
      <svg width="10" height="10" fill="currentColor">
        <use xlink:href="#icon-plus"></use>
      </svg>
    </button>
  </div>

  <b class="product__price">
    {{ item.product.price * item.amount | numberFormat }} ₽
  </b>

  <button class="product__del button-del" type="button" aria-label="Удалить товар из корзины" @click.prevent="deleteCart(item.productId)">
    <svg width="20" height="20" fill="currentColor">
      <use xlink:href="#icon-close"></use>
    </svg>
  </button>
</li>
<!-- eslint-enable max-len -->
</template>

<script>
import numberFormat from '@/helpers/numberFormat';
import colors from '@/data/colors';
import { mapActions } from 'vuex';

export default {
  props: ['item'],

  filters: {
    numberFormat,
  },

  methods: {
    ...mapActions({ updateCartAmount: 'updateCartProductAmount', deleteCart: 'deleteCartProduct' }),

    updateAmount() {
      if (this.amount > 0) {
        this.amount -= 1;
      }
    },
  },

  computed: {
    color() {
      return colors.find((color) => color.id === this.item.colorId);
    },

    amount: {
      get() {
        return this.item.amount;
      },

      set(value) {
        this.updateCartAmount({ productId: this.item.productId, amount: value });
      },
    },
  },
};
</script>
