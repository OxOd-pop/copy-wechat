<template>
  <div class="chatItem">
    <img :src="headerImg" alt="" />
    <div>
      <slot name="chatContent"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: ["headerImg"]
};
</script>

<style scoped>
.chatItem {
  display: flex;
}
.chatItem img {
  width: 30px;
  height: 30px;
}
</style>
