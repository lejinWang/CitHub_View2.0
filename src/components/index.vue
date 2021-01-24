<template>
  <el-container>
    <el-header style="z-index: 1">
      <el-row
        ><el-col
          :xs="{ span: 24, offset: 0 }"
          :sm="{ span: 24, offset: 0 }"
          :md="{ span: 20, offset: 2 }"
          :lg="{ span: 20, offset: 2 }"
          :xl="{ span: 18, offset: 3 }"
        >
          <router-link to="/"
            ><img class="logo" alt="CitHub logo" src="../assets/logo.png"
          /></router-link>
          <el-menu
            :default-active="activeIndex2"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            background-color="#343a40"
            text-color="#898d90"
            active-text-color="#fff"
          >
            <el-menu-item index="1" @click="service_index()">Service</el-menu-item>
            <el-menu-item index="2" @click="crowdsourcing_index()"
              >Crowdsourcing</el-menu-item
            >
            <el-menu-item index="3">Concept && Help</el-menu-item>
            <el-menu-item v-show="indexData.showLogin" index="4">Sign in</el-menu-item>
            <!-- <el-menu-item v-show="indexData.showLogin" index="5">Sign up</el-menu-item> -->
            <el-submenu
              v-show="!indexData.showLogin"
              index="6"
              style="background-color: #fff; color: black"
            >
              <template #title><i class="iconfont iconyonghu"></i></template>
              <el-menu-item index="6-1">profile</el-menu-item>
              <el-menu-item index="6-2">sign out</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-col>
      </el-row>
    </el-header>
    <el-row style="margin-top: 60px; min-height: 817px"
      ><el-col
        :xs="{ span: 24, offset: 0 }"
        :sm="{ span: 24, offset: 0 }"
        :md="{ span: 20, offset: 2 }"
        :lg="{ span: 20, offset: 2 }"
        :xl="{ span: 18, offset: 3 }"
      >
        <el-container>
          <el-main><router-view /></el-main>
        </el-container>
      </el-col>
    </el-row>

    <el-footer style="bottom: 21px; height: 60px; width: 100%; color: white !important">
      <span class="text-muted" style="">Copyright &copy; GIST, All Rights Reserved.</span>
    </el-footer>
  </el-container>
</template>

<script>
import { reactive } from "vue";
export default {
  setup() {
    const indexData = reactive({
      userid: "",
      showLogin: true,
    });
    indexData.userid = localStorage.getItem("userid");
    if (indexData.userid == null || indexData.userid == "") {
      indexData.showLogin = true;
    } else {
      indexData.showLogin = false;
    }
    return { indexData };
  },
  name: "index",
  data() {
    return {
      activeIndex2: "1",
      activeIndex: "1",
    };
  },
  methods: {
    // eslint-disable-next-line no-unused-vars
    handleSelect(key, keyPath) {
      switch (key) {
        case "1": {
          this.$router.push({ path: "/" });
          break;
        }
        case "2": {
          this.$router.push({ path: "/task_index" });
          break;
        }
        case "3": {
          this.$router.push({ path: "/help" });
          break;
        }
        case "4": {
          this.$router.push({ path: "/login" });
          break;
        }
        case "5": {
          this.$router.push({ path: "/signUp" });
          break;
        }
        case "6-1": {
          this.$router.push({ path: "/user" });
          break;
        }
        case "6-2": {
          localStorage.setItem("userid", "");
          this.$router.push({ path: "/login" });
          break;
        }
        default: {
          //语句
          break;
        }
      }
    },
    // computed:{
    //   key(){
    //     return this.$router.name?this.$router.name+new Date():this.$router+new Date()
    //   }
    // }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.logo {
  margin-top: 10px;
  width: 105px;
  float: left;
}
body {
  margin: 0px;
}
el-menu-item {
  font-size: 1.25rem;
}
.el-menu-demo {
  float: right;
  font-size: 1.25rem;
}
.el-header,
.el-footer {
  background-color: #343a40;
  color: #e8edf1;
  text-align: center;
  line-height: 60px;
}
.el-header {
  position: fixed;
  width: 100%;
  text-align: right;
  font-size: 1.25rem;
}
.el-main {
  background-color: #fff;
  color: #343a40;
  text-align: left;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
a {
  text-decoration: none;
  color: #fff;
}

.router-link-active {
  text-decoration: none;
}

.el-dropdown-link {
  cursor: pointer;
  color: #fff;
}
.el-icon-arrow-down {
  font-size: 20px;
}
</style>
