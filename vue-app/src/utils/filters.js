
// 全局的过滤器  
import Vue from "vue";
Vue.filter("lower", function (value) {
    if (!value) {
        return;
    }
    return value.toLowerCase();
});


// 全局的组件 
import Hello from "../components/Hello.vue";
Vue.component("Hello", Hello);

import SwipeDemo from "../components/SwipeDemo.vue";
Vue.component("SwipeDemo", SwipeDemo);

import SwipeItem from "../components/SwipeItem.vue";
Vue.component("SwipeItem", SwipeItem);

import Head from "@/components/Head.vue";
Vue.component("Head", Head);
