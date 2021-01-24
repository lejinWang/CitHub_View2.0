import { ElMessage } from 'element-plus';
 //获取时间1（到天）
 function getNowDate_Day() {
    let date = new Date();
    let y = date.getFullYear();
    let m = date.getMonth() + 1;
    let d = date.getDate();
    m = m < 10 ? "0" + m : m;
    d = d < 10 ? "0" + d : d;
    let yarr=[y,m,d]
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
    let s=date.getSeconds()
    m = m < 10 ? "0" + m : m;
    d = d < 10 ? "0" + d : d;
    H = H < 10 ? "0" + H : H;
    let yarr=[y,m,d]
    let harr=[H,mm,s]
    return yarr.join("-") +" "+harr.join(":")
  }
  //检查元素是否为空
  function isEmpty(d){
    d.replaceAll(' ','')
    if(d==''||d==null){
        ElMessage.error("can not be null !")
        return true
    }
    else{
        return false
    }
  }
  function list_remove(arrdata,index) {
    //  alert("nihao")
    arrdata = arrdata.filter((data, idx) => idx !== index);
    return arrdata
  }
  function list_add(arrdata,newdata){
    arrdata.push(newdata)
    return arrdata
  }
export{list_add,list_remove,isEmpty,getNowDate,getNowDate_Day}