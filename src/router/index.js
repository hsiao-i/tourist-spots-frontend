import { createRouter, createWebHashHistory } from 'vue-router';
// import HomeView from '../views/FrontView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/FrontView.vue'),
    children: [
      {
        path: '',
        name: 'homePage',
        component: () => import('../views/HomePage.vue'),
      },
      {
        path: 'tourist-spot/:id',
        name: 'tourist-spot',
        component: () => import('../views/SingleTouristSpot.vue'),
      },
      {
        path: 'favorite',
        name: 'favorite',
        component: () => import('../views/FavoritePage.vue'),
      },
    ],
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginPage.vue'),
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/RegisterPage.vue'),
  },
  {
    path: '/admin',
    component: () => import('../views/admin/DashboardView.vue'),
    children: [
      {
        path: '',
        name: 'tourist-spots',
        component: () => import('../views/admin/AdminTouristSpots.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
