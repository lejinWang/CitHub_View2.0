<template>
    <el-container>
      <el-row style="    width: 100%;">
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
          <!-- <el-page-header @click="goBack" :content="type" style="margin-top: 15px;weight:400;">
</el-page-header>-->
          <div style="margin-bottom: 30px; width: 100%">
            <h2>
              <strong style="color: #17a008 !important" id="searchNum"
                >#{{ tag }}
              </strong>
              tasks
            </h2>
            <p class="text-secondary">
              Find <strong style="color: #17a2b8 !important" id="searchNum">  {{ taskListData.list.length}} </strong>
              task of this tag.
            </p>
            <el-row
              ><el-col
                :xs="{ span: 24, offset: 0 }"
                :sm="{ span: 24, offset: 0 }"
                :md="{ span: 19, offset: 0 }"
                :lg="{ span: 19, offset: 0 }"
                :xl="{ span: 19, offset: 0 }"
              >
                <el-input placeholder="name, type, author and tags ..." v-model="keyword">
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
            <taskList ref="RefChilde" :taskListData="taskListData.list"></taskList>
          </el-col>
        </el-col>
      </el-row>
    </el-container>
</template>

<script>
import { useRouter, useRoute } from "vue-router";
import { ref,onMounted ,reactive} from "vue";
import tagList from "./taglist.vue";
import taskList from "./tasklist.vue";
import {request} from './request'
import { getUserName,getDateFromTime_Day } from "./common";
export default {
  setup() {
     onMounted(() => {
      // eslint-disable-next-line no-unused-vars
      let res = getTaskListByTag(tag.value);
      res.then(function (data) {
        console.log(data.list);
        dealData(data.list);
      });
      console.log("初始化数据");
    });
    const router = useRouter();
    const route = useRoute();
    const tag = ref(route.query.tag);
    //  alert(JSON.stringify(type))
    //  router.go(0);
    function goBack() {
      router.go(-1);
    }
   //1.需要展示的数据
    let taskListData = reactive({ list: [] });
    console.log("加载index");
    let keyword = ref("");
    const RefChilde = ref(); //RefChilde 要和Son组件上的class名相同
    function searchByKeyword() {
      console.log("搜索数据");
      let res = getTaskListByTagAndKeyWord(tag.value,keyword.value);
      res.then(function (data) {
        console.log(data.list);
        dealData(data.list);
      });
     
    }

    function getTaskListByTagAndKeyWord(tag,keyword) {
      // alert(keyword)
      if (keyword == "") {
        return getTaskListByTag()
      } else {
        return request(
          {
            url: "/service/infor/searchByTagAndKeyword/" + tag+"/"+keyword,
            method: "get",
            data: {},
          },
          "/serviceapi"
        );
      }
    }
    const dealData=(tasklist)=>{
      taskListData.list=tasklist
       for (var i = 0; i < taskListData.list.length; i++) {
        let res = getUserName(tasklist[i].posterId);
        let b = i;
        res.then(function (value) {
          console.log(value.username);
          console.log(taskListData.list[b]);
          eval("taskListData.list[b].author='" + value.username + "'");
        });
        taskListData.list[i].date=getDateFromTime_Day(taskListData.list[i].date)
      }

    }
function getTaskListByTag(tag) {
  // alert(keyword)
    return request(
      {
        url: "/crowdsourcing/infor/searchByTag/" + tag,
        method: "get",
        data: {},
      },
      "/crowdsourcingapi"
    );
  
}
    return { getTaskListByTag,dealData,tag, goBack, RefChilde, keyword, searchByKeyword, taskListData };
  },
  components: {
    tagList,
    taskList,
  },
  watch: {
    // eslint-disable-next-line no-unused-vars
    $route(to, from) {
      console.log(this);
       this.tag = this.$route.query.tag;
      // this.data.tags = this.type;
     let res= this.getTaskListByTag(this.tag)
     let that=this
      res.then(function (data) {
        console.log(data.list);
        that.dealData(data.list);
      });
    },
  },
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
