<template>
  <div class="boss">
    <van-search
      v-model="keyword"
      placeholder="请输入搜索关键词"
      show-action
      @search="onSearch"
      @cancel="onCancel"
    />
    <header style="font-size:0.4rem;">离你最近</header>
    <div class="box">
      <div>保利国际影城北京天安门店</div>
      <div>北京大观楼影城</div>
      <div>北京首都电影院西单店</div>
      <div>北京地质礼堂影院</div>
      <div>北京首都电影院中华店</div>
    </div>
    <header style="font-size:0.4rem;">搜索结果</header>
    <div class="content" v-for="(value,i) in arr" :key="i">
      <div>{{value.type}}</div>
      <div>{{value.storename}}</div>
      <div>{{value.price}}</div>
      <div>{{value.position}}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      keyword: "",
      arr: []
    };
  },
  methods: {
    onSearch() {
      this.$axios
        .get("/vue/search", {
          params: {
            search: this.keyword
          }
        })
        .then(res => {
          console.log(res.data.result);
          this.arr = res.data.result;
        });
    },
    onCancel() {
      this.$router.go(-1);
    }
  }
};
</script>
<style lang="scss" scoped>
.boss {
  background: white;
}
.boss::after {
  height: 0;
  content: "";
  overflow: hidden;
  clear: both;
  visibility: hidden;
}
header {
  margin-top: 0.2rem;
  padding: 0 0.2rem;
}
.box {
  border: 1px solid orange;
  padding: 0.4rem 0.2rem;
  display: flex;
  flex-wrap: wrap;
  & > div {
    line-height: 0.5rem;
    margin: 0.2rem;
    background: #f5f5f5;
    padding: 0 0.2rem;
  }
}
.content {
  border: 1px solid orange;
  padding: 0.4rem 0.2rem;
  display: flex;
  flex-wrap: wrap;
  & > div {
    line-height: 0.5rem;
    margin: 0.2rem;
    background: #f5f5f5;
    padding: 0 0.2rem;
  }
}
</style>
