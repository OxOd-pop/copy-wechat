<template>
  <div class="selectUser">
    <h1>选择你聊天的角色</h1>
    <div class="list">
      <div
        class="item"
        @click="selectEvent(item)"
        v-for="(item, index) in userlist"
        :key="index"
      >
        <img :src="item.headerImg" />
        <span>{{ item.userName }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["userlist"],
  methods: {
    selectEvent: function(sel) {
      this.$root.currentUser = sel;
      localStorage.currentUser = JSON.stringify(sel);
    }
  }
};
</script>

<style scoped>
.selectUser h1 {
  font-size: 20px;
  text-align: center;
  padding: 20px 0;
}
.selectUser {
  width: 100vw;
  height: 100vh;
  background: skyblue;
}
.list {
  display: flex;
  flex-wrap: wrap;
}
.item {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 50%;
  height: 130px;
  margin: 15px 0;
}
.item img {
  width: 100px;
  height: 100px;
  border-radius: 50px;
  box-shadow: 5px 0px 10px rgb(73, 73, 73);
}
</style>
