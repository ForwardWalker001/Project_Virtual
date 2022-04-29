<template>
  <div class="member-service-protocol"
    >
    <div class="menu">
      <div class="navMenu">
        <div @click="goToAnchor('index')" ref="index">首页</div>
        <div @click="goToAnchor('backdrop')" ref="backdrop">实验背景</div>
        <div @click="goToAnchor('guide')" ref="guide">实验指南</div>
        <div @click="goToAnchor('step')" ref="step">实验步骤</div>
        <div @click="goToAnchor('showScore')" ref="showScore">成绩评定与查看</div>
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

    <div class="item" id="index">
      <div class="title"></div>
      <div class="content index">
        <h1>风力发电虚拟仿真实验</h1>
        <div class="detail">
          <span>学校： 湖南科技大学</span>
          <span style="margin-left: 50px">负责人： XXX</span>
          <div style="margin-top: 40px">
            <span class="but" style="margin-right: 25px" @click="gowebGl"
              >进入实验</span
            >
            <span class="but" @click="goToAnchor('guide')">查看实验指南</span>
          </div>
        </div>
      </div>
    </div>

    <div class="item" id="backdrop">
      <div class="line"></div>
      <div class="title">实验背景</div>
      <div class="content">
        <div class="main-text">
          <p class="info-title">摘要</p>
          <div class="info-text">
            <p>
              我们日常生活中所使用的能源主要以天然气等不可再生能源为主，这类能源的使用是不利于可持续发展目标的。对此，进行可再生能源的开发工作，是当前世界范围内所关注的重点。风能是一种常见的可再生能源，其开发的潜力巨大。
            </p>
            <p>
              风能虽然仅仅是太阳能的一种转换形式，并且在太阳能中一般只有2%左右的能量可以转化成为风能，但如果从总量上来看，还是十分可观的。风能可以算作如今最有商业前景的一种可再生能源。在这一基础上，风力发电的相关技术也在不断发展与进步。
            </p>
            <p>
              风力发电主要是利用风动能来进行转化，使其成为机械动能，最后再把机械能转换成为电能。风能本身是一种可再生能源，因此，风力发电本身就具有一定的环保性质。2005年《可再生能源法》立法后，风能这类可再生能源得到了更多的重视，其意义更是不容忽视的。在这一背景下，大力发展可再生能源是一种必然趋势。以我国为例，其风力发电最初出现在20世纪80年代中期，经过长时间的发展，我国的风力发电市场已经有了十分显著的进步。风力发电的使用不仅仅具有一定的环保优势，同时这种能源也具有可再生的优点。不过，在当前，风力发电技术也还有一些不足。基于此，相关从业人员还需要积极提升风力发电的稳定性，使我国风力发电的技术能够不断发展与进步。
            </p>
          </div>
          <p class="info-title">风力发电现状</p>
          <div class="info-text">
            <p>
              风力发电主要是利用风动能来进行转化，使其成为机械动能，最后再把机械能转换成为电能。风能本身是一种可再生能源，因此，风力发电本身就具有一定的环保性质。2005年《可再生能源法》立法后，风能这类可再生能源得到了更多的重视，其意义更是不容忽视的。在这一背景下，大力发展可再生能源是一种必然趋势。以我国为例，其风力发电最初出现在20世纪80年代中期，经过长时间的发展，我国的风力发电市场已经有了十分显著的进步。风力发电的使用不仅仅具有一定的环保优势，同时这种能源也具有可再生的优点。不过，在当前，风力发电技术也还有一些不足。基于此，相关从业人员还需要积极提升风力发电的稳定性，使我国风力发电的技术能够不断发展与进步。
            </p>
            <p>
              风力发电具有诸多优势，能够有效降低环境污染及能源成本，同时风力发电技术也相对成熟，因此目前风电行业发展速度较快，全球风力发电机发电容量正在以每年20%以上的速度递增。截止到2020年，全球风机总装机容量为743
              GW，其中中国风电装机容量世界第一，为281
              GW，是排名第二的美国风电装机容量的130%，并高于欧盟总和。由于我国对风电事业的持续性投入，使得风力发电技术不断发展成熟，风电行业未来的发展前景相当可观。
            </p>
          </div>
          <p class="info-title">风力发电优点</p>
          <div class="info-text">
            <p>
              风力发电技术在实际应用中存在很多优点，主要表现为以下方面。（1）经济效益好。在进行风力发电的过程中，风力发电的价格不高，随着技术成熟，价格下降速度较快，有的风力发电的成本已经接近煤炭的发电成本。除此之外，我国的风力能源较为丰富，在日后发展的过程中，经济效益会更加突出。（2）建设工期较短，建设完成后见效较快。由于风电工程的建设速度很快，在短期之内就可以完成工程项目的建设，从而可以有效解决一些急用的情况。风力发电技术的应用在一些偏远地区有重要作用，通过合理运用该技术，能够更好地满足偏远区域人们的用电需要。
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="item" id="guide">
      <div class="line"></div>
      <div class="title">实验指南</div>
      <div class="content">
        <div class="main-text">
          <p class="info-title">风力发电基本原理</p>
          <div class="info-text">
            <p>
              风能的原理是将风能转化为机械能，然后转化为机械能和输出能。具体技术是风使风力叶片转动，使发电机内部旋转并切割磁场，最后能量积累装置以电能的形式保持恒定的电流输出。风力发电机通常由风力发电机叶片、低速轴、高速轴、风速计、塔楼、发电机、液压系统组成。其中，风轮是一种将风能转化为机器的装置，可根据风向的变化改变风轮的方向，从而最大限度地利用风能。塔是连接和支撑风轮和发电机的支座，其高度取决于周围地形和风轮的大小，以确保风轮的正常运行。发电机是一种将机械能从风轮转换为电能的装置。
            </p>
            <p>
              在风力发电机结构中，风力发电叶尖的线性速度与风速的关系被定义为顶点速度比，这是风力发电机的重要参数，其尺寸是影响风力发电机功率系数的重要参数。风力涡轮机中的电力调节是风力发电系统的关键技术工具。主要包括距离失速控制，失速控制，支架可以调整固定间距，叶片倾斜角不能按风速调整，设计比较简单可靠，风机输出功率随着风的速度而变化，在低风速下使用系数较低，螺杆调整的目的是改变倾斜角，调节风能转换效率，最大化能量转换效率，已达到风力发电机电力稳定输出功率的目的。
            </p>
          </div>
          <p class="info-title">认识风力发电设备</p>
          <div class="info-text">
            <p>
              机舱：机舱包容着风力发电机的关键设备，包括齿轮箱、发电机。维护人员可以通过风力发电机塔进入机舱。机舱左端是风力发电机转子，即转子叶片及轴。
            </p>
            <p>
              转子叶片：捉获风，并将风力传送到转子轴心。现代600千瓦风力发电机上，每个转子叶片的测量长度大约为20米，而且被设计得很像飞机的机翼。</p>
            <p>轴心：转子轴心附着在风力发电机的低速轴上。</p>
            <p>
              低速轴：风力发电机的低速轴将转子轴心与齿轮箱连接在一起。在现代600千瓦风力发电机上，转子转速相当慢，大约为19至30转每分钟。轴中有用于液压系统的导管，来激发空气动力闸的运行。
            </p>
            <p>高速轴及其机械闸：高速轴以1500转每分钟运转，并驱动发电机。它装备有紧急机械闸，用于空气动力闸失效时，或风力发电机被维修时。</p>
            <p>
              齿轮箱：齿轮箱左边是低速轴，它可以将高速轴的转速提高至低速轴的50倍。
            </p>
            <p>
              发电机：通常被称为感应电机或异步发电机。在现代风力发电机上，最大电力输出通常为500至1500千瓦。
            </p>
            <p>偏航装置：借助电动机转动机舱，以使转子正对着风。偏航装置由电子控制器操作，电子控制器可以通过风向标来感觉风向。显示了风力发电机偏航。通常，在风改变其方向时，风力发电机一次只会偏转几度。</p>
            <p>
              电子控制器：包含一台不断监控风力发电机状态的计算机，并控制偏航装置。为防止任何故障（即齿轮箱或发电机的过热），该控制器可以自动停止风力发电机的转动，并通过电话调制解调器来呼叫风力发电机操作员。
            </p>
            <p>液压系统：用于重置风力发电机的空气动力闸。</p>
            <p>
              冷却元件：包含一个风扇，用于冷却发电机。此外，它包含一个油冷却元件，用于冷却齿轮箱内的油。一些风力发电机具有水冷发电机。
            </p>
            <p>
              塔：风力发电机塔载有机舱及转子。通常高的塔具有优势，因为离地面越高，风速越大。现代600千瓦风汽轮机的塔高为40至60米。它可以为管状的塔，也可以是格子状的塔。管状的塔对于维修人员更为安全，因为他们可以通过内部的梯子到达塔顶。格状的塔的优点在于它比较便宜。
            </p>
            <p>风速计及风向标：用于测量风速及风向</p>
          </div>
          <!-- <p class="info-title">实验设计原则</p>
          <div class="info-text">
            <p>
              智能电网综合自动化虚拟仿真实验系统采用基于IE
              C61850标准的纯数字模拟实验方法，以典型220kV智能变电站系统为基础，构建基于真实系统运行环境的虚拟仿真实验环境，其系统结构主要包括实时数字仿真PC、数据服务器及WEB服务器等，以及实验教学案例辅助系统。其设计原则是：以虚拟智能变电站所装设的继电保护与自动装置原理为基础，先根据模拟典型电网主接线，利用仿真计算软件构建模拟电网计算模型，并进行正常运行及故障情况下电压、电流及装置行为的仿真模拟计算，用于模拟电网运行过程中的各种故障现象及继电保护与自动装置的行为，生成电网实时运行基础数据，存储于数据服务器，与VR虚拟仿真环境进行交互，通过继电保护与自动装置的动作情况，理解继电保护与自动装置的原理，并利用WEB服务器实现基于B/S结构Web服务实现远程教学。此外，将原智能变电站综合自动化实验室和动模实验室的实验环境作为实验教学案例辅助系统连入虚拟仿真系统，作为教学案例校验与基础数据的辅助工具。
            </p>
            <p>
              需要指出的是智能电网综合自动化虚拟仿真实验系统是不依赖于实验教学案例辅助系统的，是可以独立运行的。
            </p>
          </div> -->
        </div>
      </div>
    </div>

    <div class="item" id="step">
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
    <div class="item" id="showScore">
      <div class="line"></div>
      <div class="title" style="margin-bottom:20px">成绩评定与查看</div>
      <div class="content">
        <score-table></score-table>
        <!-- 如果登录为学生，弹出成绩表单 -->
        <div v-if="userPower == 2" style="width: 125px; margin: 10px auto 20px">
          <el-button
            type="success"
            style="margin: auto"
            plain
            @click="openDialog"
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
        <div
          v-if="userPower !== 2"
          style="width: 125px; margin: 10px auto 20px"
        >
          <el-button type="success" style="" plain @click="toScoreMang"
            >查看成绩分析</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LoginForm from "../components/login.vue";
import scoreTable from "../components/scoreTable.vue"
import { getStorage, setStorage } from "../util/StorageMan";

export default {
  components: { LoginForm, scoreTable },

  data() {
    return {
      preNav: null,
      currtNav: getStorage("nowNav") || "index",
      gridData: [],
      dialogTableVisible: false,
      LoginTableVisible: false,
      formName: "",
      isLogin: false,
      username: getStorage("userInfo") ? getStorage("userInfo").username : "",
      userPower: getStorage("userInfo")
        ? getStorage("userInfo").userPower
        : null,
      isgetScore: false
    };
  },
  mounted() {
    
    this.changNavColor(this.currtNav);
    window.addEventListener("scroll", this.debounce(this.changMenu, 100));

    if (this.username != "") this.isLogin = true;
  },
  watch: {},
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
        this.$EventBus.$emit('changLoad',true)
        this.$router.push("/webGlpage");
      }
    },
    // 平滑跳转至指定dom
    goToAnchor(selector) {
      this.changNavColor(selector);
      this.$el.querySelector("#" + selector).scrollIntoView({
        behavior: "smooth", // 平滑过渡
        block: "start", // 上边框与视窗顶部平齐
      });
    },
    changNavColor(refDom) {
      if(refDom != 'index' && !this.isgetScore && this.isLogin){
        this.isgetScore = true
        setStorage('score',10,0.5)
        this.putScore()
      }
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
      this.navList = ["index", "backdrop", "guide", "step", "showScore"],
        this.navList.forEach((domId) => {
          let target = document.getElementById(domId).getBoundingClientRect();
          let targetTop = target.top;
          if (targetTop < windowHeight - threshold) {
            // 改变导航栏样式
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
    putScore(){
        this.$axios
          .get(`/changScore?user_id=${getStorage("userInfo").id}&score=${getStorage("score")}`)
          .then((res) => {
            let { code } = res.data;
            if (code == 200) {
              // console.log(code)
              this.$EventBus.tableData[0].isComplete = true
            }
          })
    },
    toScoreMang() {
      if (!this.isLogin) {
        this.$message({
          showClose: true,
          message: "你还未登录，请先登录或注册",
          type: "warning",
          duration: 2000,
        });
      } else {
        this.$router.push("/ScoreMang");
      }
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
/* .title {
  /* background: #4395ff; */
/* }  */
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