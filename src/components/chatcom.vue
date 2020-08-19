<template>
  <div class="chat">
    <h1 class="user">{{ curUser.username }}</h1>
  </div>
</template>
<script>
export default {
  props: ["curUser"]
};
</script>
<style scoped>
.chat {
  width: 500px;
  height: 700px;
  border: 2px solid #cccccc;
}
</style>
