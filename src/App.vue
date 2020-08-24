<template>
  <div id="app">
    <selectUser
      v-if="$root.currentUser == null"
      :userlist="userlist"
    ></selectUser>
  </div>
</template>

<script>
import selectUser from "./components/SelectUser";
import axios from "axios";
export default {
  name: "app",
  components: {
    selectUser
  },
  data() {
    return {
      userlist: []
    };
  },
  beforeMount() {
    var myself = this;
    axios.get("http://localhost:3000/api/userlist").then(function(res) {
      console.log(res);
      myself.userlist = res.data.recordset;
    });
  }
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
</style>
