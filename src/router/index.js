import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import FireDetectionView from "../views/FireDetectionView.vue";
import TeethDetectionView from "../views/TeethDetectionView.vue";

const routes = [
  { path: "/", name: "login", component: LoginView },
  { path: "/register", name: "register", component: RegisterView },
  { path: "/fire-detect", name: "fire-detect", component: FireDetectionView },
  {
    path: "/decay-detect",
    name: "decay-detect",
    component: TeethDetectionView,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
