<template>
  <div>
    <div v-if="isLogin">
      <header>
        <div class="box" @click="gotomyprofile">
          <img :src="img" />
          <span style="font-size:0.6rem">{{username}}</span>
        </div>
      </header>
      <van-grid clickable :column-num="2">
        <van-grid-item icon="coupon-o" text="电影订单" to />
        <van-grid-item icon="orders-o" text="商品订单" to />
      </van-grid>
      <van-coupon-cell :coupons="coupons" :chosen-coupon="chosenCoupon" @click="showList = true" />
      <van-popup v-model="showList" position="bottom">
        <van-coupon-list
          :coupons="coupons"
          :chosen-coupon="chosenCoupon"
          :disabled-coupons="disabledCoupons"
          @change="onChange"
          @exchange="onExchange"
        />
      </van-popup>
      <van-cell title="组合红包" icon="bill-o" is-link @click="fun1" />
      <van-cell title="余额1" icon="balance-o" is-link value="￥0" to="/balance" />
      <van-cell title="设置" icon="setting-o" is-link to="/userset" />
    </div>
    <!-- ------------------------------------------------------------------------------ -->
    <div v-else>
      <header>
        <div class="box">
          <img src="http://img4.imgtn.bdimg.com/it/u=3931101740,3569433258&fm=26&gp=0.jpg" />
          <span @click="gotoLogin">立即登录</span>
        </div>
      </header>
      <div @click="gotoLogin">
        <van-grid clickable :column-num="2">
          <van-grid-item icon="coupon-o" text="电影订单" to="/" />
          <van-grid-item icon="orders-o" text="商品订单" to="/" />
        </van-grid>
        <van-cell title="卖座券" icon="debit-pay" is-link to="index" />
        <van-cell title="组合红包" icon="bill-o" is-link to="index" />
        <van-cell title="余额" icon="balance-o" is-link value="￥0" to="index" />
        <van-cell title="设置" icon="setting-o" is-link to="index" />
      </div>
    </div>
  </div>
</template>

<script>
const coupon = {
  available: 1,
  condition: "无使用门槛\n最多优惠12元",
  reason: "",
  value: 400,
  name: "铂金优惠券",
  endAt: 1577664000,
  startAt: 1552176000,
  valueDesc: "4",
  unitDesc: "元"
};
const coupon2 = {
  available: 1,
  condition: "无使用门槛\n最多优惠12元",
  reason: "",
  value: 600,
  name: "钻石优惠券",
  endAt: 1577664000,
  startAt: 1544724000,
  valueDesc: "6",
  unitDesc: "元"
};
const coupon3 = {
  available: 1,
  condition: "无使用门槛\n最多优惠12元",
  reason: "",
  value: 800,
  name: "大师优惠券",
  endAt: 1577664000,
  startAt: 1549724000,
  valueDesc: "8",
  unitDesc: "元"
};
const coupon4 = {
  available: 1,
  condition: "无使用门槛\n最多优惠12元",
  reason: "",
  value: 1000,
  name: "宗师优惠券",
  endAt: 1577664000,
  startAt: 1549724000,
  valueDesc: "10",
  unitDesc: "元"
};
const coupon1 = {
  available: 1,
  condition: "无使用门槛\n最多优惠12元",
  reason: "",
  value: 800,
  name: "钻石优惠券",
  endAt: 1561896000,
  startAt: 1536408000,
  valueDesc: "8",
  unitDesc: "元"
};
import store from "@/store";
import Vue from "vue";
import { Toast } from "vant";
Vue.use(Toast);
import { CouponCell, CouponList } from "vant";
Vue.use(CouponCell).use(CouponList);
import { Cell, CellGroup, Grid, GridItem, Icon } from "vant";
Vue.use(Cell).use(CellGroup);
Vue.use(Grid).use(GridItem);
Vue.use(Icon);
export default {
  data() {
    return {
      img: "",
      showList: false,
      isLogin: false,
      username: "",
      chosenCoupon: -1,
      coupons: [
        coupon,
        coupon2,
        coupon3,
        coupon4,
        coupon,
        coupon2,
        coupon3,
        coupon4
      ],
      disabledCoupons: [coupon1]
    };
  },
  methods: {
    gotomyprofile() {
      this.$router.push({ name: "myprofile" });
    },
    fun1() {
      Toast("您还没有组合的红包");
    },
    onChange(index) {
      this.showList = false;
      this.chosenCoupon = index;
    },
    onExchange(code) {
      this.coupons.push(coupon);
    },
    gotoLogin() {
      this.$router.push({ name: "login" });
    }
  },
  mounted() {
    console.log(this.$store.state.img);
    this.img = this.$store.state.img;
    if (localStorage.avatar) {
      this.img = localStorage.avatar;
    } else {
      this.img =
        "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=101537399,161830723&fm=26&gp=0.jpg";
    }
    console.log(this.$store.state.usermsg);
    if (sessionStorage.userInfo) {
      this.isLogin = JSON.parse(sessionStorage.userInfo).token;
      console.log();
      if (JSON.parse(sessionStorage.userInfo).nickname) {
        this.username = JSON.parse(sessionStorage.userInfo).nickname;
      } else {
        this.username = JSON.parse(sessionStorage.userInfo).username;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
header {
  height: 3rem;
  background: orange;
  padding-top: 1rem;
  .box {
    overflow: hidden;
    height: 2rem;
    line-height: 2rem;
    box-sizing: border-box;
    padding-left: 0.6rem;
    img {
      float: left;
      width: 2rem;
      height: 2rem;
      border-radius: 50%;
      margin-right: 0.4rem;
    }
    & > span {
      color: #ffffff;
      font-size: 0.4rem;
    }
  }
}
</style>


