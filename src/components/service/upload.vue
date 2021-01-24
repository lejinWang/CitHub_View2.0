<template>
  <el-col :xs="{ span: 24, offset: 0 }" :sm="{ span: 24, offset: 0 }" :md="{ span: 6, offset: 0 }" :lg="{ span: 6, offset: 0 }" :xl="{ span: 6, offset: 0 }"> <serviceTypeList></serviceTypeList> </el-col>
  <el-col :xs="{ span: 24, offset: 0 }" :sm="{ span: 24, offset: 0 }" :md="{ span: 17, offset: 1 }" :lg="{ span: 17, offset: 1 }" :xl="{ span: 17, offset: 1 }">
    <div style="margin-bottom: 30px; width: 100%">
      <h1 style="font-size: 1.75rem; margin-top: 10px">Service Upload</h1>
      <p class="text-secondary">
        CitHub welcomes any individual or organisation to upload CIT services (testing tools). An explanation of the detailed requirements can be found <a href="ModuleOfHelp/contribution.html">here</a>. Inputs and outputs of services should also conform the <a href="" @click.prevent="">standard protocol</a> of CitHub.
      </p>
      <el-row>
        <el-col :span="1"><el-switch v-model="switchValue" active-color="#007bff" inactive-color="#e2e3e5" active-text="" @change="switchChange()"> </el-switch></el-col>
        <el-col :span="22" :offset="1"
          ><font style="color: #007bff; font-weight: bold">Deploy the service in your own machines</font>
          <p style="margin-top: 0px">Services will be uploaded and deployed in CitHub by default, where you need to prepare a Docker Hub Image of the service. You may also choose to provide URLs that points to the service deployed in any other machines.</p>
        </el-col>
      </el-row>
      <el-row>
        <el-form :model="serviceInfor" :label-position="top" :rules="rules">
          <el-row>
            <h5 class="h5Title">Basic Information</h5>
            <el-form-item style="margin: 0px">
              <el-col :span="11" style="margin-left:16px">
                <el-form-item label="Name" prop="title">
                  <el-input v-model="serviceInfor.title"></el-input>
                </el-form-item>
                <el-form-item label="Tags" prop="tags">
                  <el-input v-model="serviceInfor.tags"></el-input>
                </el-form-item>
                <el-form-item label="Type of Service" prop="type">
                  <el-select v-model="serviceInfor.type" placeholder="please choose service type" style="width: 100%">
                    <el-option label="Modeling" value="modeling"></el-option>
                    <el-option label="Generation" value="generation"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="5" :offset="1">
                <el-form-item label="Picture" prop="img" :rules="[{ required: true, message: 'name can not be null !' }]">
                  <el-upload style="width: 100%" class="avatar-uploader" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" :on-change="onImgChange" :auto-upload="false">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </el-form-item>
              </el-col>
            </el-form-item>
            <el-col :span="5" style="margin-left:16px">
              <el-form-item label="Version" prop="version">
                <el-input v-model="serviceInfor.version"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5" :offset="1">
              <el-form-item label="License" prop="license">
                <el-input v-model="serviceInfor.license"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11" :offset="1">
              <el-form-item label="Repository & Material" prop="repository">
                <el-input v-model="serviceInfor.repository"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-show="!switchValue">
            <h5 class="h5Title">Docker Image</h5>
            <el-col :span="23" style="margin-left:16px">
              <el-form-item label="Docker Hub Repository" prop="img_url">
                <p class="label_tips">CitHub will automatically pull the registered Docker image from the Docker Hub</p>
                <el-input v-model="serviceInfor.img_url"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row v-show="switchValue">
            <h5 class="h5Title">Service URL</h5>
            <el-col :span="23" style="margin-left:16px">
              <el-form-item label="Service URL" prop="url">
                <p class="label_tips">the URL that points to your service</p>
                <el-input v-model="serviceInfor.url"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <h5 class="h5Title">Descriptions</h5>
            <el-col :span="23" style="margin-left:16px">
              <el-form-item label="Abstract" prop="short_desc">
                <p class="label_tips">an abstract description of the service (~100 words)</p>
                <el-input type="textarea" v-model="serviceInfor.short_desc" maxlength="100" rows="6" show-word-limit> </el-input>
              </el-form-item>
              <el-form-item label="Detailed Description" prop="description">
                <p class="label_tips">a detailed explanation of functionalities, algorithms, and designs of the service</p>
                <el-input type="textarea" v-model="serviceInfor.description" rows="10"> </el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <h5 class="h5Title">Input and Output</h5>
            <el-col :span="23" style="margin-left:16px" >
            <div class="xputFormatForm">
              <el-form-item   label="Description of Service Input" >
                <p class="label_tips2">
                   <small id="2" class="form-text text-muted">
                    Each line indicates an input parameter, consisting of <span class="text-primary">parameter name</span>, <span class="text-primary">type of parameter</span>, <span class="text-primary">description</span>,<span class="text-primary">exemplary value</span> and
                    <span class="text-primary">detailed explanations.</span>
                  </small>
                </p>
                <el-row>
                  <el-col :span="2">Param</el-col><el-col :span="3" :offset="1">Type</el-col><el-col :span="5" :offset="1">Description</el-col><el-col :span="4" :offset="1">Example</el-col><el-col :span="3" :offset="1">Footnote</el-col><el-col :span="2" :offset="1">Option</el-col>
                  <div v-for="(item, index) in xputFormat.inputFormat" :key="index" style="margin-bottom: 10px">
                    <el-col :span="2"> <el-input v-model="item.param"></el-input></el-col
                    ><el-col :span="3" :offset="1" style="margin-bottom: 10px"
                      ><el-select v-model="item.type" style="width: 100%">
                        <el-option label="int" value="int"></el-option>
                        <el-option label="int[]" value="int[]"></el-option>
                        <el-option label="int[][]" value="int[][]"></el-option>
                        <el-option label="string" value="string"></el-option>
                        <el-option label="string[]" value="string[]"></el-option>
                        <el-option label="string[][]" value="string[][]"></el-option>
                        <el-option label="others" value="others"></el-option> </el-select></el-col
                    ><el-col :span="5" :offset="1" style="margin-bottom: 10px"><el-input v-model="item.description"></el-input></el-col>
                    <el-col :span="4" :offset="1" style="margin-bottom: 10px"><el-input v-model="item.example"></el-input></el-col>
                    <el-col :span="3" :offset="1" style="margin-bottom: 10px"><el-input v-model="item.footnote"></el-input></el-col
                    ><el-col :span="2" :offset="1" style="margin-bottom: 10px"><el-button type="danger" style="font-size: 1.2rem; margin-top: -5px" icon="el-icon-minus" @click="inputformat_remove(index)" circle></el-button></el-col>
                  </div>
                  <el-col :span="24" style="margin-top: 10px">
                    <el-button type="primary" style="font-size: 1.2rem" icon="el-icon-plus" @click="inputformat_add()" circle></el-button>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item  label="Description of Service Output">
                <p class="label_tips2">
                  <small id="2" class="form-text text-muted">
                    Similarly, each line indicates an output parameter, consisting of <span class="text-primary">parameter name</span>, <span class="text-primary">type of parameter</span>, <span class="text-primary">description</span>, <span class="text-primary">exemplary value</span> and
                    <span class="text-primary">detailed explanations.</span>
                  </small>
                </p>
                <el-row>
                  <el-col :span="2">Param</el-col><el-col :span="3" :offset="1">Type</el-col><el-col :span="5" :offset="1">Description</el-col><el-col :span="4" :offset="1">Example</el-col><el-col :span="3" :offset="1">Footnote</el-col><el-col :span="2" :offset="1">Option</el-col>
                  <div v-for="(item, index) in xputFormat.outputFormat" :key="index" style="margin-bottom: 10px">
                    <el-col :span="2" style="margin-bottom: 10px"> <el-input v-model="item.param"></el-input></el-col>
                    <el-col :span="3" :offset="1" style="margin-bottom: 10px"
                      ><el-select v-model="item.type" style="width: 100%">
                        <el-option label="int" value="int"></el-option>
                        <el-option label="int[]" value="int[]"></el-option>
                        <el-option label="int[][]" value="int[][]"></el-option>
                        <el-option label="string" value="string"></el-option>
                        <el-option label="string[]" value="string[]"></el-option>
                        <el-option label="string[][]" value="string[][]"></el-option>
                        <el-option label="others" value="others"></el-option> </el-select></el-col
                    ><el-col :span="5" :offset="1" style="margin-bottom: 10px"><el-input v-model="item.description"></el-input></el-col>
                    <el-col :span="4" :offset="1" style="margin-bottom: 10px"><el-input v-model="item.example"></el-input></el-col>
                    <el-col :span="3" :offset="1" style="margin-bottom: 10px"><el-input v-model="item.footnote"></el-input></el-col
                    ><el-col :span="2" :offset="1" style="margin-bottom: 10px"><el-button type="danger" style="font-size: 1.2rem; margin-top: -5px" icon="el-icon-minus" @click="outputformat_remove(index)" circle></el-button></el-col>
                  </div>
                  <el-col :span="24" style="margin-top: 10px">
                    <el-button type="primary" style="font-size: 1.2rem" icon="el-icon-plus" @click="outputformat_add()" circle></el-button>
                  </el-col>
                </el-row>
              </el-form-item>
            </div>
            </el-col>
          </el-row>
          <el-col :span="23" style="margin-left: 10px;">
            <el-form-item style="margin-top: 30px">
              <el-button type="primary" icon="el-icon-mouse" @click="submitForm('serviceInfor')">Submit</el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
    </div></el-col
  >
</template>

<script>
import * as service_common from "./common";
import serviceTypeList from "./typelist.vue";
import { reactive, ref } from "vue";
export default {
  setup() {
    let user = reactive({
      id: 1,
      name: "lejin",
    });
    let serviceInfor = reactive({
      id: 1,
      title: "1",
      type: "",
      img: "http://114.55.242.234:8686/CitHub/Ctest/serviceImg/12/13/c8020d7d-cceb-4f39-96d2-7fd9f5b1867facts.png",
      author: user.id,
      version: "1.0",
      time: service_common.getNowDate_Day(),
      short_desc: "",
      description: "",
      scores: null,
      tags: "",
      url: "",
      img_url: "",
      license: "",
      repository: "",
      input_format: ``,
      output_format: ``,
    });
    let switchValue = ref(true);
    let imageUrl = ref("");
    const switchChange = () => {};

    const rules = reactive({
      title: [
        { required: true, message: "please input name", trigger: "blur" },
        { min: 2, max: 10, message: "2~10 charactors", trigger: "blur" },
      ],
      tags: [{ required: true, message: "please input tag", trigger: "blur" }],
      type: [{ required: true, message: "please input name", trigger: "blur" }],
      version: [{ required: true, message: "please input version", trigger: "blur" }],
      short_desc: [
        { required: true, message: "please input short description", trigger: "blur" },
        { min: 10, max: 100, message: "10~20 charactors", trigger: "blur" },
      ],
      description: [
        { required: true, message: "please input description", trigger: "blur" },
        { min: 10, message: "10~ charactors", trigger: "blur" },
      ],
      url: [{ required: true, message: "please input url", trigger: "blur" }],
      img_url: [{ required: true, message: "please input image url", trigger: "blur" }],
      license: "",
      repository: "",
      input_format: [{ required: true }],
      output_format: [{ required: true }],
    });
    const xputFormat = reactive({
      inputFormat: [
        {
          param: "",
          type: "",
          description: "",
          example: "",
          footnote: "",
        },
      ],
      outputFormat: [
        {
          param: "",
          type: "",
          description: "",
          example: "",
          footnote: "",
        },
      ],
    });

    return { xputFormat, rules, imageUrl, switchValue, switchChange, serviceInfor, user };
  },
  methods: {
    //   handleAvatarSuccess(res, file) {
    //     this.imageUrl = URL.createObjectURL(file.raw);
    //     alert(this.imageUrl)
    //   },
    onImgChange(file) {
      file = file.raw;
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isGIF = file.type === "image/gif";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG && !isPNG && !isGIF) {
        this.$message.error("only jpeg(jpg)/png/gif !");
        return false;
      }
      if (!isLt2M) {
        this.$message.error("size limit 2MB!");
        return false;
      }
      this.imageUrl = URL.createObjectURL(file);
      console.log(this.imageUrl);
      return (isJPG || isPNG || isGIF) && isLt2M;
    },
    inputformat_add() {
      let tempformat = {
        param: "",
        type: "",
        description: "",
        example: "",
        footnote: "",
      };
      this.xputFormat.inputFormat.push(tempformat);
    },
    inputformat_remove(index) {
        if(this.xputFormat.inputFormat.length==1){
          this.$message.error("alreay last one !");
          return
      }
      this.xputFormat.inputFormat =
       this.xputFormat.inputFormat.filter((data, idx) => idx !== index);
    },
    outputformat_add() {
      let tempformat = {
        param: "",
        type: "",
        description: "",
        example: "",
        footnote: "",
      };
      this.xputFormat.outputFormat.push(tempformat);
    },
    outputformat_remove(index) {
      if(this.xputFormat.outputFormat.length==1){
          this.$message.error("alreay last one !");
          return
      }
      this.xputFormat.outputFormat = this.xputFormat.outputFormat.filter((data, idx) => idx !== index);
    },
  },
  components: { serviceTypeList },
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
.xputFormatForm{
    background: #fff;
}
.xputFormatForm>.el-form-item> label:before {
    content: "*";
    color: #F56C6C;
    margin-right: 4px;
}
</style>
