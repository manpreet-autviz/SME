import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import './styles/app.css';
import VueGoogleMaps from '@fawmi/vue-google-maps';

createApp(App)
  .use(VueGoogleMaps, {
    load: {
      key: process.env.VUE_APP_GOOGLE_MAP_API_KEY,
    },
  })
  .use(store)
  .use(router)
  .mount('#app');
