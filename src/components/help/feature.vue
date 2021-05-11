<template>
  <div>
    <h1 style="font-size:2rem;margin-top: 20px;font-weight: 500;"><i class="el-icon-copy-document"></i> Features of CitHub</h1>

   <p>
        <strong>CitHub</strong> provides the following features that reshape the way combinatorial interaction testing
        is done.
      </p>
<el-row :gutter="12">
  <el-col :span="12">
    <el-card shadow="always">
   <div class="card-body">
            <h5 class="card-title">Simple to Use</h5>
            <p class="card-text">Each testing tool is typically a web service with JSON input and output formats.
              A <em class="text-danger">demo</em> is also provided for each tool, where any people can try and
              play.</p>
            <a href="#" class="card-link">more ...</a>
   </div>
    </el-card>
  </el-col>


  <el-col :span="12">
    <el-card shadow="always">
   <div class="card-body">
            <h5 class="card-title">Rich Collections</h5>
            <p class="card-text">One promise of a software ecosystem is a rich collection of <em class="text-danger">
              software products</em>. Find the desirable services that perform any testing activity, and for any
              problem domain.</p>
            <a href="#" class="card-link">more ...</a>
          </div>
    </el-card>
  </el-col>


<el-col :span="12">
    <el-card shadow="always">

          <div class="card-body">
            <h5 class="card-title">Flexible Customisation</h5>
            <p class="card-text">Use <em class="text-danger">service customisation</em> to define your desirable
              testing workflow, either in sequence or parallel. A service composition language is also provided for the
              creation of any testing process.</p>
            <a href="#" class="card-link">more ...</a>
          </div>
    </el-card>
  </el-col>
  <el-col :span="12">
        <el-card shadow="always">
          <div class="card-body">
            <h5 class="card-title">Evaluation and Recommendation</h5>
            <p class="card-text">The performance of each service is evaluated under particular <em class="text-danger">
              benchmarks</em>. Compare different algorithms for future improvements, and identify the most suitable ones.</p>
            <a href="#" class="card-link">more ...</a>
          </div>
 </el-card>
  </el-col>
  <el-col :span="12">
    <el-card shadow="always">
          <div class="card-body">
            <h5 class="card-title">Communication and Collaboration</h5>
            <p class="card-text">A <em class="text-danger">review</em> component is provided for each service
              to create the communication channels between developers and users. Ask for world wide partners to submit
              solutions through the <em class="text-danger">crowdsourcing</em> platform.</p>
            <a href="#" class="card-link">more ...</a>
          </div>
    </el-card>
  </el-col>

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
.card-title{
  font-size:1.25rem;
  margin: 0;
  margin-bottom: .75rem;
}
.text-danger{
  color:#dc3545;
}
</style>
