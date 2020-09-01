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
    <chatUser
      v-if="ischat"
      :touser="touser"
      :closechat="closechat"
      :newMsg="newMsg"
    ></chatUser>
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
      unreadlist: [],
      newMsg: null
    };
  },
  computed: {
    usersObj: function() {
      let obj = {};
      this.users.forEach(item => {
        obj[item.id] = item;
      });

      return obj;
    }
  },
  beforeMount() {
    var myself = this;
    axios.get("http://localhost:3000/api/userlist").then(function(res) {
      myself.userlist = res.data.recordset;
    });
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
        this.saveStorage(item.fromId, item);
        this.unreadlist.push(item.fromId);
      });
    });

    sockett.on("accept", msg => {
      console.log(msg);
      if (
        this.ischat &&
        (this.touser.id == msg.from.id ||
          (msg.to.isGroup == true && msg.to.id == this.touser.id))
      ) {
        this.newMsg = msg;
      } else {
        this.saveStorage(msg.from.id, msg);
        this.unreadlist.push(msg.from.id);
      }
    });
  },
  methods: {
    selectuser: function(user) {
      this.touser = user;
      this.ischat = true;

      for (let i = 0; i < this.unreadlist.length; i++) {
        if (this.unreadlist[i] == this.touser.id) {
          this.unreadlist.splice(i, 1);
          break;
        }
      }
    },
    closechat: function() {
      this.touser = null;
      this.ischat = false;
    },
    saveStorage(touserId, msg) {
      let newfrom = this.usersObj[touserId];
      let fileName =
        "chat-user-" + this.$root.currentUser.userName + "-" + newfrom.userName;

      let newMsg = {
        from: newfrom,
        to: this.$root.currentUser,
        content: msg.content,
        time: msg.time,
        isread: msg.isread
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
