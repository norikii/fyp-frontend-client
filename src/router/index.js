import Vue from 'vue'
import VueRouter from 'vue-router'
import LogInView from "../views/LogInView";
import DashboardView from "../views/DashboardView";
import StaffTable from "../components/table_components/StaffTable";
import ItemsTable from "../components/table_components/ItemsTable";
import OrdersTable from "../components/table_components/OrdersTable";
import GuestsTable from "../components/table_components/GuestsTable";

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: LogInView
  },
  {
    path: '/dashboard',
    component: DashboardView,
    children: [
      {
        path: '',
        component: StaffTable
      },
      {
        path: 'guests',
        component: GuestsTable
      },
      {
        path: 'items',
        component: ItemsTable
      },
      {
        path: 'orders',
        component: OrdersTable
      }
    ]
  },



  // {
  //   path: '/users',
  //   name: 'Users',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/Users.vue')
  // }
];

const router = new VueRouter({
  mode: 'history',
  linkExactActiveClass: 'is-active',
  base: process.env.BASE_URL,
  routes
});

export default router
