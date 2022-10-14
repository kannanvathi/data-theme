import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "table",
      component: () => import("../views/TableView.vue"),
    },
    {
      path: "/card",
      name: "card",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/CardView.vue"),
    },
    {
      path: "/card/:id",
      name: "single-card",
      component: () => import("../views/SingleCard.vue"),
    },
    {
      path: "/setting",
      name: "setting",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/SettingView.vue"),
    },
  ],
});

export default router;
