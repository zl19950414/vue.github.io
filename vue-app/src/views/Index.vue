<template>
  <div>
    <!-- 可变的东西就是儿子的东西 -->
    <router-view></router-view>
    <!-- 公共的foot，写在父亲里面去 -->
    <VFoot></VFoot>
  </div>
</template>
<script>
import VFoot from "@/components/VFoot.vue";
export default {
  components: {
    VFoot
  }
};
</script>

