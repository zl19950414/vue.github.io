<template>
  <div id="home">
    <SwipeDemo id="swipeone" :options="swiperOptions">
      <SwipeItem v-for="(im,i) in imgs" :key="i">
        <img @click="gotoHome(i)" :src="im" alt class="g-img" />
      </SwipeItem>
    </SwipeDemo>
    <van-tabs @click="onClick">
      <van-tab title="正在热映">
        <div class="box" v-for="value in arr" :key="value._id" @click="gotodetail(value._id)">
          <div class="imgBox">
            <img :src="value.img" />
          </div>
          <div class="contentBox">
            <p>
              {{value.name}}
              <span class="movieClassify">{{value.classify}}</span>
            </p>
            <p class="playPerson">{{value.actor}}</p>
            <p>{{value.country}}</p>
          </div>
          <div class="buyTicket">购票</div>
        </div>
      </van-tab>
      <van-tab title="即将上映">
        <div class="box" v-for="value in brr" :key="value._id">
          <div class="imgBox">
            <img :src="value.img" />
          </div>
          <div class="contentBox">
            <p>
              {{value.name}}
              <span class="movieClassify">{{value.classify}}</span>
            </p>
            <p class="playPerson">{{value.actor}}</p>
            <p>{{value.Release_date}}</p>
          </div>
          <div class="buyTicket">预定</div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import store from "@/store";
import Vue from "vue";
import { Tab, Tabs } from "vant";
Vue.use(Tab).use(Tabs);
export default {
  mounted() {
    this.$axios
      .get("/vue/movie_hotplay", {
        params: {
          limit: 0
        }
      })
      .then(res => {
        // console.log(res.data.result);
        this.arr = res.data.result;
      });
    this.$axios
      .get("/vue/movie_Comingsoon", {
        params: {
          limit: 0
        }
      })
      .then(res => {
        // console.log(res.data.result);
        this.brr = res.data.result;
      });
  },

  methods: {
    gotodetail(para) {
      this.$axios
        .get("/vue/movie_detail", {
          params: {
            id: para
          }
        })
        .then(res => {
          console.log(res.data.result);
          this.$store.commit("changeMsg", res.data.result);
          this.$router.push({ name: "moviedetail" });
        });
    },
    gotoHome(idx) {
      if (idx == this.imgs.length - 1) {
        this.$router.push({ name: "home" });
      }
    },
    onClick(name, title) {
      this.$toast(title);
    }
  },
  data() {
    return {
      arr: [],
      brr: [],
      imgs: [
        require("@/assets/5.jpg"),
        require("@/assets/6.jpg"),
        require("@/assets/10.jpg"),
        require("@/assets/11.jpg"),
        require("@/assets/12.jpg"),
        require("@/assets/13.jpg"),
        require("@/assets/5.jpg"),
        require("@/assets/6.jpg"),
        require("@/assets/10.jpg"),
        require("@/assets/11.jpg"),
        require("@/assets/12.jpg"),
        require("@/assets/13.jpg")
      ],
      swiperOptions: {
        loop: true,
        autoplay: {
          delay: 1000,
          stopOnLastSlide: false,
          disableOnInteraction: false
        }
      }
    };
  }
};
</script>
<style scoped lang="scss">
#home,
#swipeone,
.g-img {
  width: 100%;
}
.box {
  width: 100%;
  height: 2.5rem;
  display: flex;
  box-sizing: border-box;
  padding: 0.3rem;
  position: relative;
  background: white;
  border: 1px solid #f5f5f5;
  .buyTicket {
    position: absolute;
    right: 0;
    top: 42%;
    width: 1rem;
    color: orange;
    text-align: center;
    height: 0.5rem;
    border: 0.01rem solid orange;
    border-radius: 0.02rem;
  }
  .imgBox {
    margin-right: 0.1rem;
    width: 1.8rem;
    height: 100%;
    & > img {
      width: 100%;
      height: 100%;
    }
  }
  .movieClassify {
    background: grey;
    color: white;
    padding-left: 0.1rem;
  }
  .contentBox {
    width: 100%;
    .playPerson {
      line-height: 1rem;
      width: 4rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>


