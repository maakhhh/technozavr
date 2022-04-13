<template>
<!-- eslint-disable max-len -->
  <BaseLoader class="aligner" v-if="productLoading"/>
  <ErrorNotify class="aligner" v-else-if="!productData" :message="productLoadingError"/>
  <main class="content container" v-else>
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name: 'main'}">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name: 'main'}">
            {{ category.title }}
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            {{ product.title }}
          </a>
        </li>
      </ul>
    </div>

    <section class="item">
      <div class="item__pics pics">
        <div class="pics__wrapper">
          <img width="570" height="570" :src="product.image" alt="Название товара">
        </div>
        <!-- <ul class="pics__list">
          <li class="pics__item">
            <a href="" class="pics__link pics__link--current">
              <img width="98" height="98" src="img/phone-square-1.jpg" srcset="img/phone-square-1@2x.jpg 2x" alt="Название товара">
            </a>
          </li>
          <li class="pics__item">
            <a href="" class="pics__link">
              <img width="98" height="98" src="img/phone-square-2.jpg" srcset="img/phone-square-2@2x.jpg 2x" alt="Название товара">
            </a>
          </li>
          <li class="pics__item">
            <a href="" class="pics__link">
              <img width="98" height="98" src="img/phone-square-3.jpg" srcset="img/phone-square-3@2x.jpg 2x" alt="Название товара">
            </a>
          </li>
          <li class="pics__item">
            <a class="pics__link" href="#">
              <img width="98" height="98" src="img/phone-square-4.jpg" srcset="img/phone-square-4@2x.jpg 2x" alt="Название товара">
            </a>
          </li>
        </ul> -->
      </div>

      <div class="item__info">
        <span class="item__code">Артикул: {{ product.id }}</span>
        <h2 class="item__title">
          {{ product.title }}
        </h2>
        <div class="item__form">
          <form class="form" @submit.prevent="addProductToCart({ productId: product.id, amount: productAmount }); cartAdded = true;">
            <b class="item__price">
              {{ product.price | numberFormat }} ₽
            </b>

            <div class="item__row">
              <div class="form__counter">
                <button type="button" aria-label="Убрать один товар" @click.prevent="deleteAmount()">
                  <svg width="12" height="12" fill="currentColor">
                    <use xlink:href="#icon-minus"></use>
                  </svg>
                </button>

                <input type="text" v-model.number="productAmount" disabled>

                <button type="button" aria-label="Добавить один товар" @click.prevent="productAmount++">
                  <svg width="12" height="12" fill="currentColor">
                    <use xlink:href="#icon-plus"></use>
                  </svg>
                </button>
              </div>
              <div class="added" v-if="cartAdded">{{ addedText }}</div>
              <BaseLoader class="added-loader" v-if="addedLoading" />
              <button v-else class="button button--primery" type="submit" >
                В корзину
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  </main>
<!-- eslint-enable max-len -->
</template>

<script>
import numberFormat from '@/helpers/numberFormat';
import axios from 'axios';
import API_BASE_URL from '@/config';
import BaseLoader from '@/components/BaseLoader.vue';
import ErrorNotify from '@/components/ErrorNotify.vue';
import { mapActions } from 'vuex';

export default {
  name: 'productPage',
  components: { BaseLoader, ErrorNotify },
  data() {
    return {
      productAmount: 1,

      productData: null,
      productLoading: false,
      productLoadingError: '',
      cartAdded: false,
      addedText: '',
      addedLoading: '',
    };
  },

  computed: {
    product() {
      return this.productData;
    },
    category() {
      return this.product.category;
    },
  },

  filters: {
    numberFormat,
  },

  methods: {
    ...mapActions({ addProduct: 'addToCard' }),

    addProductToCart({ productId, amount }) {
      this.addedLoading = true;
      this.addedText = '';
      this.cartAdded = false;

      this.addProduct({ productId, amount })
        .then(() => { this.addedText = 'Товар добавлен в корзину'; })
        .catch(() => { this.addedText = 'Произошла ошибка'; })
        .finally(() => { this.addedLoading = false; this.cartAdded = true; });
    },

    deleteAmount() {
      if (this.productAmount > 0) {
        this.productAmount -= 1;
      }
    },

    loadProduct() {
      this.productLoading = true;
      this.productLoadingError = false;
      return axios
        .get(`${API_BASE_URL}api/products/${this.$route.params.id}`)
        .then((response) => {
          this.productData = ({
            ...response.data,
            image: response.data.image.file.url,
          });
        })
        .catch((error) => { this.productLoadingError = error.response.data.error.message; })
        .then(() => { this.productLoading = false; });
    },
  },

  watch: {
    '$route.params.id': {
      handler() {
        this.loadProduct();
      },

      immediate: true,
    },
  },
};
</script>

<style scoped>
  .aligner {
    margin-top: 500px;
    margin-bottom: 500px;
  }

  .added-loader {
    border: 6px solid #f3f3f3;
    border-top: 6px solid #9eff00;

    margin: auto;
    width: 40px;
    height: 40px;
  }

  .item__row {
    position: relative;
  }

  .added {
    position: absolute;
    top: -22px;
    left: 176px;
  }

</style>
