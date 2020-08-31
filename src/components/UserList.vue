<template>
  <div class="userlist">
    <div class="nav">
      <div class="headerimg">
        <img
          :class="{ online: islogin }"
          v-if="$root.currentUser != null"
          :src="$root.currentUser.headerImg"
        />
      </div>
      <div class="title">消息</div>
      <div class="headerimg"></div>
    </div>
    <div class="user">
      <div
        @click="selectuser(item)"
        class="useritem"
        v-for="(item, index) in friend"
        :key="index"
      >
        <div class="left">
          <div class="headerimg">
            <img
              :class="{ online: item.isOnline }"
              :src="item.headerImg"
              alt=""
            />
            <div :class="{ unread: unreadlist.includes(item.id) }"></div>
          </div>
        </div>
        <div class="right">
          <span class="username">{{ item.userName }}</span>
          <span class="message"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["islogin", "users", "selectuser", "unreadlist"],
  computed: {
    friend: function() {
      let currUser = this.$root.currentUser;
      if (currUser == null) return [];
      let curId = currUser.id;
      if (curId == null) return [];
      return this.users.filter(item => {
        return item.id != curId;
      });
    }
  }
};
</script>

<style scoped>
.headerimg {
  height: 60px;
  width: 60px;
  margin: 0 10px;
  line-height: 60px;
}
.headerimg img {
  filter: grayscale(1);
}

.useritem .headerimg {
  display: flex;
  align-items: center;
}

.headerimg img {
  height: 50px;
  width: 50px;
  border-radius: 50%;
  border: 2px solid #797777;
}
.headerimg .online {
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
.useritem {
  display: flex;
  height: 65px;
  align-items: center;
  border-bottom: 1px solid #ccc;
}
.unread {
  position: relative;
  width: 100%;
  height: 100%;
}
.unread::before {
  position: absolute;
  content: "";
  display: block;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: red;
  top: 5px;
  right: 5px;
}
</style>
