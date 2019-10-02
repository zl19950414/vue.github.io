import Vue from 'vue'    // Vue 模块
import App from './App.vue'   // 根组件
import router from './router'   // 路由模块
import store from './store'   //  vuex 
// 引入公共的模块 
// 公共 过滤器  组件  指令  样式  
import "./utils/filters";
import "./styles/index.scss";
// 导入 vant 
import Vant from "vant";
Vue.use(Vant);   // 全局配置  
// 导入 vue-resource ,  axios 
import VueResource from "vue-resource";
Vue.use(VueResource);  // this.$http    Vue.http 请求数据 

import axios from "@/utils/axios.js";
Vue.prototype.$axios = axios;    // this==> Vue.prototype  this.$axios ==> axios ;

// 项目启动的主文件 
Vue.config.productionTip = false; // 标记 是什么环境模式   开发测试模式     线上模式  
new Vue({
  router,
  store,
  render: h => h(App)   // 加载根组件 到  div#app 
}).$mount('#app')