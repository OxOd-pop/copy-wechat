<template>
  <div class="chat">
    <h1 class="user">{{ curUser.username }}</h1>
    <div class="chatlist">
      <chatItem> </chatItem>
    </div>
    <chatInputCom></chatInputCom>
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
