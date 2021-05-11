<template>
  <el-lable class="labelStyle"><i class="el-icon-s-grid"></i> Type of Services</el-lable>
  <el-link
    :underline="false"
    v-for="(type, index) in typedata.types"
    :key="index"
    class="labelType"
    @click.prevent="typeClick(type)"
  >
    {{ type }}
  </el-link>
  <el-button
    type="primary"
    plain
    style="font-size: 1rem; font-weight: 500; width: 95%; margin-bottom: 10px"
    @click="customisationClick()"
    ><i class="iconfont icontianchongxing-"></i> Services Customisation</el-button
  >
  <el-button
    type="primary"
    plain
    style="font-size: 1rem; font-weight: 500; width: 95%; margin: 0px"
    @click="uploadClick()"
    ><i class="el-icon-upload"></i> Upload</el-button
  >
</template>

<script>
import { reactive,onMounted } from "vue";
import{getTypes} from "./common"
// import { useRouter } from 'vue-router';
export default {
  setup() {
    // const router=useRouter()
    console.log("加载typelist");
    //1.加载list
    onMounted(() => {
      let res=getTypes()
       res.then(function (result) {
         typedata.types=result.typelist
       })
      console.log('组件已挂载')
    })


    const typedata = reactive({
      types: [
        // "Modeling",
        // "Generation",
        // "Prioritisation",
        // "Selection & Reduction",
        // "Evaluation",
        // "Input & Output Connector",
        // "Other",
      ],
    });
    
    //点击相应的类型
    function typeClick(type) {
      // alert(type)
      window.router.push({ path: "/service_type", query: { type } });
      //  location. reload()
    }
    function uploadClick() {
      window.router.push({ path: "/service_upload" });
    }
    function customisationClick() {
      window.router.push({ path: "/service_customisation" });
    }
    return { customisationClick, uploadClick, typedata, typeClick,getTypes };
  },
  methods: {},
  components: {},
  watch: {
    // eslint-disable-next-line no-unused-vars
    // $route (to, from) {
    //   this.$router.go(0)
    // }
  },
};
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
.labelType {
  margin-bottom: 10px;
  display: block;
  padding: 0.5rem 1rem;
  font-size: 1rem !important;
  font-weight: 500;
   
  color: #007bff !important;
  margin: 0px;
  padding-top: 0;
  padding-bottom: 10px;
}
</style>
