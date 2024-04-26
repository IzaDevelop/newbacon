import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/components/ListUser.vue';
import DetailUser from '@/components/DetailUser.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/user/:id',
    name: 'UserDetail',
    component: DetailUser,
    props: true
  }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

export default router;