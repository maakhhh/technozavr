<template>
<!-- eslint-disable max-len -->
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="index.html">
            Каталог
          </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="cart.html">
            Корзина
          </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Оформление заказа
          </a>
        </li>
      </ul>

      <h1 class="content__title">
        Корзина
      </h1>
      <span class="content__info">
        3 товара
      </span>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST" @submit.prevent="createOrder()">
        <div class="cart__field">
          <div class="cart__data">
            <BaseFormText v-model="formData.name" title="ФИО" placeholder="Введите ваше полное имя" :error="formError.name" type="text"/>
            <BaseFormText v-model="formData.address" title="Адрес доставки" placeholder="Введите ваш адрес" :error="formError.address" type="text"/>
            <BaseFormText v-model="formData.phone" title="Телефон" placeholder="Введите ваш телефон" :error="formError.phone" type="tel"/>
            <BaseFormText v-model="formData.email" title="Email" placeholder="Введите ваш Email" :error="formError.email" type="email"/>
            <BaseFormTextarea v-model="formData.comment" title="Комментарий к заказу" placeholder="Ваши пожелания" :error="formError.comment"/>
          </div>
        </div>

        <div class="cart__block">
          <OrderProducts :products="products" />
          <div class="cart__total">
            <p>Итого: <b>{{ productCount }}</b> на сумму <b>{{ totalPrice | numberFormat }} ₽</b></p>
          </div>
          <BaseLoader class="added-loader" v-if="formLoading"/>
          <button v-else class="cart__button button button--primery" type="submit">
            Оформить заказ
          </button>
        </div>
        <div class="cart__error form__error-block" v-if="formErrorMessage">
          <h4>Заявка не отправлена!</h4>
          <p>
            {{ formErrorMessage }}
          </p>
        </div>
      </form>
    </section>
  </main>
<!-- eslint-enable max-len -->
</template>

<script>
import BaseFormText from '@/components/BaseFormText.vue';
import BaseFormTextarea from '@/components/BaseFormTextarea.vue';
import OrderProducts from '@/components/OrderProducts.vue';
import numberFormat from '@/helpers/numberFormat';
import API_BASE_URL from '@/config';
import axios from 'axios';
import { mapMutations } from 'vuex';
import BaseLoader from '@/components/BaseLoader.vue';

export default {
  data() {
    return {
      formData: {},
      formError: {},
      formErrorMessage: '',
      formLoading: false,
    };
  },

  filters: {
    numberFormat,
  },

  computed: {
    products() {
      return this.$store.state.cartProductsData.map((product) => ({
        key: product.id,
        id: product.product.id,
        title: product.product.title,
        price: product.product.price * product.quantity,
      }));
    },

    totalPrice() {
      return this.$store.state.cartProductsData.reduce(
        (summ, product) => summ + product.product.price * product.quantity, 0,
      );
    },

    productCount() {
      const count = String(this.$store.state.cartProductsData.length);
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

  methods: {
    ...mapMutations(['resetCart', 'updateOrderInfo']),
    createOrder() {
      this.formError = {};
      this.formErrorMessage = '';
      this.formLoading = true;

      return axios
        .post(`${API_BASE_URL}api/orders`, {
          ...this.formData,
        }, {
          params: {
            userAccessKey: this.$store.state.userAccessKey,
          },
        })
        .then((response) => {
          this.resetCart();
          this.updateOrderInfo(response.data);
          this.$router.push({ name: 'order-info', params: { id: response.data.id } });
        })
        .catch((error) => {
          this.formError = error.response.data.error.request || {};
          this.formErrorMessage = error.response.data.error.message;
        })
        .finally(() => { this.formLoading = false; });
    },
  },

  components: {
    BaseFormText,
    BaseFormTextarea,
    OrderProducts,
    BaseLoader,
  },
};
</script>

<style scoped>
  .added-loader {
    border: 6px solid #f3f3f3;
    border-top: 6px solid #9eff00;

    margin: auto;
    margin-top: 30px;
    margin-bottom: 18px;
    width: 40px;
    height: 40px;
  }
</style>
