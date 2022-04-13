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
          <router-link class="breadcrumbs__link" :to="{name: 'cart'}">
            Корзина
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Оформление заказа
          </a>
        </li>
      </ul>

      <h1 class="content__title">
        Заказ оформлен <span>№ {{ orderId }}</span>
      </h1>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <p class="cart__message">
            Благодарим за&nbsp;выбор нашего магазина. На&nbsp;Вашу почту придет письмо с&nbsp;деталями заказа.
            Наши менеджеры свяжутся с&nbsp;Вами в&nbsp;течение часа для уточнения деталей доставки.
          </p>

          <ul class="dictionary">
            <li class="dictionary__item">
              <span class="dictionary__key">
                Получатель
              </span>
              <span class="dictionary__value">
                {{ order.name }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Адрес доставки
              </span>
              <span class="dictionary__value">
                {{ order.address }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Телефон
              </span>
              <span class="dictionary__value">
                {{ order.phone }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Email
              </span>
              <span class="dictionary__value">
                {{ order.email }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Способ оплаты
              </span>
              <span class="dictionary__value">
                картой при получении
              </span>
            </li>
          </ul>
        </div>

        <div class="cart__block">
          <OrderProducts :products="products" />

          <div class="cart__total">
            <p>Итого: <b>{{ productCount }}</b> на сумму <b>{{ order.totalPrice | numberFormat }} ₽</b></p>
          </div>
        </div>
      </form>
    </section>
  </main>
<!-- eslint-enable max-len -->
</template>

<script>
import { mapActions } from 'vuex';
import OrderProducts from '@/components/OrderProducts.vue';
import numberFormat from '@/helpers/numberFormat';

export default {
  computed: {
    orderId() {
      return this.$route.params.id;
    },

    order() {
      return this.$store.state.orderInfo;
    },

    products() {
      return this.order.basket.items.map((product) => ({
        key: product.id,
        id: product.product.id,
        title: product.product.title,
        price: product.product.price * product.quantity,
      }));
    },

    productCount() {
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

  filters: {
    numberFormat,
  },

  components: { OrderProducts },

  methods: {
    ...mapActions(['loadOrderInfo']),
  },

  created() {
    if (this.$store.state.orderInfo && this.$store.state.orderInfo.id === this.orderId) {
      return;
    }

    this.loadOrderInfo(this.orderId);
  },
};
</script>
