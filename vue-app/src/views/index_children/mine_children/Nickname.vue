<template>
  <div>
    <van-nav-bar
      title="更改昵称"
      left-text="返回"
      right-text="保存"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
      style="margin-bottom:0.3rem"
    />
    <van-cell-group>
      <van-field v-model="value" maxlength="11" placeholder="请输入昵称" clearable />
    </van-cell-group>
  </div>
</template>
<script>
import Vue from "vue";
import { Toast } from "vant";
Vue.use(Toast);
import { Field } from "vant";
import { NavBar } from "vant";
Vue.use(NavBar);
Vue.use(Field);
export default {
  data() {
    return {
      value: ""
    };
  },
  mounted() {
    console.log(this.$route.params.nickname);
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onClickRight() {
      sessionStorage.userInfo.nickname = this.value;
      this.$axios.post("/vue/nickname", {
        nickname: this.value,
        username: JSON.parse(sessionStorage.userInfo).username
      });
    }
  }
};
</script>
<style lang="scss" scoped>
</style>