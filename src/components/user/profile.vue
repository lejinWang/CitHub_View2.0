<template>
  <el-row>
    <el-col :span="18">
      <h2 id="nickName">{{ userData.username }}</h2>
      <h5 class="text-secondary" id="institution">{{ userData.institution }}</h5>
      <p class="text-secondary">
        <a :href="userData.homepage">homepage</a> |
        <span id="email">{{ userData.email }}</span>
      </p>
      <p id="introduction">
        {{ userData.introduction }}
      </p>
      <p id="tags">
        <el-tag
          v-for="item in userData.tags.split(',')"
          :key="item"
          effect="dark"
          style="
            margin-right: 10px;
            height: 20px;
            font-size: 10px;
            padding: 0px 5px 2px;
            display: unset;
            background-color: #28a745;
          "
        >
          {{ item }}
        </el-tag>
      </p>
      <p class="userDesc">
        Contributes to
        <strong class="text-dark" id="userServiceNum">{{ userData.servicesNum }}</strong>
        services,
        <strong class="text-dark" id="userTaskNum">{{ userData.taskNum }}</strong>
        crowdsourcing tasks, and
        <strong class="text-dark" id="userSolutionNum">{{ userData.solutionNum }}</strong>
        crowdsourcing solutions, since
        <span class="text-dark" id="nowDate">2020-12-14</span>.
      </p>
    </el-col>

    <el-col :span="6">
      <div>
        <img src="" />
      </div>
      <!-- <el-button @click="dialogFormVisible = true">Edit Profile</el-button> -->

      <!-- <el-dialog title="Modify user information" v-model="dialogFormVisible">
        <el-form :model="userData">
          <el-form-item label="UserName" :label-width="formLabelWidth">
            <el-input v-model="userData.username" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
          </span>
        </template>
      </el-dialog> -->
    </el-col>
  </el-row>
</template>

<script>
import { reactive } from "vue";
export default {
  setup() {
    const userData = reactive({
      userid: 1,
      username: "gist",
      password: "124578aB",
      email: "1728340273@qq.com",
      tags: "generation,coding",
      institution: "Nanjin University",
      homepage: "http://gist.nju.edu.cn/",
      introduction:
        "GIST is interested in software testing theory, methods, empirical study, application and education",
      starServices: getNumOfStar(),
      servicesNum: getNumOfService(),
      taskNum: getNumOfTask(),
      solutionNum: getNumOfSolution(),
    });
    function getNumOfStar() {
      return 7;
    }
    function getNumOfService() {
      return 7;
    }
    function getNumOfTask() {
      return 7;
    }
    function getNumOfSolution() {
      return 7;
    }
    return { userData, getNumOfStar, getNumOfService, getNumOfTask, getNumOfSolution };
  },
  methods: {},
  components: {},
};
</script>

<style scoped>
h2,
h5 {
  margin: 0;
  font-weight: 500;
}
h2 {
  font-size: 2rem;
}
h5 {
  font-size: 1.25rem;
}
.text-secondary {
  color: #6c757d !important;
}
.userDesc {
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  text-align: left;
  box-sizing: border-box;
  margin-top: 0;
  position: relative;
  padding: 0.75rem 1.25rem;
  margin-bottom: 1rem;
  border: 1px solid transparent;
  border-radius: 0.25rem;
  color: #0c5460;
  background-color: #d1ecf1;
  border-color: #bee5eb;
}
</style>
