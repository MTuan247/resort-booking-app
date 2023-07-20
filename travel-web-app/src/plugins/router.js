import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store/index.js';

// 1. Define route components.
// These can be imported from other files
import ResortList from '@/views/admin/resort/ResortList.vue';
import UserList from '@/views/admin/user/UserList.vue';
import OrderList from '@/views/admin/order/OrderList.vue';
import FeedbackList from '@/views/admin/feedback/FeedbackList.vue';
import Login from '@/views/auth/Login.vue';
import RoleRequestList from '@/views/admin/role_request/RoleRequestList.vue'

// 2. Define some routes
// Each route should map to a component.
// We'll talk about nested routes later.
const routes = [
  {
    name: 'admin', path: '/', component: () => import('@/views/admin/Admin.vue'), children: [
      {
        path: 'resort',
        name: 'resort',
        component: ResortList,
      },
      {
        path: 'role-request',
        name: 'role-request',
        component: RoleRequestList,
      },
      {
        path: 'user',
        name: 'user',
        component: UserList,
      },
      {
        path: 'order',
        name: 'order',
        component: OrderList,
      },
      {
        path: 'feedback',
        name: 'feedback',
        component: FeedbackList,
      },
      {
        path: '',
        name: 'index',
        component: () => ResortList,
      },
    ],
    meta: { requiresAdmin: true },
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  { path: '/:catchAll(.*)', redirect: '/' }
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(),
  routes, // short for `routes: routes`
});

router.beforeEach(async (to, from, next) => {
  const userInfo = store.state.moduleAuth.user;
  // next-line: check if route ("to" object) needs authenticated
  if (to.matched.some((record) => record.meta.requiresAuth) && !userInfo) {
    next('/login');
  } else if (to.matched.some((record) => record.meta.requiresAdmin) && (!userInfo || (userInfo?.role != 'admin' && userInfo?.role != 'resort_owner' ))) {
    next('/login');
  } else next();
});

export { router };