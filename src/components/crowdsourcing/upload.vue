<template>
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
      <h1 style="font-size: 1.75rem; margin-top: 10px">New Task</h1>
      <p class="text-secondary">
        Please be as detailed as possible when completing the following forms,
        so that others can easily understand and then work on your problem.
      </p>

      <el-row>
        <el-form
          :model="taskInfor.data"
          :label-position="top"
          :rules="rules"
          ref="ruleForm"
        >
          <el-row>
            <h5 class="h5Title">Basic Information</h5>
            <el-form-item style="margin: 0px">
              <el-col :span="11" style="margin-left: 16px">
                <el-form-item label="Name" prop="title">
                  <el-input v-model="taskInfor.data.title"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11" :offset="1">
                <el-form-item label="Tags" prop="tags">
                  <el-input v-model="taskInfor.data.tags"></el-input>
                </el-form-item>
              </el-col>
            </el-form-item>
          </el-row>

          <el-row>
            <h5 class="h5Title">Descriptions</h5>
            <el-col :span="23" style="margin-left: 16px">
              <el-form-item label="Detailed Description" prop="description">
                <!-- <p class="label_tips">a detailed explanation of functionalities, algorithms, and designs of the service</p> -->
                <el-input
                  type="textarea"
                  v-model="taskInfor.data.description"
                  rows="10"
                >
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-col :span="23" style="margin-left: 10px">
            <el-form-item style="margin-top: 30px">
              <el-button
                type="primary"
                icon="el-icon-mouse"
                @click="submitForm('ruleForm')"
                >Submit</el-button
              >
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
    </div></el-col
  >
</template>

<script>
import tagList from "./taglist.vue";
import { reactive } from "vue";
import {getNowDate_Day} from './common';
import {request} from './request'
export default {
  setup() {
    let taskInfor = reactive({
      data:{
      title: "",
      posterId: localStorage.getItem("userid"),
      date: getNowDate_Day(),
      description:
        "",
      tags: "",
    }});
    const rules = reactive({
      title: [
        { required: true, message: "please input title", trigger: "blur" },
        { min: 2, max: 10, message: "2~10 charactors", trigger: "blur" },
      ],
      tags: [{ required: true, message: "please input tag", trigger: "blur" }],
      description: [
        {
          required: true,
          message: "please input description",
          trigger: "blur",
        },
        { min: 10, message: "10~ charactors", trigger: "blur" },
      ],
    });
    return { taskInfor, rules };
  },
  components: { tagList },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        alert(valid);
        if (valid) {
          console.log(this.taskInfor.data);
        let res = request(
            {
              url: "crowdsourcing/infor/save",
              method: "post",
              data: this.taskInfor.data,
            },
            "crowdsourcingapi"
          );
          let that=this
          res.then(function(value){
             if(value.status){ 
             that.$message.success("upload success!");
             that.taskInfor.data={}
          }
          else{
            that.$message.error("upload error!");
          }
          console.log("upload", value);

          })
         
        } else {
          this.$message.error("please check your input !");
        }
      });
    },
  },
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.el-upload {
  margin-top: 10px;
}
.h5Title {
  color: #383d41;
  background-color: #e2e3e5;
  border-color: #d6d8db;
  position: relative;
  padding: 0.75rem 1.25rem;
  margin-bottom: 1rem;
  border: 1px solid transparent;
  border-radius: 0.25rem;
  font-size: 1rem;
  font-weight: 500;
}
.label_tips {
  float: left;
  display: block;
  padding: 0;
  margin-top: 0px;
  color: #6c757d;
  font-size: 0.2rem;
}
.label_tips2 {
  float: left;
  display: block;
  padding: 0;
  margin-top: 0px;
  color: #6c757d;
  font-size: 1rem;
  line-height: 2;
}
.text-primary {
  color: #409eff;
}
.xputFormatForm {
  background: #fff;
}
.xputFormatForm > .el-form-item > label:before {
  content: "*";
  color: #f56c6c;
  margin-right: 4px;
}
</style>
