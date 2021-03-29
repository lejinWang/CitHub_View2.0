<template>
  <el-container>
    <el-row>
      <el-col
        :xs="{ span: 24, offset: 0 }"
        :sm="{ span: 24, offset: 0 }"
        :md="{ span: 6, offset: 0 }"
        :lg="{ span: 6, offset: 0 }"
        :xl="{ span: 6, offset: 0 }"
      >
        <tagList></tagList>
      </el-col>
      <el-col
        :xs="{ span: 24, offset: 0 }"
        :sm="{ span: 24, offset: 0 }"
        :md="{ span: 17, offset: 1 }"
        :lg="{ span: 17, offset: 1 }"
        :xl="{ span: 17, offset: 1 }"
      >
        <div style="margin-bottom: 30px; width: 100%">
          <h2>
            <strong style="color: #17a2b8 !important" id="searchNum">{{
              taskListData.list.length
            }}</strong>
            tasks are asking for your innovation
          </h2>
          <p class="text-secondary">
            The crowdsourcing task in CitHub can be any problem that is related
            to Combinatorial Interaction Testing (CIT), such as service
            development, requirement elicitation, and algorithm design.
          </p>
          <el-row
            ><el-col
              :xs="{ span: 24, offset: 0 }"
              :sm="{ span: 24, offset: 0 }"
              :md="{ span: 19, offset: 0 }"
              :lg="{ span: 19, offset: 0 }"
              :xl="{ span: 19, offset: 0 }"
            >
              <el-input
                placeholder="name, type, author and tags ..."
                v-model="keyword"
              >
                <template #prefix>
                  <i class="el-input__icon el-icon-search"></i>
                </template>
              </el-input> </el-col
            ><el-col
              :xs="{ span: 24, offset: 0 }"
              :sm="{ span: 24, offset: 0 }"
              :md="{ span: 4, offset: 1 }"
              :lg="{ span: 4, offset: 1 }"
              :xl="{ span: 4, offset: 1 }"
              ><el-button
                type="primary"
                icon="el-icon-search"
                style="width: 100%"
                @click="searchByKeyword"
                >search</el-button
              ></el-col
            ></el-row
          >
        </div>
        <el-col :span="24">
          <taskList
            ref="RefChilde"
            :taskListData="taskListData.list"
          ></taskList>
        </el-col>
      </el-col>
    </el-row>
  </el-container>
</template>

<script>
import { reactive, ref, onMounted } from "vue";
import tagList from "./taglist.vue";
import taskList from "./tasklist.vue";
import { getUserName, getDateFromTime_Day } from "./common";
import { request } from "./request";
export default {
  setup() {
    onMounted(() => {
      // eslint-disable-next-line no-unused-vars
      let res = getTaskListByKeyWord(keyword.value);
      res.then(function (data) {
        console.log(data.list);
        dealData(data.list);
      });
      console.log("初始化数据");
    });
    // // const { ctx } = getCurrentInstance();
    let taskListData = reactive({ list: [] });
    console.log("加载index");
    let keyword = ref("");
    const RefChilde = ref(); //RefChilde 要和Son组件上的class名相同
    function searchByKeyword() {
      console.log("搜索数据");
      let res = getTaskListByKeyWord(keyword.value);
      res.then(function (data) {
        console.log(data.list);
        dealData(data.list);
      });
    }
    function getTaskListByKeyWord(keyword) {
      // alert(keyword)
      if (keyword == "") {
        return request(
          {
            url: "/crowdsourcing/infor/list",
            method: "get",
            data: {},
          },
          "/crowdsourcingapi"
        );
      } else {
        return request(
          {
            url: "/crowdsourcing/infor/searchByKeyword/" + keyword,
            method: "get",
            data: {},
          },
          "/crowdsourcingapi"
        );
      }
    }
    const dealData = (tasklist) => {
      taskListData.list = tasklist;
      for (var i = 0; i < taskListData.list.length; i++) {
        let res = getUserName(tasklist[i].posterId);
        let b = i;
        res.then(function (value) {
          console.log(value.username);
          console.log(taskListData.list[b]);
          eval("taskListData.list[b].author='" + value.username + "'");
        });
        taskListData.list[i].date = getDateFromTime_Day(
          taskListData.list[i].date
        );
      }
    };

    return { RefChilde, keyword, searchByKeyword, taskListData };
  },
  components: {
    tagList,
    taskList,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.float-right {
  float: right;
}
body {
  margin: 0px;
}
a {
  text-decoration: none;
}

.router-link-active {
  text-decoration: none;
}
</style>
