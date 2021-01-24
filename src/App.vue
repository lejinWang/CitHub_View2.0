<template>
  <!--<img class="logo" alt="Vue logo" src="./assets/logo.png">-->
  <router-view></router-view>
  <!-- <div class="btn">
    <el-button type="primary" @click="startHacking">
      Get Started
    </el-button>
  </div>-->
</template>

<script>
import { ref } from "vue";
// import HelloWorld from './components/HelloWorld.vue'
// import index from "./components/index.vue";

export default {
  name: "App",
  components: {
    // HelloWorld
  },
  setup() {
    const msg = ref("Welcome to Element Plus, a Vue 3.0 based component library");
    const startHacking = () => {
      msg.value = "Start coding with Element Plus with 💖";
    };
    return {
      msg,
      startHacking,
    };
  },
};
</script>

<style>
#app {
  font-family: "Helvetica Neue", "BlinkMacSystemFont", "Segoe UI", "Roboto",
    "Helvetica Neue", "Aria";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
  background: #fff;
}
body {
  margin: 0;
  background: #fff;
}
h3 {
  margin: 0px;
}
a {
  text-decoration: none;
}

.router-link-active {
  text-decoration: none;
}
</style>
