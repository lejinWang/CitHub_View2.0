<template>
  <el-lable class="labelStyle"><i class="el-icon-s-grid"></i> Tag of tasks</el-lable>
        <el-link :underline="false" v-for="(tag, index) in tagdata.tags" :key="index" class="labeltag" @click.prevent="tagClick(tag)">
          {{ tag }}
        </el-link>
        <el-button type="primary" plain style="font-size: 1rem; font-weight: 500; width: 95%; margin: 0px" @click="uploadClick()"><i class="el-icon-upload"></i> New Task</el-button>
</template>

<script>
import { reactive ,onMounted} from 'vue';
// import { useRouter } from 'vue-router';
import{getTags} from "./common"
export default {
 setup () {
    //1.加载list
    onMounted(() => {
      let res=getTags()
       res.then(function (result) {
         tagdata.tags=result.taglist
       })
    })
    // const router=useRouter()
    console.log("加载taglist")
    const tagdata = reactive({
      tags: [ "Generation", "Locating Array"],
    });
    function tagClick(tag) {
        // alert(tag)
     window.router.push({ path: "/task_tag", query: { tag } })
    //  location. reload()
    }
    function uploadClick(){
       window.router.push({ path: "/task_upload" })
    }
    return {uploadClick,tagdata ,tagClick}
    
  },
  methods: {

  },
  components: {

  },
  watch: {
    // eslint-disable-next-line no-unused-vars
    // $route (to, from) {
    //   this.$router.go(0)
    // }
  }
}
</script>

<style scoped>
.labelStyle {
  margin: 10px;
  display: block;
  padding: 0.3rem;
  font-size: 1rem;
  font-weight: 750;
  color: #343a40 !important;
}
.labeltag {
  margin-bottom: 10px;
  display: block;
  padding: 0.5rem 1rem;
  font-size: 1rem !important;
  font-weight: 500;
  line-height: 0.5;
  color: #007bff !important;
}
</style>
