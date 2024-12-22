import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import FireDetectionView from "../views/FireDetectionView.vue";
import TeethDetectionView from "../views/TeethDetectionView.vue";

const routes = [
  { 
    path: "/", 
    name: "login", 
    component: LoginView 
  },
  { 
    path: "/register", 
    name: "register", 
    component: RegisterView 
  },
  {
    path: "/fire-detect",
    name: "fire-detect",
    component: FireDetectionView,
    // meta: { requiresAuth: true }
  },
  {
    path: "/teeth-detect",
    name: "teeth-detect",
    component: TeethDetectionView,
    // meta: { requiresAuth: true }
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const token = localStorage.getItem('access_token');

  if (requiresAuth && !token) {
    next('/');
  } else {
    to.meta.transition = 'page';
    next();
  }
});

export default router;
