<template>
  <div class="boss">
    <van-nav-bar
      title="注册 & 登录"
      left-text="返回"
      right-text="首页"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <van-tabs
      v-model="active"
      class="login-box"
      background="white"
      color="red"
      animated="true"
      swipeable="true"
      lazy-render="true"
      style="color:red"
      title-active-color="red"
    >
      <!--注册------------------------------------------------------------ -->
      <van-tab title="注册">
        <van-cell-group>
          <van-field
            v-model="register.username"
            clearable
            label="用户名"
            right-icon="question-o"
            placeholder="请输入用户名"
            @click-right-icon="$toast('注意首位不能是数字  2-10 位字母数字组合')"
          />
          <van-field
            v-model="register.mobile"
            clearable
            type="tel"
            label="手机号"
            :error-message="title"
            placeholder="请输入手机号"
            right-icon="question-o"
            @click-right-icon="$toast('请输入11位长度的手机号')"
            @input="fun2"
          />
          <van-field
            v-model="register.password"
            type="password"
            label="密码"
            placeholder="请输入密码"
            right-icon="question-o"
            @click-right-icon="$toast('请输入6-12位长度的密码')"
          />
          <van-field
            v-model="register.dbpwd"
            type="password"
            clearable
            label="确认密码"
            placeholder="请输入确认密码"
          />
          <van-cell-group>
            <van-field
              v-model="register.code"
              center
              clearable
              label="短信验证码"
              placeholder="请输入短信验证码"
            >
              <van-button slot="button" size="small" type="primary" @click="getCode">发送验证码</van-button>
            </van-field>
          </van-cell-group>
        </van-cell-group>
        <van-button
          @click="todoRegister"
          style="font-size:0.5rem;border-radius:0.2rem;"
          type="primary"
          size="large"
        >立即注册</van-button>
      </van-tab>
      <!--登录------------------------------------------------------------ -->
      <van-tab title="登录">
        <van-cell-group>
          <van-field
            v-model="login.keys"
            clearable
            label="用户名"
            placeholder="请输入用户名"
            right-icon="question-o"
            @click-right-icon="$toast('请输入11位长度的手机号/2-10长度的字母数字组合且首位不能为数字')"
          />
          <van-field
            v-model="login.password"
            type="password"
            label="密码"
            placeholder="请输入密码"
            right-icon="question-o"
            @click-right-icon="$toast('6-12长度的字母数字组合')"
          />
          <van-cell-group>
            <van-field v-model="login.code" center clearable label="验证码" placeholder="请输入4位校验码">
              <van-button
                style="font-size:0.4rem;width:2rem;letter-spacing:0.16rem;"
                slot="button"
                size="small"
                type="primary"
                @click="fun1"
              >{{code}}</van-button>
            </van-field>
          </van-cell-group>
        </van-cell-group>
        <van-button
          @click="todoLogin"
          style="font-size:0.5rem;border-radius:0.2rem;"
          type="danger"
          size="large"
        >马上登录</van-button>
      </van-tab>
      <!-- --------------------- -->
    </van-tabs>
  </div>
</template>

<script>
import store from "@/store";
import Vue from "vue";
import { NavBar } from "vant";
Vue.use(NavBar);
import { Toast } from "vant";
Vue.use(Toast);
export default {
  mounted() {
    function random_str(length) {
      var ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      ALPHABET += "abcdefghijklmnopqrstuvwxyz";
      ALPHABET += "0123456789";
      var str = "";
      for (var i = 0; i < length; ++i) {
        var rand = Math.floor(Math.random() * ALPHABET.length);
        str += ALPHABET.substring(rand, rand + 1);
      }
      return str;
    }
    this.code = random_str(4);
  },
  data() {
    return {
      active: 1,
      register: {},
      login: {},
      code: "xsdq",
      title: "",
      arr: []
    };
  },
  methods: {
    getCode() {
      this.arr = [];
      function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }
      this.arr.push(getRandomInt(1, 9));
      this.arr.push(getRandomInt(1, 9));
      this.arr.push(getRandomInt(1, 9));
      this.arr.push(getRandomInt(1, 9));
      this.arr.push(getRandomInt(1, 9));
      this.arr.push(getRandomInt(1, 9));
      console.log(this.arr.join(""));
      alert(this.arr.join(""));
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    onClickRight() {
      this.$router.push({ name: "home" });
    },
    fun2() {
      if (this.register.mobile.length !== 11) {
        this.title = "手机号格式错误";
      } else {
        this.title = "";
      }
    },
    fun1() {
      function random_str(length) {
        var ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        ALPHABET += "abcdefghijklmnopqrstuvwxyz";
        ALPHABET += "0123456789";
        var str = "";
        for (var i = 0; i < length; ++i) {
          var rand = Math.floor(Math.random() * ALPHABET.length);
          str += ALPHABET.substring(rand, rand + 1);
        }
        return str;
      }
      this.code = random_str(4);
    },
    todoLogin() {
      if (
        this.login.code === this.code &&
        /^[A-Za-z]\w{1,9}|^1\d{10}/.test(this.login.keys) &&
        /^[A-Za-z]\w{5,11}/.test(this.login.password)
      ) {
        this.$axios.post("/vue/login", this.login).then(res => {
          if (!!res.data.type) {
            sessionStorage.userInfo = JSON.stringify({
              token: res.data.token,
              username: this.login.keys,
              nickname: res.data.result.nickname
            });
            this.$store.state.usermsg = res.data.result;
            setTimeout(() => {
              this.$router.push({ name: "mine" });
            }, 600);
          } else {
            sessionStorage.userInfo = JSON.stringify({
              token: ""
            });
          }
        });
      } else {
        Toast("登录信息不对，请重试，具体信息要求点击右侧图标查看");
      }
    },
    todoRegister() {
      if (
        this.register.code === this.arr.join("") &&
        /^[A-Za-z]\w{1,9}/.test(this.register.username) &&
        /^[A-Za-z]\w{5,11}/.test(this.register.password) &&
        /^1\d{10}/.test(this.register.mobile) &&
        this.register.password === this.register.dbpwd
      ) {
        this.$axios.post("/vue/register", this.register).then(res => {
          if (!!res.data.type) {
            this.active = 1;
          } else {
            console.log("注册失败");
          }
          this.register = {};
        });
      } else {
        Toast("注册信息不对，请重试，具体信息要求点击右侧图标查看");
      }
    }
  }
};
</script>

<style scoped lang="scss">
.boss {
  background: url("https://img.alicdn.com/imgextra/i3/1064741639/O1CN01BMdJLD1NyhgTnxl8D_!!1064741639.png_640x640q80_.webp")
    0rem 5.8rem/100%;
}
.van-ellipsis {
  font-size: 0.4rem;
}
.login-box {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
}

.van-cell {
  font-size: 0.35rem;
  line-height: 0.5rem;
  border-radius: 0.5rem;
}
.van-tabs__nav--card {
  margin: 0 !important;
  background: blue;
}
.van-tabs__wrap {
  height: 2rem;
}
</style>
