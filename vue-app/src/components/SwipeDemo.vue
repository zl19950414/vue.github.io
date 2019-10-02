<template>
  <div class="swiper-container" :id="id">
    <div class="swiper-wrapper">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "swipe",
  props: ["id", "options"],
  mounted() {
    let mySwiper = new Swiper("#" + this.id, this.options);
  },
  updated() {
    // 异步数据  必须等待虚拟DOM  更新完毕后才能 再次实例化
    let mySwiper = new Swiper("#" + this.id, this.options);
  }
};
</script>


