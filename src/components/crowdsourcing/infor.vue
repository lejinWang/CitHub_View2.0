<template>
  <el-row id="inforRow">
    <el-col :xs="{ span: 24, offset: 0 }" :sm="{ span: 24, offset: 0 }" :md="{ span: 6, offset: 0 }" :lg="{ span: 6, offset: 0 }" :xl="{ span: 6, offset: 0 }"> <tagList></tagList> </el-col>
    <el-col :xs="{ span: 24, offset: 0 }" :sm="{ span: 24, offset: 0 }" :md="{ span: 17, offset: 1 }" :lg="{ span: 17, offset: 1 }" :xl="{ span: 17, offset: 1 }">
      <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
        <el-breadcrumb-item :to="{ path: '/task_index' }" @click="goHome">Task</el-breadcrumb-item>
        <el-breadcrumb-item>{{ taskInfor.infor.title }}</el-breadcrumb-item>
      </el-breadcrumb>
      <el-col :xs="{ span: 12, offset: 0 }" :sm="{ span: 12, offset: 0 }" :md="{ span: 18, offset: 0 }" :lg="{ span: 18, offset: 0 }" :xl="{ span: 20, offset: 0 }">
        <el-col :span="24"
          ><h1 style="float: left">{{ taskInfor.infor.title }}</h1>
        </el-col>
        <el-col :span="24" style="margin-bottom: 10px">
          <el-tag v-for="item in taskInfor.infor.tag.split(',')" :key="item" effect="dark" style="margin-right: 10px; height: 20px; font-size: 10px; padding: 0px 5px 2px; display: unset">
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
        </el-col>
        <el-col :span="24" style="margin-bottom: 20px">
          {{ taskInfor.infor.description }}
        </el-col>
        <el-col :span="24" style="margin-bottom: 10px; z-index: 0">
          <el-tabs v-model="tabsActiveName" type="card" @tab-click="handleClick">
            <el-tab-pane label="Details" name="detail">
              <p>{{ taskInfor.infor.description }}</p>
            </el-tab-pane>
            <el-tab-pane label="Solutions" name="second">
            <p style="font-size:1.2rem;color:grey">
              No Data 
            </p>
            </el-tab-pane>
            <el-tab-pane label="Review" name="third">
              <el-row>
                <el-col :span="4">
                  <font style="font-weight: bold; font-size: 1.5rem; margin-top: 20px">Reviews </font>
                  <span style="margin-top: 10px; display: block; color: blue">{{ reviewData.peopleNum }} reviews</span>
                </el-col>

                <el-col :span="24" style="padding: 0px; margin-top: 20px; text-align: left">
                  <el-row style="margin-bottom: 10px">
                    <el-col :span="2">
                      <el-avatar :size="55" style="font-size: 1.5rem; padding: 2px">{{ user.name.substr(0, 1).toUpperCase() }}</el-avatar>
                    </el-col>
                    <el-col :span="22">
                      <el-input style="width: 98%; margin-left: 2%" type="textarea" placeholder="comments" v-model="reviewData.content" maxlength="30" @focus="reviewData.showCommentSubmit = true"> </el-input>
                      <el-button v-show="reviewData.showCommentSubmit" style="margin: 15px 0px 0px 2%; float: left" type="primary" @click="addNewComment()">Submit</el-button>
                    </el-col>
                  </el-row>
                  <!--评论-->
                  <div v-for="(item, index) in reviewData.commentsData" :key="item.id">
                    <el-col :span="2">
                      <el-avatar :size="55" style="font-size: 1.5rem">{{ item.post_name.substr(0, 1).toUpperCase() }}</el-avatar>
                    </el-col>
                    <el-col :span="22">
                      <el-col :span="24">
                        <el-label style="margin-left: 2%; float: left; font-size: 1.5rem; font-weight: 500; line-height: 1"
                          >{{ item.post_name }}<br /><span style="font-size: 1rem; font-weight: 200">{{ item.date }}</span></el-label
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
                          <font style="font-size: 1.27rem"> {{ item.reply.length }}</font></el-label
                        >
                      </el-col>
                      <el-col :span="24">
                        <el-label style="float: left; margin: 2%">{{ item.content }}</el-label>
                      </el-col>

                      <!--回复-->
                      <div v-for="reply_item in item.reply" :key="reply_item.id">
                        <el-col :span="2">
                          <el-avatar :size="50" style="font-size: 1.5rem">{{ reply_item.post_name.substr(0, 1).toUpperCase() }}</el-avatar>
                        </el-col>
                        <el-col :span="22">
                          <el-col :span="24">
                            <el-label style="margin-left: 2%; float: left; font-size: 1.5rem; font-weight: 500; line-height: 1"
                              >{{ reply_item.post_name }}<br /><span style="font-size: 1rem; font-weight: 200">{{ reply_item.date }}</span></el-label
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
                              ><span style="color: blue">@{{ reply_item.to_name }}: </span>{{ reply_item.content }}</el-label
                            >
                          </el-col>
                        </el-col>
                      </div>
                      <el-col :span="24" v-show="item.showReply" style="margin-bottom: 10px">
                        <el-input style="width: 98%; margin-left: 2%" type="textarea" :placeholder="comments" v-model="reviewData.reply_content" maxlength="30"> </el-input>
                        <el-button style="margin: 15px 0px 0px 2%; float: left" type="primary" @click="addNewReply(index)">Submit</el-button>
                      </el-col>
                    </el-col>
                    <el-col :span="24"> <el-divider></el-divider></el-col>
                  </div>
                </el-col>
              </el-row>
            </el-tab-pane> </el-tabs></el-col></el-col></el-col
  ></el-row>
</template>

<script>
import { reactive, ref,onMounted } from "vue";
import * as task_common from "./common";
import tagList from "./taglist.vue";
import { useRouter,useRoute } from "vue-router";
// import { useRoute, useRouter } from "vue-router";
export default {
  setup() {
     onMounted(() => {
      // eslint-disable-next-line no-unused-vars
      let res = task_common.getTaskById(id);
      res.then(function (data) {
        taskInfor.infor=data.infor
         let authorres = task_common.getUserName(taskInfor.infor.posterId);
        authorres.then(function (value) {
          taskInfor.infor.author = value.username;
        });
         taskInfor.infor.date = task_common.getDateFromTime_Day(
          taskInfor.infor.date
        );

        
      });
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
    const id = route.query.id;//task id
    let taskInfor = reactive({
      infor:{
      id: 1,
      title: "ACTS",
      author: "ligang",
      time: task_common.getNowDate(),
      description: "ACTS is a well-known combinatorial test suite generation tool. This tools was initially developed by NIST, and has been used in many real-world projects and organisations.",
      tag: "generation,ACTS",
    }});
    let reviewData = reactive({
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
    return { user, reviewData, addNewComment, addNewReply, taskInfor, tabsActiveName, goHome };
  },
  methods: {},
  components: { tagList },
};
</script>

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
</style>
