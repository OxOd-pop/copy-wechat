<template>
  <div id="app">
    <selectUser
      v-if="$root.currentUser == null"
      :userlist="userlist"
    ></selectUser>
    <userListC :islogin="isLogin"></userListC>
  </div>
</template>

<script>
import selectUser from "./components/SelectUser";
import userListC from "./components/UserList";
import axios from "axios";
import sockett from "./router/mysocket";

export default {
  name: "app",
  components: {
    selectUser,
    userListC
  },
  data() {
    return {
      userlist: [],
      isLogin: false
    };
  },
  beforeMount() {
    var myself = this;
    axios.get("http://localhost:3000/api/userlist").then(function(res) {
      console.log(res);
      myself.userlist = res.data.recordset;
    });
  },
  mounted() {
    var that = this;
    sockett.on("login", data => {
      if (data.state == "ok") {
        that.isLogin = true;
      }
    });

    sockett.on("logout", data => {
      console.log(data.content);
      that.isLogin = false;
      sockett.disconnect();
    });
  }
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
</style>
