<template>
  <el-container>
    <el-row style="    width: 100%;"> 
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
        <!-- <el-page-header @click="goBack" :content="type" style="margin-top: 15px;weight:400;">
</el-page-header>-->
        <div style="margin-bottom: 30px; width: 100%">
          <h2>
            <strong style="color: #17a008 !important" id="searchNum"
              >{{ type }}
            </strong>
            Services
          </h2>
          <p class="text-secondary">
            Find <strong style="color: #17a2b8 !important" id="searchNum">
              {{ serviceListData.list.length}} </strong
            >services that perform CIT test suite generation activity.
          </p>
          <el-row
            ><el-col
              :xs="{ span: 24, offset: 0 }"
              :sm="{ span: 24, offset: 0 }"
              :md="{ span: 19, offset: 0 }"
              :lg="{ span: 19, offset: 0 }"
              :xl="{ span: 19, offset: 0 }"
            >
              <el-input
                placeholder="name, type, author and tags ..."
                v-model="keyword"
              >
                <template #prefix>
                  <i class="el-input__icon el-icon-search"></i>
                </template>
              </el-input> </el-col
            ><el-col
              :xs="{ span: 24, offset: 0 }"
              :sm="{ span: 24, offset: 0 }"
              :md="{ span: 4, offset: 1 }"
              :lg="{ span: 4, offset: 1 }"
              :xl="{ span: 4, offset: 1 }"
              ><el-button
                type="primary"
                icon="el-icon-search"
                style="width: 100%"
                @click="searchByKeyword"
                >search</el-button
              ></el-col
            ></el-row
          >
        </div>
        <el-col :span="24">
          <serviceList
            ref="RefChilde"
            :serviceList="serviceListData.list"
          ></serviceList>
        </el-col>
      </el-col>
    </el-row>
  </el-container>
</template>

<script>
import { useRouter, useRoute } from "vue-router";
import { ref, reactive,onMounted } from "vue";
import serviceTypeList from "./typelist.vue";
import serviceList from "./servicelist.vue";
import { request } from "./request";
import { getUserName, getTags,getScores,getDateFromTime_Day } from "./common";
export default {
  setup() {
    const router = useRouter();
    const route = useRoute();
    const type = ref(route.query.type);
    //  alert(JSON.stringify(type))
    //  router.go(0);
    function goBack() {
      router.go(-1);
    }
    //1.需要展示的数据
    let serviceListData = reactive({ list: [] });
    // localStorage.setItem("serviceList",JSON.stringify(service_data2))
    console.log("加载index");
    //2.搜索的关键字
    let keyword = ref("");
    //2.1 搜素的方法
    function searchByKeyword() {
      console.log("搜索数据");
      let res = getServiceListByTypeAndKeyWord(type.value,keyword.value);
      res.then(function (data) {
        console.log(data.list);
        dealData(data.list);
      });
    }
    //3. 页面初始化方法(类型)
    onMounted(() => {
      // eslint-disable-next-line no-unused-vars
      let res = getServiceListByType(type.value);
      res.then(function (data) {
        console.log(data.list);
        dealData(data.list);
      });
      console.log("初始化数据");
    });
    //2.2 搜索http请求获取数据
    //1)根据类型查找
    // eslint-disable-next-line no-unused-vars
    function getServiceListByType(type) {
      // alert(keyword)
        return request(
          {
            url: "/service/infor/searchByType/" + type,
            method: "get",
            data: {},
          },
          "/serviceapi"
        );
      
    }

    //2)根据关键字和类型查找
    // eslint-disable-next-line no-unused-vars
    function getServiceListByTypeAndKeyWord(type,keyword) {
      // alert(keyword)
      if (keyword == "") {
        return getServiceListByType()
      } else {
        return request(
          {
            url: "/service/infor/searchByTypeAndKeyword/" + type+"/"+keyword,
            method: "get",
            data: {},
          },
          "/serviceapi"
        );
      }
    }

    //4. 处理搜索的数据
    function dealData(servicelist) {
      console.log(serviceListData.list);
      serviceListData.list = servicelist;
      console.log(serviceListData.list);
      for (var i = 0; i < serviceListData.list.length; i++) {
        serviceListData.list[i].tags = getTags(servicelist[i].tags);
        let res = getUserName(servicelist[i].userId);
        let b = i;
        res.then(function (value) {
          console.log(value.username);
          console.log(serviceListData.list[b]);
          eval("serviceListData.list[b].author='" + value.username + "'");
        });
        let res2=getScores(servicelist[i].id);
        res2.then(function (value) {
          // console.log(value.username);
          serviceListData.list[b].scores=value.scores
        });
        serviceListData.list[i].date=getDateFromTime_Day(serviceListData.list[i].date)
      }
    }

    return {
      type,
      goBack,
      keyword,
      searchByKeyword,
      serviceListData,
      getServiceListByType,
      dealData
    };
  },
  components: {
    serviceTypeList,
    serviceList,
  },
  watch: {
    //用于监听浏览器地址是否改变
    // eslint-disable-next-line no-unused-vars
    $route(to, from) {
      console.log(this);
      this.type = this.$route.query.type;
      // this.data.tags = this.type;
     let res= this.getServiceListByType(this.type)
     let that=this
      res.then(function (data) {
        console.log(data.list);
        that.dealData(data.list);
      });
    },
  },
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
