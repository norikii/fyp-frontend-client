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
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        component: StaffTable,
        name: 'dashboard'
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
];

const router = new VueRouter({
  mode: 'history',
  linkExactActiveClass: 'is-active',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem('user');

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!loggedIn) {
      next('/')
    } else {
      next();
    }
  } else {
    next()
  }
});

export default router
