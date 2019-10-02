// 路由懒加载   当这个路由被访问时 才去编译加载这个路由组件模板
import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);   //  全局声明   
import Guide from "@/views/Guide.vue";
const routes = [
  { path: "/", redirect: { name: 'guide' } },
  {
    path: "/guide",
    name: "guide",
    component: Guide
  },
  {
    path: "/search",
    name: 'search',
    component: () => import("@/views/Search.vue")
  },
  {
    path: "/balance",
    name: 'balance',
    component: () => import("@/views/index_children/mine_children/Balance.vue")
  },
  {
    path: "/nickname",
    name: 'nickname',
    component: () => import("@/views/index_children/mine_children/Nickname.vue")
  },
  {
    path: "/myprofile",
    name: 'myprofile',
    component: () => import("@/views/index_children/mine_children/Myprofile.vue")
  },
  {
    path: "/userset",
    name: 'userset',
    component: () => import("@/views/index_children/mine_children/Userset.vue")
  },
  {
    path: "/login",
    name: 'login',
    component: () => import("@/views/Login.vue")
  },
  {
    path: "/index",
    name: "index",
    component: () => import("@/views/Index.vue"),
    children: [
      { path: "", redirect: { name: "home" } },
      { path: "home", name: "home", component: () => import("@/views/index_children/Home.vue") },
      { path: "classify", name: "classify", component: () => import("@/views/index_children/Classify.vue") },
      { path: "cart", name: "cart", component: () => import("@/views/index_children/Advisory.vue") },
      { path: "mine", name: "mine", component: () => import("@/views/index_children/Mine.vue") },
      {
        path: "**",
        redirect: { name: 'home' }
      }
    ]
  },
  {
    path: '/moviedetail',
    name: 'moviedetail',
    component: () => import("@/views/index_children/moviedetail/Moviedetail.vue")
  },
  {
    path: '/position',
    name: 'position',
    component: () => import("@/views/index_children/Position.vue")
  },
  {
    path: "**",
    redirect: { name: 'home' }
  }
]

const router = new VueRouter({
  routes,
  mode: "hash",
  base: "/"
})

export default router;