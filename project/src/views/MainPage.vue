<template>
  <div class="member-service-protocol">
    <div class="menu">
      <div class="navMenu">
        <div @click="goToAnchor('Alisa')" ref="Alisa">首页</div>
        <div @click="goToAnchor('Cynthia')" ref="Cynthia">实验介绍</div>
        <div @click="goToAnchor('Marco')" ref="Marco">实验指南</div>
        <div @click="goToAnchor('William')" ref="William">实验步骤</div>
        <div @click="goToAnchor('Jorge')" ref="Jorge">成绩评定与查看</div>
      </div>
      <el-tooltip :disabled="username == ''" placement="bottom">
        <span slot="content" style="cursor: pointer" @click="exitLogin"
          >退出登录</span
        >
        <div class="userInfo">
          <i class="el-icon-user"></i>
          <div class="login" @click="loginForm($event)">
            <span v-if="username !== ''">{{ username }}</span>
            <span v-if="username == ''">
              <span style="margin-right: 5px">登录</span>|<span
                style="margin-left: 5px"
                >注册</span
              >
            </span>
            <login-form
              :LoginTableVisible="LoginTableVisible"
              :formName="formName"
              @dialogFalse="
                LoginTableVisible = false;
                formName = '';
              "
              @userLogin="userLogin"
            ></login-form>
          </div>
        </div>
      </el-tooltip>
    </div>

    <div class="item" id="Alisa">
      <div class="title"></div>
      <div class="content index">
        <h1>风电虚拟仿真实验</h1>
        <div class="detail">
          <span>学校： 湖南科技大学</span>
          <span style="margin-left: 50px">负责人： 彭宇祥</span>
          <div style="margin-top: 40px">
            <span class="but" style="margin-right: 25px" @click="gowebGl"
              >进入实验</span
            >
            <span class="but" @click="goToAnchor('Marco')">查看实验指南</span>
          </div>
        </div>
      </div>
    </div>

    <div class="item" id="Cynthia">
      <div class="line"></div>
      <div class="title">实验介绍</div>
      <div class="content">
        <div class="main-text">
          <p class="info-title">实验背景</p>
          <div class="info-text">
            <p>
              电能作为一种经济、实用、清洁且容易控制和转换的能源形态，在国民经济各个领域中广泛应用，是人民生活中不可或缺的主要能源应用形式。日常生活中使用的电能主要来自其他形式能量的转换，其转换与控制是由电力系统及其控制系统完成的，而电网综合自动化系统是保证电力系统可靠运行的基础。
            </p>
            <p>
              随着国民经济的不断发展，我国也已进入第三代智能电网大规模发展和建设的阶段，对相关人才的需求较为迫切，培养满足第三代电网建设需求的电气工程专业技术人才成为高等学校相关学科的紧迫任务。
            </p>
            <p>
              目前，从培养满足第三代电网技术要求的专业技术人才的角度来看，传统的教学方法与设施存在着教学内容滞后、学生感性认知度低、实验操作具有危险性、学生实践机会较少等诸多不足，因此，基于虚拟仿真技术的智能电网实验教学平台可以克服上述缺点，已成为实验教学的发展方向。
            </p>
          </div>
          <p class="info-title">实验目标</p>
          <div class="info-text">
            <p>
              智能电网综合自动化虚拟仿真实验通过智能电网综合自动化虚拟仿真实验教学软件平台能够重现智能电网系统中自动装置与继电保护功能实现的原理及各种物理过程，使得学生通过仿真教学软件平台的操作与练习，理解和掌握电力系统运行、故障、自动装置与继电保护的原理；通过交互式虚拟仿真实验教学平台，避免传统实验教学中的可能接触到高电压、大电流的危险性，学生可以自主设计和改进实验环节，培养学生的创新思维和创新设计能力，达到良好的教学效果与目的。
            </p>
          </div>
          <p class="info-title">实验设计原则</p>
          <div class="info-text">
            <p>
              智能电网综合自动化虚拟仿真实验系统采用基于IE
              C61850标准的纯数字模拟实验方法，以典型220kV智能变电站系统为基础，构建基于真实系统运行环境的虚拟仿真实验环境，其系统结构主要包括实时数字仿真PC、数据服务器及WEB服务器等，以及实验教学案例辅助系统。其设计原则是：以虚拟智能变电站所装设的继电保护与自动装置原理为基础，先根据模拟典型电网主接线，利用仿真计算软件构建模拟电网计算模型，并进行正常运行及故障情况下电压、电流及装置行为的仿真模拟计算，用于模拟电网运行过程中的各种故障现象及继电保护与自动装置的行为，生成电网实时运行基础数据，存储于数据服务器，与VR虚拟仿真环境进行交互，通过继电保护与自动装置的动作情况，理解继电保护与自动装置的原理，并利用WEB服务器实现基于B/S结构Web服务实现远程教学。此外，将原智能变电站综合自动化实验室和动模实验室的实验环境作为实验教学案例辅助系统连入虚拟仿真系统，作为教学案例校验与基础数据的辅助工具。
            </p>
            <p>
              需要指出的是智能电网综合自动化虚拟仿真实验系统是不依赖于实验教学案例辅助系统的，是可以独立运行的。
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="item" id="Marco">
      <div class="line"></div>
      <div class="title">实验指南</div>
      <div class="content">
        <div class="main-text">
          <p class="info-title">实验背景</p>
          <div class="info-text">
            <p>
              电能作为一种经济、实用、清洁且容易控制和转换的能源形态，在国民经济各个领域中广泛应用，是人民生活中不可或缺的主要能源应用形式。日常生活中使用的电能主要来自其他形式能量的转换，其转换与控制是由电力系统及其控制系统完成的，而电网综合自动化系统是保证电力系统可靠运行的基础。
            </p>
            <p>
              随着国民经济的不断发展，我国也已进入第三代智能电网大规模发展和建设的阶段，对相关人才的需求较为迫切，培养满足第三代电网建设需求的电气工程专业技术人才成为高等学校相关学科的紧迫任务。
            </p>
            <p>
              目前，从培养满足第三代电网技术要求的专业技术人才的角度来看，传统的教学方法与设施存在着教学内容滞后、学生感性认知度低、实验操作具有危险性、学生实践机会较少等诸多不足，因此，基于虚拟仿真技术的智能电网实验教学平台可以克服上述缺点，已成为实验教学的发展方向。
            </p>
          </div>
          <p class="info-title">实验目标</p>
          <div class="info-text">
            <p>
              智能电网综合自动化虚拟仿真实验通过智能电网综合自动化虚拟仿真实验教学软件平台能够重现智能电网系统中自动装置与继电保护功能实现的原理及各种物理过程，使得学生通过仿真教学软件平台的操作与练习，理解和掌握电力系统运行、故障、自动装置与继电保护的原理；通过交互式虚拟仿真实验教学平台，避免传统实验教学中的可能接触到高电压、大电流的危险性，学生可以自主设计和改进实验环节，培养学生的创新思维和创新设计能力，达到良好的教学效果与目的。
            </p>
          </div>
          <p class="info-title">实验设计原则</p>
          <div class="info-text">
            <p>
              智能电网综合自动化虚拟仿真实验系统采用基于IE
              C61850标准的纯数字模拟实验方法，以典型220kV智能变电站系统为基础，构建基于真实系统运行环境的虚拟仿真实验环境，其系统结构主要包括实时数字仿真PC、数据服务器及WEB服务器等，以及实验教学案例辅助系统。其设计原则是：以虚拟智能变电站所装设的继电保护与自动装置原理为基础，先根据模拟典型电网主接线，利用仿真计算软件构建模拟电网计算模型，并进行正常运行及故障情况下电压、电流及装置行为的仿真模拟计算，用于模拟电网运行过程中的各种故障现象及继电保护与自动装置的行为，生成电网实时运行基础数据，存储于数据服务器，与VR虚拟仿真环境进行交互，通过继电保护与自动装置的动作情况，理解继电保护与自动装置的原理，并利用WEB服务器实现基于B/S结构Web服务实现远程教学。此外，将原智能变电站综合自动化实验室和动模实验室的实验环境作为实验教学案例辅助系统连入虚拟仿真系统，作为教学案例校验与基础数据的辅助工具。
            </p>
            <p>
              需要指出的是智能电网综合自动化虚拟仿真实验系统是不依赖于实验教学案例辅助系统的，是可以独立运行的。
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="item" id="William">
      <div class="line"></div>
      <div class="title">实验步骤</div>
      <div class="content">
        <div class="main-text">
          <p class="info-title">实验背景</p>
          <div class="info-text">
            <p>
              电能作为一种经济、实用、清洁且容易控制和转换的能源形态，在国民经济各个领域中广泛应用，是人民生活中不可或缺的主要能源应用形式。日常生活中使用的电能主要来自其他形式能量的转换，其转换与控制是由电力系统及其控制系统完成的，而电网综合自动化系统是保证电力系统可靠运行的基础。
            </p>
            <p>
              随着国民经济的不断发展，我国也已进入第三代智能电网大规模发展和建设的阶段，对相关人才的需求较为迫切，培养满足第三代电网建设需求的电气工程专业技术人才成为高等学校相关学科的紧迫任务。
            </p>
            <p>
              目前，从培养满足第三代电网技术要求的专业技术人才的角度来看，传统的教学方法与设施存在着教学内容滞后、学生感性认知度低、实验操作具有危险性、学生实践机会较少等诸多不足，因此，基于虚拟仿真技术的智能电网实验教学平台可以克服上述缺点，已成为实验教学的发展方向。
            </p>
          </div>
          <p class="info-title">实验目标</p>
          <div class="info-text">
            <p>
              智能电网综合自动化虚拟仿真实验通过智能电网综合自动化虚拟仿真实验教学软件平台能够重现智能电网系统中自动装置与继电保护功能实现的原理及各种物理过程，使得学生通过仿真教学软件平台的操作与练习，理解和掌握电力系统运行、故障、自动装置与继电保护的原理；通过交互式虚拟仿真实验教学平台，避免传统实验教学中的可能接触到高电压、大电流的危险性，学生可以自主设计和改进实验环节，培养学生的创新思维和创新设计能力，达到良好的教学效果与目的。
            </p>
          </div>
          <p class="info-title">实验设计原则</p>
          <div class="info-text">
            <p>
              智能电网综合自动化虚拟仿真实验系统采用基于IE
              C61850标准的纯数字模拟实验方法，以典型220kV智能变电站系统为基础，构建基于真实系统运行环境的虚拟仿真实验环境，其系统结构主要包括实时数字仿真PC、数据服务器及WEB服务器等，以及实验教学案例辅助系统。其设计原则是：以虚拟智能变电站所装设的继电保护与自动装置原理为基础，先根据模拟典型电网主接线，利用仿真计算软件构建模拟电网计算模型，并进行正常运行及故障情况下电压、电流及装置行为的仿真模拟计算，用于模拟电网运行过程中的各种故障现象及继电保护与自动装置的行为，生成电网实时运行基础数据，存储于数据服务器，与VR虚拟仿真环境进行交互，通过继电保护与自动装置的动作情况，理解继电保护与自动装置的原理，并利用WEB服务器实现基于B/S结构Web服务实现远程教学。此外，将原智能变电站综合自动化实验室和动模实验室的实验环境作为实验教学案例辅助系统连入虚拟仿真系统，作为教学案例校验与基础数据的辅助工具。
            </p>
            <p>
              需要指出的是智能电网综合自动化虚拟仿真实验系统是不依赖于实验教学案例辅助系统的，是可以独立运行的。
            </p>
          </div>
        </div>
      </div>
    </div>
    <!-- 成绩查看 -->
    <div class="item" id="Jorge">
      <div class="line"></div>
      <div class="title">成绩评定与查看</div>
      <div class="content">
        <div class="main-text">
          <p class="info-title">实验背景</p>
          <div class="info-text">
            <p>
              电能作为一种经济、实用、清洁且容易控制和转换的能源形态，在国民经济各个领域中广泛应用，是人民生活中不可或缺的主要能源应用形式。日常生活中使用的电能主要来自其他形式能量的转换，其转换与控制是由电力系统及其控制系统完成的，而电网综合自动化系统是保证电力系统可靠运行的基础。
            </p>
            <p>
              随着国民经济的不断发展，我国也已进入第三代智能电网大规模发展和建设的阶段，对相关人才的需求较为迫切，培养满足第三代电网建设需求的电气工程专业技术人才成为高等学校相关学科的紧迫任务。
            </p>
            <p>
              目前，从培养满足第三代电网技术要求的专业技术人才的角度来看，传统的教学方法与设施存在着教学内容滞后、学生感性认知度低、实验操作具有危险性、学生实践机会较少等诸多不足，因此，基于虚拟仿真技术的智能电网实验教学平台可以克服上述缺点，已成为实验教学的发展方向。
            </p>
          </div>
          <p class="info-title">实验目标</p>
          <div class="info-text">
            <p>
              智能电网综合自动化虚拟仿真实验通过智能电网综合自动化虚拟仿真实验教学软件平台能够重现智能电网系统中自动装置与继电保护功能实现的原理及各种物理过程，使得学生通过仿真教学软件平台的操作与练习，理解和掌握电力系统运行、故障、自动装置与继电保护的原理；通过交互式虚拟仿真实验教学平台，避免传统实验教学中的可能接触到高电压、大电流的危险性，学生可以自主设计和改进实验环节，培养学生的创新思维和创新设计能力，达到良好的教学效果与目的。
            </p>
          </div>
          <p class="info-title">实验设计原则</p>
          <div class="info-text">
            <p>
              智能电网综合自动化虚拟仿真实验系统采用基于IE
              C61850标准的纯数字模拟实验方法，以典型220kV智能变电站系统为基础，构建基于真实系统运行环境的虚拟仿真实验环境，其系统结构主要包括实时数字仿真PC、数据服务器及WEB服务器等，以及实验教学案例辅助系统。其设计原则是：以虚拟智能变电站所装设的继电保护与自动装置原理为基础，先根据模拟典型电网主接线，利用仿真计算软件构建模拟电网计算模型，并进行正常运行及故障情况下电压、电流及装置行为的仿真模拟计算，用于模拟电网运行过程中的各种故障现象及继电保护与自动装置的行为，生成电网实时运行基础数据，存储于数据服务器，与VR虚拟仿真环境进行交互，通过继电保护与自动装置的动作情况，理解继电保护与自动装置的原理，并利用WEB服务器实现基于B/S结构Web服务实现远程教学。此外，将原智能变电站综合自动化实验室和动模实验室的实验环境作为实验教学案例辅助系统连入虚拟仿真系统，作为教学案例校验与基础数据的辅助工具。
            </p>
            <p>
              需要指出的是智能电网综合自动化虚拟仿真实验系统是不依赖于实验教学案例辅助系统的，是可以独立运行的。
            </p>
          </div>
        </div>
        <!-- 如果登录为学生，弹出成绩表单 -->
        <div v-if="userPower == 2" style="margin-bottom: 10px">
          <el-button type="success" plain @click="openDialog"
            >查看我的成绩</el-button
          >
          <el-dialog title="我的成绩" :visible.sync="dialogTableVisible">
            <el-table :data="gridData">
              <el-table-column property="school" label="学校"></el-table-column>
              <el-table-column
                property="studentnumber"
                label="学号"
                width="150"
              ></el-table-column>
              <el-table-column
                property="name"
                label="姓名"
                width="140"
              ></el-table-column>
              <el-table-column
                property="score"
                label="成绩"
                width="80"
              ></el-table-column>
              <el-table-column
                property="scoredate"
                label="日期"
                width="150"
              ></el-table-column>
            </el-table>
          </el-dialog>
        </div>
        <div v-if="userPower !== 2" style="margin-bottom: 10px">
          <el-button type="success" plain @click="toScoreMang"
            >查看成绩分析</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LoginForm from "../components/login.vue";
import { getStorage, setStorage } from "../util/StorageMan";

export default {
  components: { LoginForm },

  data() {
    return {
      preNav: null,
      currtNav: getStorage("nowNav") || "Alisa",
      gridData: [],
      dialogTableVisible: false,
      LoginTableVisible: false,
      formName: "",
      isLogin: false,
      username: getStorage("userInfo") ? getStorage("userInfo").username : "",
      userPower: getStorage("userInfo") ? getStorage("userInfo").userPower : null,
    };
  },
  mounted() {
    this.changNavColor(this.currtNav);
    window.addEventListener("scroll", this.debounce(this.changMenu, 100));

    if (this.username != "") this.isLogin = true;
  },
  methods: {
    gowebGl() {
      if (!this.isLogin) {
        this.$message({
          showClose: true,
          message: "你还未登录，请先登录或注册",
          type: "warning",
          duration: 2000,
        });
      } else {
        this.$router.push("/webGlpage");
      }
    },
    goToAnchor(selector) {
      this.changNavColor(selector);
      this.$el.querySelector("#" + selector).scrollIntoView({
        behavior: "smooth", // 平滑过渡
        block: "start", // 上边框与视窗顶部平齐
      });
    },
    changNavColor(refDom) {
      setStorage("nowNav", refDom, 0.0006);
      this.currtNav = refDom;
      this.$refs[refDom].style.background = "#fff";
      if (this.preNav) this.$refs[this.preNav].style.background = "#4395ff";
      this.preNav = refDom;
    },
    // 滚动事件，判断到达哪个导航栏
    changMenu() {
      var windowHeight = document.documentElement.clientHeight;
      var threshold = 300;
      (this.navList = ["Alisa", "Cynthia", "Marco", "William", "Jorge"]),
        this.navList.forEach((domId) => {
          let target = document.getElementById(domId).getBoundingClientRect();
          let targetTop = target.top;

          if (targetTop < windowHeight - threshold) {
            this.changNavColor(domId);
          }
        });
    },

    // 弹出登录或注册框
    loginForm(e) {
      if (e.target.innerText == "登录") {
        this.LoginTableVisible = true;
        this.formName = "登录";
      } else if (e.target.innerText == "注册") {
        this.LoginTableVisible = true;
        this.formName = "注册";
      }
    },
    userLogin(value1, value2) {
      this.userPower = value1;
      this.username = value2;
      this.isLogin = true;
      this.LoginTableVisible = false;
      this.formName = "";
    },
    exitLogin() {
      this.username = "";
      localStorage.removeItem("userInfo");
      this.isLogin = false;
    },
    openDialog() {
      if (!this.isLogin) {
        this.$message({
          showClose: true,
          message: "你还未登录，请先登录或注册",
          type: "warning",
          duration: 2000,
        });
      } else {
        this.dialogTableVisible = true;
        this.$axios
          .get(`/scoreSearch?id=${getStorage("userInfo").id}`)
          .then((res) => {
            let { code, msg } = res.data;
            if (code == 200) {
              this.gridData = res.data.data;
            } else {
              this.$message({
                showClose: true,
                message: msg,
                type: "warning",
              });
            }
          })
          .catch((err) => {
            this.$message({
              showClose: true,
              message: "注册失败: " + err,
              type: "warning",
            });
          });
      }
    },
    toScoreMang() {
      this.$router.push("/ScoreMang");
    },
    // 防抖
    debounce(fn, delay) {
      let timer = null;
      return function () {
        if (timer) {
          clearTimeout(timer); // 如果计时器存在，清除计时器
        }
        timer = setTimeout(fn, delay); // 重新开始计时
      };
    },
  },
};
</script>
<style scoped>
.member-service-protocol {
  width: 100%;
  height: 100%;
  font-size: 20px;
  /* display: flex; */
  /* flex-direction: column; */
  /* align-items: center; */
}
/* .member-service-protocol :nth-child(2n) {
    background: red;
} */
.menu {
  width: 100%;
  position: fixed;
  top: 0px;
}
.navMenu {
  width: 100%;
  height: 60px;
  background: #4395ff;
  display: flex;
  justify-content: center;
  /* align-items: center; */
}
.navMenu div {
  height: 60px;
  width: 15%;
  color: #312c2cad;
  font-size: 20px;
  text-align: center;
  line-height: 60px;
  background: #4395ff;
  cursor: pointer;
}
.navMenu div:hover {
  background: #fff !important;
}
.userInfo {
  position: absolute;
  top: 12px;
  right: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.login {
  font-size: 14px;
  cursor: pointer;
}
.item {
  /* height: 100%; */
  padding-top: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.index {
  font-size: 24px;
}
.detail {
  font-size: 18px;
}
.but {
  background: #00cc6a;
  color: #fff;
  padding: 8px 12px;
  /* border: 1px solid #fff; */
  border-radius: 12px;
  cursor: pointer;
}
.line {
  width: 80%;
  height: 1px;
  border-top: 1px solid #2defc275;
}
.title {
  /* background: #4395ff; */
}
.content {
  width: 80%;
}
.main-text {
  line-height: 30px;
}
.info-title {
  margin: 20px 0 10px 0;
  font-size: 16px;
  font-weight: bold;
}
.info-text {
  font-size: 14px;
  color: #666;
}
</style>