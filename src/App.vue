<template>
  <div id="app">
    <h1>{{ msg }}</h1>
    <div class="content">
      <chatcom :curUser="curUser"></chatcom>
      <userlistcom @selectUser="toggleUser" :userlist="userlist"></userlistcom>
    </div>
  </div>
</template>
<script>
import chatcom from "./components/chatcom.vue";
import userlistcom from "./components/userlistcom.vue";
export default {
  name: "App",
  components: {
    chatcom,
    userlistcom
  },

  data() {
    return {
      msg: "Copy-Wechat",
      userlist: [
        {
          username: "小明",
          headerimg: require("./assets/image/1.jpg")
        },
        {
          username: "小黄",
          headerimg: require("./assets/image/2.jpg")
        },
        {
          username: "小东",
          headerimg: require("./assets/image/3.jpg")
        },
        {
          username: "小星",
          headerimg: require("./assets/image/4.jpg")
        }
      ],
      curUser: {
        username: "",
        headerimg: ""
      }
    };
  },
  methods: {
    toggleUser: function(index) {
      this.curUser = this.userlist[index];
    }
  }
};
</script>
<style scoped>
.content {
  display: flex;
  width: 800px;
  height: 700px;
  margin: 50px auto;
}
</style>
