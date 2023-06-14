import { defineAsyncComponent } from 'vue';
const resortDetail = defineAsyncComponent(() => import('@/views/admin/resort/ResortDetail.vue'));
const userDetail = defineAsyncComponent(() => import('@/views/admin/user/UserDetail.vue'));
const contactPopup = defineAsyncComponent(() => import('@/views/search-view/item-detail/ContactPopup.vue'));
const login = defineAsyncComponent(() => import('@/views/auth/LoginForm.vue'));

export const globalPopup = (app) => {
  app.component('ResortDetail', resortDetail);
  app.component('UserDetail', userDetail);
  app.component('LoginForm', login);
  app.component('ContactPopup', contactPopup);
}