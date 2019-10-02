
import Vue from "vue";
import Vuex from "vuex"
Vue.use(Vuex);
const store = new Vuex.Store({
  state: {   // 组件里面所有的数据/状态  Vuex 使用单一状态树 
    msg: "zhangliang",
    img: "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=101537399,161830723&fm=26&gp=0.jpg",
    usermsg: ""
  },
  mutations: {
    changeMsg(state, msg) {
      state.msg = msg;
    },
    storeimg(state, img) {
      state.img = img;
    },
  },
})

export default store;