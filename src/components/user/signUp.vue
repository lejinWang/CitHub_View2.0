<template>
  <div style="width: 400px; margin: 0 auto">
    <div style="margin-top: 32px">
      <img class="logo" alt="CitHub logo" src="../../assets/logo.png" />
    </div>
    <div>
      <h1 style="font-size: 24px; font-weight: 200; letter-spacing: -0.5px">
        Create your account
      </h1>
    </div>
    <div class="loginCard">
      <div style="width: 340px; margin: 0 auto">
        <el-form
          :model="userForm"
          :rules="rules"
          ref="ruleForm"
          class="demo-ruleForm"
        >
          <el-form-item label="" prop="username" label-position="top">
            <el-label>Username</el-label>
            <el-popover
              ref="popover"
              placement="right"
              :width="200"
              trigger="focus"
            >
              <p>Please enter a reasonable name (At least 3 characters)</p>
              <template #reference>
                <el-input v-model="userForm.username"></el-input>
              </template>
            </el-popover>
          </el-form-item>
          <el-form-item label="" prop="mail" label-position="top">
            <el-label>Email</el-label>
            <el-popover
              ref="popover"
              placement="right"
              :width="200"
              trigger="focus"
            >
              <p>Please enter a reasonable mailbox format</p>
              <template #reference>
                <el-input type="email" v-model="userForm.mail"></el-input>
              </template>
            </el-popover>
          </el-form-item>
          <el-form-item label="" prop="password" label-position="top">
            <el-label>Password</el-label>
            <el-popover
              ref="popover"
              placement="right"
              :width="200"
              trigger="focus"
            >
              <p>
                8-16 characters, including numeric upper and lower case letters.
                No continuous characters or more than three identical characters
                can appear
              </p>
              <template #reference>
                <el-input
                  type="password"
                  v-model="userForm.password"
                ></el-input>
              </template>
            </el-popover>
          </el-form-item>
          <el-form-item label="" prop="institution" label-position="top">
            <el-label>Institution</el-label>
            <el-popover
              ref="popover"
              placement="right"
              :width="200"
              trigger="focus"
            >
              <p>Please enter a reasonable institution</p>
              <template #reference>
                <el-input v-model="userForm.institution"></el-input> </template
            ></el-popover>
          </el-form-item>
          <el-form-item style="margin-top: 30px">
            <el-button
              type="primary"
              class="loginBtn"
              icon="el-icon-mouse"
              @click="submitForm('ruleForm')"
              >Sign Up</el-button
            >
          </el-form-item>

          <div class="text-foot">
            Already have an account?
            <router-link to="login">Sign in</router-link>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import {} from "vue";
import { request } from "./request";
import { ElMessage } from "element-plus";
export default {
  setup() {
    return {};
  },
  data() {
    return {
      userForm: {
        username: "",
        mail: "",
        institution: "",
        password: "",
        userid: "",
      },
      rules: {
        username: [
          { required: true, message: "please input username", trigger: "blur" },
          { min: 3, max: 5, message: "3-5 characters", trigger: "blur" },
        ],
        password: [
          { required: true, message: "please input password", trigger: "blur" },
          { min: 8, max: 16, message: "8-16 characters", trigger: "blur" },
        ],
        mail: [
          { required: true, message: "please input mail", trigger: "blur" },
        ],
        institution: [
          {
            required: true,
            message: "please input institution",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    // eslint-disable-next-line no-unused-vars
    submitForm(formName) {
      //   localStorage.setItem("userid", 1);
      var that=this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert("submit!");
          let res = this.signUp(this.userForm);
            res.then(function (result) {
              console.log(result)
          if (result.msg=="success"){
          that.$router.push({ path: "/login" });
           ElMessage.success({
                message: "sign up success",
                type: "success",
              });
          }else{
              ElMessage.error({
                message: "sign up error",
                type: "error",
              });
          }
            })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    signUp(userinfor) {
      return request({
        url: "/user/information/signUp",
        method: "post",
        data: {
          name: userinfor.username,
          mail: userinfor.mail,
          institution: userinfor.institution,
          password: userinfor.password,
          state:1,
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
