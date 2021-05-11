<template>
  <div>
 <el-card shadow="always" v-for="task in taskListData" :key="task.title" style="margin-bottom: 20px">
            <el-row
              > <el-col span="24" style="    width: 100%;"
                ><h3 ><a  href="#" @click.prevent="taskInfor(task.id)">{{ task.title }}</a>
                </h3>
                <div class="tag-group">
                  <el-tag v-for="item in task.tag.split(',')" :key="item" effect="dark" style="margin-right: 10px; height: 20px; font-size: 10px;    padding: 0px 5px 2px; display: unset">
                    {{ item }}
                  </el-tag>
                </div>
                <p>{{ task.description }}</p>
                <el-row class="float-right"
                  ><el-col span="24" class="float-right"><span class="float-right"
                      >created by
                      <strong class="text-dark"
                        ><a href="ModuleOfUser/user_public.html?userId=12">{{ task.author }}</a></strong
                      >
                      on <strong class="text-dark">{{ task.date }}</strong></span
                    ></el-col
                  ></el-row
                >
              </el-col>
            </el-row>
          </el-card>
  </div>
</template>

<script>
import {  } from 'vue';
export default {
  props: {
            taskListData:{
              default:[{ 
                title:"TASK1",
                description:"Locating arrays are receiving increasing attentions in the CT literature, but at present, there is no available tool for the generation of such a type of covering array. So is it possible to develop and deploy some services that can construct locating arrays?",
                tags:"generation,acts",
                date:"2020-12-12",
                author:"lejin"
              }]
            }
        },
 // eslint-disable-next-line no-unused-vars
 setup (props,ctx) {
    // alert(JSON.stringify(props))
    console.log("加载taskList")
   
    const taskInfor=(id)=>{
         window.router.push({ path: "/task_infor", query: { id } })
    }

    return {props,taskInfor};
  },
  components: {

  }
  
}
</script>

<style scoped>
.float-right{
  float:right;
}
</style>
