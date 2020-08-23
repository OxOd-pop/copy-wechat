<template>
  <div class="chat">
    <h1 class="user">{{ curUser.username }}</h1>
    <div class="chatlist">
      <chatItem
        v-for="(item, index) in chatList"
        :key="index"
        :headerImg="item.user.headerimg"
      >
        <template v-slot:chatContent>{{ item.content }}</template>
      </chatItem>
    </div>
    <chatInputCom :sendEvent="sendEvent"> </chatInputCom>
  </div>
</template>

<script>
import chatInputCom from "./chatInputCom";
import chatItem from "./chatItem";
export default {
  props: ["curUser"],
  components: {
    chatInputCom,
    chatItem
  },
  data() {
    return {
      chatList: [
        {
          user: {
            username: "小明",
            headerimg: require("../assets/image/1.jpg")
          },
          content: "吃饭了吗"
        }
      ]
    };
  },
  methods: {
    sendEvent: function(content) {
      this.chatList.push({
        user: {
          username: "小明",
          headerimg: require("../assets/image/1.jpg")
        },
        content: content
      });
    }
  }
};
</script>

<style scoped>
.chat {
  width: 500px;
  height: 700px;
  border: 2px solid #cccccc;
}
</style>
