<template>
        <el-container>
    <el-row style="width:100%">
      <el-col
        :xs="{ span: 24, offset: 0 }"
        :sm="{ span: 24, offset: 0 }"
        :md="{ span: 6, offset: 0 }"
        :lg="{ span: 6, offset: 0 }"
        :xl="{ span: 6, offset: 0 }"
      >
      <div style="margin-bottom: 30px; width: 100%;border:1px">
          <h2 style=" border: 1px solid #dfdfdf;width: 95%;border-bottom: 0px">
        <el-button :type=typeofbut1  @click="concept()"  class="buttonHelp" ><i class="el-icon-aim"></i> Concept</el-button>
          <el-button  :type=typeofbut2 @click="feature()"  class="buttonHelp" ><i class="el-icon-copy-document"></i> Feature</el-button>
            <el-button :type=typeofbut3  @click="contribution()"  class="buttonHelp" ><i class="el-icon-map-location"></i> Contribution</el-button>
              <el-button :type=typeofbut4  @click="development_team()"  class="buttonHelp" ><i class="el-icon-user-solid"></i> Development Team</el-button>
          </h2>
      </div>
      </el-col>
      <el-col
        :xs="{ span: 24, offset: 0 }"
        :sm="{ span: 24, offset: 0 }"
        :md="{ span: 17, offset: 1 }"
        :lg="{ span: 17, offset: 1 }"
        :xl="{ span: 17, offset: 1 }"
      >
      <router-view/>
      </el-col></el-row></el-container>
</template>


<script>
import {ref  } from 'vue';
export default {
 setup () {
     const typeofbut1=ref("primary");
     const typeofbut2=ref("");
     const typeofbut3=ref("");
     const typeofbut4=ref("");

   function concept(){
       typeofbut1.value="primary"
       typeofbut2.value=""
       typeofbut3.value=""
       typeofbut4.value=""
        window.router.push({ path: "/help" });
    }
    function feature(){
         typeofbut1.value=""
       typeofbut2.value="primary"
       typeofbut3.value=""
       typeofbut4.value=""
        window.router.push({ path: "/help/feature" });
    }
    function contribution(){
         typeofbut1.value=""
       typeofbut2.value=""
       typeofbut3.value="primary"
       typeofbut4.value=""
        window.router.push({ path: "/help/contribution" });
    }
    function development_team(){
         typeofbut1.value=""
       typeofbut2.value=""
       typeofbut3.value=""
       typeofbut4.value="primary"
        window.router.push({ path: "/help/development_team" });
    }

    return {typeofbut1,typeofbut2,typeofbut3,typeofbut4,concept,feature,contribution,development_team

    }

    
  },
  methods: {

  },
  components: {

  }
}
</script>

<style scoped>
.buttonHelp{
font-size: 1rem; font-weight: 500; width: 100%; margin: 0px 0px 0px 0px;
border-radius:0px;
/* background-color: white;
color:#495057; */
border: 0px;
    font-weight: 500;
    text-align: left;
    border-bottom: 1px solid #dfdfdf;
}

</style>
