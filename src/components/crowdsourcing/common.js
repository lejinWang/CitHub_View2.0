// import { keys, values } from 'core-js/core/array';
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
//处理时间
//时间格式化
Date.prototype.Format = function (fmt) { //author: meizz
  var o = {
    "M+": this.getMonth() + 1,                 //月份
    "d+": this.getDate(),                    //日
    "h+": this.getHours(),                   //小时
    "m+": this.getMinutes(),                 //分
    "s+": this.getSeconds(),                 //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds()             //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}
//将时间戳转化为日期形式（精确到秒）
function getDateFromTime(times) {
  var date = new Date(times);
  var Y = date.getFullYear() + '-';
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  var D = (date.getDate() + 1 < 10 ? '0' + date.getDate() : date.getDate()) + " ";
  var h = (date.getHours() + 1 < 10 ? '0' + date.getHours() : date.getHours()) + ':';
  var m = (date.getMinutes() + 1 < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
  var s = (date.getSeconds() + 1 < 10 ? '0' + date.getSeconds() : date.getSeconds());
  var dateDay = Y + M + D + h + m + s;
  return dateDay;
}
//将时间戳转化为日期形式（精确到天）
function getDateFromTime_Day(times) {
  var date = new Date(times);
  var Y = date.getFullYear() + '-';
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  var D = (date.getDate() + 1 < 10 ? '0' + date.getDate() : date.getDate());
  var dateDay = Y + M + D;
  return dateDay;
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
//获取tags
function getTags() {
  return request({
    url: "/crowdsourcing/infor/getTags",
    method: "get",
    data: {

    },
  }, "/crowdsourcingapi");
}
//根据tag查找
function getTaskListByTag(tag) {
  // alert(keyword)
  return request(
    {
      url: "/crowdsourcing/infor/searchByTag/" + tag,
      method: "get",
      data: {},
    },
    "/crowdsourcingapi"
  );

}
//根据tag查找
function getTaskById(id) {
  // alert(keyword)
  return request(
    {
      url: "/crowdsourcing/infor/info/" + id,
      method: "get",
      data: {},
    },
    "/crowdsourcingapi"
  );

}
function getModelTableData(str) {
  str = str.replaceAll("：", ",").replaceAll("[", "").replaceAll("]", "");

  str = str.split("2）	约束")
  console.log("str", str)
  var consstr = []
  if (str.length > 1) {
    var res = str[1].split("\n")
    for (var i = 0; i < res.length; i++) {
      if (res[i] != "") {
        consstr.push(res[i])
      }
    }
  }
  //  console.log(consstr)
  var paramstr = str[0].split("\n")
  //  console.log(paramstr)
  var modeltemp = []
  for (i = 0; i < paramstr.length; i++) {
    if (paramstr[i].indexOf("参数") != -1) {
      continue;
    }
    if (paramstr[i] != "") {
      modeltemp.push(paramstr[i].split(","))
    }
  }
  return { modeltemp, consstr }
}
function getModelFile(modeltemp, consstr) {
  var modelfile = '1）	参数\n';
  for (var i = 0; i < modeltemp.length; i++) {
    var paramname = modeltemp[i][0]
    modelfile += paramname + '：['
    for (var j = 1; j < modeltemp[i].length - 1; j++) {
      modelfile += "\"" + modeltemp[i][j] + "\","
    }
    modelfile += "\"" + modeltemp[i][modeltemp[i].length - 1] + "\"]\n"
  }
  if (consstr.length > 0) {
    modeltemp += "2）	约束\n"
    for (var k = 0; k < consstr.length - 1; k++) {
      modeltemp += consstr[k] + "\n"
    }
    modeltemp += consstr[consstr.length - 1]

  }
  return modelfile
}
// function duplicates(arr) {
//   var result = [];
//   arr.forEach(item => {//判断检查数据从头到尾   与 从尾到头  的位置是否 不同   并且 每次判断 新数组里面是否有 当前值的 位置 没有那么 进行下一步
//       if (arr.indexOf(item) !== arr.lastIndexOf(item) && result.indexOf(item) == -1) {
//           result.push(item);
//       }
//   })
//   return result  //返回 1 3 4
// }

function getEleNums(data) {
  var map = {}
  for (var i = 0; i < data.length; i++) {
    var key = data[i]
    if (map[key]) {
      map[key] += 1
    } else {
      map[key] = 1
    }
  }
  return map
}
function getMapKeysValues(map){
  var values=[]
 var keys=[]
  for(var item in map){
    keys.push(item)
    values.push(map[item])

  }
  return{values,keys}
}
function getSameAndDiff(list) {
  var same = {}
  var diff = []
  var map = getEleNums(list)
  console.log(map)
  for(var item in map){
    if (map[item] == 1) {
      // alert(item)
      diff.push(item)
    }
    else {
      same[item] = map[item]
    }
  }
//  console.log(getMapKeysValues(same))
//  console.log(diff)
  return { same, diff }

}
function toMaplist(list) {
  var map = {}
  for (var i = 0; i < list.length; i++) {
    var temp = list[i]

    var key = temp[0]
    temp = list_remove(temp, 0)
    map[key] = temp;

  }
  return map
}

export { getMapKeysValues,toMaplist, getSameAndDiff, getModelFile, getModelTableData, getTaskById, getTaskListByTag, getTags, getUserName, getDateFromTime, getDateFromTime_Day, list_add, list_remove, isEmpty, getNowDate, getNowDate_Day }