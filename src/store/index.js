import Vue from 'vue';
import Vuex from 'vuex';
import products from '@/data/products';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartProducts: [
      {
        productId: 1,
        amount: 2,
        colorId: 1,
      },
    ],
  },
  mutations: {
    addProductToCart(state, params) {
      const item = state.cartProducts.find((product) => product.productId === params.productId);

      if (item) {
        item.amount += params.amount;
      } else {
        state.cartProducts.push({
          productId: params.productId,
          amount: params.amount,
          colorId: params.colorId,
        });
      }
    },

    updateProductCartAmount(state, params) {
      const item = state.cartProducts.find((product) => product.productId === params.productId);

      if (item) {
        item.amount = params.amount;
      }
    },

    deleteProductCart(state, productId) {
      state.cartProducts = state.cartProducts.filter((item) => item.productId !== productId);
    },
  },

  getters: {
    getDetailProducts(state) {
      return state.cartProducts.map((item) => ({
        ...item,
        product: products.find((product) => product.id === item.productId),
      }));
    },
  },
});
