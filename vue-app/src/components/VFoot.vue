<template>
  <van-tabbar v-model="active">
    <van-tabbar-item
      v-for="(foot,i) in foots"
      :key="i"
      :info="i==2?10:''"
      :icon="foot.icon"
    >{{foot.txt}}</van-tabbar-item>
  </van-tabbar>
</template>
<script>
export default {
  data() {
    return {
      foots: [
        {
          txt: "电影",
          path: "/index/home",
          name: "home",
          icon: "video"
        },
        {
          txt: "影院",
          path: "/index/classify",
          name: "classify",
          icon: "shop"
        },
        {
          txt: "咨询",
          path: "/index/cart",
          name: "cart",
          icon: "comment-o"
        },
        { txt: "我的", path: "/index/mine", name: "mine", icon: "friends-o" }
      ],
      active: 0
    };
  },
  watch: {
    active: function(newVal) {
      this.$router.push({ name: this.foots[newVal].name });
    }
  },
  mounted() {
    let name = this.$route.name;
    this.foots.forEach((item, index) => {
      if (item.name == name) {
        this.active = index;
      }
    });
  }
};
</script>

