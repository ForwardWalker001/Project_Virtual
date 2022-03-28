<template>
  <div>
    <el-dialog
      width="40%"
      :title="formName"
      :visible.sync="LoginTableVisible"
      :close-on-click-modal="false"
      :show-close="false"
      :append-to-body="true"
    >
      <!-- 登录  -->
      <el-form
        v-if="formName === '登录'"
        :model="loginForm"
        status-icon
        :rules="rules"
        ref="loginRuleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="学号(工号)" prop="studentnumber">
          <el-input v-model="loginForm.studentnumber"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="loginForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="subLogin">提交</el-button>
          <el-button @click="$emit('dialogFalse')">取消</el-button>
        </el-form-item>
      </el-form>

      <!-- 注册-->
      <el-form
        v-if="formName === '注册'"
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="学校" prop="school">
          <el-input v-model="ruleForm.school"></el-input>
        </el-form-item>
        <el-form-item label="学号(工号)" prop="studentnumber">
          <el-input v-model="ruleForm.studentnumber"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="ruleForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input
            type="password"
            v-model="ruleForm.checkPass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="$emit('dialogFalse')"
            >提交</el-button
          >
          <el-button @click="$emit('dialogFalse')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { setStorage } from '../util/StorageMan'

export default {
  props: ["LoginTableVisible", "formName"],
  data() {
    return {
      // dialogFormVisible : false,
      loginForm: {
        studentnumber: "",
        password: "",
      },
      ruleForm: {
        school: "",
        studentnumber: "",
        name: "",
        password: "",
        checkPass: "",
      },
      rules: {
        password: [{ validator: this.validatePass, trigger: "blur" }],
        checkPass: [{ validator: this.validatePass2, trigger: "blur" }],
        studentnumber: [{ validator: this.checkStudentnumber, trigger: "blur" }],
      },
    };
  },

  methods: {
    checkStudentnumber(rule, value, callback) {
      if (!value) {
        this.numIsNotNull = false;
        callback(new Error("学号不能为空"));
      } else {
        this.numIsNotNull = true;
        callback();
      }
    },
    validatePass(rule, value, callback) {
      if (value === "") {
        this.passIsNotNull = false;
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        this.passIsNotNull = true;
        callback();
      }
    },
    validatePass2(rule, value, callback) {
      if (value === "") {
        this.pass2IsNotNull = false;
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.password) {
        this.pass2IsNotNull = false;
        callback(new Error("两次输入密码不一致!"));
      } else {
        this.pass2IsNotNull = true;
        callback();
      }
    },

    subLogin() {
      if (this.numIsNotNull && this.passIsNotNull) {
        this.$axios
          .post("http://localhost:3000/login", {
            ...this.loginForm,
          })
          .then((res) => {
            let { code } = res.data;
            if (code == 200) {
              this.$message({
                showClose: true,
                message: "登录成功",
                type: "success",
              });

              setStorage('username', this.loginForm.studentnumber, 0.5)
              this.userPower = res.data.power;
              this.$emit(
                "userLogin",
                this.userPower,
                this.loginForm.studentnumber
              );
              this.loginForm = {
                studentnumber: "",
                password: "",
              }

            } else {
              this.$message({
                showClose: true,
                message: "学号或密码错误",
                type: "warning",
              });
            }
          })
          .catch((err) => {
            // console.log(err)
            this.$message({
              showClose: true,
              message: "登录失败: " + err,
              type: "warning",
            });
          });
      }else{
        this.$message({
          showClose: true,
          message: "请输入学号和密码",
          type: "warning",
        });
      }
    },
  },
};
</script>