<template>
  <div>
    <el-card
      shadow="always"
      v-for="service in serviceList"
      :key="service.title"
      style="margin-bottom: 20px"
    >
      <el-row
        ><el-col
          :xs="{ span: 24, offset: 0 }"
          :sm="{ span: 6, offset: 0 }"
          :md="{ span: 6, offset: 0 }"
          :lg="{ span: 6, offset: 0 }"
          :xl="{ span: 6, offset: 0 }"
          style="text-align: center"
          ><img :src="service.img" style="height: auto"
        /></el-col>
        <el-col
          :xs="{ span: 24, offset: 0 }"
          :sm="{ span: 18, offset: 0 }"
          :md="{ span: 18, offset: 0 }"
          :lg="{ span: 18, offset: 0 }"
          :xl="{ span: 18, offset: 0 }"
          ><h3>
            <a href="#" @click.prevent="serviceInfor(service.id)">{{ service.title }}</a>
          </h3>
          <div class="tag-group">
            <el-tag
              v-for="item in service.tags"
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
          </div>
          <p>{{ service.desc }}</p>
          <el-row
            ><el-col
              :xs="{ span: 24, offset: 0 }"
              :sm="{ span: 11, offset: 0 }"
              :md="{ span: 11, offset: 0 }"
              :lg="{ span: 12, offset: 0 }"
              :xl="{ span: 12, offset: 0 }"
              ><el-rate
                v-model="service.scores"
                disabled
                show-score
                text-color="#ff9900"
                score-template="{value}"
              >
              </el-rate> </el-col
            ><el-col
              :xs="{ span: 13, offset: 0 }"
              :sm="{ span: 13, offset: 0 }"
              :md="{ span: 13, offset: 0 }"
              :lg="{ span: 12, offset: 0 }"
              :xl="{ span: 12, offset: 0 }"
              ><span class="float-right"
                >created by
                <strong class="text-dark"
                  ><a href="ModuleOfUser/user_public.html?userId=12">{{
                    service.author
                  }}</a></strong
                >
                on <strong class="text-dark">{{ service.time }}</strong></span
              ></el-col
            ></el-row
          >
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import {} from "vue";
export default {
  props: {
    serviceList: {
      default: [{}],
    },
  },
  // eslint-disable-next-line no-unused-vars
  setup(props, ctx) {
    // alert(JSON.stringify(props))
    console.log("加载serviceList");
    // let service_data = reactive({serviceList:JSON.parse(localStorage.getItem("serviceList"))})
    // const reloadData = () => {
    //     service_data.serviceList=JSON.parse(localStorage.getItem("serviceList"))
    //     console.log(service_data)
    // };
    const serviceInfor = (id) => {
      window.router.push({ path: "/service_infor", query: { id } });
    };

    return { props, serviceInfor };
  },
  components: {},
};
</script>

<style scoped>
.float-right {
  float: right;
}
</style>
