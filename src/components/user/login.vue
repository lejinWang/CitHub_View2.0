<template>
  <div style="width: 360px; margin: 0 auto">
    <div style="margin-top: 32px">
      <img class="logo" alt="CitHub logo" src="../../assets/logo.png" />
    </div>
    <div>
      <h1 style="font-size: 24px; font-weight: 200; letter-spacing: -0.5px">
        Sign in to CitHub
      </h1>
    </div>
    <div class="loginCard">
      <el-form
        :model="userForm"
        :rules="rules"
        ref="ruleForm"
        class="demo-ruleForm"
      >
        <el-form-item label="" prop="username" label-position="top">
          <el-label>Username</el-label>

          <el-input v-model="userForm.username"></el-input>
        </el-form-item>
        <el-form-item label="" prop="password" label-position="top">
          <el-label>Password</el-label
          ><a href="#" style="float: right">Forget Password?</a>
          <el-input type="password" v-model="userForm.password"></el-input>
        </el-form-item>
        <el-form-item style="margin-top: 30px">
          <el-button
            type="primary"
            class="loginBtn"
            icon="el-icon-mouse"
            @click="submitForm('ruleForm')"
            >Sign in</el-button
          >
        </el-form-item>

        <div class="text-foot">
          Don't have an account? <router-link to="signup">Register</router-link>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { getCurrentInstance, reactive } from "vue";
import { request } from "./request";
import { ElMessage } from "element-plus";
export default {
  setup() {
    let userForm = reactive({
      username: "",
      password: "",
      userid: "",
      valid: true,
    });
    let rules = reactive({
      username: [
        { required: true, message: "please input username", trigger: "blur" },
      ],
      password: [
        { required: true, message: "please input password", trigger: "blur" },
      ],
    });
    const { ctx } = getCurrentInstance();
    console.log(ctx);

    return { userForm, rules, request };
  },
  data() {
    return {};
  },
  methods: {
    // eslint-disable-next-line no-unused-vars
    submitForm(formName) {
      // localStorage.setItem("userid", 1);
      // this.$router.push({ path: "/" });
      this.$refs[formName].validate((valid) => {
        //  alert(valid)
        if (valid) {
          var that = this;
          let res = this.checkLogin(
            this.userForm.username,
            this.userForm.password
          );
          res.then(function (result) {
            // console.log(result);
            // alert(result.user)
            if (result.user != null) {
              localStorage.setItem("userid", result.user.id);
              that.$router.push({ path: "/" });
               ElMessage.success({
                message: "login success",
                type: "success",
              });
        
            } else {
              // alert("username or password is error!")
              ElMessage.error({
                message: "username or password is error",
                type: "error",
              });
            }
          });
        }
      });
    },
    // eslint-disable-next-line no-unused-vars
    checkLogin(username, password) {
      return request({
        url: "/user/information/login",
        method: "post",
        data: {
          name: username,
          password: password,
        },
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>
<style></style>
<style scoped>
.text-foot {
  color: #0081c6b3;
  text-align: center;
}
.loginBtn {
  display: inline-block;
  width: 100%;
  border: none;
  color: #fff;
  padding: 15px;
  border-radius: 3px;
  background-color: #0081c6;
  -webkit-box-shadow: 0 2px 7px #0081c673;
  box-shadow: 0 2px 7px #0081c673;
  font-weight: 700;
  outline: 0;
  cursor: pointer;
  -webkit-transition: all 0.5s;
  -o-transition: all 0.5s;
  transition: all 0.5s;
}
/* .loginBtn :hover {
  background-color: #0081c6;
} */
.logo {
  width: 125px;
}

.loginCard {
  background-color: #fff;
  -webkit-box-shadow: 0 7px 25px rgba(0, 0, 0, 0.08);
  box-shadow: 0 7px 25px rgba(0, 0, 0, 0.08);
  padding: 20px 25px 25px 25px;
  text-align: left;
  border-radius: 3px;
}
.Logininput {
  background-color: #0081c60d;
  color: #0081c6b3;
  border: none;
  border-radius: 3px;
  padding: 15px 20px;
  width: 100%;
  outline: 0;
}
el-label {
  color: #0081c673;
  font-weight: 600;
}
a {
  font-weight: 600;
  color: #0081c6;
}
el-label::before {
  content: "*";
  color: #f56c6c;
  margin-right: 4px;
}
</style>
