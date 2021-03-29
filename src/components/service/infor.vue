<template>
  <el-row id="inforRow">
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
      <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
        <el-breadcrumb-item :to="{ path: '/' }" @click="goHome"
          >Service</el-breadcrumb-item
        >
        <el-breadcrumb-item>{{ serviceInfor.data.title }}</el-breadcrumb-item>
      </el-breadcrumb>
      <el-col
        :xs="{ span: 24, offset: 0 }"
        :sm="{ span: 6, offset: 0 }"
        :md="{ span: 6, offset: 0 }"
        :lg="{ span: 6, offset: 0 }"
        :xl="{ span: 4, offset: 0 }"
        style="text-align: right; float: right"
      >
        <div><img :src="serviceInfor.data.img" style="height: auto" /></div>
        <el-rate
          v-model="serviceInfor.data.scores"
          disabled
          show-score
          text-color="#ff9900"
          score-template="{value}"
        >
        </el-rate>
      </el-col>
      <el-col
        :xs="{ span: 24, offset: 0 }"
        :sm="{ span: 18, offset: 0 }"
        :md="{ span: 18, offset: 0 }"
        :lg="{ span: 18, offset: 0 }"
        :xl="{ span: 20, offset: 0 }"
        style="float: left"
      >
        <el-col :span="24"
          ><h1 style="float: left">{{ serviceInfor.data.title }}</h1>
          <star
            style="
              float: right;
              font-size: 1rem;
              padding: 10px;
              text-algin: right;
            "
            ><el-button
              style="font-size: 1rem; padding: 5px 10px"
              @click="starClick"
              ><i :class="starData.starClass"></i> Star</el-button
            ><el-label
              style="
                border: 1px solid #dee2e6;
                padding: 2px 10px 4.5px 9px;
                border-radius: 4px;
              "
              >{{ starData.starNum }}
            </el-label></star
          ></el-col
        >
        <el-col :span="24" style="margin-bottom: 10px">
          <el-tag
            v-for="item in serviceInfor.data.tags.split(',')"
            :key="item"
            effect="dark"
            style="
              margin-right: 10px;
              height: 20px;
              font-size: 10px;
              padding: 0px 5px 2px;
              display: unset;
            "
          >
            {{ item }}
          </el-tag>
        </el-col>
        <el-col :span="24" style="margin-bottom: 10px">
          <label>
            Author: <author>{{ serviceInfor.data.author }} </author>
          </label>
          <label>
            Version: <version>{{ serviceInfor.data.version }} </version>
          </label>
          <label>
            Last Updated: <updatetime>{{ serviceInfor.data.date }} </updatetime>
          </label>
          <label>
            License: <license>{{ serviceInfor.data.license }}</license>
          </label>
        </el-col>
        <el-col :span="24" style="margin-bottom: 10px">
          Repository:
          <repository
            ><a
              :href="serviceInfor.data.repository"
              style="font-weight: bold"
              >{{ serviceInfor.data.repository }}</a
            ></repository
          >
        </el-col>
        <el-col :span="24" style="margin-bottom: 20px">
          {{ serviceInfor.data.shortDest }}
        </el-col>
        <el-col
          :span="24"
          style="
            padding: 10px 20px;
            font-size: 1rem;
            margin-bottom: 20px;
            color: #0c5460;
            background-color: #d1ecf1;
            border-color: #bee5eb;
          "
        >
          Service URL (POST method):
          <url>{{ serviceInfor.data.url }}</url>
        </el-col>
      </el-col>

      <el-col :span="24" style="margin-bottom: 10px; z-index: 0"
        ><el-tabs v-model="tabsActiveName" type="card" @tab-click="handleClick">
          <el-tab-pane label="Details" name="details">
            <p>{{ serviceInfor.data.description }}</p>
            <h2 style="margin-top: 30px">Inputs</h2>
            <el-table
              :data="xputFormat.input"
              stripe
              style="width: 100%; font-size: 1rem"
              :header-cell-style="{ background: '#343a40', color: '#fff' }"
            >
              <el-table-column prop="parameter" label="Parameter" width="180">
              </el-table-column>
              <el-table-column prop="type" label="Type" width="180">
              </el-table-column>
              <el-table-column prop="desc" label="Description">
              </el-table-column>
              <el-table-column prop="example" label="Example">
              </el-table-column>
            </el-table>
            <h2 style="margin-top: 30px">outputs</h2>
            <el-table
              :data="xputFormat.output"
              stripe
              style="width: 100%; font-size: 1rem"
              :header-cell-style="{ background: '#343a40', color: '#fff' }"
            >
              <el-table-column prop="parameter" label="Parameter" width="180">
              </el-table-column>
              <el-table-column prop="type" label="Type" width="180">
              </el-table-column>
              <el-table-column prop="desc" label="Description">
              </el-table-column>
              <el-table-column prop="example" label="Example">
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="Evaluation" name="evaluation">
            <p>
              The following table gives the sizes of test suites, computational
              costs (seconds) and success rate.
            </p>
            <el-table
              :data="evaluateData"
              :span-method="objectSpanMethod"
              stripe
              style="width: 100%; font-size: 1rem"
              :header-cell-style="{ background: '#343a40', color: '#fff' }"
            >
              <el-table-column prop="category" label="Category">
              </el-table-column>
              <el-table-column prop="strength" label="Strength">
              </el-table-column>
              <el-table-column prop="total_size" label="Total Size">
              </el-table-column>
              <el-table-column prop="total_time" label="Total Time">
              </el-table-column>
              <el-table-column prop="success_rate" label="Success Rate">
              </el-table-column>
              <el-table-column fixed="right" label="" width="120">
                <template #default="scope">
                  <el-button
                    @click.prevent="
                      handelDetail(serviceInfor.data.id, scope.row)
                    "
                    type="text"
                  >
                    detail
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
            <!-- 详细信息-->
            <el-dialog
              :title="dialogData.dialog_title"
              v-model="dialogData.detailDialog"
            >
              <p style="margin: 0px">
                This benchmark set consists of 59 test models. The detailed
                results can be found in the following table.
              </p>
              <el-col :span="24" style="margin: 0px">
                <el-tag
                  v-for="item in dialogData.dialog_tags.split(',')"
                  :key="item"
                  effect="dark"
                  style="
                    margin-right: 10px;
                    height: 20px;
                    font-size: 10px;
                    padding: 0px 5px 2px;
                    display: unset;
                  "
                >
                  {{ item }}
                </el-tag>
              </el-col>
              <el-table
                :data="evaluateDetailData.values"
                :header-cell-style="{ background: '#343a40', color: '#fff' }"
              >
                <el-table-column property="name" label="Name"></el-table-column>
                <el-table-column property="size" label="Size"></el-table-column>
                <el-table-column property="time" label="Time"></el-table-column>
                <el-table-column
                  property="success_rate"
                  label="Success Rate"
                ></el-table-column>
              </el-table>
            </el-dialog>
          </el-tab-pane>
          <el-tab-pane label="History" name="history">
            <div class="block" style="margin-top: 20px">
              <el-timeline>
                <el-timeline-item
                  v-for="item in historyData.list"
                  :key="item.id"
                  :timestamp="service_common.getDateFromTime_Day(item.date)"
                  placement="top"
                >
                  <el-card>
                    <h4>Version{{ item.version }}</h4>
                    <p>{{ item.description }}</p>
                  </el-card>
                </el-timeline-item>
              </el-timeline>
            </div>
          </el-tab-pane>
          <el-tab-pane label="Ratings & Reviews" name="rate_reviews">
            <el-row style="margin-top: 20px">
              <el-col :span="7"
                ><font style="font-weight: bold; font-size: 1.5rem"
                  >Ratings
                </font>
                <el-tag
                  effect="dark"
                  style="
                    font-weight: bold;
                    margin-right: 10px;
                    height: 20px;
                    font-size: 1.5rem;
                    padding: 0px 5px 2px;
                    display: unset;
                    border-radius: 20%;
                  "
                >
                  {{ serviceInfor.data.scores }}
                </el-tag>
                <span style="margin-top: 10px; display: block; color: blue"
                  >{{ rateData.peopleNum }} ratings (out of 5)</span
                >
              </el-col>
              <el-col :span="17" style="padding: 0px; text-align: left">
                <el-rate
                  id="rateCol"
                  :disabled="rateData.disabled"
                  v-model="rateData.value"
                  :colors="rateData.colors"
                  @change="handleRate()"
                >
                </el-rate>
                <p v-if="rateData.disabled" style="margin-top: 22px">
                  {{ rateData.value }} points Your had scored !
                </p>
                <p v-if="!rateData.disabled" style="height: 27px"></p>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="4">
                <font
                  style="font-weight: bold; font-size: 1.5rem; margin-top: 20px"
                  >Reviews
                </font>
                <span style="margin-top: 10px; display: block; color: blue"
                  >{{ reviewData.peopleNum }} reviews</span
                >
              </el-col>

              <el-col
                :span="24"
                style="padding: 0px; margin-top: 20px; text-align: left"
              >
                <el-row style="margin-bottom: 10px">
                  <el-col :span="2">
                    <el-avatar
                      :size="55"
                      style="font-size: 1.5rem; padding: 2px; float: right"
                      v-show="reviewData.showUserimg"
                      >{{ user.name.substr(0, 1).toUpperCase() }}</el-avatar
                    >
                  </el-col>
                  <el-col :span="22">
                    <el-input
                      style="width: 98%; margin-left: 2%"
                      type="textarea"
                      placeholder="comments"
                      v-model="reviewData.content"
                      maxlength="30"
                      @focus="reviewData.showCommentSubmit = true"
                    >
                    </el-input>
                    <el-button
                      v-show="reviewData.showCommentSubmit"
                      style="margin: 15px 0px 0px 2%; float: left"
                      type="primary"
                      @click="addNewComment()"
                      >Submit</el-button
                    >
                  </el-col>
                </el-row>
                <!--评论-->
                <div
                  v-for="(item, index) in reviewData.commentsData"
                  :key="item.id"
                >
                  <el-col :span="2">
                    <el-avatar
                      :size="55"
                      style="font-size: 1.5rem; float: right"
                      v-show="reviewData.showUserimg"
                      >{{
                        item.post_name.substr(0, 1).toUpperCase()
                      }}</el-avatar
                    >
                  </el-col>
                  <el-col :span="22">
                    <el-col :span="24">
                      <el-label
                        style="
                          margin-left: 2%;
                          float: left;
                          font-size: 1.5rem;
                          font-weight: 500;
                          line-height: 1;
                        "
                        >{{ item.post_name }}<br /><span
                          style="font-size: 1rem; font-weight: 200"
                          >{{ item.date }}</span
                        ></el-label
                      >
                      <el-label style="float: right; margin-right: 2%">
                        <el-button
                          style="font-size: 20px; border: 0px"
                          icon="el-icon-chat-dot-square"
                          @click="
                            () => {
                              reviewData.root_id = item.id;
                              reviewData.post_id = user.id;
                              reviewData.post_name = user.name;
                              reviewData.to_id = item.post_id;
                              reviewData.to_name = item.post_name;
                              item.showReply = !item.showReply;
                            }
                          "
                          circle
                        ></el-button>
                        <font style="font-size: 1.27rem">
                          {{ item.reply.length }}</font
                        ></el-label
                      >
                    </el-col>
                    <el-col :span="24">
                      <el-label style="float: left; margin: 2%">{{
                        item.content
                      }}</el-label>
                    </el-col>

                    <!--回复-->
                    <div v-for="reply_item in item.reply" :key="reply_item.id">
                      <el-col :span="2">
                        <el-avatar
                          :size="50"
                          style="font-size: 1.5rem; float: right"
                          v-show="reviewData.showUserimg"
                          >{{
                            reply_item.post_name.substr(0, 1).toUpperCase()
                          }}</el-avatar
                        >
                      </el-col>
                      <el-col :span="22">
                        <el-col :span="24">
                          <el-label
                            style="
                              margin-left: 2%;
                              float: left;
                              font-size: 1.5rem;
                              font-weight: 500;
                              line-height: 1;
                            "
                            >{{ reply_item.post_name }}<br /><span
                              style="font-size: 1rem; font-weight: 200"
                              >{{ reply_item.date }}</span
                            ></el-label
                          >
                          <el-label style="float: right; margin-right: 2%">
                            <el-button
                              style="font-size: 20px; border: 0px"
                              icon="el-icon-chat-dot-square"
                              @click="
                                () => {
                                  reviewData.root_id = item.id;
                                  reviewData.post_id = user.id;
                                  reviewData.post_name = user.name;
                                  reviewData.to_id = reply_item.post_id;
                                  reviewData.to_name = reply_item.post_name;
                                  item.showReply = !item.showReply;
                                }
                              "
                              circle
                            ></el-button
                          ></el-label>
                        </el-col>
                        <el-col :span="24">
                          <el-label style="float: left; margin: 2%"
                            ><span style="color: blue"
                              >@{{ reply_item.to_name }}: </span
                            >{{ reply_item.content }}</el-label
                          >
                        </el-col>
                      </el-col>
                    </div>
                    <el-col
                      :span="24"
                      v-show="item.showReply"
                      style="margin-bottom: 10px"
                    >
                      <el-input
                        style="width: 98%; margin-left: 2%"
                        type="textarea"
                        :placeholder="comments"
                        v-model="reviewData.reply_content"
                        maxlength="30"
                      >
                      </el-input>
                      <el-button
                        style="margin: 15px 0px 0px 2%; float: left"
                        type="primary"
                        @click="addNewReply(index)"
                        >Submit</el-button
                      >
                    </el-col>
                  </el-col>
                  <el-col :span="24"> <el-divider></el-divider></el-col>
                </div>
              </el-col>
            </el-row>
          </el-tab-pane>
          <!-- demo -->
          <el-tab-pane label="Demo" name="demo">
            <p>
              Try to use this service. Simply type in the inputs (exemplary
              inputs are provided) and click the submit button to obtain the
              results.
            </p>
            <h2 style="margin-top: 30px">
              Inputs<font
                style="color: grey; font-weight: 200; font-size: 1.2rem"
              >
                (in JSON format)</font
              >
            </h2>
            <vue-json-editor
              :value="inputJson.data"
              :showBtns="false"
              :mode="'code'"
              lang="en"
              height="500px"
              @json-change="onInputJsonChange"
              @json-save="onJsonSave"
            />
            <el-button
              type="primary"
              icon="el-icon-mouse"
              style="margin-top: 30px" @click="useService"
              >Submit</el-button
            >
            <h2 style="margin-top: 30px">
              Outputs<font
                style="color: grey; font-weight: 200; font-size: 1.2rem"
              >
                (in JSON format)</font
              >
            </h2>
            <vue-json-editor
              :value="outputJson.data"
              :showBtns="false"
              :mode="'code'"
              lang="en"
              height="500px"
              @json-change="onOutputJsonChange"
              @json-save="onJsonSave"
            />
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-col>
  </el-row>
</template>
<script>
// import ElementPlus from 'element-plus'
import vueJsonEditor from "vue-json-editor";
import { useRoute, useRouter } from "vue-router";
import { reactive, onMounted } from "vue";
import serviceTypeList from "./typelist.vue";
import * as service_common from "./common";
export default {
  // eslint-disable-next-line no-unused-vars
  setup(props, context) {
    onMounted(() => {
      //1.初始化数据
      //1)用户信息
      user.id = localStorage.getItem("userid");
      let userres = service_common.getUserName(user.id);
      userres.then(function (value) {
        user.name = value.username;
        console.log(user);
      });
      //2)收藏数量
      let starNumres = service_common.getStarNum(id);
      starNumres.then(function (value) {
        starData.starNum = value.starNum;
        console.log("收藏量：" + value);
        console.log(value);
      });
      //3)是否收藏
      let starres = service_common.isStared(id, user.id);
      starres.then(function (value) {
        console.log(value);
        starData.isStar = value.star;
        if (value.star) {
          starData.starClass = "el-icon-star-on";
        } else {
          starData.starClass = "el-icon-star-off";
        }
        console.log("收藏情况：");
        console.log(starData);
      });
      //4)服务基本信息
      let inforres = service_common.getServiceInfor(id);
      inforres.then(function (value) {
        serviceInfor.data = value.serviceInfor;
        let authorres = service_common.getUserName(serviceInfor.data.userId);
        authorres.then(function (value) {
          serviceInfor.data.author = value.username;
        });

        let scoreres = service_common.getScores(id);
        scoreres.then(function (value) {
          // console.log(value.username);
          serviceInfor.data.scores = value.scores;
          console.log("服务基本信息：");
          console.log(serviceInfor);
          updateFormat();
        });
        serviceInfor.data.date = service_common.getDateFromTime_Day(
          serviceInfor.data.date
        );
        //5)
        //6)历史信息historyData
        let historyres = service_common.getHistoryList(id);
        historyres.then(function (value) {
          historyData.list = value.list;
        });
        //7)评分
        let userscoreres = service_common.getUserValuate(id, user.id);
        userscoreres.then(function (value) {
          rateData.value = value.score;
          if (rateData.value != 0) {
            rateData.disabled = true;
          }
        });
        //8)评论
        //9)Demo
        inputJson.data = service_common.XputToJsonFormat(
          serviceInfor.data.inputFormat
        );
        outputJson.data = service_common.XputToJsonFormat(
          serviceInfor.data.outputFormat
        );
      });
    });

    console.log(context);

    let starData = reactive({
      isStar: false,
      starClass: "el-icon-star-off",
      starNum: 0,
    });

    let user = reactive({
      id: 1,
      name: "lejin",
    });

    const route = useRoute();
    const router = useRouter();
    const id = route.query.id;
    //  alert(id)
    // alert("service")
    //根据id获取数据
    let serviceInfor = reactive({
      data: {
        id: 69,
        title: "ACTS",
        img:
          "https://findicons.com/files/icons/2787/beautiful_flat_icons/128/hourglass.png",
        author: "ligang",
        version: "1.0",
        date: "2020.09.01",
        shortDest:
          "ACTS is a well-known combinatorial test suite generation tool. This tools was initially developed by NIST, and has been used in many real-world projects and organisations.",
        description:
          "ACTS is a well-known combinatorial test suite generation tool. This tools was initially developed by NIST, and has been used in many real-world projects and organisations.",
        scores: 4.7,
        tags: "Generation, Greedy",
        url: "http://114.55.242.234:8000",
        license: "MIT",
        repository: "https://github.com/lejinWang/real_acts3.git",
        inputFormat: `strength|int|the covering strength|2
parameter|int|the number of parameters|3
values|int[]|the number of choices of each parameter|[2,6,3]
constraints|string[]|constraints of model|[["0/0","1/0"],["0/0","1/1"],["0/0","1/2"],["0/0","1/3"]]`,
        outputFormat: `testsuite|int[][]|the generated covering array| [[0,0, 0]]
size|int|size of test suite|8
time|string|computational cost (ms)|12`,
      },
    });

    const goHome = () => {
      router.push({ path: "/" });
    };
    //收藏
    const starClick = () => {
      if (starData.isStar) {
        starData.starClass = "el-icon-star-off";
        starData.isStar = false;
        starData.starNum--;
      } else {
        starData.starClass = "el-icon-star-on";
        starData.isStar = true;
        starData.starNum++;
      }
    };
    //详细信息
    //1.处理输入输出格式
    let xputFormat = reactive({
      input: [],
      output: [],
    });
    console.log("sss\n",serviceInfor.data.inputFormat)
    const updateFormat=()=>{
    console.log(serviceInfor.data.inputFormat)
        // eslint-disable-next-line no-unused-vars
    serviceInfor.data.inputFormat.split("\n").forEach(function (item, index) {
      let tempdata = {
        parameter: "parameter",
        type: "type",
        desc: "desc",
        example: "example",
      };
      tempdata.parameter = item.split(";")[0];
      tempdata.type = item.split(";")[1];
      tempdata.desc = item.split(";")[2];
      tempdata.example = item.split(";")[3];
      xputFormat.input.push(tempdata);
      // console.log(tempdata)
    });
    // eslint-disable-next-line no-unused-vars
    serviceInfor.data.outputFormat.split("\n").forEach(function (item, index) {
      let tempdata = {
        parameter: "parameter",
        type: "type",
        desc: "desc",
        example: "example",
      };
      tempdata.parameter = item.split(";")[0];
      tempdata.type = item.split(";")[1];
      tempdata.desc = item.split(";")[2];
      tempdata.example = item.split(";")[3];
      xputFormat.output.push(tempdata);
    });
    }
    // 评估
    let evaluateData = reactive([
      {
        id: 1,
        category: "constrained",
        strength: 2,
        total_size: "201",
        total_time: "56.5",
        success_rate: "0.9",
        tags: "large,constrained",
      },
      {
        id: 2,
        category: "constrained",
        strength: 3,
        total_size: "201",
        total_time: "56.5",
        success_rate: "0.9",
        tags: "large,constrained",
      },
      {
        id: 3,
        category: "constrained",
        strength: 4,
        total_size: "201",
        total_time: "56.5",
        success_rate: "0.9",
        tags: "large,constrained",
      },
      {
        id: 1,
        category: "constrained",
        strength: 5,
        total_size: "201",
        total_time: "56.5",
        success_rate: "0.9",
        tags: "large,constrained",
      },
      {
        id: 2,
        category: "constrained",
        strength: 6,
        total_size: "201",
        total_time: "56.5",
        success_rate: "0.9",
        tags: "large,constrained",
      },
      {
        id: 4,
        category: "unconstrained",
        strength: 2,
        total_size: "201",
        total_time: "56.5",
        success_rate: "0.9",
        tags: "large,constrained",
      },
      {
        id: 4,
        category: "unconstrained",
        strength: 3,
        total_size: "201",
        total_time: "56.5",
        success_rate: "0.9",
        tags: "large,constrained",
      },
      {
        id: 4,
        category: "unconstrained",
        strength: 4,
        total_size: "201",
        total_time: "56.5",
        success_rate: "0.9",
        tags: "large,constrained",
      },
      {
        id: 4,
        category: "unconstrained",
        strength: 5,
        total_size: "201",
        total_time: "56.5",
        success_rate: "0.9",
        tags: "large,constrained",
      },
      {
        id: 4,
        category: "unconstrained",
        strength: 6,
        total_size: "201",
        total_time: "56.5",
        success_rate: "0.9",
        tags: "large,constrained",
      },
    ]);
    let evaluateDetailData = reactive({
      values: [
        {
          model_name: "",
          size: "",
          time: "0.1",
          success_rate: "1.0",
        },
      ],
    });
    let dialogData = reactive({
      detailDialog: false,
      dialog_title: "",
      dialog_tags: "",
    });
    const handelDetail = (serviceId, benchmark) => {
      dialogData.detailDialog = true;
      dialogData.dialog_title = benchmark.category + " benchmark set";
      dialogData.dialog_tags = benchmark.tags;
      console.log(serviceId);
      console.log(benchmark.id);
      evaluateDetailData.values = [
        {
          name: "apache",
          size: "11",
          time: "0.1",
          success_rate: "1.0",
        },
        {
          name: "apache",
          size: "11",
          time: "0.1",
          success_rate: "1.0",
        },
        {
          name: "apache",
          size: "11",
          time: "0.1",
          success_rate: "1.0",
        },
      ];
    };
    // eslint-disable-next-line no-unused-vars
    function objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex % 5 === 0) {
          return {
            rowspan: 5,
            colspan: 1,
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0,
          };
        }
      }
    }
    // 历史信息
    let historyData = reactive({
      list: [
        {
          id: "1",
          service_id: "1",
          version: "2.0",
          description: "second release",
          date: "2019-05-19",
        },
        {
          id: "2",
          service_id: "1",
          version: "1.0",
          description: "first release",
          date: "2018-05-19",
        },
      ],
    });
    // 评分
    let rateData = reactive({
      value: 0,
      colors: ["#99A9BF", "#F7BA2A", "#FF9900"],
      disabled: false,
      peopleNum: 3,
    });
    // if (rateData.value != 0) {
    //   rateData.disabled = true;
    // }
    const handleRate = () => {
      // alert(rateData.value)
      rateData.disabled = true;
      serviceInfor.data.scores = parseFloat(
        (serviceInfor.data.scores * rateData.peopleNum + rateData.value) /
          (rateData.peopleNum + 1)
      ).toFixed(1);
      rateData.peopleNum++;
    };
    // 评论
    let reviewData = reactive({
      showUserimg: false,
      peopleNum: 1,
      content: "",
      reply_content: "",
      showCommentSubmit: false,
      root_id: 1,
      post_id: 2, // 谁发布的评论
      post_name: "gist",
      to_id: 1,
      to_name: "", //@ 谁
      date: "2020年10月28日 14:22:33",
      commentsData: [
        {
          id: 1,
          post_id: 1, // 谁发布的评论
          post_name: "lejin",
          content: `This is a nice tool`,
          date: "2020年10月28日 14:22:33",
          showReply: false,
          // 新回复

          reply: [
            // {
            //   id: 1,
            //   root_id: 1,
            //   post_id: 2, // 谁发布的评论
            //   post_name: "gist",
            //   to_id: 1,
            //   to_name: "lejin", //@ 谁
            //   content: `I think the "&#" symbol might not be the best choice for separation.`,
            //   date: "2020年10月28日 14:22:33",
            // },
            // {
            //   id: 1,
            //   root_id: 1,
            //   post_id: 2, // 谁发布的评论
            //   post_name: "gist",
            //   to_id: 1,
            //   to_name: "lejin", //@ 谁
            //   content: `I think the "&#" symbol might not be the best choice for separation.`,
            //   date: "2020年10月28日 14:22:33",
            // },
          ],
        },
        // {
        //   id: 2,
        //   post_id: 1, // 谁发布的评论
        //   post_name: "lejin",
        //   content: `I think the "&#" symbol might not be the best choice for separation.`,
        //   date: "2020年10月28日 14:22:33",
        //   showReply: false,
        //   replyComment: "",
        //   reply: [
        //     {
        //       id: 1,
        //       root_id: 1,
        //       post_id: 2, // 谁发布的评论
        //       post_name: "乐进",
        //       to_id: 1,
        //       to_name: "lejin", //@ 谁
        //       content: `I think the "&#" symbol might not be the best choice for separation.`,
        //       date: "2020年10月28日 14:22:33",
        //     },
        //     {
        //       id: 1,
        //       root_id: 1,
        //       post_id: 2, // 谁发布的评论
        //       post_name: "gist",
        //       to_id: 1,
        //       to_name: "lejin", //@ 谁
        //       content: `I think the "&#" symbol might not be the best choice for separation.`,
        //       date: "2020年10月28日 14:22:33",
        //     },
        //   ],
        // },
      ],
    });
    const addNewComment = () => {
      // alert(reviewData.content)
      if (service_common.isEmpty(reviewData.content)) {
        // alert('不能为空!');
        return;
      }
      let newComment = {
        id: -1,
        post_id: user.id, // 谁发布的评论
        post_name: user.name,
        content: reviewData.content,
        date: service_common.getNowDate(),
        showReply: false,
        reply: [],
      };
      reviewData.commentsData.push(newComment);
      reviewData.content = "";
      reviewData.showCommentSubmit = false;
    };
    const addNewReply = (index) => {
      if (service_common.isEmpty(reviewData.reply_content)) {
        // alert('不能为空!');
        return;
      }
      let newreply = {
        id: -1,
        root_id: reviewData.root_id,
        post_id: reviewData.post_id, // 谁发布的评论
        post_name: reviewData.post_name,
        to_id: reviewData.to_id,
        to_name: reviewData.to_name, //@ 谁
        content: reviewData.reply_content,
        date: service_common.getNowDate(),
      };
      reviewData.commentsData[index].reply.push(newreply);
      reviewData.commentsData[index].showReply = false;
      reviewData.reply_content = "";
    };

    /**
     *
     */
    // alert(document.body.clientWidth);
    if (document.body.clientWidth < 350) {
      alert(document.body.clientWidth);
      reviewData.showUserimg = false;
    } else {
      reviewData.showUserimg = true;
    }
    //Demo
    const inputJson = reactive({
      data: {},
    });
    const outputJson = reactive({
      data: {},
    });

    const useService=()=>{
       console.log(inputJson.data)
       outputJson.data={}
       let useres=service_common.useService(inputJson.data,serviceInfor.data.url)
       useres.then(function(value){
         outputJson.data=value
       })
    }

    return {
      service_common,
      addNewComment,
      addNewReply,
      user,
      historyData,
      reviewData,
      handleRate,
      rateData,
      objectSpanMethod,
      id,
      serviceInfor,
      goHome,
      starData,
      starClick,
      xputFormat,
      tabsActiveName: "details",
      dialogData,
      evaluateData,
      evaluateDetailData,
      handelDetail,
      inputJson,
      outputJson,
      useService
    };
  },
  components: {
    serviceTypeList,
    vueJsonEditor,
  },
  methods: {
    onInputJsonChange(value) {
      this.inputJson.data=value
      // console.log(this.inputJson)
    },
    onOutputJsonChange (value) {
             this.outputJson.data=value
      // console.log(this.outputJson)
        },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.breadcrumb {
  font-size: 1rem;
  margin-top: 15px;
  line-height: 29px;
  padding: 5px;
  background-color: #e9ecef;
  margin-bottom: 35px;
}
h1 {
  font-size: 2rem;
  font-weight: 500;
  margin: 0;
}
h2 {
  font-size: 1.5rem;
  font-weight: 500;
  margin-bottom: 15px;
}
author,
version,
updatetime,
license,
url {
  font-size: 1rem;
  font-weight: bold;
  color: #000;
}
label {
  margin-right: 20px;
}
.el-table th,
.el-table tr {
  background-color: #000;
}
</style>

<style>
#rateCol .el-rate__icon {
  font-size: 39px;
}
.jsoneditor-vue {
  height: 300px;
}
</style>
