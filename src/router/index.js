import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import UploadImage from "../views/UploadImage.vue";

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
    path: "/upload",
    name: "upload",
    component: UploadImage
    // Убрали meta: { requiresAuth: true }
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Упрощаем middleware, оставляем только анимации
router.beforeEach((to, from, next) => {
  to.meta.transition = 'page';
  next();
});

export default router;
