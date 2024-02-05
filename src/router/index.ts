import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import { useUserStore } from "@/store/auth.module";

import HomeView from "../views/HomeView.vue";
import TestView from "../views/TestView.vue";
import accountRoutes from "./account.routes";
import projectRoutes from "./project.routes";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/home",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  ...accountRoutes,
  ...projectRoutes,
  {
    path: "/test",
    name: "Test",
    component: TestView,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach(async (to) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ["/login", "/register"];
  const authRequired = !publicPages.includes(to.path);
  const auth = useUserStore();

  if (authRequired && !auth.data.isAuthorised) {
    return "/login";
  }
});

export default router;
