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
        <el-form-item label="学校" prop="school">
          <el-input v-model="loginForm.school"></el-input>
        </el-form-item>
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
        <el-form-item label="身份" prop="power">
          <el-select v-model="ruleForm.power" placeholder="请选择" style="width:100%">
            <el-option label="学生" value="学生"></el-option>
            <el-option label="教师" value="教师"></el-option>
          </el-select>
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
          <el-button type="primary" @click="subRegister"
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
        school: "",
        studentnumber: "",
        password: "",
      },
      ruleForm: {
        school: "",
        studentnumber: "",
        name: "",
        password: "",
        checkPass: "",
        // 权限默认为学生
        power: '学生'
      },
      rules: {
        school: [{ validator: this.validateSchool, trigger: "blur" }],
        password: [{ validator: this.validatePass, trigger: "blur" }],
        checkPass: [{ validator: this.validatePass2, trigger: "blur" }],
        studentnumber: [{ validator: this.checkStudentnumber, trigger: "blur" }],
      },
    };
  },

  methods: {
    validateSchool(rule, value, callback) {
      if (!value) {
        this.schoolIsNotNull = false;
        callback(new Error("学校不能为空"));
      } else {
        this.schoolIsNotNull = true;
        callback();
      }
    },
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
      if (this.numIsNotNull && this.passIsNotNull && this.schoolIsNotNull) {
        this.$axios
          .post("/login", {
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

              setStorage('userInfo', {
                'id': res.data.id,
                'school': this.loginForm.studentnumber!='admin'?this.loginForm.school: "",
                'username': this.loginForm.studentnumber,
                'userPower':  res.data.power
              }, 0.5)
              this.userPower = res.data.power;
              this.$emit(
                "userLogin",
                this.userPower,
                this.loginForm.studentnumber
              );
              this.loginForm = {
                school: "",
                studentnumber: "",
                password: "",
              }

            } else {
              this.$message({
                showClose: true,
                message: "学校、学号或密码错误",
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
          message: "请输入内容",
          type: "warning",
        });
      }
    },

    // 注册
    subRegister() {
      if (this.numIsNotNull && this.passIsNotNull && this.pass2IsNotNull && this.schoolIsNotNull) {
        this.$axios
          .post("/register", {
            school: this.ruleForm.school,
            studentnumber: this.ruleForm.studentnumber,
            name: this.ruleForm.name,
            password: this.ruleForm.password,
            power: this.ruleForm.power
          })
          .then((res) => {
            let { code, msg } = res.data;
            if (code == 200) {
              this.$message({
                showClose: true,
                message: msg,
                type: "success",
              });

              setStorage('userInfo', {
                'id': res.data.id,
                'school': this.ruleForm.studentnumber!='admin'?this.ruleForm.school: "",
                'username': this.ruleForm.studentnumber,
                'userPower':  res.data.power
              }, 0.5)
              this.userPower = res.data.power;
              this.$emit(
                "userLogin",
                this.userPower,
                this.ruleForm.studentnumber
              );
              this.ruleForm = {
                school: "",
                studentnumber: "",
                name: "",
                password: "",
                checkPass: "",
                power: '学生'
              }
            } else {
              this.$message({
                showClose: true,
                message: msg ,
                type: "warning",
              });
            }
          })
          .catch((err) => {
            // console.log(err)
            this.$message({
              showClose: true,
              message: "注册失败: " + err,
              type: "warning",
            });
          });
      }else{
        this.$message({
          showClose: true,
          message: "请输入内容",
          type: "warning",
        });
      }
    }
  },
};
</script>