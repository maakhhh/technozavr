import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import API_BASE_URL from '@/config';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartProducts: [],

    userAccessKey: null,
    cartProductsData: [],
    productsLoading: false,
    addedLoading: false,
  },
  mutations: {
    updateProductCartAmount(state, params) {
      const item = state.cartProducts.find((product) => product.productId === params.productId);

      if (item) {
        item.amount = params.amount;
      }
    },

    deleteProductCart(state, productId) {
      state.cartProducts = state.cartProducts.filter((item) => item.productId !== productId);
    },

    updateUserAccessKey(state, userAccessKey) {
      state.userAccessKey = userAccessKey;
    },

    updateCartProductsData(state, items) {
      state.cartProductsData = items;
    },

    syncCartProducts(state) {
      state.cartProducts = state.cartProductsData.map((item) => ({
        productId: item.product.id,
        amount: item.quantity,
      }));
    },

    updateLoading(state, load) {
      state.productsLoading = load;
    },

    updateAddedLoading(state, load) {
      state.addedLoading = load;
    },
  },

  getters: {
    getDetailProducts(state) {
      return state.cartProducts.map((item) => {
        const { product } = state.cartProductsData.find((p) => p.product.id === item.productId);

        return {
          ...item,
          product: {
            ...product,
            image: product.image.file.url,
          },
        };
      });
    },
  },

  actions: {
    loadCart(context) {
      context.commit('updateLoading', true);
      return axios
        .get(`${API_BASE_URL}api/baskets`, {
          params: {
            userAccessKey: context.state.userAccessKey,
          },
        })
        .then((response) => {
          if (!context.state.userAccessKey) {
            localStorage.setItem('userAccessKey', response.data.user.accessKey);
            context.commit('updateUserAccessKey', response.data.user.accessKey);
          }
          context.commit('updateCartProductsData', response.data.items);
          context.commit('syncCartProducts');
        })
        .then(() => context.commit('updateLoading', false));
    },

    addToCard(context, { productId, amount }) {
      context.commit('updateAddedLoading', true);
      return axios
        .post(`${API_BASE_URL}api/baskets/products`, {
          productId,
          quantity: amount,
        },

        {
          params: {
            userAccessKey: context.state.userAccessKey,
          },
        })
        .then((response) => {
          if (!context.state.userAccessKey) {
            localStorage.setItem('userAccessKey', response.data.user.accessKey);
            context.commit('updateUserAccessKey', response.data.user.accessKey);
          }
          context.commit('updateCartProductsData', response.data.items);
          context.commit('syncCartProducts');
        })
        .then(() => context.commit('updateAddedLoading', false));
    },

    updateCartProductAmount(context, { productId, amount }) {
      context.commit('updateProductCartAmount', { productId, amount });

      if (amount < 1) {
        return 0;
      }

      return axios
        .put(`${API_BASE_URL}api/baskets/products`, {
          productId,
          quantity: amount,
        },
        {
          params: {
            userAccessKey: context.state.userAccessKey,
          },
        })
        .then((response) => {
          context.commit('updateCartProductsData', response.data.items);
        })
        .catch(() => {
          context.commit('syncCartProducts');
        });
    },

    deleteCartProduct(context, productId) {
      context.commit('deleteProductCart', productId);
      console.log(productId);

      return axios
        .delete(`${API_BASE_URL}api/baskets/products`, {
          params: {
            userAccessKey: context.state.userAccessKey,
          },

          data: {
            productId,
          },
        })
        .then((response) => {
          context.commit('updateCartProductsData', response.data.items);
        })
        .catch(() => {
          context.commit('syncCartProducts');
        });
    },
  },
});
