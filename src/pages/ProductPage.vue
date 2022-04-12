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
          <form class="form" @submit.prevent="addProduct({ productId: product.id, amount: productAmount }); cartAdded = true;">
            <b class="item__price">
              {{ product.price | numberFormat }} ₽
            </b>

            <fieldset class="form__block">
              <legend class="form__legend">Цвет:</legend>
              <ul class="colors">
                <li class="colors__item" v-for="color in productColors" :key="String(product.id) + String(color.id)">
                  <label class="colors__label">
                    <input class="colors__radio sr-only" type="radio" name="color-item" :value="color.id">
                    <span class="colors__value" :style="{backgroundColor: color.code}">
                    </span>
                  </label>
                </li>
              </ul>
            </fieldset>

            <div class="item__row">
              <div class="form__counter">
                <button type="button" aria-label="Убрать один товар" @click.prevent="deleteAmount()">
                  <svg width="12" height="12" fill="currentColor">
                    <use xlink:href="#icon-minus"></use>
                  </svg>
                </button>

                <input type="text" v-model.number="productAmount">

                <button type="button" aria-label="Добавить один товар" @click.prevent="productAmount++">
                  <svg width="12" height="12" fill="currentColor">
                    <use xlink:href="#icon-plus"></use>
                  </svg>
                </button>
              </div>
              <div class="added" v-if="cartAdded">Товар добавлен в корзину</div>
              <BaseLoader class="added-loader" v-if="$store.state.addedLoading" />
              <button v-else class="button button--primery" type="submit" :disabled="$store.state.cartAdded">
                В корзину
              </button>
            </div>
          </form>
        </div>
      </div>

      <div class="item__desc">
        <ul class="tabs">
          <li class="tabs__item">
            <a class="tabs__link tabs__link--current">
              Описание
            </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#">
              Характеристики
            </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#">
              Гарантия
            </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#">
              Оплата и доставка
            </a>
          </li>
        </ul>

        <div class="item__content">
          <p>
            Навигация GPS, ГЛОНАСС, BEIDOU Galileo и QZSS<br>
            Синхронизация со смартфоном<br>
            Связь по Bluetooth Smart, ANT+ и Wi-Fi<br>
            Поддержка сторонних приложений<br>
          </p>

          <a href="#">
            Все характеристики
          </a>

          <h3>Что это?</h3>

          <p>
            Wahoo ELEMNT BOLT GPS – это велокомпьютер, который позволяет оптимизировать свои велотренировки, сделав их максимально эффективными. Wahoo ELEMNT BOLT GPS синхронизируется с датчиками по ANT+, объединяя полученную с них информацию. Данные отображаются на дисплее, а также сохраняются на смартфоне. При этом на мобильное устройство можно установить как фирменное приложение, так и различные приложения сторонних разработчиков. Велокомпьютер точно отслеживает местоположение, принимая сигнал с целого комплекса спутников. Эта информация позволяет смотреть уже преодоленные маршруты и планировать новые велопрогулки.
          </p>

          <h3>Дизайн</h3>

          <p>
            Велокомпьютер Wahoo ELEMNT BOLT очень компактный. Размеры устройства составляют всего 74,6 x 47,3 x 22,1 мм. что не превышает габариты смартфона. Корпус гаджета выполнен из черного пластика. На обращенной к пользователю стороне расположен дисплей диагональю 56 мм. На дисплей выводятся координаты и скорость, а также полученная со смартфона и синхронизированных датчиков информация: интенсивность, скорость вращения педалей, пульс и т.д. (датчики не входят в комплект поставки). Корпус велокомпьютера имеет степень защиты от влаги IPX7. Это означает, что устройство не боится пыли, а также выдерживает кратковременное (до 30 минут) погружение в воду на глубину не более 1 метра.
          </p>
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
    };
  },

  computed: {
    product() {
      return this.productData;
    },
    category() {
      return this.product.category;
    },
    productColors() {
      return this.product.colors;
    },
  },

  filters: {
    numberFormat,
  },

  methods: {
    ...mapActions({ addProduct: 'addToCard' }),

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
