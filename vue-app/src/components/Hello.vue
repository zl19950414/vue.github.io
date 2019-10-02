<template>
    <div>
        <h2> 完整语法高亮</h2>
        <h2> CommonJS 模块 </h2> 
        <h2> 组件作用域的 CSS </h2>
        <h2> {{ word  |  lower }} </h2>
        <p v-for="(a,i) in arr" :key="i">
            {{a}}
        </p>
        <h2 @click="changeCount"> count === {{count}}</h2>
        <p><input type="text" v-model="word"></p>
        <button @click="changeChild">change child by ref</button>
        <hr>
        <Child 
        @change-parent="getWord"
        ref="one"
        msg="feel happy" 
        :word="word" 
        :num="count" >
            <div>
                <h2>这是 父组件动态分发给自己的内容片断 slot </h2>
            </div>

            <div slot="menu">
                <h2>电脑 </h2>
                <h2>衣服 </h2>
                <h2>零食 </h2>
            </div>
        </Child>
    </div>
</template>

<script>

import Child from "./Child.vue";
export default {
    name:"hello",
    data(){
        return {
            arr:[],
            word:"word HARD For dream",
            count:1906
        }
    },
    computed:{},
    watch:{},
    methods:{
        changeCount(){
            this.count+=10;
        },
        changeChild(){
            this.$refs.one.message = "I will changed By refs...";
            this.$refs.one.todoModal();
        },
        getWord(data){
            this.word = data;
        }
    },
    components:{
        Child
    },
    filters:{},
    mounted(){

    },
    created(){

    },
    // methods:{}
}
</script>

<style scoped>
h2{
    font-size:18px;
}
</style>

