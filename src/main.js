import Vue from 'vue';
import App from './App.vue';
import data from './data';
import alertfunc from './alertFunc';

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');

alertfunc(data.text1);
alertfunc(data.text2);
