<template>
  <div class="hello">
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
              Find<strong style="color: #17a2b8 !important" id="searchNum"> 1 </strong>
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
            <taskList ref="RefChilde" :taskListData="taskListData"></taskList>
          </el-col>
        </el-col>
      </el-row>
    </el-container>
  </div>
</template>

<script>
import { useRouter, useRoute } from "vue-router";
import { ref } from "vue";
import tagList from "./taglist.vue";
import taskList from "./tasklist.vue";
export default {
  setup() {
    const router = useRouter();
    const route = useRoute();
    const tag = ref(route.query.tag);
    //  alert(JSON.stringify(type))
    //  router.go(0);
    function goBack() {
      router.go(-1);
    }
    let data2 = {
      id: 1,
      title: "ACTS",
      author: "ligang",
      time: getNowDate(),
      description:
        "ACTS is a well-known combinatorial test suite generation tool. This tools was initially developed by NIST, and has been used in many real-world projects and organisations.",
      tags: "ss",
    };

    let taskListData = Array(20).fill(data2);
    console.log("加载index");
    let keyword = ref("");
    const RefChilde = ref(); //RefChilde 要和Son组件上的class名相同
    function searchByKeyword() {
      data2.title = keyword.value;
      tag.value = keyword.value;
      taskListData = Array(20).fill(data2);
    }

    return { tag, goBack, RefChilde, keyword, searchByKeyword, taskListData, data2 };
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
      this.data2.tags = this.tag;

      this.taskListData = Array(20).fill(this.data2);
    },
  },
};
function getNowDate() {
  let date = new Date();
  let y = date.getFullYear();
  let m = date.getMonth() + 1;
  let d = date.getDate();
  // let H = date.getHours();
  // let mm = date.getMinutes();
  // let s=date.getSeconds()
  m = m < 10 ? "0" + m : m;
  d = d < 10 ? "0" + d : d;
  // H = H < 10 ? "0" + H : H;
  return y + "-" + m + "-" + d;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
