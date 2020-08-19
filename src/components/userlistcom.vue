<template>
  <div class="userlist">
    <h1>用户列表</h1>
    <ul>
      <li
        v-for="(item, index) in userlist"
        @click="selectUser(index)"
        :key="'userlist' + index"
      >
        <img :src="item.headerimg" alt="" />
        <h3>{{ item.username }}</h3>
      </li>
    </ul>
  </div>
</template>
<script scope>
export default {
  data() {
    return {};
  },
  props: ["userlist"],
  methods: {
    selectUser: function(index) {
      this.$emit("selectUser", index);
    }
  }
};
</script>
<style>
.userlist {
  width: 300px;
  height: 700px;
  background: skyblue;
}
.userlist ul li {
  display: flex;
}
.userlist ul li img {
  width: 80px;
  height: 80px;
}
</style>
