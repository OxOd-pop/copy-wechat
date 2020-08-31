<template>
  <div id="app">
    <selectUser
      v-if="$root.currentUser == null"
      :userlist="userlist"
    ></selectUser>
    <userListC
      v-if="!ischat"
      :islogin="isLogin"
      :users="users"
      :selectuser="selectuser"
      :unreadlist="unreadlist"
    ></userListC>
    <chatUser v-if="ischat" :touser="touser" :closechat="closechat"></chatUser>
  </div>
</template>

<script>
import selectUser from "./components/SelectUser";
import userListC from "./components/UserList";
import axios from "axios";
import sockett from "./router/mysocket";
import chatUser from "./components/ChatUser";

export default {
  name: "app",
  components: {
    selectUser,
    userListC,
    chatUser
  },
  data() {
    return {
      userlist: [],
      isLogin: false,
      users: [],
      touser: null,
      ischat: false,
      unreadlist: []
    };
  },
  beforeMount() {
    var myself = this;
    axios.get("http://localhost:3000/api/userlist").then(function(res) {
      console.log(res);
      myself.userlist = res.data.recordset;
    });
    localStorage.clear();
  },
  mounted() {
    var that = this;
    sockett.on("login", data => {
      if (data.state == "ok") {
        that.isLogin = true;
        sockett.emit("users");
      }
    });

    sockett.on("logout", data => {
      console.log(data.content);
      that.isLogin = false;
      sockett.disconnect();
    });

    sockett.on("disconnect", reson => {
      console.log(reson);
      that.isLogin = false;
    });

    sockett.on("users", data => {
      this.users = data;
      console.log(this.users);
    });

    sockett.on("unreadMsg", msg => {
      msg.forEach(item => {
        let newfrom = this.users.find(i => {
          return i.id == item.fromId;
        });
        this.unreadlist.push(item.fromId);
        let fileName =
          "chat-user-" +
          this.$root.currentUser.userName +
          "-" +
          newfrom.userName;

        let newMsg = {
          from: newfrom,
          to: this.$root.currentUser,
          content: item.content,
          time: item.time,
          isread: item.isread
        };
        let arr = [];
        if (localStorage[fileName] != null) {
          arr = JSON.parse(localStorage[fileName]);
          arr = Array.from(arr);
          arr.push(newMsg);
        } else {
          arr.push(newMsg);
        }

        localStorage[fileName] = JSON.stringify(arr);
        console.log(localStorage[fileName]);
      });
    });
  },
  methods: {
    selectuser: function(user) {
      this.touser = user;
      this.ischat = true;
    },
    closechat: function() {
      this.touser = null;
      this.ischat = false;
    }
  }
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
</style>
