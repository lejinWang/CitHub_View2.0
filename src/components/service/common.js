import { ElMessage } from 'element-plus';
import { request } from "./request"
//获取时间1（到天）
function getNowDate_Day() {
  let date = new Date();
  let y = date.getFullYear();
  let m = date.getMonth() + 1;
  let d = date.getDate();
  m = m < 10 ? "0" + m : m;
  d = d < 10 ? "0" + d : d;
  let yarr = [y, m, d]
  return yarr.join("-")
}
//获取时间2（到秒）
function getNowDate() {
  let date = new Date();
  let y = date.getFullYear();
  let m = date.getMonth() + 1;
  let d = date.getDate();
  let H = date.getHours();
  let mm = date.getMinutes();
  let s = date.getSeconds()
  m = m < 10 ? "0" + m : m;
  d = d < 10 ? "0" + d : d;
  H = H < 10 ? "0" + H : H;
  let yarr = [y, m, d]
  let harr = [H, mm, s]
  return yarr.join("-") + " " + harr.join(":")
}
//处理时间
//时间格式化
Date.prototype.Format = function(fmt)
{ //author: meizz
    var o = {
        "M+" : this.getMonth()+1,                 //月份
        "d+" : this.getDate(),                    //日
        "h+" : this.getHours(),                   //小时
        "m+" : this.getMinutes(),                 //分
        "s+" : this.getSeconds(),                 //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S"  : this.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt))
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    for(var k in o)
        if(new RegExp("("+ k +")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    return fmt;
}
//将时间戳转化为日期形式（精确到秒）
function getDateFromTime(times)
{
    var date = new Date(times);
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    var D = (date.getDate() +1 < 10 ? '0'+date.getDate(): date.getDate())+" ";
    var h = (date.getHours() +1 < 10 ? '0'+date.getHours(): date.getHours()) + ':';
    var m = (date.getMinutes() +1 < 10 ? '0'+date.getMinutes(): date.getMinutes()) + ':';
    var s = (date.getSeconds() +1 < 10 ? '0'+date.getSeconds(): date.getSeconds());
    var dateDay=Y+M+D+h+m+s;
    return dateDay;
}
//将时间戳转化为日期形式（精确到天）
function getDateFromTime_Day(times)
{
    var date = new Date(times);
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    var D = (date.getDate() +1 < 10 ? '0'+date.getDate(): date.getDate());
    var dateDay=Y+M+D;
    return dateDay;
}
//检查元素是否为空
function isEmpty(d) {
  d.replaceAll(' ', '')
  if (d == '' || d == null) {
    ElMessage.error("can not be null !")
    return true
  }
  else {
    return false
  }
}
function list_remove(arrdata, index) {
  //  alert("nihao")
  arrdata = arrdata.filter((data, idx) => idx !== index);
  return arrdata
}
function list_add(arrdata, newdata) {
  arrdata.push(newdata)
  return arrdata
}

//获取用户名

// eslint-disable-next-line no-unused-vars
function getUserName(userId) {
  let res = request(
    {
      url: "/user/information/getUserName/" + userId,
      method: "get",
      data: {},
    },
    "/userapi"
  );

  return res;
}
//获取用户名

// eslint-disable-next-line no-unused-vars
function getScores(serviceId) {
  let res = request(
    {
      url: "/service/averagescore/getScoreByServiceId/" + serviceId,
      method: "get",
      data: {},
    },
    "/serviceapi"
  );

  return res;
}
//是否收藏
function isStared(serviceId, userId) {
  let res = request(
    {
      url: "/service/star/isStared/" + serviceId + "/" + userId,
      method: "get",
      data: {},
    },
    "/serviceapi"
  );

  return res;
}

//获取收藏数量
function getStarNum(serviceId) {
  let res = request(
    {
      url: "/service/star/getStarNum/" + serviceId,
      method: "get",
      data: {},
    },
    "/serviceapi"
  );

  return res;
}
//获取服务基本信息
function getServiceInfor(serviceId) {
  let res = request(
    {
      url: "/service/infor/info/" + serviceId,
      method: "get",
      data: {},
    },
    "/serviceapi"
  );

  return res;
}
//获取服务基本信息
function getHistoryList(serviceId) {
  let res = request(
    {
      url: "/service/historylist/getHistoryByServiceId/" + serviceId,
      method: "get",
      data: {},
    },
    "/serviceapi"
  );

  return res;
}
//处理标签
function getTags(tags) {
  return tags.split(",");
}
//获取服务用户单评分
function getUserValuate(serviceId,userId){
  let res = request(
    {
      url: "/service/valuate/getUserScore/" + serviceId + "/" + userId,
      method: "get",
      data: {},
    },
    "/serviceapi"
  );

  return res;
}
function XputToJsonFormat(XputDate) {
  // alert(XputDate);
  var XnputJson;
  XputDate.replace("\r","");
  var inputArray=XputDate.split('\n');
  var inputJsonFormat={};
  console.log(inputArray.length);
  for(var i=0;i<inputArray.length;i++)
  {
      var temp=inputArray[i].split(";");
      //解决例子中有分号的情况
      if(temp.length>3)
      {
          var valueOfExample="";
          for(var j=3;j<temp.length;j++)
          {
              valueOfExample+=temp[j]+";";
          }
          temp[3]=valueOfExample.substr(0,valueOfExample.length-1);
      }
      var example;
      if(temp[3].indexOf("##")!=-1) {
         example=temp[3].split("##")[0];
      }
      else {
          example=temp[3];
      }
      if(temp[1]=="int") {
              inputJsonFormat[temp[0]] = JSON.parse(example);
      }
      else if(temp[1]=="int[]")
      {
          inputJsonFormat[temp[0]] = JSON.parse(example);
      }
      else if(temp[1]=="int[][]")
      {
          inputJsonFormat[temp[0]] = JSON.parse(example);
      }
      else if(temp[1]=="string[]")
      {
          inputJsonFormat[temp[0]] = JSON.parse(example);
      }
      else if(temp[1]=="string[][]")
      {
          inputJsonFormat[temp[0]] = JSON.parse(example);
      }
      else {
          //处理转义符只限于双引号
          // alert(example);
          while (example.indexOf("\\")!=-1)
          {
              example=example.replace("\\","");
          }
          inputJsonFormat[temp[0]] =example.replace("\r","");
      }
  }
  console.log(JSON.stringify(inputJsonFormat));
  XnputJson=inputJsonFormat;
  return XnputJson;
}
//两个json合并
// function concatJson(jsonbject1,jsonbject2){

//   var resultJsonObject = {};
//   for (var attr in jsonbject1) {
//       resultJsonObject[attr] = jsonbject1[attr];
//   }
//   for (var attr in jsonbject2) {
//       resultJsonObject[attr] = jsonbject2[attr];
//   }
//   return resultJsonObject;
// }
// function getModelStr(str) {
//   console.log(enterF+"1");
//   // console.log(str.split("\n"));
//   var modelArray=str.split(enterF);
//   var modelStr="";
//   for(var i=0;i<modelArray.length;i++)
//   {
//       modelStr+=modelArray[i]+"&#";
//   }
//   //处理转义符
//   while (modelStr.indexOf("\\")!=-1)
//   {
//       modelStr=modelStr.replace("\\","");
//   }
//   while (modelStr.indexOf("\r")!=-1)
//   {
//       modelStr=modelStr.replace("\r","");
//   }
//   return modelStr;
// }

//使用服务
function useService(inputJson,serviceURL){
  let res = request(
    {
      url: serviceURL,
      method: "post",
      data: inputJson,
    },
    ""
  );
  return res
}
//获取类型
function getTypes() {
  return request({
    url: "/service/infor/getTypes",
    method: "get",
    data: {
      
    },
  },"/serviceapi");
}
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
export { getServiceListByType,getTypes,useService,XputToJsonFormat,list_add, list_remove, isEmpty, getNowDate, getNowDate_Day, getDateFromTime_Day,getDateFromTime, getUserName, getTags, getScores, isStared, getStarNum, getServiceInfor, getHistoryList,getUserValuate }