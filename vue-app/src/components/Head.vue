<template>
  <van-nav-bar
    :title="title"
    :left-text="show?'北京 v':'X'"
    :left-arrow="flag"
    @click-left="onClickLeft"
    color="black"
  >
    <div slot="right">
      <van-icon v-if="searchShow" name="search" @click="goSearch" size="0.5rem" color="black" />
    </div>
  </van-nav-bar>
</template>

<script>
export default {
  data() {
    return {
      searchShow: true
    };
  },
  props: {
    title: {
      type: String,
      default: "xxxx"
    },
    show: {
      type: Boolean,
      default: false
    },
    flag: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    goSearch() {
      this.$router.push({ name: "search" });
    },
    onClickLeft() {
      this.$router.push({ name: "position" });
    },
    onClickRight() {}
  },
  mounted() {
    if (this.$route.name == "search") {
      this.searchShow = false;
    }
  }
};
</script>

