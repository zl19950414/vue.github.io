<template>
  <div class="boss">
    <header>
      <span @click="goback">X</span>
      <span>当前城市 -</span>
      <span></span>
    </header>
    <van-search placeholder="请输入搜索关键词" v-model="value" />
    <div class="box1" style="background:white;padding-bottom:0.3rem">
      <h4 style="margin-left:0.2rem;line-height:0.6rem;font-size:0.3rem;">GPS定位你所在的城市</h4>
      <div
        style="margin-left:0.4rem;text-align:center;width:2rem;height:0.6rem;background:#f5f5f5;line-height:0.6rem;"
      >定位失败</div>
    </div>
    <div class="box1" style="background:white;padding-bottom:0.3rem">
      <h4 style="margin-left:0.2rem;line-height:0.6rem;font-size:0.3rem;">热门城市</h4>
      <div style="display:flex;flex-wrap:wrap;">
        <div
          style="margin-left:0.4rem;margin-top:0.2rem;box-sizing:border-box;text-align:center;width:28%;height:0.6rem;background:#f5f5f5;line-height:0.6rem;"
        >北京</div>
        <div
          style="margin-left:0.4rem;margin-top:0.2rem;box-sizing:border-box;text-align:center;width:28%;height:0.6rem;background:#f5f5f5;line-height:0.6rem;"
        >上海</div>
        <div
          style="margin-left:0.4rem;margin-top:0.2rem;box-sizing:border-box;text-align:center;width:28%;height:0.6rem;background:#f5f5f5;line-height:0.6rem;"
        >广州</div>
        <div
          style="margin-left:0.4rem;margin-top:0.2rem;box-sizing:border-box;text-align:center;width:28%;height:0.6rem;background:#f5f5f5;line-height:0.6rem;"
        >深圳</div>
        <div
          style="margin-left:0.4rem;margin-top:0.2rem;box-sizing:border-box;text-align:center;width:28%;height:0.6rem;background:#f5f5f5;line-height:0.6rem;"
        >武汉</div>
      </div>
    </div>
    <van-index-bar :index-list="indexList">
      <van-index-anchor index="1">A</van-index-anchor>
      <van-cell title="阿拉善盟" />
      <van-cell title="鞍山" />
      <van-cell title="安庆" />
      <van-cell title="安阳" />
      <van-cell title="安顺" />
      <van-cell title="安康" />

      <van-index-anchor index="2">B</van-index-anchor>
      <van-cell title="文本" />
      <van-cell title="文本" />
      <van-cell title="文本" />...
    </van-index-bar>
  </div>
</template>
<script>
import Vue from "vue";
import { IndexBar, IndexAnchor } from "vant";

Vue.use(IndexBar).use(IndexAnchor);
export default {
  methods: {
    goback() {
      this.$router.go(-1);
    }
  },
  data() {
    return {
      value: "1111",
      indexList: [
        A,
        B,
        C,
        D,
        E,
        F,
        G,
        H,
        I,
        J,
        K,
        L,
        M,
        N,
        O,
        P,
        Q,
        R,
        S,
        T,
        U,
        V,
        W,
        X,
        Y,
        Z
      ]
    };
  }
};
</script>
<style lang="scss" scoped>
header {
  font-size: 0.4rem;
  font-weight: 100;
  height: 0.8rem;
  background: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  & > span:nth-of-type(1) {
    padding-left: 0.3rem;
    font-size: 0.6rem;
  }
}
</style>