<template>
  <div>
    <van-nav-bar title="我的资料" left-arrow @click-left="onClickLeft" />
    <div class="box">
      <div class="content">
        <div class="onediv">头像</div>
        <div class="threediv"></div>
        <div class="twodiv">
          <div>
            <img :src="img" alt @click="uploadImg" />
            <input
              type="file"
              ref="upload"
              @change="shangchuan"
              accept="image/*"
              class="hiddenInput"
            />
          </div>
        </div>
      </div>
      <div class="content1" @click="nickname">
        <div class="onediv1">昵称</div>
        <div class="threediv1"></div>
        <div class="twodiv1">{{telephonenumber}}</div>
      </div>
      <div class="content1">
        <div class="onediv1">性别</div>
        <div class="threediv1"></div>
        <div class="twodiv1">{{setstatus}}</div>
      </div>
      <div class="content1">
        <div class="onediv1">出生日期</div>
        <div class="threediv1"></div>
        <div class="twodiv1">{{birthday}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import store from "@/store";
import Vue from "vue";
import { NavBar } from "vant";
import { SwipeCell } from "vant";
import { Button } from "vant";
Vue.use(Button);
Vue.use(SwipeCell);
Vue.use(NavBar);
export default {
  mounted() {
    this.$store.commit("storeimg", this.img);
    var arr = this.telephonenumber.split("");
    arr.splice(3, 4, "****");
    this.telephonenumber = arr.join("");
    if (localStorage.avatar) {
      this.img = localStorage.avatar;
    } else {
      this.img =
        "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=101537399,161830723&fm=26&gp=0.jpg";
    }
  },
  updated() {
    this.$store.commit("storeimg", this.img);
  },
  data() {
    return {
      img: "",
      telephonenumber: "15071228084",
      setstatus: "未设置",
      birthday: "1995年01月01日"
    };
  },
  methods: {
    nickname() {
      var username = JSON.parse(sessionStorage.userInfo).username;
      this.$router.push({ name: "nickname", params: { username } });
    },
    uploadImg() {
      this.$refs.upload.click();
    },
    shangchuan() {
      console.log("准备上传");
      let file = this.$refs.upload.files[0];
      console.log(file);
      let data = new FormData();
      data.append("avatar", file);
      this.$axios({
        url: "/vue/uploadAvatar",
        method: "POST",
        data: data,
        contentType: false,
        processData: false
      }).then(res => {
        // this.img = res.data.pic.replace(/public/, "http://localhost:1906");
        this.img = res.data.pic.replace(/public/, "http://182.92.0.3:1906");
        localStorage.avatar = this.img;
      });
    },
    onClickLeft() {
      this.$router.go(-1);
    }
  }
};
</script>
<style lang="scss" scoped>
.hiddenInput {
  display: none;
}
.box {
  margin-top: 0.3rem;
}
.content {
  background: white;
  box-sizing: border-box;
  padding: 0.4rem;
  margin-bottom: 0.1rem;
  .onediv {
    float: left;
    transform: translateY(100%);
  }
  .twodiv {
    float: right;
    & > div {
      float: left;
      height: 100%;
      width: 1.4rem;
      display: table-cell;
      vertical-align: middle;
      & > img {
        width: 1.4rem;
        height: 1.4rem;
        border-radius: 50%;
      }
    }
  }
  .threediv {
    transform: translateY(140%);
    margin-left: 0.3rem;
    float: right;
    border-left: 0.2rem solid black;
    border-top: 0.2rem solid transparent;
    border-bottom: 0.2rem solid transparent;
  }
}
.content1 {
  background: white;
  box-sizing: border-box;
  padding: 0.4rem;
  margin-bottom: 0.1rem;
  .onediv1 {
    float: left;
  }
  .twodiv1 {
    float: right;
    & > div {
      float: left;
      height: 100%;
      width: 1.4rem;
      display: table-cell;
      vertical-align: middle;
      & > img {
        width: 1.4rem;
        height: 1.4rem;
        border-radius: 50%;
      }
    }
  }
  .threediv1 {
    margin-left: 0.3rem;
    float: right;
    border-left: 0.2rem solid black;
    border-top: 0.2rem solid transparent;
    border-bottom: 0.2rem solid transparent;
  }
}
.content::after,
.content1::after {
  content: "";
  overflow: hidden;
  clear: both;
  visibility: hidden;
  display: block;
  height: 0;
}
</style>