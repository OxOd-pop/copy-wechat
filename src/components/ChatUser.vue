<template>
  <div class="chatuser">
    <div class="header">
      <span class="back" @click="closechat">X</span>
      <div>{{ toUserName }}</div>
    </div>
    <div class="chatlist" ref="chatbox">
      <div
        v-for="(item, index) in chatlist"
        class="chatitem"
        :class="{ self: item.from.id == $root.currentUser.id }"
        :key="index"
      >
        <div class="headerimg">
          <img :src="item.from.headerImg" alt="" />
        </div>
        <div class="chatcontent">
          {{ item.content }}
        </div>
      </div>
    </div>
    <div class="inputcom">
      <input type="text" v-model="inputData" @keydown.enter.exact="sendEvent" />
      <button @click="sendEvent">发送</button>
    </div>
  </div>
</template>

<script>
import socket from "../router/mysocket";
export default {
  props: ["touser", "closechat", "newMsg"],
  data() {
    return {
      inputData: "",
      chatlist: []
    };
  },
  computed: {
    toUserName: function() {
      if (this.touser == null) return "";
      else return this.touser.userName;
    }
  },
  methods: {
    sendEvent: function() {
      let msg = {
        from: this.$root.currentUser,
        to: this.touser,
        content: this.inputData,
        time: new Date().getTime(),
        isread: false
      };

      this.chatlist.push(msg);
      socket.emit("sendMsg", msg);
      this.saveStorage();
    },
    saveStorage() {
      let fileName =
        "chat-user-" +
        this.$root.currentUser.userName +
        "-" +
        this.touser.userName;
      localStorage[fileName] = JSON.stringify(this.chatlist);

      this.inputData = "";
    },
    getStorage() {
      let fileName =
        "chat-user-" +
        this.$root.currentUser.userName +
        "-" +
        this.touser.userName;
      let data = localStorage[fileName];
      if (data == null) return;
      else {
        this.chatlist = JSON.parse(localStorage[fileName]);
        console.log(this.chatlist);
      }
    },
    updateChatBox() {
      let chatbox = this.$refs.chatbox;
      chatbox.scrollTop = chatbox.scrollHeight - chatbox.clientHeight;
    },
    sendReadMsg() {
      socket.emit("readMsg", {
        self: this.$root.currentUser.id,
        userId: this.touser.id
      });
    }
  },
  beforeMount() {
    this.getStorage();
    this.sendReadMsg();
  },
  mounted() {
    this.updateChatBox();
  },
  updated() {
    this.updateChatBox();
  },
  watch: {
    newMsg: function(val) {
      this.chatlist.push(val);
      this.saveStorage();
      this.sendReadMsg();
    }
  }
};
</script>

<style scoped>
.chatuser {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0%;
  left: 0%;
  background: #efefefef;
}

.chatuser .back {
  display: block;
  width: 40px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  position: absolute;
  left: 0;
  top: 0;
}

.chatuser .header {
  font-size: 18px;
  font-weight: 900;
  background: skyblue;
  height: 40px;
  text-align: center;
  line-height: 40px;
  position: relative;
}
.chatlist {
  overflow: scroll;
  flex: 1;
}
.inputcom {
  height: 40px;
  display: flex;
  background: dimgrey;
  justify-content: space-between;
  align-items: center;
}
.inputcom input {
  width: 100%;
  height: 80%;
  font-size: 18px;
  border-radius: 5px;
  outline: none;
  border: 1px solid #ccc;
  margin: 0 5px;
}
.inputcom button {
  width: 80px;
  height: 80%;
  border-radius: 5px;
  outline: none;
  border: 1px solid #ccc;
  margin: 0 5px 0 0;
}

.chatitem {
  display: flex;
  margin: 5px 10px;
  align-items: center;
}
.chatitem .headerimg img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
}
.chatitem .headerimg {
  margin-right: 10px;
}
.chatitem .chatcontent {
  background: #bbb;
  border-radius: 5px;
  padding: 5px;
  color: #fff;
  height: 30px;
  line-height: 30px;
  position: relative;
}
.chatitem .chatcontent::before {
  display: block;
  content: "";
  position: absolute;
  width: 0;
  height: 0;
  border-right: 10px solid #bbb;
  border-top: 8px solid transparent;
  border-bottom: 3px solid transparent;
  top: 15px;
  left: -10px;
}
.chatlist .self {
  flex-direction: row-reverse;
}
.self .headerimg {
  margin-left: 10px;
}

.self .chatcontent::before {
  display: block;
  content: "";
  position: absolute;
  width: 0;
  height: 0;
  border-left: 10px solid #bbb;
  border-top: 8px solid transparent;
  border-bottom: 3px solid transparent;
  top: 15px;
  right: -10px;
  left: initial;
  border-right: initial;
}
</style>
