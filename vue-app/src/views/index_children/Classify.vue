<template>
  <div class="boss">
    <van-nav-bar
      :fixed="fixboo"
      title="影院"
      :left-text="city"
      :border="boroo"
      @click-left="onClickLeft"
      @click-right="onClickRight"
      color="black"
    >
      <van-icon name="search" slot="right" class="box2" />
    </van-nav-bar>
    <div class="vandropdowndiv">
      <van-dropdown-menu active-color="red">
        <van-dropdown-item :title="title" ref="item">
          <van-row @click="fun1">
            <van-col
              v-for="(value,i) in arr"
              :key="i"
              span="5"
              style="background:white;cursor: pointer;border:1px solid black;margin-top:0.2rem;margin-bottom:0.1rem;line-height:0.6rem;text-align:center;"
              offset="1"
              @click="choiceonecity(i)"
              class="boxone"
            >{{value}}</van-col>
          </van-row>
        </van-dropdown-item>
        <van-dropdown-item v-model="value1" :options="option1" @change="fun2" />
        <van-dropdown-item v-model="value2" :options="option2" />
      </van-dropdown-menu>
    </div>

    <div class="content">
      <div class="contentone" v-for="(value,i) in brr" :key="i">
        <p class="p1">
          <span>{{value.storename}}</span>
          <span>{{value.position}}</span>
        </p>
        <p class="p2">
          <span>￥{{value.price}}起</span>
          <span>距离未知</span>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { NavBar, CouponList } from "vant";
Vue.use(NavBar);
import { Row, Col } from "vant";
Vue.use(Row).use(Col);
import { DropdownMenu, DropdownItem } from "vant";
Vue.use(DropdownMenu).use(DropdownItem);
export default {
  data() {
    return {
      city: "北京 v",
      title: "全城",
      fixboo: true,
      boroo: true,
      value1: 0,
      value2: 0,
      option1: [
        { text: "价格升序👆", value: 0 },
        { text: "价格降序👇", value: 1 }
      ],
      option2: [{ text: "最近去过", value: 0 }, { text: "离我最近", value: 1 }],
      arr: [
        "全城",
        "西城区",
        "东城区",
        "海淀区",
        "朝阳区",
        "丰台区",
        "大兴区",
        "昌平区",
        "顺义区",
        "通州区",
        "房山区",
        "石景山区",
        "门头沟区",
        "怀柔区",
        "密云区",
        "延庆区",
        "平谷区"
      ],
      brr: []
    };
  },
  mounted() {
    this.$axios
      .get("/vue/position", {
        params: {
          id: this.title
        }
      })
      .then(res => {
        this.brr = res.data.result;
      });
  },
  methods: {
    fun2() {
      var brr = this.brr;
      if (this.value1 == 0) {
        for (let j = 0; j < brr.length - 1; j++) {
          for (let i = 0; i < brr.length - j; i++) {
            if (brr[i + 1] && brr[i + 1].price) {
              var a = brr[i].price * 1;
              var b = brr[i + 1].price * 1;
              if (a > b) {
                var obj1 = brr[i];
                var obj2 = brr[i + 1];
                brr.splice(i, 2, obj2, obj1);
              }
            }
          }
        }
      } else {
        for (let j = 0; j < brr.length - 1; j++) {
          for (let i = 0; i < brr.length - j; i++) {
            if (brr[i + 1] && brr[i + 1].price) {
              var a = brr[i].price * 1;
              var b = brr[i + 1].price * 1;
              if (a < b) {
                var obj1 = brr[i];
                var obj2 = brr[i + 1];
                brr.splice(i, 2, obj2, obj1);
              }
            }
          }
        }
      }
    },
    fun1() {
      this.$refs.item.toggle();
    },
    onClickLeft() {
      this.$router.push({ name: "position" });
    },
    onClickRight() {
      this.$router.push({ name: "search" });
    },
    choiceonecity(i) {
      this.title = this.arr[i];
      this.$axios
        .get("/vue/position", {
          params: {
            id: this.title
          }
        })
        .then(res => {
          console.log(res.data.result);
          this.brr = res.data.result;
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.content {
  margin-top: 2rem;
}
.contentone {
  height: 1.4rem;
  padding: 0.2rem 0.2rem;
  background: white;
  margin: 0.02rem 0;
  .p1 {
    float: left;
    width: 70%;
    height: 100%;
    & > span {
      line-height: 0.6rem;
      display: block;
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: grey;
    }
    & > span:nth-of-type(1) {
      color: black;
      font-size: 0.38rem;
    }
  }
  .p2 {
    float: right;
    width: 30%;
    height: 100%;
    & > span {
      line-height: 0.6rem;
      text-align: center;
      display: block;
      width: 100%;
      color: grey;
      font-size: 0.3rem;
    }
    & > span:nth-of-type(1) {
      color: red;
      font-size: 0.38rem;
    }
  }
}
.box2 {
  color: black;
  font-size: 0.6rem;
}
.van-nav-bar__text {
  font-size: 0.4rem;
  color: black;
}
.boxone {
  cursor: pointer;
}
.van-nav-bar__title {
  font-size: 0.5rem;
}
.vandropdowndiv {
  width: 100%;
  position: fixed;
  top: 0.9rem;
  left: 0;
}
</style>
