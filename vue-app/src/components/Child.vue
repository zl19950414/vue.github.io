<template>
  <div>
    <h2>child - One 子组件</h2>
    <h2>props == {{msg}} / {{word}} / {{num}}</h2>
    <h2>{{message }}</h2>
    <button @click="changeParent">自定义事件去实现 子修改 父组件</button>
    <button @click="change">$parent 去实现 子修改 父组件</button>
    <div style="border:2px solid red">
      <slot></slot>
    </div>
    <div style="border:2px solid blue">
      <slot name="menu"></slot>
    </div>
  </div>
</template>


<script>
export default {
  props: ["msg", "word", "num"],
  data() {
    return {
      message: "我很努力在三阶段,手机都不用了..."
    };
  },
  methods: {
    todoModal() {
      console.log("努力就一定会有收获...");
    },
    changeParent() {
      this.$emit("change-parent", "word Will be change by 自定义事件...");
    },
    change() {
      this.$parent.changeCount();
      this.$parent.word = "1906 daydayup!";
    }
  }
};
</script>
