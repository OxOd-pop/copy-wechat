<template>
  <div class="userlist">
    <div class="nav">
      <div class="headerimg" :class="{ online: islogin }">
        <img
          v-if="$root.currentUser != null"
          :src="$root.currentUser.headerImg"
        />
      </div>
      <div class="title">消息</div>
      <div class="headerimg"></div>
    </div>
    <div class="user">
      <div class="useritem">
        <div class="left">
          <img src="" alt="" />
        </div>
        <div class="right">
          <span class="username"></span>
          <span class="message"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["islogin"]
};
</script>

<style scoped>
.headerimg {
  height: 50px;
  width: 50px;
  filter: grayscale(1);
  margin: 0 10px;
}
.headerimg img {
  height: 50px;
  width: 50px;
  border-radius: 50%;
}
.online {
  filter: grayscale(0);
}
.nav {
  height: 80px;
  width: 100vw;
  background: skyblue;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.nav .title {
  font-weight: 900;
  font-size: 18px;
}
</style>
