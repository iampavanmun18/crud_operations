import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import datepicker from 'vue-datepicker';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';
// import router from './router';

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
