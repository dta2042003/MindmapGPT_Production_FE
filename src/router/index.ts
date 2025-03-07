import type { RouteRecordRaw } from "vue-router";
import { createRouter, createWebHistory } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "layout",
    redirect: "/home",
    children: [
      {
        path: "/home",
        component: () => import("@/pages/home.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/paper",
        component: () => import("@/pages/paper.vue"),
      },
      { 
        path: "/login",
        name: "Login", 
        component: () => import("@/pages/LoginPage.vue") 
      },
      {
        path: "/register",
        component: () => import("@/pages/RegisterPage.vue"),
      },
      {
        path: "/payment",  // ✅ Route mới cho Payment
        name: "Payment",
        component: () => import("@/pages/Payment.vue"),
        meta: { requiresAuth: true },  // 🚀 Yêu cầu đăng nhập
      },
    ],
    component: () => import("@/components/MainLayout.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// ✅ Middleware kiểm tra đăng nhập
router.beforeEach((to, _from, next) => {
  const token = localStorage.getItem('token');
  console.log('Token:', token);
  
  if (to.meta.requiresAuth && !token) {
    next({ name: 'Login' });
  } else {
    next();
  }
});

export default router;
