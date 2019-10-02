<template>
  <div id="guide">
    <SwipeDemo id="swipeone" :options="swiperOptions">
      <SwipeItem v-for="(im,i) in imgs" :key="i">
        <img @click="gotoHome(i)" :src="im" alt class="g-img" />
      </SwipeItem>
    </SwipeDemo>
    <div class="box" v-if="flag">
      <van-count-down :time="10000" format="ss秒后自动关闭广告" />
      <p @click="gotoHome(3)">X关闭</p>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { CountDown } from "vant";
Vue.use(CountDown);
export default {
  mounted() {
    this.flag = false;
  },
  methods: {
    gotoHome(idx) {
      if (idx == this.imgs.length - 1) {
        this.$router.push({ name: "home" });
      }
    }
  },
  data() {
    return {
      flag: false,
      imgs: [
        require("@/assets/1.jpg"),
        require("@/assets/2.jpg"),
        require("@/assets/3.jpg"),
        require("@/assets/4.jpg")
      ],
      swiperOptions: {
        loop: false,
        autoplay: {
          delay: 500,
          stopOnLastSlide: true
        },
        on: {
          reachEnd: () => {
            this.flag = true;
            setTimeout(() => {
              this.$router.push({ name: "home" });
            }, 10000);
          }
        }
      }
    };
  }
};
</script>

<style scoped lang="scss">
#guide,
#swipeone,
.g-img {
  width: 100%;
  height: 100%;
}
.box {
  z-index: 100;
  position: fixed;
  top: 0;
  right: 0;
  p {
    text-align: right;
    color: lime;
    font-size: 0.5rem;
    margin-top: 0.3rem;
    margin-right: 0.3rem;
  }
}
.van-count-down {
  color: aqua;
  font-size: 0.5rem;
  margin-top: 0.3rem;
}
</style>


