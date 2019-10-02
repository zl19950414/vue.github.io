<template>
  <div class="boss">
    <header>
      <img :src="msg.imgs[1]" alt />
    </header>
    <div class="contentdiv">
      <h2>
        {{msg.name}}
        <span style="background:grey;color:white;padding:0.04rem;">{{msg.item}}</span>
      </h2>
      <p>{{msg.filmcategory}}</p>
      <p>{{msg.filmpremieretime}}</p>
      <p>{{msg.filmnationruntime}}</p>
      <van-collapse v-model="activeNames">
        <van-collapse-item title="下拉电影查看详情" name="1">{{msg.film_detail}}</van-collapse-item>
      </van-collapse>
      <div class="actors">
        <h2>演职人员</h2>
        <div class="actorbox">
          <div v-for="(value,i) in msg.actors_name" :key="i">
            <img :src="msg.imgs[i+1]" alt />
            <h3>{{value}}</h3>
            <p>{{msg.actors_role[i]}}</p>
          </div>
        </div>
      </div>
      <div>
        <h2>剧照</h2>
        <div class="imgbox">
          <img v-for="(value,i) in arr" :key="i" :src="value" alt srcset />
        </div>
      </div>
      <van-button type="danger" size="large" color="orangered">选座购票</van-button>
    </div>
  </div>
</template>
<script>
import store from "@/store";
import Vue from "vue";
import { Collapse, CollapseItem } from "vant";
Vue.use(Collapse).use(CollapseItem);
import { Button } from "vant";
Vue.use(Button);
export default {
  data() {
    return {
      activeNames: ["1"],
      arr: []
    };
  },
  computed: {
    msg() {
      console.log(this.$store.state.msg[0]);
      var j = this.$store.state.msg[0].actors_name.length + 1;
      var k = this.$store.state.msg[0].imgs.length - j;
      this.arr = this.$store.state.msg[0].imgs.concat().splice(j, k);
      return this.$store.state.msg[0];
    }
  }
};
</script>
<style lang="scss" scoped>
.boss {
  .imgbox::after {
    content: "";
    height: 0;
    display: block;
    overflow: hidden;
    opacity: 0;
    clear: both;
    visibility: hidden;
  }
  .imgbox {
    clear: both;
    margin: 0.3rem;
    & > img {
      width: 46%;
      height: auto;
      margin: 0.1rem;
      float: left;
    }
  }
  .actorbox {
    margin-top: 0.3rem;
    width: 100%;
    background: white;
    margin-bottom: 0.3rem;
    display: flex;
    flex-wrap: wrap;
    & > div {
      text-align: center;
      & > img {
        width: 100%;
        height: auto;
      }
      & > h3 {
        font-size: 0.3rem;
      }
      & > p {
        font-size: 0.2rem;
      }
      width: 25%;
      padding: 0 1%;
      box-sizing: border-box;
    }
  }
  .actor_img {
    width: 100%;
    height: 100%;
  }
  & > .contentdiv {
    background: white;
    padding: 0.3rem;
    & > p {
      font-size: 0.3rem;
      color: grey;
      line-height: 0.6rem;
    }
  }
  & > header {
    height: 6rem;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>