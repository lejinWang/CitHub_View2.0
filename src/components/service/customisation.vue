<template>
  <el-col
    :xs="{ span: 24, offset: 0 }"
    :sm="{ span: 24, offset: 0 }"
    :md="{ span: 6, offset: 0 }"
    :lg="{ span: 6, offset: 0 }"
    :xl="{ span: 6, offset: 0 }"
  >
    <serviceTypeList></serviceTypeList>
  </el-col>
  <el-col
    :xs="{ span: 24, offset: 0 }"
    :sm="{ span: 24, offset: 0 }"
    :md="{ span: 17, offset: 1 }"
    :lg="{ span: 17, offset: 1 }"
    :xl="{ span: 17, offset: 1 }"
  >
    <div style="margin-bottom: 30px; width: 100%">
      <h1 style="font-size: 1.75rem; margin-top: 10px">
        Service Customisation
      </h1>
      <p class="text-secondary" style="">
        Service composition enables an agile and dynamic way to develop and grow
        software. Different services in CitHub can be combined together to
        accomplish particular testing processes.
      </p>

      <el-steps
        :active="active"
        finish-status="success"
        simple
        style="margin-top: 20px; box-shadow: 2px 2px 5px #9696964d"
      >
        <el-step title="Step 1"></el-step>
        <el-step title="Step 2"></el-step>
        <el-step title="Step 3"></el-step>
      </el-steps>
 <!-- Step 1 -->
      <el-col :span="24" v-show="active == 0">
        <h2 style="margin-top: 30px">Step 1: Determine Workflow</h2>
        <p class="simpleText">
          Please select from the following two common testing workflows ...
        </p>
        <el-col
          :span="11"
          v-for="(item, index) in customisationData.stepOne"
          :key="index"
          :offset="index > 0 ? 2 : 0"
          style=""
        >
          <div style="box-shadow: 2px 2px 5px #9696964d" class="grid-content">
            <h2 style="margin: 0px 10px">{{ item.type }}</h2>
            <div style="padding: 10px">
              <p class="text-secondary" style="height: 162px">
                {{ item.desc }}
              </p>
              <div>
                <el-button
                  v-show="!item.selected"
                  type="primary"
                  style="width: 100%; font-size: 1rem"
                  @click="chooseType(index)"
                  plain
                  >select</el-button
                >
                <el-button
                  v-show="item.selected"
                  type="primary"
                  style="width: 100%; margin-left: 0px; font-size: 1rem"
                  @click="chooseType(index)"
                  >select</el-button
                >
              </div>
            </div>
          </div>
        </el-col>
      </el-col>
      <!-- Step 2 -->
      <el-col
        :span="24"
        v-show="active == 1 && customisationData.stepOne[0].selected"
        style="border: 2px;width: 100%;"
      >
        <h2 style="margin-top: 30px">Step 2: Identify Services</h2>
        <p class="simpleText">
          Please identify the services that will be assembled ...
        </p>

        <el-col :span="24" style="width: 100%;"
          ><div class="grid-content"><b>Sequence Workflow</b></div></el-col
        >
        <el-col
          :span="24"
          style="
            float: left;
            height: auto;
            padding-top: 0px;
            box-shadow: 2px 2px 5px #9696964d;
          "
          class="grid-content"
        >
          <div
            v-for="(item, index) in serviceList.Sequence"
            :key="index"
            style="float: left; margin-top: 25px; margin-left: 15px"
          >
            <i class="iconfont icontianchongxing-"></i>
            <p class="btnTitle">{{ item.title }}</p>
            <el-button
              type="text"
              class="removeBtn"
              icon="iconfont iconjianhao"
              @click="removeFunc(index)"
            ></el-button>
            <i class="iconfont iconV"></i>
          </div>
          <el-button
            type="text"
            class="plusBtn"
            icon="iconfont iconjiahao"
            @click="addFunc"
          ></el-button>
        </el-col>
      </el-col>

      <el-col
        :span="24"
        v-show="active == 1 && customisationData.stepOne[1].selected" style="width: 100%;"
      >
        <h2 style="margin-top: 30px">Step 2: Identify Services</h2>
        <p class="simpleText">
          Please identify the services that will be assembled ...
        </p>

        <el-col :span="24" style="width: 100%;"
          ><div class="grid-content"><b>Parallel Workflow</b></div></el-col
        >
        <el-col
          :span="24"
          style="
            float: left;
            height: auto;
            padding-top: 0px;
            box-shadow: 2px 2px 5px #9696964d;
          "
          class="grid-content"
        >
          <div
            v-for="(item, index) in serviceList.Parallel"
            :key="index"
            style="float: left; margin-top: 25px; margin-left: 15px"
          >
            <i class="iconfont icontianchongxing-"></i>
            <p class="btnTitle">{{ item.title }}</p>
            <el-button
              type="text"
              class="removeBtn"
              icon="iconfont iconjianhao"
              @click="removeFunc(index)"
            ></el-button>
            <i class="iconfont icontubiaozhizuo-"></i>
          </div>
          <el-button
            type="text"
            class="plusBtn"
            icon="iconfont iconjiahao"
            @click="addFunc"
          ></el-button>
        </el-col>
      </el-col>
<!-- Step 3 -->
      <el-col
        :span="24"
        v-show="active == 2 && customisationData.stepOne[0].selected"
      >
        <h2 style="margin-top: 30px">Step 3: Service Execution</h2>
        <p class="simpleText">
          Simply type in the inputs and click the submit button to obtain the
          results ...
        </p>
        <el-col :span="24"
          ><div class="grid-content"><b>Sequence Workflow</b></div></el-col
        >
        <el-col
          :span="24"
          style="
            float: left;
            height: auto;
            padding-top: 0px;
            box-shadow: 2px 2px 5px #9696964d;
          "
          class="grid-content"
        >
          <div
            v-for="(item, index) in serviceList.Sequence"
            :key="index"
            style="float: left; margin-top: 25px; margin-left: 15px"
          >
            <i class="iconfont icontianchongxing-"></i>
            <p class="btnTitle">{{ item.title }}</p>
            <i
              class="iconfont iconV"
              style="margin-left: 18px"
              v-show="index != serviceList.Sequence.length - 1"
            ></i>
          </div>
        </el-col>
      </el-col>

      <el-col
        :span="24"
        v-show="active == 2 && customisationData.stepOne[1].selected"
      >
        <h2 style="margin-top: 30px">Step 3: Service Execution</h2>
        <p class="simpleText">
          Simply type in the inputs and click the submit button to obtain the
          results ...
        </p>
        <el-col :span="24"
          ><div class="grid-content"><b>Parallel Workflow</b></div></el-col
        >
        <el-col
          :span="24"
          style="
            float: left;
            height: auto;
            padding-top: 0px;
            box-shadow: 2px 2px 5px #9696964d;
          "
          class="grid-content"
        >
          <div
            v-for="(item, index) in serviceList.Parallel"
            :key="index"
            style="float: left; margin-top: 25px; margin-left: 15px"
          >
            <i class="iconfont icontianchongxing-"></i>
            <p class="btnTitle">{{ item.title }}</p>
            <i
              class="iconfont icontubiaozhizuo-"
              style="margin-left: 18px"
              v-show="index != serviceList.Parallel.length - 1"
            ></i>
          </div>
        </el-col>
      </el-col>
      <el-col :span="24" v-show="active == 2">
        <h2 style="margin-top: 30px">
          Inputs<font style="color: grey; font-weight: 200; font-size: 1.2rem">
            (in JSON format)</font
          >
        </h2>
        <vue-json-editor
          :value="inputFormatForCom.data"
          :showBtns="false"
          :mode="'code'"
          lang="en"
          height="500px"
          @json-change="onInputJsonChange"
          @json-save="onInputJsonSave"
        />
        <el-button
          type="primary"
          icon="el-icon-mouse"
          style="margin-top: 30px"
          @click="useService"
          >Submit</el-button
        >
        <el-alert v-show="notice.data.show"
    :title="notice.data.title"
    :type="notice.data.type"
    style="    margin-top: 20px;
    height: 47px;"  show-icon>

  </el-alert>
        <h2 style="margin-top: 30px">
          Outputs<font style="color: grey; font-weight: 200; font-size: 1.2rem">
            (in JSON format)</font
          >
        </h2>
        <vue-json-editor
          :value="outputFormatForCom.data"
          :showBtns="false"
          :mode="'code'"
          lang="en"
          height="500px"
          @json-change="onoutputJsonChange"
          @json-save="onoutputJsonSave"
        />
      </el-col>

      <div class="clearfix"></div>
      <el-col :span="24" style="float: left; padding-top: 0px; width:100%;">
        <el-button
          :disabled="active == 2"
          style="float: right; margin-top: 10px"
          @click="next"
          >next</el-button
        >
        <el-button
          :disabled="active == 0"
          style="float: left; margin-top: 10px; margin-left: 0"
          @click="previous"
          >previous</el-button
        >
      </el-col>
    </div>
  </el-col>

  <el-dialog
    title="select services"
    v-model="chooseDialog.show"
    width="630px"
    top="10"
    style="height: 429px"
    custom-class="dailogbody"
  >
    <el-form :model="chooseDialog" :label-position="top">
      <el-col :span="11">
        <el-form-item label="Service Type: " :label-width="formLabelWidth">
          <el-select
            v-model="chooseDialog.serviceChooseType"
            placeholder=""
            style="width: 90%"
            @change="onChooseType"
          >
            <el-option
              v-for="(item, index) in chooseDialog.serviceType"
              :key="index"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="11" :offset="0" style="height: 237px; overflow: auto">
        <a
          href="#"
          @click.prevent="addService(service)"
          v-for="service in serviceListType.data"
          :key="service.title"
          ><div
            class="grid-content"
            style="
              float: left;
              height: 30px;
              margin-top: 1px;
              width: 84%;
              background-color: #fff;
            "
          >
            <img
              style="float: left"
              :src="service.img"
              width="30"
              height="30"
            />
            <b style="float: left; margin-left: 10px; margin-top: 5px">{{
              service.title
            }}</b>
          </div></a
        >
      </el-col>
    </el-form>
    <template #footer>
      <span class="dialog-footer" style="margin-top: 20px">
        <el-button @click="chooseDialog.show = false">EXIT</el-button>
        <el-button type="primary" @click="chooseDialog.show = false"
          >OK</el-button
        >
      </span>
    </template>
  </el-dialog>
  <!--
  <el-drawer title="select services" v-model="chooseShow" modal="false" direction="rtl" size="320px" destroy-on-close>
    <el-form :model="chooseDialog" :label-position="top">
      <el-row style="margin-left: 20px">
        <el-col :span="22">
          <el-form-item label="Service Type: ">
            <el-select v-model="chooseDialog.serviceChooseType" placeholder="" style="width: 90%">
              <el-option v-for="(item, index) in chooseDialog.serviceType" :key="index" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row style="margin-top: 32px">
        <el-col :span="22" :offset="0" style="overflow: auto">
          <a href="#" @click.prevent="addService"
            ><div class="grid-content" style="float: left; height: 30px; margin-top: 1px; width: 86%; background-color: #fff">
              <img style="float: left" src="http://114.55.242.234:8686/CitHub/Ctest/serviceImg/input.png" width="30" height="30" />
              <b style="float: left; margin-left: 10px; margin-top: 5px">ACTS Format Reader</b>
            </div></a
          >
        </el-col>
      </el-row>
    </el-form>
  </el-drawer>-->
</template>
<script>
import { onMounted, reactive, ref } from "vue";
import serviceTypeList from "./typelist.vue";
import * as service_common from "./common";
import vueJsonEditor from "vue-json-editor";
import {request} from "./request"
export default {
  setup() {
    onMounted(() => {
      //0.初始化
      serviceList.Sequence = [];
      serviceList.Parallel = [];
      //1.获取类型
      let res = service_common.getTypes();
      res.then(function (result) {
        chooseDialog.serviceType = result.typelist;
        onChooseType(result.typelist[0]);
      });
    });
    const customisationData = reactive({
      stepOne: [
        {
          type: "Sequence",
          desc:
            "A sequence workflow allows you to assemble a set of services and execute them exactly one after another (for example, it can be used to first generate a test suite, and then reorder its execution sequence to maximise the rate of combination coverage).",
          selected: true,
        },
        {
          type: "Parallel",
          desc:
            "A Parallel workflow allows you to assemble a set of services and execute them at the same time (for example, it can be used to evaluate the performance of several test suite generation services under the same subject test model).",
          selected: false,
        },
      ],
    });
    //setp1
    const chooseType = (index) => {
      customisationData.stepOne[index].selected = true;
      if (index == 0) {
        customisationData.stepOne[1].selected = false;
        serviceList.Parallel = [];
      } else {
        customisationData.stepOne[0].selected = false;
        serviceList.Sequence = [];
      }
      serviceList.serviceId=[]
    };
    const active = ref(0);
    //setp2
    const chooseShow = ref(false);
    const chooseDialog = reactive({
      show: false,
      serviceType: ["Modeling", "Generation"],
      serviceChooseType: "Modeling",
    });
    const serviceListType = reactive({
      data: [
        {
          id: 1,
          title: "ACTS",
          img:
            "https://findicons.com/files/icons/2787/beautiful_flat_icons/128/hourglass.png",
          author: "ligang",
          version: "1.0",
          time: "2020.09.01",
        },
      ],
    });

    const serviceList = reactive({
      serviceId:[],
      Sequence: [
        {
          id: 1,
          title: "ACTS",
          img:
            "http://114.55.242.234:8686/CitHub/Ctest/serviceImg/12/13/c8020d7d-cceb-4f39-96d2-7fd9f5b1867facts.png",
          author: "ligang",
          version: "1.0",
          time: "2020.09.01",
        },
        {
          id: 2,
          title: "CASA",
          img:
            "http://114.55.242.234:8686/CitHub/Ctest/serviceImg/12/13/c8020d7d-cceb-4f39-96d2-7fd9f5b1867facts.png",
          author: "ligang",
          version: "1.0",
          time: "2020.09.01",
        },
      ],
      Parallel: [
        {
          id: 1,
          title: "ACTS",
          img:
            "http://114.55.242.234:8686/CitHub/Ctest/serviceImg/12/13/c8020d7d-cceb-4f39-96d2-7fd9f5b1867facts.png",
          author: "ligang",
          version: "1.0",
          time: "2020.09.01",
        },
        {
          id: 2,
          title: "CASA",
          img:
            "http://114.55.242.234:8686/CitHub/Ctest/serviceImg/12/13/c8020d7d-cceb-4f39-96d2-7fd9f5b1867facts.png",
          author: "ligang",
          version: "1.0",
          time: "2020.09.01",
        },
      ],
    });
    let temdata = {
      id: 2,
      title: "CASA",
      img:
        "http://114.55.242.234:8686/CitHub/Ctest/serviceImg/12/13/c8020d7d-cceb-4f39-96d2-7fd9f5b1867facts.png",
      author: "ligang",
      version: "1.0",
      time: "2020.09.01",
    };
    const onChooseType = (value) => {
      let res = service_common.getServiceListByType(value);
      res.then(function (data) {
        serviceListType.data = data.list;
      });
    };
    const addFunc = () => {
      chooseDialog.show = true;
      chooseShow.value = true;

      // customisationData.stepOne[0].selected?serviceList.Sequence=service_common.list_add(serviceList.Sequence,temdata)
      // :serviceList.Parallel=service_common.list_add(serviceList.Parallel,temdata)
    };
    const addService = (value) => {
      console.log(value);
      temdata = value;
      customisationData.stepOne[0].selected
        ? (serviceList.Sequence = service_common.list_add(
            serviceList.Sequence,
            temdata
          ))
        : (serviceList.Parallel = service_common.list_add(
            serviceList.Parallel,
            temdata
          ));

      serviceList.serviceId.push(value.id)
    };
    const removeFunc = (index) => {
      // alert(index)
      customisationData.stepOne[0].selected
        ? (serviceList.Sequence = service_common.list_remove(
            serviceList.Sequence,
            index
          ))
        : (serviceList.Parallel = service_common.list_remove(
            serviceList.Parallel,
            index
          ));
      serviceList.serviceId=service_common.list_remove(serviceList.serviceId,index);
    };
    const inputFormatForCom = reactive({
      data: {
        strength: 2,
        parameter: 3,
        values: [2, 5, 3],
        constraints: [
          ["0/0", "1/0"],
          ["0/0", "1/1"],
          ["0/0", "1/2"],
          ["0/0", "1/3"],
        ],
      },
    });
    const outputFormatForCom = reactive({
      data: {
        testsuite: [[0, 0, 0]],
        size: 8,
        time: "12",
      },
    });


    const notice=reactive({
      data:{
        show:false,
        type:"warning",
        title:"Runing"
      }
    })
    const useService = () => {
      notice.data.show=true
      notice.data.title="Runing"
      notice.data.type="warning"
      var jsonData=inputFormatForCom.data
      jsonData["ServiceId"]=serviceList.serviceId
      var str="Sequence"
      if (customisationData.stepOne[0].selected) {
          str="Sequence"
      }
      else{
        str="Parallel"
      }

      let useres=request(
          {
            url: "/service/infor/combine/" + str,
            method: "post",
            data: JSON.stringify(jsonData),
          },
          "/serviceapi"
        );
        useres.then(function(value){
          console.log("useres",value)
          if (value.data=="failed"){
            notice.data.type="error"
            notice.data.title="input error ! please check your input ."
          }
          else{
            notice.data.type="success"
            notice.data.title=" completed !"
         outputFormatForCom.data=JSON.parse(value.data)
          }
        })

      // console.log("serviceList",serviceList)
      // console.log("inputJson",inputFormatForCom.data)
    };

    return {
      useService,
      inputFormatForCom,
      outputFormatForCom,
      serviceListType,
      addService,
      chooseShow,
      chooseDialog,
      addFunc,
      removeFunc,
      serviceList,
      chooseType,
      customisationData,
      active,
      onChooseType,
      notice
    };
  },
  methods: {
    next() {
      if (this.active++ > 1) this.active = 2;
      if (this.active == 2) {
        //串行
        if (this.customisationData.stepOne[0].selected) {
          // alert("串行");
          this.setInputAndOutputForSeq();
        } else {
          // alert("并行");
          this.setInputAndOutputForPara();
        }
      }
    },
    previous() {
      if (this.active-- < 1) this.active = 0;
      this.notice.data.show=false
    },
    //组合使用时输入输出
    setInputAndOutputForPara() {
      this.inputFormatForCom.data = {};
      this.outputFormatForCom.data = {};
      for (var i = 0; i < this.serviceList.Parallel.length; i++) {
        var service = this.serviceList.Parallel[i];
        var inputJson = service_common.XputToJsonFormat(service.inputFormat);
        var outputJson = service_common.XputToJsonFormat(service.outputFormat);
        for (var item in inputJson) {
          // //console.log(item);
          if (
            !Object.prototype.hasOwnProperty.call(
              this.inputFormatForCom.data,
              item
            )
          ) {
            this.inputFormatForCom.data[item] = inputJson[item];
          }
        }
        for (var item2 in outputJson) {
          // //console.log(item);
          if (
            !Object.prototype.hasOwnProperty.call(
              this.outputFormatForCom.data,
              item2
            )
          ) {
            this.outputFormatForCom.data[item2] = outputJson[item2];
          }
        }
      }
      console.log(
        JSON.stringify(this.inputFormatForCom.data) +
          "|" +
          JSON.stringify(this.outputFormatForCom.data)
      );
    },
    setInputAndOutputForSeq() {
      this.inputFormatForCom.data = {};
      this.outputFormatForCom.data = {};
      for (var i = 0; i < this.serviceList.Sequence.length; i++) {
        var service = this.serviceList.Sequence[i];
        var outputJson = service_common.XputToJsonFormat(service.outputFormat);

        for (var item in outputJson) {
          console.log(item);
          if (
            !Object.prototype.hasOwnProperty.call(
              this.outputFormatForCom.data,
              item
            )
          )
            this.outputFormatForCom.data[item] = outputJson[item];
        }
      }
  
      for (var i2 = 0; i2 < this.serviceList.Sequence.length; i2++) {
        var service2 = this.serviceList.Sequence[i2];
        var inputJson = service_common.XputToJsonFormat(service2.inputFormat);
            // console.log("fsdfs",inputJson)
        for (var item2 in inputJson) {
          // alert(item2)
          if (
            !Object.prototype.hasOwnProperty.call(
              this.inputFormatForCom.data,
              item2
            )
          ) {
            if (
              !Object.prototype.hasOwnProperty.call(
                this.outputFormatForCom.data,
                item2
              )
            ) {
              // alert(item2)
              this.inputFormatForCom.data[item2] = inputJson[item2];
            }
          }
        }
      }
      var firstService = this.serviceList.Sequence[0];
      var firstInputJson = service_common.XputToJsonFormat(
        firstService.inputFormat
      );
      for (var item3 in firstInputJson) {
        // //console.log(item);
        this.inputFormatForCom.data[item3] = firstInputJson[item3];
      }
      //只显示最后一个服务的输出
      this.outputFormatForCom.data = service_common.XputToJsonFormat(
        this.serviceList.Sequence[this.serviceList.Sequence.length - 1]
          .outputFormat
      );
      console.log(
        JSON.stringify(this.inputFormatForCom.data) +
          "|" +
          JSON.stringify(this.outputFormatForCom.data)
      );
    },
    onInputJsonChange(value) {
      this.inputFormatForCom.data=value
      // console.log(this.inputJson)
    },
    onOutputJsonChange (value) {
      this.outputFormatForCom.data=value
      // console.log(this.outputJson)
        },
  
  },
  components: { serviceTypeList, vueJsonEditor },
  directives: {
    focus: {
      // 指令的定义
      inserted: function (el) {
        el.focus();
      },
    },
  },
  
};
</script>
<style>
.plusBtn {
  padding: 0;
  float: left;
  margin-top: 38px;
  margin-left: 10px;
  margin-bottom: 25px;
}
.removeBtn {
  padding: 0;
  float: left;
  margin-top: 1px;
  font-size: 24px;
  margin-left: -8px;
}
.iconjianhao {
  font-size: 24px;
  color: #dc3545;
}
.iconjiahao {
  font-size: 33px !important;
  color: #007bff;
}

.grid-content {
  padding: 0.75rem 1.25rem;
  margin-bottom: 0;
  background-color: rgba(0, 0, 0, 0.03);
  border-bottom: 1px solid rgba(0, 0, 0, 0.125);
  margin-left: 0px;
  color: #0d5f6f;
  border-radius: calc(0.25rem - 1px) calc(0.25rem - 1px) 0 0;
}

.icontianchongxing- {
  font-size: 55px;
  color: #17a2b8;
  float: left;
}
.btnTitle {
  float: left;
  margin-left: -47px;
  margin-top: 59px;
  color: #17a2b8;
  font-weight: 500;
      width: 47px;
}
.iconV {
  font-size: 44px;
  float: left;
  color: #17a2b8;
  margin-top: 5px;
}
.icontubiaozhizuo- {
  font-size: 44px;
  float: left;
  color: #17a2b8;
  margin-top: 5px;
}
</style>
<style scoped>
.text-secondary {
  color: #6c757d !important;
}
.simpleText {
  color: #6c757d !important;
  padding: 0px;
  margin: 0px;
  margin-bottom: 10px;
}
h2 {
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 15px;
}
.grid-content {
  padding: 0.75rem 1.25rem;
  margin-bottom: 0;
  background-color: rgba(0, 0, 0, 0.03);
  border-bottom: 1px solid rgba(0, 0, 0, 0.125);
  margin-left: 0px;
  color: #0d5f6f;
  border-radius: calc(0.25rem - 1px) calc(0.25rem - 1px) 0 0;
}

.icontianchongxing- {
  font-size: 55px;
  color: #17a2b8;
  float: left;
}
.btnTitle {
  float: left;
  margin-left: -47px;
  margin-top: 59px;
  color: #17a2b8;
  font-weight: 500;
      width: 47px;
}
.iconV {
  font-size: 44px;
  float: left;
  color: #17a2b8;
  margin-top: 5px;
}
.icontubiaozhizuo- {
  font-size: 44px;
  float: left;
  color: #17a2b8;
  margin-top: 5px;
}
.clearfix {
  clear: both;
}
</style>

<style>
.el-overlay {
  background-color: #00000000;
}
.el-dialog__body {
  overflow: auto;
}

.el-col-24 {width: 100%;}
.el-col-11{width:45.8333333333%}
.el-col-5{width: 20.8333333333%;}
</style>
