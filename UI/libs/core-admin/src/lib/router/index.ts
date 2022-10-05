import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '@core-admin/views/Home.vue';
import Brand from '@core-admin/views/Brand.vue';
import NavBar from '@core-admin/components/navbar/NavBar.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    components: {
      default: Home,
      navbar: NavBar,
    },
  },
  {
    path: '/brand',
    name: 'Brand',
    components: {
      default: Brand,
      navbar: NavBar,
    },
  },
];

export const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});
