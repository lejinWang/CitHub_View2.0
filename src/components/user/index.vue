<template>
  <el-row class="tac">
    <el-col
      :xs="{ span: 24, offset: 0 }"
      :sm="{ span: 24, offset: 0 }"
      :md="{ span: 6, offset: 0 }"
      :lg="{ span: 6, offset: 0 }"
      :xl="{ span: 6, offset: 0 }"
      style="
        background-color: #fff;
   
        border-radius: 3px;
      "
    >
         <!-- -webkit-box-shadow: 0 7px 25px rgba(0, 0, 0, 0.08); -->
        <!-- box-shadow: 0 13px 25px rgba(0, 0, 0, 0.08);  -->
      <el-menu
        default-active="1-1"
        class="el-menu-vertical-demo"
        @select="handleSelect"
        text-color="#909399"
        background-color="#343a40"
        active-text-color="#fff"
      >
        <el-submenu index="1">
          <template #title>
            <i class="el-icon-s-grid"></i>
            <span>User Profile</span>
          </template>
          <el-menu-item-group>
            <!-- <template #title>profile</template> -->
            <el-menu-item index="1-1"
              ><i class="iconfont iconyonghu iforIconfont"></i> Profile</el-menu-item
            >
            <el-menu-item index="1-2"
              ><i class="el-icon-s-comment"></i><span>Messages</span></el-menu-item
            >
            <el-menu-item index="1-3"
              ><i class="el-icon-star-on"></i><span>Star</span></el-menu-item
            >
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template #title>
            <i class="el-icon-s-grid"></i>
            <span>Content Management</span>
          </template>
          <el-menu-item-group>
            <!-- <template #title>Services</template> -->
            <el-menu-item index="2-1"
              ><i class="iconfont icontianchongxing- iforIconfont"></i>
              Services</el-menu-item
            >
            <el-menu-item index="2-2"
              ><i class="el-icon-s-order"></i> <span>Tasks</span></el-menu-item
            >
            <el-menu-item index="2-3"
              ><i class="el-icon-s-opportunity"></i> <span>Solutions</span></el-menu-item
            >
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-col>
    <el-col
      :xs="{ span: 24, offset: 0 }"
      :sm="{ span: 24, offset: 0 }"
      :md="{ span: 17, offset: 1 }"
      :lg="{ span: 17, offset: 1 }"
      :xl="{ span: 17, offset: 1 }"
    >
      <router-view />
    </el-col>
  </el-row>
</template>

<script>
import {} from "vue";
export default {
  setup() {},
  methods: {
    // eslint-disable-next-line no-unused-vars
    handleSelect(key, keyPath) {
      switch (key) {
        case "1-1": {
          this.$router.push({ path: "/user" });
          break;
        }
        case "1-2": {
          this.$router.push({ path: "/user/message" });
          break;
        }
        case "1-3": {
          this.$router.push({ path: "/user/star" });
          break;
        }
        case "2-1": {
          this.$router.push({ path: "/user/services" });
          break;
        }
        case "2-2": {
          this.$router.push({ path: "/user/tasks" });
          break;
        }
        case "2-3": {
          this.$router.push({ path: "/user/solutions" });
          break;
        }
      }
    },
  },
  components: {},
};
</script>

<style scoped>
.iforIconfont {
  vertical-align: middle;
  margin-right: 5px;
  margin-left: 3px;
  width: 24px;
  text-align: center;
  font-size: 16px;
}
</style>
