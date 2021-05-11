<template>
<div>
      <h2 style="font-size:2rem;margin-top: 20px;font-weight: 500;"><i class="el-icon-user-solid"></i> Development Team</h2>

      <p>
        The CitHub project is developed and maintained by the <a href="http://gist.nju.edu.cn">Group in Software Testing (GIST)</a>
        at Department of Computer Science and Technology of Nanjing University. The main contributors include:
      </p>

    <el-row :gutter="12">
      <el-col :span="2">
          <el-avatar icon="el-icon-user-solid"></el-avatar>
      </el-col>
        <el-col :span="6">
          <h6>Huayao Wu</h6>
          <div class="text-secondary">Manage and Design</div>
          <div class="text-secondary"><i class="far fa-envelope pr-2"></i>hywu # outlook.com</div>
      </el-col>
  <el-col :span="2">
         <el-avatar icon="el-icon-user-solid"></el-avatar>
  </el-col>
        <el-col :span="8">
          <h6>Lejin Wang</h6>
          <div class="text-secondary">Development and Operation</div>
          <div class="text-secondary"><i class="far fa-envelope pr-2"></i>1728340273 # qq.com</div>
        </el-col>

      <p>
        Please do not hesitate to contact us if you encounter any problem when using this system. Comments and
        suggestions are warmly welcome. Thanks.
      </p>
    </el-row>


    </div>
</template>

<script>
import {  } from 'vue';
export default {
 setup () {
    return {

    }
  },
  methods: {

  },
  components: {

  }
}
</script>

<style scoped>
h6{
  margin: 0;
         margin-bottom: .5rem;
    font-weight: 500;
    line-height: 1.2;
    font-size: 1rem;
}
.text-secondary {
    color: #6c757d !important;
}
</style>
