<template>
<!-- eslint-disable max-len -->
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name: 'main'}">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Корзина
          </a>
        </li>
      </ul>

      <h1 class="content__title">
        Корзина
      </h1>
      <span class="content__info">
        {{ countCarts }}
      </span>
    </div>

    <BaseLoader class="aligner" v-if="$store.state.productsLoading" />

    <section class="cart" v-else>
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <ul class="cart__list">
            <CartItem v-for="item in products" :key="item.product.id" :item="item"/>
          </ul>
        </div>

        <div class="cart__block">
          <p class="cart__desc">
            Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
          </p>
          <p class="cart__price">
            Итого: <span>{{ price | numberFormat }} ₽</span>
          </p>

          <button class="cart__button button button--primery" type="submit">
            Оформить заказ
          </button>
        </div>
      </form>
    </section>
  </main>
<!-- eslint-enable max-len -->
</template>

<script>
import { mapGetters } from 'vuex';
import numberFormat from '@/helpers/numberFormat';
import CartItem from '@/components/CartItem.vue';
import BaseLoader from '@/components/BaseLoader.vue';

export default {
  computed: {
    ...mapGetters({ products: 'getDetailProducts' }),

    price() {
      return this.products.reduce((count, product) => (
        count + (product.product.price * product.amount)),
      0);
    },

    countCarts() {
      const count = String(this.products.length);

      const lastone = count.split('').pop();

      if (+lastone === 1) {
        return `${count} товар`;
      }
      if (+lastone < 5) {
        return `${count} товара`;
      }
      return `${count} товаров`;
    },
  },

  components: {
    CartItem,
    BaseLoader,
  },

  filters: {
    numberFormat,
  },
};
</script>
