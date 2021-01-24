<template>
  <el-container>
    <el-row>
      <el-col :xs="{ span: 24, offset: 0 }" :sm="{ span: 24, offset: 0 }" :md="{ span: 6, offset: 0 }" :lg="{ span: 6, offset: 0 }" :xl="{ span: 6, offset: 0 }">
        <tagList></tagList>      </el-col>
        <el-col :xs="{ span: 24, offset: 0 }" :sm="{ span: 24, offset: 0 }" :md="{ span: 17, offset: 1 }" :lg="{ span: 17, offset: 1 }" :xl="{ span: 17, offset: 1 }">       <div style="margin-bottom: 30px; width: 100%">
          <h2><strong style="color: #17a2b8 !important" id="searchNum">20</strong> tasks are asking for your innovation</h2>
          <p class="text-secondary">The crowdsourcing task in CitHub can be any problem that is related to Combinatorial Interaction Testing (CIT), such as service development, requirement elicitation, and algorithm design.</p>
          <el-row
            ><el-col :xs="{ span: 24, offset: 0 }" :sm="{ span: 24, offset: 0 }" :md="{ span: 19, offset: 0 }" :lg="{ span: 19, offset: 0 }" :xl="{ span: 19, offset: 0 }">
              <el-input placeholder="name, type, author and tags ..." v-model="keyword">
                <template #prefix>
                  <i class="el-input__icon el-icon-search"></i>
                </template>
              </el-input> </el-col
            ><el-col :xs="{ span: 24, offset: 0 }" :sm="{ span: 24, offset: 0 }" :md="{ span: 4, offset: 1 }" :lg="{ span: 4, offset: 1 }" :xl="{ span: 4, offset: 1 }"><el-button type="primary" icon="el-icon-search" style="width: 100%" @click="searchByKeyword">search</el-button></el-col></el-row
          >
        </div>
        <el-col :span="24">
         <taskList ref="RefChilde" :taskListData="taskListData"></taskList>
        </el-col>
      </el-col>
    </el-row>
  </el-container>
</template>

<script>
import { reactive, ref } from "vue";
import tagList from './taglist.vue';
import taskList from './tasklist.vue';
export default {
  setup() {
    // // const { ctx } = getCurrentInstance();
      let data = reactive({
      id:1,
      title: "ACTS",
      author: "ligang",
      time: getNowDate(),
      description: "ACTS is a well-known combinatorial test suite generation tool. This tools was initially developed by NIST, and has been used in many real-world projects and organisations.",
      tags: "generation,ACTS",
    });
    
    let taskListData= Array(20).fill(data)
    console.log("加载index")
    let keyword=ref("")
    const RefChilde = ref();     //RefChilde 要和Son组件上的class名相同
    function searchByKeyword(){
      data.title=keyword.value
      taskListData= Array(20).fill(data)
    
    }
    
    return { RefChilde,keyword,searchByKeyword ,taskListData};
  },
  components:{
   tagList,taskList
  }
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
