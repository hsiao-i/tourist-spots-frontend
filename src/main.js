import { createApp } from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import { createPinia } from 'pinia';
// import 'bootstrap';

import App from './App.vue';
import router from './router';

const pinia = createPinia;
const app = createApp(App);
app.use(VueAxios, axios);
app.use(router);
app.use(pinia);
app.mount('#app');
