import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '@core-public/views/Home.vue';
import FormView from '@core-public/views/FormView.vue';
import NavBar from '@core-public/components/navbar/NavBar.vue';

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
    path: '/form',
    name: 'form',
    components: {
      default: FormView,
      navbar: NavBar,
    },
  },
  {
    path: '/form-2',
    name: 'form-2',
    components: {
      default: FormView,
      navbar: NavBar,
    },
  },
];

export const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});
