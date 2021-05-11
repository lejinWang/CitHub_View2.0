<template>
  <el-row id="inforRow">
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
      <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
        <el-breadcrumb-item :to="{ path: '/task_index' }" @click="goHome"
          >Task</el-breadcrumb-item
        >
        <el-breadcrumb-item>{{ taskInfor.infor.title }}</el-breadcrumb-item>
      </el-breadcrumb>
      <el-col
        :xs="{ span: 24, offset: 0 }"
        :sm="{ span: 24, offset: 0 }"
        :md="{ span: 24, offset: 0 }"
        :lg="{ span: 24, offset: 0 }"
        :xl="{ span: 20, offset: 0 }"
      >
        <el-col :span="24"
          ><h1 style="float: left">{{ taskInfor.infor.title }}</h1>
        </el-col>
        <el-col :span="24" style="margin-bottom: 10px">
          <el-tag
            v-for="item in taskInfor.infor.tag.split(',')"
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
            Author: <author>{{ taskInfor.infor.author }} </author>
          </label>
          <label>
            Last Updated: <updatetime>{{ taskInfor.infor.date }} </updatetime>
          </label>

          <label v-show="leader != null">
            Leader: <author>{{ leader }} </author>
          </label>
        </el-col>
        <el-col :span="24" style="margin-bottom: 20px">
          {{ taskInfor.infor.description }}
        </el-col>
        <el-col :span="24" style="margin-bottom: 10px; z-index: 0">
          <el-tabs
            v-model="tabsActiveName"
            type="card"
            @tab-click="handleClick"
            @tab-remove="removeTab()"
          >
            <!-- 基本信息 -->
            <el-tab-pane label="Details" name="detail">
              <p>{{ taskInfor.infor.description }}</p>
              <el-button
                v-show="leader == null"
                type="primary"
                @click="becomeLeader()"
                >Apply to become leader</el-button
              >
            </el-tab-pane>
            <!-- 划分需求 -->
            <el-tab-pane label="Divide" name="divide" v-if="pattern.show">
              <el-row>
                <el-col :span="24">
                  <p>There are three scenarios for dividing requirements:</p>
                  <p :style="pattern.style1">
                    <textbf>Cooperation :</textbf> Leader divides the
                    <textred>n</textred> pages (function points) involved in the
                    total demand into <textred>k</textred> sub-requirements
                    (<textred>1</textred> sub-requirement corresponds to
                    <textred>1</textred> worker). After each worker takes over
                    the sub-requirements, he completes the test of the page
                    involved in his own demand (including modeling and
                    generating test cases, optimizing test cases and executing
                    test cases). Finally, the leader summarizes the work of each
                    worker and completes the test of the whole module.
                  </p>
                  <p :style="pattern.style2">
                    <textbf>Competition: </textbf> Determining the total demand,
                    the leader will no longer divide the demand, and each worker
                    will directly take over the total test demand and submit the
                    test results. Finally, the leader will compare the test
                    results of each person and select the final test results
                    from them.
                  </p>
                  <p :style="pattern.style3">
                    <textbf>Competition and Cooperation: </textbf>The leader
                    divides the <textred>n</textred> pages involved into
                    <textred>k</textred>
                    subrequirements (one subrequirement corresponds to multiple
                    (&ge;<textred>2</textred>) worker group). After each worker
                    group takes over the sub-requirements, it completes the page
                    tests involved in the corresponding requirements (including
                    modeling and generating test cases, optimizing test cases
                    and executing test cases), and selects a better test
                    process. Finally, the leader summarizes the work of each
                    worker group. So as to complete the test of the whole
                    module.
                  </p>
                </el-col>
                <el-col :span="24">
                  <el-form :label-position="top">
                    <el-col :span="10" style="padding-left: 10px">
                      <el-form-item label="Divide Pattern:">
                        <el-select
                          v-model="pattern.value"
                          placeholder="please choose pattern "
                          @change="changepattern()"
                          style="margin-left: 0px; width: 100%"
                        >
                          <el-option
                            label="Cooperation"
                            value="Cooperation"
                          ></el-option>
                          <el-option
                            label="Competition"
                            value="Competition"
                          ></el-option>
                          <el-option
                            label="Competition and Cooperation"
                            value="Competition and Cooperation"
                          ></el-option>
                        </el-select> </el-form-item
                    ></el-col>
                    <el-col :span="7" style="padding-left: 35px">
                      <el-form-item label="Number of Workers:">
                        <!-- <el-input
                          v-model="pattern.numofsubworkers"
                          placeholder=""
                        ></el-input> -->
                        <el-input-number
                          v-model="pattern.numofworkers"
                          :min="1"
                          :max="10"
                          label="1"
                        ></el-input-number>
                      </el-form-item>
                    </el-col>
                    <el-col :span="7" style="padding-left: 10px">
                      <el-form-item label="Number of Subtask:">
                        <!-- <el-input
                          style="width: 65%"
                          v-model="pattern.numofsubtasks"
                          placeholder=""
                        ></el-input> -->
                        <el-input-number
                          :disabled="pattern.value == 'Competition'"
                          v-model="pattern.numofsubtasks"
                          :min="1"
                          :max="10"
                          label="1"
                        ></el-input-number>
                      </el-form-item>
                    </el-col>
                    <!-- <el-col :span="6" style="margin-left: 10px">
                      <el-form-item label="&nbsp">
                        <el-button
                          type="success"
                          style="margin-left: 10px; padding: 10px"
                          @click="automatic()"
                          >Automatic</el-button
                        >
                      </el-form-item>
                    </el-col> -->
                  </el-form>
                </el-col>
                <el-col :span="23" style="margin-left: 10px">
                  <el-button
                    type="success"
                    style="margin-left: 0px"
                    @click="automatic()"
                    >Automatic</el-button
                  >
                  <el-button
                    type="primary"
                    @click="openDialog()"
                    style="margin-left: 10px"
                    >Add a subtask</el-button
                  >
                </el-col>

                <el-table
                  :data="subtask.list"
                  border
                  style="width: 100%; margin-top: 20px; margin-left: 10px"
                >
                  <el-table-column type="expand">
                    <template #default="props">
                      <el-form
                        label-position="left"
                        inline
                        class="demo-table-expand"
                      >
                        <el-form-item label="description">
                          <span>{{ props.row.description }}</span>
                        </el-form-item>
                      </el-form>
                    </template>
                  </el-table-column>

                  <el-table-column prop="title" label="Title">
                  </el-table-column>
                  <el-table-column prop="numofworker" label="#Worker">
                  </el-table-column>
                  <el-table-column prop="numofsubtasks" label="#Task">
                  </el-table-column>
                  <el-table-column prop="dealline" label="Dealline" width="100">
                  </el-table-column>
                  <!-- <el-table-column prop="description" label="description" width="350">
                  </el-table-column> -->
                  <el-table-column fixed="right" label="Operation" width="160">
                    <template #default="scope">
                      <el-button
                        @click="editRow(scope.$index)"
                        size="small"
                        type="success"
                      >
                        edit
                      </el-button>
                      <el-button
                        @click="deleteRow(scope.$index)"
                        size="small"
                        type="danger"
                      >
                        remove
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <el-col :span="23" style="margin-left: 10px; margin-top: 20px">
                  <el-button
                    type="primary"
                    icon="el-icon-mouse"
                    @click="submitsubtasks()"
                    >Submit</el-button
                  >
                </el-col>
              </el-row>
            </el-tab-pane>
            <!-- 解决方案 -->
            <el-tab-pane label="Subtask" name="subtask" v-if="showsubtasks">
              <el-table
                :data="currentsubtask.list"
                border
                style="width: 100%; margin-top: 20px; margin-left: 10px"
              >
                <el-table-column type="expand">
                  <template #default="props">
                    <el-form
                      label-position="left"
                      inline
                      class="demo-table-expand"
                    >
                      <el-form-item label="description:">
                        <span>{{ props.row.description }}</span>
                      </el-form-item>
                      <el-form-item label="solutions:">
                        <div
                          v-for="(item2, index2) in props.row.solutionresults"
                          :key="index2"
                          style="float: left; margin-right: 10px"
                        >
                          <font style="float: left">{{ index2 + 1 }}.</font>
                          <div
                            v-for="(item, index) in item2.solutions"
                            :key="index"
                            style="
                              float: left;
                              margin-top: 0px;
                              margin-left: 2px;
                            "
                          >
                            <el-tooltip :content="item.title" placement="top"
                              ><i
                                class="iconfont icontianchongxing-"
                                style="font-size: 26px; float: left"
                              ></i
                            ></el-tooltip>
                            <!-- <p class="btnTitle">{{ item.title }}</p> -->
                            <i
                              class="iconfont iconV"
                              style="margin: 0px; font-size: 26px; float: left"
                              v-show="index != item2.solutions.length - 1"
                            ></i>
                          </div>
                          <el-popover
                            placement="top-start"
                            title="Model"
                            :width="500"
                            trigger="hover"
                            :content="item2.modelfile"
                          >
                            <template #reference>
                              <i
                                v-show="item2.solutions.length == 0"
                                class="el-icon-document"
                                style="
                                  color: #4c4daf;
                                  margin-top: 6px;
                                  font-size: 26px;
                                  float: left;
                                "
                              ></i>
                            </template>
                          </el-popover>
                        </div>
                      </el-form-item>
                    </el-form>
                  </template>
                </el-table-column>

                <el-table-column prop="title" label="Title"> </el-table-column>
                <el-table-column prop="dealline" label="Dealline">
                </el-table-column>
                <el-table-column prop="numofsubtasks" label="#Task">
                </el-table-column>
                <el-table-column
                  prop="remainingworker"
                  label="Remain"
                  v-if="false"
                ></el-table-column>
                <el-table-column prop="numofworker" label="#Worker">
                  <template #default="scope">
                    <span style="margin-left: 10px"
                      >{{
                        scope.row.numofworker - scope.row.remainingworker
                      }}/{{ scope.row.numofworker }}</span
                    >
                  </template>
                </el-table-column>
                <!-- <el-table-column prop="description" label="description" width="350">
                  </el-table-column> -->
                <el-table-column fixed="right" label="Operation" width="100">
                  <template #default="scope">
                    <el-button
                      v-if="scope.row.remainingworker > 0"
                      @click="applysubtask(scope.$index)"
                      size="small"
                      type="primary"
                    >
                      Apply
                    </el-button>
                    <el-button
                      @click="viewsubtask(scope.$index)"
                      size="small"
                      type="success"
                      v-if="scope.row.remainingworker == 0"
                    >
                      View
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <!-- 评论 -->
            <el-tab-pane label="Review" name="review">
              <el-row>
                <el-col :span="4">
                  <font
                    style="
                      font-weight: bold;
                      font-size: 1.5rem;
                      margin-top: 20px;
                    "
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
                        style="font-size: 1.5rem; padding: 2px"
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
                      <el-avatar :size="55" style="font-size: 1.5rem">{{
                        item.post_name.substr(0, 1).toUpperCase()
                      }}</el-avatar>
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
                      <div
                        v-for="reply_item in item.reply"
                        :key="reply_item.id"
                      >
                        <el-col :span="2">
                          <el-avatar :size="50" style="font-size: 1.5rem">{{
                            reply_item.post_name.substr(0, 1).toUpperCase()
                          }}</el-avatar>
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
            <!-- 子需求基本信息 -->
            <el-tab-pane
              :label="subtaskinfor.tabname"
              :name="subtaskinfor.tabname"
              closable
              v-if="subtaskinfor.show"
            >
              <el-row style="width: 100%">
                <p>{{ subtaskinfor.data.description }}</p>

                <h2 style="margin-top: 30px">Solutions</h2>

                <el-table
                  :data="subtaskinfor.data.solutionresults"
                  border
                  style="width: 100%"
                >
                  <el-table-column prop="worker" label="Worker">
                  </el-table-column>
                  <el-table-column prop="time" label="Time"> </el-table-column>
                  <el-table-column prop="type" label="Type"> </el-table-column>
                  <el-table-column
                    label="Model"
                    v-if="subtaskinfor.data.solutionresults[0].type == 'File'"
                  >
                    <i
                      class="el-icon-document"
                      style="
                        color: #4c4daf;
                        margin-top: 6px;
                        font-size: 26px;
                        float: left;
                      "
                    ></i
                  ></el-table-column>
                  <el-table-column
                    label="Operation"
                    v-if="subtaskinfor.data.solutionresults[0].type == 'File'"
                    width="120"
                  >
                    <template #default="scope">
                      <el-button
                        @click="
                          downloadFile(
                            subtaskinfor.data.solutionresults[scope.$index]
                              .modelfile
                          )
                        "
                        size="small"
                        type="text"
                        icon="el-icon-download"
                        style="
                          font-size: 18px;
                          font-weight: 1000;
                          margin-left: 2px;
                        "
                      >
                      </el-button>
                      <el-button
                        @click="
                          viewFile(
                            subtaskinfor.data.solutionresults[scope.$index]
                              .modelfile
                          )
                        "
                        size="small"
                        type="text"
                        icon="el-icon-search"
                        style="
                          font-size: 15px;
                          font-weight: 1000 !important;
                          margin-left: 10px;
                        "
                      >
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <el-button
                  style="margin-top: 20px; float: left"
                  type="primary"
                  @click="mergeSolutions()"
                  v-if="user.name == leader"
                  >merge</el-button
                >
              </el-row>
            </el-tab-pane>
          </el-tabs></el-col
        ></el-col
      ></el-col
    ></el-row
  >

  <el-dialog
    :title="pattern.value"
    v-model="subtask.dialogFormVisible"
    style="width: 60%"
  >
    <el-row>
      <el-form :rules="rules" ref="rulesubtask" :model="tempdata.data">
        <el-col :span="7" style="margin-left: 10px">
          <el-form-item label="Title" prop="title">
            <el-input
              v-model="tempdata.data.title"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7" style="margin-left: 10px">
          <el-form-item label="Number of worker" prop="numofworker">
            <el-input
              v-model="tempdata.data.numofworker"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7" style="margin-left: 10px">
          <el-form-item label="Number of subtasks" prop="numofsubtasks">
            <el-input
              v-model="tempdata.data.numofsubtasks"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" style="margin-left: 10px; padding-top: 10px">
          <el-form-item label="Dealline" prop="dealline" id="date-picker">
            <!-- <div class="block" style="margin-top: 10px"> -->
            <el-date-picker v-model="tempdata.data.dealline" type="date">
            </el-date-picker>
            <!-- </div> -->
          </el-form-item>
        </el-col>
        <el-col :span="22" style="margin-left: 10px; margin-top: 20px">
          <el-form-item label="Task Description" prop="description">
            <!-- <p class="label_tips">a detailed explanation of functionalities, algorithms, and designs of the service</p> -->
            <el-input
              type="textarea"
              v-model="tempdata.data.description"
              rows="10"
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-button
            type="primary"
            @click="submitForm('rulesubtask')"
            icon="el-icon-mouse"
            style="margin-left: 10px; margin-top: 20px"
            >Submit</el-button
          >
        </el-col>
      </el-form></el-row
    >
    <!-- <template #footer>
      <span class="dialog-footer">
        <el-button @click="subtask.dialogFormVisible = false">Exit</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">OK</el-button>
      </span>
    </template> -->
  </el-dialog>
  <el-dialog
    title="Merge Solutions"
    v-model="mergeData.show"
    style="width: 80%"
    destroy-on-close
    center
  >
    <div style="text-align: center">
      <el-transfer
        v-model="mergeData.values"
        style="text-align: left; display: inline-block"
        filterable
        :render-content="renderFunc"
        :titles="['Different', 'Same']"
        :data="mergeData.data"
      >
      <template #left-footer>
        <el-form >
      <el-form-item  >
        <div style="height:30px"></div>
   
  </el-form-item>
      </el-form>
      </template>
      <template #right-footer>
        <el-form  ref="mergeForm" :rules="mergerules" :model="mergeData.valueMergePattern">
      <el-form-item prop="mergevalue" >
    <el-select v-model="mergeData.valueMergePattern"  placeholder="please choose the merge pattern of value" style="width:100%; ">
      <el-option label="merge all different" value="mergediff"></el-option>
      <el-option label="only same" value="onlysame"></el-option>
    </el-select>
  </el-form-item>
 <el-button id="submitmergeform" type="primary" @click="mergeSubmit('mergeForm')">OK</el-button>

      </el-form>
      </template>
      </el-transfer>
      
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="mergeData.show = false">Exit</el-button>
        <el-button type="primary" @click="clickmerform()">OK</el-button>
      </span>
    </template>
  </el-dialog>
  <!-- model-draw -->

  <el-drawer title="Model" v-model="modeltable.drawer" :with-header="true">
    <div style="height: 1000px; overflow: auto; margin-left: 20px">
      <el-collapse accordion>
        <el-collapse-item
          title="参数 Parameter"
          name="-1"
          class="headerofcollapse"
        >
          <el-collapse
            style="margin-left: 20px"
            v-for="(item, index) in modeltable.data"
            :key="index"
            accordion
          >
            <el-collapse-item :title="item[0]" :name="index">
              <el-tag
                v-for="(item2, index2) in item"
                :key="index2"
                v-show="index2 > 0"
                style="margin-right: 20px; margin-bottom: 8px"
                >{{ item2 }}</el-tag
              >
            </el-collapse-item>
          </el-collapse>
        </el-collapse-item>
        <el-collapse-item title="约束 Constraints" name="-2">
          <p v-for="(item, index) in modeltable.constraints" :key="index">
            {{ item }}
          </p>
        </el-collapse-item>
      </el-collapse>
    </div>
  </el-drawer>
</template>

<script>
import { reactive, ref, onMounted } from "vue";
import * as task_common from "./common";
import tagList from "./taglist.vue";
import { useRouter, useRoute } from "vue-router";
import { ElMessage } from "element-plus";
// import { useRoute, useRouter } from "vue-router";
export default {
  setup() {
    onMounted(() => {
      getLeaderSolution()
      // eslint-disable-next-line no-unused-vars
      let res = task_common.getTaskById(id);
      res.then(function (data) {
        taskInfor.infor = data.infor;
        let authorres = task_common.getUserName(taskInfor.infor.posterId);
        authorres.then(function (value) {
          taskInfor.infor.author = value.username;
        });
        taskInfor.infor.date = task_common.getDateFromTime_Day(
          taskInfor.infor.date
        );
      });
      // leader.value = taskInfor.leader;
      leader.value = "lejin";
      if (leader.value != null) {
        showsubtasks.value = true;
      }
      console.log("初始化数据");
    });
    const user = reactive({
      id: 1,
      name: "lejin",
    });
    const router = useRouter();
    const goHome = () => {
      router.push({ path: "/task_index" });
    };
    const route = useRoute();
    const id = route.query.id; //task id
    let taskInfor = reactive({
      infor: {
        id: 1,
        title: "ACTS",
        author: "ligang",
        time: task_common.getNowDate(),
        description:
          "ACTS is a well-known combinatorial test suite generation tool. This tools was initially developed by NIST, and has been used in many real-world projects and organisations.",
        tag: "generation,ACTS",
        leader: "lejin",
      },
    });
    // 评论
    let reviewData = reactive({
      peopleNum: 6,
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
          content: `I think the "&#" symbol might not be the best choice for separation.`,
          date: "2020年10月28日 14:22:33",
          showReply: false,
          // 新回复

          reply: [
            {
              id: 1,
              root_id: 1,
              post_id: 2, // 谁发布的评论
              post_name: "gist",
              to_id: 1,
              to_name: "lejin", //@ 谁
              content: `I think the "&#" symbol might not be the best choice for separation.`,
              date: "2020年10月28日 14:22:33",
            },
            {
              id: 1,
              root_id: 1,
              post_id: 2, // 谁发布的评论
              post_name: "gist",
              to_id: 1,
              to_name: "lejin", //@ 谁
              content: `I think the "&#" symbol might not be the best choice for separation.`,
              date: "2020年10月28日 14:22:33",
            },
          ],
        },
        {
          id: 2,
          post_id: 1, // 谁发布的评论
          post_name: "lejin",
          content: `I think the "&#" symbol might not be the best choice for separation.`,
          date: "2020年10月28日 14:22:33",
          showReply: false,
          replyComment: "",
          reply: [
            {
              id: 1,
              root_id: 1,
              post_id: 2, // 谁发布的评论
              post_name: "乐进",
              to_id: 1,
              to_name: "lejin", //@ 谁
              content: `I think the "&#" symbol might not be the best choice for separation.`,
              date: "2020年10月28日 14:22:33",
            },
            {
              id: 1,
              root_id: 1,
              post_id: 2, // 谁发布的评论
              post_name: "gist",
              to_id: 1,
              to_name: "lejin", //@ 谁
              content: `I think the "&#" symbol might not be the best choice for separation.`,
              date: "2020年10月28日 14:22:33",
            },
          ],
        },
      ],
    });
    const addNewComment = () => {
      // alert(reviewData.content)
      if (task_common.isEmpty(reviewData.content)) {
        // alert('不能为空!');
        return;
      }
      let newComment = {
        id: -1,
        post_id: user.id, // 谁发布的评论
        post_name: user.name,
        content: reviewData.content,
        date: task_common.getNowDate(),
        showReply: false,
        reply: [],
      };
      reviewData.commentsData.push(newComment);
      reviewData.content = "";
      reviewData.showCommentSubmit = false;
    };
    const addNewReply = (index) => {
      if (task_common.isEmpty(reviewData.reply_content)) {
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
        date: task_common.getNowDate(),
      };
      reviewData.commentsData[index].reply.push(newreply);
      reviewData.commentsData[index].showReply = false;
      reviewData.reply_content = "";
    };
    let tabsActiveName = ref("detail");
    //成为leader
    const leader = ref(null);

    const becomeLeader = () => {
      ElMessage.success({
        message: "Apply successful!",
        type: "success",
      });
      leader.value = user.name;
      pattern.show = true;
    };
    //划分需求

    // 1.选择方案
    const pattern = reactive({
      show: false,
      value: "Cooperation",
      style1: "background: #343a40;color: white;padding: 10px;",
      style2: "padding: 10px;",
      style3: "padding: 10px;",
      numofsubtasks: "1",
      numofworkers: "1",
    });
    const changepattern = () => {
      if (pattern.value == "Cooperation") {
        (pattern.style1 = "background: #343a40;color: white;padding: 10px;"),
          (pattern.style2 = "padding: 10px;"),
          (pattern.style3 = "padding: 10px;");
      }
      if (pattern.value == "Competition") {
        pattern.numofsubtasks = 1;
        (pattern.style1 = "padding: 10px;"),
          (pattern.style2 = "background: #343a40;color: white;padding: 10px;"),
          (pattern.style3 = "padding: 10px;");
      }
      if (pattern.value == "Competition and Cooperation") {
        (pattern.style1 = "padding: 10px;"),
          (pattern.style2 = "padding: 10px;"),
          (pattern.style3 = "background: #343a40;color: white;padding: 10px;");
      }
    };
    //automatic

    const automatic = () => {
      subtask.list = [];
      if (pattern.value == "Cooperation") {
        var num = parseInt(pattern.numofsubtasks / pattern.numofworkers);
        var more = pattern.numofsubtasks % pattern.numofworkers;
        // alert(more)
        if (pattern.numofsubtasks < pattern.numofworkers) {
          for (var i = 0; i < pattern.numofsubtasks; i++) {
            var datatemp = {
              title: "task",
              numofsubtasks: "1",
              numofworker: "1",
              dealline: task_common.getNowDate(),
              description: taskInfor.description,
            };
            datatemp.title = "task" + (i + 1);
            datatemp.numofsubtasks = 1;
            datatemp.numofworker = 1;
            datatemp.dealline = task_common.getNowDate_Day();
            datatemp.description = taskInfor.infor.description;
            subtask.list = task_common.list_add(subtask.list, datatemp);
          }
        } else {
          for (var j = 0; j < pattern.numofworkers; j++) {
            var datatemp2 = {
              title: "task",
              numofsubtasks: "1",
              numofworker: "1",
              dealline: task_common.getNowDate(),
              description: taskInfor.description,
            };
            datatemp2.title = "task" + (j + 1);
            j != pattern.numofworkers - 1
              ? (datatemp2.numofsubtasks = num)
              : (datatemp2.numofsubtasks = num + more);
            datatemp2.numofworker = 1;
            datatemp2.dealline = task_common.getNowDate_Day();
            datatemp2.description = taskInfor.infor.description;

            subtask.list = task_common.list_add(subtask.list, datatemp2);
          }
        }
      }
      if (pattern.value == "Competition") {
        var datatemp3 = {
          title: "task",
          numofsubtasks: "1",
          numofworker: "1",
          dealline: task_common.getNowDate(),
          description: taskInfor.description,
        };
        datatemp3.title = "task1";
        datatemp3.numofsubtasks = pattern.numofsubtasks;
        datatemp3.numofworker = pattern.numofworkers;
        datatemp3.dealline = task_common.getNowDate_Day();
        datatemp3.description = taskInfor.infor.description;
        subtask.list = task_common.list_add(subtask.list, datatemp3);
      }
      if (pattern.value == "Competition and Cooperation") {
        (pattern.style1 = "padding: 10px;"),
          (pattern.style2 = "padding: 10px;"),
          (pattern.style3 = "background: #343a40;color: white;padding: 10px;");
      }
    };
    //add task
    var tempdata = reactive({
      data: {
        title: "",
        numofsubtasks: "",
        numofworker: "",
        dealline: "",
        description: "",
        remainingworker: pattern.numofworkers,
        remainingsubtasks: pattern.numofsubtasks,
      },
    });
    const rules = reactive({
      title: [
        { required: true, message: "please input title", trigger: "blur" },
        { min: 2, max: 10, message: "2~10 charactors", trigger: "blur" },
      ],
      numofsubtasks: [
        {
          required: true,
          message: "please input number of subtasks",
          trigger: "blur",
        },
      ],
      numofworker: [
        {
          required: true,
          message: "please input number of worker",
          trigger: "blur",
        },
      ],
      description: [
        {
          required: true,
          message: "please input description",
          trigger: "blur",
        },
        { min: 10, message: "10~ charactors", trigger: "blur" },
      ],
    });
    const subtask = reactive({
      dialogFormVisible: false,
      list: [
        // {
        //   title: "task1",
        //   numofsubtasks: "1",
        //   numofworker: "1",
        //   dealline: "2021-05-06",
        //   description: "稿纸信息建模",
        // },
        // {
        //   title: "task2",
        //   numofsubtasks: "1",
        //   numofworker: "1",
        //   dealline: "2021-05-06",
        //   description: "稿纸信息建模",
        // },
        // {
        //   title: "task3",
        //   numofsubtasks: "1",
        //   numofworker: "1",
        //   dealline: "2021-05-06",
        //   description: "稿纸信息建模",
        // },
        // {
        //   title: "task4",
        //   numofsubtasks: "1",
        //   numofworker: "1",
        //   dealline: "2021-05-06",
        //   description: "稿纸信息建模",
        // },
      ],
    });
    const openDialog = () => {
      subtask.dialogFormVisible = true;
      editDialog.flag = false;
      //初始化
      tempdata.data.title = "";
      tempdata.data.numofworker = "";
      tempdata.data.numofsubtasks = "";
      tempdata.data.dealline = task_common.getNowDate_Day();
      tempdata.data.description = "";
    };
    const addSubtask = () => {
      if (!editDialog.flag) {
        var datatemp = {
          title: "",
          numofsubtasks: "",
          numofworker: "",
          dealline: "",
          description: "",
        };

        datatemp.title = tempdata.data.title;
        datatemp.numofsubtasks = tempdata.data.numofsubtasks;
        datatemp.numofworker = tempdata.data.numofworker;
        datatemp.dealline = task_common.getDateFromTime_Day(
          tempdata.data.dealline
        );
        datatemp.description = tempdata.data.description;
        console.log(tempdata.data);
        if (
          (tempdata.data.remainingworker > tempdata.data.numofworker &&
            tempdata.data.remainingsubtasks > tempdata.data.numofworker) ||
          (tempdata.data.remainingworker == tempdata.data.numofworker &&
            tempdata.data.remainingsubtasks == tempdata.data.numofworker)
        ) {
          tempdata.data.remainingworker =
            tempdata.data.remainingworker - tempdata.numofworker;
          tempdata.data.remainingsubtasks =
            tempdata.data.remainingsubtasks - tempdata.numofsubtasks;
          subtask.list = task_common.list_add(subtask.list, datatemp);
        } else {
          ElMessage.error({
            message: "please check your input",
            type: "error",
          });
          return;
        }
      } else {
        var datatemp2 = {
          title: "",
          numofsubtasks: "",
          numofworker: "",
          dealline: "",
          description: "",
        };
        datatemp2.title = tempdata.data.title;
        datatemp2.numofsubtasks = tempdata.data.numofsubtasks;
        datatemp2.numofworker = tempdata.data.numofworker;
        datatemp2.dealline = task_common.getDateFromTime_Day(
          tempdata.data.dealline
        );
        datatemp2.description = tempdata.data.description;
        subtask.list[editDialog.index] = datatemp2;
      }
      subtask.dialogFormVisible = false;
    };
    const deleteRow = (index) => {
      subtask.list = task_common.list_remove(subtask.list, index);
    };
    const editDialog = reactive({
      flag: false,
      index: 1,
    });
    const editRow = (index) => {
      editDialog.flag = true;
      subtask.dialogFormVisible = true;
      editDialog.index = index;
      tempdata.data.title = subtask.list[index].title;
      tempdata.data.dealline = subtask.list[index].dealline;
      tempdata.data.numofsubtasks = subtask.list[index].numofsubtasks;
      tempdata.data.numofworker = subtask.list[index].numofworker;
      tempdata.data.description = subtask.list[index].description;
    };
    //submit subtask
    const submitsubtasks = () => {
      ElMessage.success({
        message: "submit successful!",
        type: "success",
      });

      pattern.show = false;
      showsubtasks.value = true;
      tabsActiveName.value = "subtask";
    };
    const showsubtasks = ref(false);
    //show subtasks
    const solutionresults = reactive({
      data: [
        [
          {
            modelfile: `1）	参数
模板状态#state：["开启","关闭"]
可使用者#peopleworkable： ["肖隽"," 谢凯","胡天驰","李春芳","吕思瑶","鲁青松","陈为","李林","空"]
可维护者#peoplemaintain： ["肖隽"," 谢凯","胡天驰","李春芳","吕思瑶","鲁青松","陈为","李林","空"]
支持多会议室#moreroom：["开启","不开启"]
召开周期#cycle：["不定期","每年" ,"每季" ,"每月" ,"每周"]
会议组织人#organizer：["肖隽"," 谢凯","胡天驰","李春芳","吕思瑶","鲁青松","陈为","李林","空"]
会议组织部门#department：["深圳平南铁路有限公司"," 深圳地铁置业集团有限公司","运营管理办公室","集团信息管理中心","信息管理中心","领导力学院","深圳地铁建设集团有限公司","深圳市市政设计研究院有限公司","调度三部"]
会议纪要人员#peoplediscipline：["肖隽"," 谢凯","胡天驰","李春芳","吕思瑶","鲁青松","陈为","李林","空"]
提前天数催办会议组织人召开会议#advanceday：（0-7）
关联投票模块模板#votetype：["文化类","管理类","新员工管理","营销类","技术类","其他类"]
流程引用方式#flowtype：["引用默认模板","引用其它模板","自定义","自由流"]
2）	约束
a.	召开周期不为不定期那么会议组织人不能为空`,
            worker: "lejin",
            time: task_common.getNowDate_Day(),
            type: "File",
            solutions: [],
          },
          {
            modelfile: `1）	参数
模板状态#state：["开启","关闭"]
可使用者#peopleworkable： ["肖隽"," 谢凯","胡天驰","李春芳","吕思瑶","鲁青松","陈为","李林","空"]
可维护者#peoplemaintain： ["肖隽"," 谢凯","胡天驰","李春芳","吕思瑶","鲁青松","陈为","李林","空"]
支持多会议室#moreroom：["开启","不开启"]
关联投票模块模板#votetype：["文化类","管理类","新员工管理","营销类","技术类","其他类"]
流程引用方式#flowtype：["引用默认模板","引用其它模板","自定义","自由流"]
由系统自动发布到新闻#releasenews：["是","否"]
权限生效时间#Permissiontime：["文档审批通过后生效","文档提交后生效"]
编号引用方式#number：["引用默认编号规则","引用其它编号规则","自定义"]
同步时机#synchronization：["不同步","发送会议通知后即同步","参会人员确认参加后同步"]
是否保存审批意见#approvalsave：["是","否"]
标题#title：["实际其他与会人员","纪要通知方式","编辑方式","其他列席人员","纪要通知人","状态","ID","外部地点","其他参加人员","其他主持人","会议名称","外部分会场"]
作者#author：["纪要人员","签署人员"]`,
            worker: "ligang",
            type: "File",
            time: task_common.getNowDate_Day(),
            solutions: [],
          },
          {
            modelfile: `1）参数
分类导航#classify：["不限","普通会议"]
审批状态#approval：["不限","废弃","草稿","待审","驳回","发布"]
主持人#host：["不限","cyq1" ,"cyq2" ,"cyq3", "肖隽"," 谢凯","胡天驰","李春芳","吕思瑶","鲁青松","陈为","李林"]
会议发起人#organize：["不限", "cyq1" ,"cyq2" ,"cyq3", "肖隽"," 谢凯","胡天驰","李春芳","吕思瑶","鲁青松","陈为","李林"]
组织部门#department：["不限","深圳市地铁集团有限公司","外部单位","外部组织","xn部门"]
召开时间#begintime：["不限","近一周","近一个月","近三个月","近半年","近一年"]`,
            worker: "Leader",
            type: "File",
            time: task_common.getNowDate_Day(),
            solutions: [],
          },
        ],
        [
          {
            modelfile: `1）参数
分类导航#classify：["不限","普通会议"]
审批状态#approval：["不限","废弃","草稿","待审","驳回","发布"]
主持人#host：["不限","cyq1" ,"cyq2" ,"cyq3", "肖隽"," 谢凯","胡天驰","李春芳","吕思瑶","鲁青松","陈为","李林"]
会议发起人#organize：["不限", "cyq1" ,"cyq2" ,"cyq3", "肖隽"," 谢凯","胡天驰","李春芳","吕思瑶","鲁青松","陈为","李林"]
组织部门#department：["不限","深圳市地铁集团有限公司","外部单位","外部组织","xn部门"]
召开时间#begintime：["不限","近一周","近一个月","近三个月","近半年","近一年"]`,
            type: "Flow",
            worker: "lejin",
            time: task_common.getNowDate_Day(),
            solutions: [
              {
                id: 69,
                type: "FormatConversion",
                title: "ACTS Format Reader",
                img:
                  "https://findicons.com/files/icons/2787/beautiful_flat_icons/128/hourglass.png",
                author: "lejin",
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
                inputFormat: `file;string;the test model of ACTS;[System]&#Name: Phone&#[Parameter]&#emailViewer(boolean): TRUE, FALSE&#textLines(int): 25,26,27,28,29,30&#display(enum): 16MC, 8MC, BW&#[Constraint]&#emailViewer => textLines > 28&#
strength;int;covering strength;2`,
                outputFormat: `strength;int;covering strength;2
parameter;int;number of parameters;3
values;int[];number of choices of each parameter;[2,6,3]
constraints;string[][];a list of forbidden tuples;[["0/1"],["1/0"]]`,
              },

              {
                id: 69,
                type: "Generation",
                title: "ACTS",
                img:
                  "https://findicons.com/files/icons/2787/beautiful_flat_icons/128/hourglass.png",
                author: "lejin",
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
              {
                id: 69,
                type: "Generation",
                title: "JUnit Script",
                img:
                  "https://findicons.com/files/icons/2787/beautiful_flat_icons/128/hourglass.png",
                author: "lejin",
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
                inputFormat: `testsuite;int[][];test suite;[[0,0,0],[0,1,1],[1,0,1],[1,1,0]]
actual_value;string[][];actual values of each parameter;[["1","2"],["true","false","1","1","1","1"],["1","0","2"]]
functionHead;string;template of function declaration;public void test()
functionBody;string;template of function body;CIT cit= new CIT(&p2) cit.execuse(&p3) cit.process(&p1)`,
                outputFormat: `testsuiteOfJunit;string[];code scripts;[]`,
              },
            ],
          },
          {
            modelfile: `1）参数
分类导航#classify：["不限","普通会议"]
审批状态#approval：["不限","废弃","草稿","待审","驳回","发布"]
主持人#host：["不限","cyq1" ,"cyq2" ,"cyq3", "肖隽"," 谢凯","胡天驰","李春芳","吕思瑶","鲁青松","陈为","李林"]
会议发起人#organize：["不限", "cyq1" ,"cyq2" ,"cyq3", "肖隽"," 谢凯","胡天驰","李春芳","吕思瑶","鲁青松","陈为","李林"]
组织部门#department：["不限","深圳市地铁集团有限公司","外部单位","外部组织","xn部门"]
召开时间#begintime：["不限","近一周","近一个月","近三个月","近半年","近一年"]`,
            worker: "ligang",
            type: "Flow",
            time: task_common.getNowDate_Day(),
            solutions: [
              {
                id: 69,
                type: "FormatConversion",
                title: "ACTS Format Reader",
                img:
                  "https://findicons.com/files/icons/2787/beautiful_flat_icons/128/hourglass.png",
                author: "lejin",
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
                inputFormat: `file;string;the test model of ACTS;[System]&#Name: Phone&#[Parameter]&#emailViewer(boolean): TRUE, FALSE&#textLines(int): 25,26,27,28,29,30&#display(enum): 16MC, 8MC, BW&#[Constraint]&#emailViewer => textLines > 28&#
strength;int;covering strength;2`,
                outputFormat: `strength;int;covering strength;2
parameter;int;number of parameters;3
values;int[];number of choices of each parameter;[2,6,3]
constraints;string[][];a list of forbidden tuples;[["0/1"],["1/0"]]`,
              },

              {
                id: 69,
                type: "Generation",
                title: "ACTS",
                img:
                  "https://findicons.com/files/icons/2787/beautiful_flat_icons/128/hourglass.png",
                author: "lejin",
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
              {
                id: 69,
                type: "Generation",
                title: "JUnit Script",
                img:
                  "https://findicons.com/files/icons/2787/beautiful_flat_icons/128/hourglass.png",
                author: "lejin",
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
                inputFormat: `testsuite;int[][];test suite;[[0,0,0],[0,1,1],[1,0,1],[1,1,0]]
actual_value;string[][];actual values of each parameter;[["1","2"],["true","false","1","1","1","1"],["1","0","2"]]
functionHead;string;template of function declaration;public void test()
functionBody;string;template of function body;CIT cit= new CIT(&p2) cit.execuse(&p3) cit.process(&p1)`,
                outputFormat: `testsuiteOfJunit;string[];code scripts;[]`,
              },
            ],
          },
        ],
      ],
    });
    const solutionLists = reactive({
      data: [
        [
          {
            id: 69,
            type: "FormatConversion",
            title: "ACTS Format Reader",
            img:
              "https://findicons.com/files/icons/2787/beautiful_flat_icons/128/hourglass.png",
            author: "lejin",
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
            inputFormat: `file;string;the test model of ACTS;[System]&#Name: Phone&#[Parameter]&#emailViewer(boolean): TRUE, FALSE&#textLines(int): 25,26,27,28,29,30&#display(enum): 16MC, 8MC, BW&#[Constraint]&#emailViewer => textLines > 28&#
strength;int;covering strength;2`,
            outputFormat: `strength;int;covering strength;2
parameter;int;number of parameters;3
values;int[];number of choices of each parameter;[2,6,3]
constraints;string[][];a list of forbidden tuples;[["0/1"],["1/0"]]`,
          },

          {
            id: 69,
            type: "Generation",
            title: "ACTS",
            img:
              "https://findicons.com/files/icons/2787/beautiful_flat_icons/128/hourglass.png",
            author: "lejin",
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
          {
            id: 69,
            type: "Generation",
            title: "JUnit Script",
            img:
              "https://findicons.com/files/icons/2787/beautiful_flat_icons/128/hourglass.png",
            author: "lejin",
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
            inputFormat: `testsuite;int[][];test suite;[[0,0,0],[0,1,1],[1,0,1],[1,1,0]]
actual_value;string[][];actual values of each parameter;[["1","2"],["true","false","1","1","1","1"],["1","0","2"]]
functionHead;string;template of function declaration;public void test()
functionBody;string;template of function body;CIT cit= new CIT(&p2) cit.execuse(&p3) cit.process(&p1)`,
            outputFormat: `testsuiteOfJunit;string[];code scripts;[]`,
          },
        ],
        [
          {
            id: 69,
            type: "FormatConversion",
            title: "ACTS Format Reader",
            img:
              "https://findicons.com/files/icons/2787/beautiful_flat_icons/128/hourglass.png",
            author: "lejin",
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
            inputFormat: `file;string;the test model of ACTS;[System]&#Name: Phone&#[Parameter]&#emailViewer(boolean): TRUE, FALSE&#textLines(int): 25,26,27,28,29,30&#display(enum): 16MC, 8MC, BW&#[Constraint]&#emailViewer => textLines > 28&#
strength;int;covering strength;2`,
            outputFormat: `strength;int;covering strength;2
parameter;int;number of parameters;3
values;int[];number of choices of each parameter;[2,6,3]
constraints;string[][];a list of forbidden tuples;[["0/1"],["1/0"]]`,
          },

          {
            id: 69,
            type: "Generation",
            title: "ACTS",
            img:
              "https://findicons.com/files/icons/2787/beautiful_flat_icons/128/hourglass.png",
            author: "lejin",
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
          {
            id: 69,
            type: "Generation",
            title: "JUnit Script",
            img:
              "https://findicons.com/files/icons/2787/beautiful_flat_icons/128/hourglass.png",
            author: "lejin",
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
            inputFormat: `testsuite;int[][];test suite;[[0,0,0],[0,1,1],[1,0,1],[1,1,0]]
actual_value;string[][];actual values of each parameter;[["1","2"],["true","false","1","1","1","1"],["1","0","2"]]
functionHead;string;template of function declaration;public void test()
functionBody;string;template of function body;CIT cit= new CIT(&p2) cit.execuse(&p3) cit.process(&p1)`,
            outputFormat: `testsuiteOfJunit;string[];code scripts;[]`,
          },
        ],
      ],
    });
    const currentsubtask = reactive({
      list: [
        {
          title: "task1",
          numofsubtasks: "1",
          numofworker: "1",
          dealline: "2021-05-06",
          description: `按照分配的章节，仔细阅读《深圳地铁 OA 系统使用说明书》，挑选符合条件的模块（页
面），然后利用组合测试方法建立模型。必要时可登录这个系统查看相应的模块：首先登录
VPN，然后访问项目地址。
VPN 地址地址 https://210.83.226.14
账号：lanlingoa3 密码：Landray@503oa
VPN 登录成功后，访问系统：http://10.33.1.189:8080/login.jsp?login_special=specialLoginOa
账号：admin 密码：ABCabc123
`,
          remainingworker: 0,
          solutionresults: solutionresults.data[0],
          bestsolutions: solutionresults.data[0][0],
          leader: "lejin",
          workers: ["lejin"],
        },
        {
          title: "task2",
          numofsubtasks: "1",
          numofworker: "1",
          dealline: "2021-05-06",
          description: "稿纸信息建模",
          remainingworker: 0,
          solutionresults: solutionresults.data[1],
          bestsolutions: solutionresults.data[1][0],
          leader: "lejin",
          workers: ["lejin"],
        },
      ],
    });
    const applysubtask = (index) => {
      ElMessage.success({
        message: "apply successful!",
        type: "success",
      });
      currentsubtask.list[index].remainingworker =
        currentsubtask.list[index].remainingworker - 1;
    };
    const viewsubtask = (index) => {
      subtaskinfor.show = true;
      subtaskinfor.tabname = currentsubtask.list[index].title;
      subtaskinfor.data = currentsubtask.list[index];
      tabsActiveName.value = subtaskinfor.tabname;
    };
    const modifysolutions = () => {};

    const subtaskinfor = reactive({
      tabname: "",
      data: {
        title: "",
        numofsubtasks: "",
        numofworker: "",
        dealline: "",
        description: "",
        remainingworker: pattern.numofworkers,
        remainingsubtasks: pattern.numofsubtasks,
        solutionresults: solutionresults.data[0],
        bestsolutions: solutionresults.data[0][0],
      },
      show: false,
    });
    const removeTab = () => {
      subtaskinfor.show = false;
      tabsActiveName.value = "subtask";
    };
    const downloadFile = (str) => {
      str = str.replaceAll("：", ",").replaceAll("[", "").replaceAll("]", "");
      // alert(str);
      let uri = "data:text/csv;charset=utf-8,\ufeff" + encodeURIComponent(str);
      //通过创建a标签实现
      var link = document.createElement("a");
      link.href = uri;
      //对下载的文件命名
      link.download = "model.csv";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
    const modeltable = reactive({
      drawer: false,
      data: [
        ["p1", "v1", "v2"],
        ["p2", "v1", "v2"],
        ["p3", "v1", "v2", "v3"],
      ],
      constraints: ["a.	召开周期不为不定期那么会议组织人不能为空"],
    });
    const viewFile = (str) => {
      var res = task_common.getModelTableData(str);
      modeltable.data = res.modeltemp;
      modeltable.constraints = res.consstr;
      console.log(res.modeltemp);
      modeltable.drawer = true;
      // alert(str);
    };
    const mergeData = reactive({
      show: false,
      sameMap: {},
      same: [],
      different: [],
      leader: [],
      data: [],
      values: [],
      valueMergePattern:""
    });
    const getMergeData = () => {
      var modeldatasameMap = {};
      var modeldatasame = [];
      var modeldatadifferent = [];
      var solutionres = subtaskinfor.data.solutionresults;
      var modelall = [];
      var consstrall = [];
      for (var i = 0; i < solutionres.length-1; i++) {
        var res = task_common.getModelTableData(solutionres[i].modelfile);
        var param = [];
        for (var j = 0; j < res.modeltemp.length; j++) {
          param.push(res.modeltemp[j][0].split("#")[0]);
        }
        modelall = modelall.concat(param);
        if (res.consstr != "") {
          consstrall = consstrall.concat(res.consstr);
        }
      }
      var getsamediff = task_common.getSameAndDiff(modelall);
      mergeData.sameMap = getsamediff.same;
      modeldatasameMap = task_common.getMapKeysValues(getsamediff.same);
      modeldatasame = modeldatasameMap.keys;
      modeldatadifferent = getsamediff.diff;
      mergeData.same = modeldatasame;
      mergeData.different = modeldatadifferent;

      // console.log("modelall",modeldatasame)
      // console.log("consstrall",modeldatadifferent)
    };
    const mergeSolutions = () => {
      getMergeData();
      mergeData.show = true;
      var data = [];
      for (let i = 0; i < mergeData.different.length; i++) {
        data.push({
          key: mergeData.different[i],
          label: mergeData.different[i] + "：1",
        });
      }
      var values = [];
      for (let i = 0; i < mergeData.same.length; i++) {
        data.push({
          key: mergeData.same[i],
          label:
            mergeData.same[i] + "：" + mergeData.sameMap[mergeData.same[i]],
        });
        values.push(mergeData.same[i]);
      }
      mergeData.data = data;
      mergeData.values = values;
    };
    const clickmerform = () => {
      document.getElementById("submitmergeform").click()
      // alert(mergeData.valueMergePattern);
    };
    const mergerules=reactive({
      mergevalue: [
        {
          required: true,
          message: "",
          trigger: "blur",
        }
      ],
    })
    const getLeaderSolution=()=>{
      mergeData.show=false;
      var mapall={}
      var mapdiff={}
      var solutionres = subtaskinfor.data.solutionresults;
       for (var i = 0; i < solutionres.length-1; i++) {
        var res = task_common.getModelTableData(solutionres[i].modelfile);
           mapall[solutionres[i].worker]=task_common.toMaplist(res.modeltemp)
           for(var item in mapall[solutionres[i].worker]){
             mapdiff[item]=mapall[solutionres[i].worker][item]
        
      }
       }
      // for(i=0;i<mergeData.values.length;i++){
       
      // }
       console.log(mapdiff)

    }
    return {
      getLeaderSolution,
      mergerules,
      clickmerform,
      mergeSolutions,
      getMergeData,
      mergeData,
      modeltable,
      viewFile,
      downloadFile,
      solutionresults,
      modifysolutions,
      solutionLists,
      viewsubtask,
      subtaskinfor,
      removeTab,
      applysubtask,
      currentsubtask,
      rules,
      showsubtasks,
      submitsubtasks,
      openDialog,
      editDialog,
      editRow,
      automatic,
      tempdata,
      addSubtask,
      deleteRow,
      subtask,

      leader,
      becomeLeader,
      changepattern,
      pattern,
      user,
      reviewData,
      addNewComment,
      addNewReply,
      taskInfor,
      tabsActiveName,
      goHome,
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        // alert(valid)
        if (valid) {
          this.addSubtask();
        } else {
          this.$message.error("please check your input !");
        }
      });
    },
    mergeSubmit(formName){
      this.$refs[formName].validate((valid) => {
        // alert(valid)
        if (valid) {
          this.getLeaderSolution();
        } else {
          this.$message.error("please select value merge pattern");
        }
      });}
  },
  components: { tagList },
};
</script>
<style scope>
.headerofcollapse {
  font-weight: 700;
  color: darkcyan !important;
}
.iconfont {
  font-family: "iconfont" !important;
  font-size: 26px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
<style >
#date-picker > .el-form-item__label:before {
  content: "*";
  color: #f56c6c;
  margin-right: 4px;
}
textbf {
  font-weight: bold;
}
textred {
  color: #dc3545;
  font-style: italic;
}
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
.el-form-item__label {
  font-size: 1rem !important;
}
/* el-col-lg-18 {
  widows: 75%;
} */
.el-col-7 {
  width: 29.16667%;
}

.el-col-8 {
  width: 33.3333%;
}
.el-col-9 {
  width: 37.5%;
}
.el-col-10 {
  width: 41.6667%;
}
.el-col-11 {
  width: 45.83333%;
}
.el-col-12 {
  width: 50%;
}
.el-col-13 {
  width: 54.167%;
}
.el-col-14 {
  width: 58.33333%;
}
.el-col-17 {
  width: 70.833333%;
}
.el-col-20 {
  width: 83.333%;
}
.el-col-22 {
  width: 91.667%;
}
</style>
<style>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 100%;
}
.el-form--inline .el-form-item__label {
  float: none;
  display: block;
}
</style>