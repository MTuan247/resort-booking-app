import { vuetify } from './vuetify.js'
import { router } from './router.js';

import mitt from 'mitt';
import { vfmPlugin, $vfm } from 'vue-final-modal';
import UUID, { uuid } from 'vue-uuid';
import store from '@/store/index.js';
import Toast, { useToast } from "vue-toastification";

import { Constants, Enums } from '@/resources/index.js';

import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import "@hennge/vue3-pagination/dist/vue3-pagination.css";

// import the package
import VueAwesomePaginate from "vue-awesome-paginate";

// import the necessary css file
import "vue-awesome-paginate/dist/style.css";

export const registerPlugin = (app) => {

  const emitter = mitt();
  const toast = useToast();

  app.config.globalProperties.$eventBus = emitter;
  app.config.globalProperties.$popup = $vfm;
  app.config.globalProperties.$uuid = uuid;
  app.config.globalProperties.$constants = Constants;
  app.config.globalProperties.$enums = Enums;
  app.config.globalProperties.$store = store;
  app.config.globalProperties.$toast = toast;

  app.use(vuetify);
  app.use(router);
  app.use(vfmPlugin);
  app.use(UUID);
  app.use(Toast, {});
  app.use(VueAwesomePaginate);

  app.component('VueDatePicker', VueDatePicker);
}