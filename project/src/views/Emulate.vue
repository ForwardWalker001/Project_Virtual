<template>
  <div class="main" ref="threeTarget">
    <img src="/schoolLogo.svg" alt="logo" class="schoolLogo" />
    <div class="showBox">
      <el-card class="box-card">
        <span style="margin: 10px 10px">改变环境风速：</span>
        <el-select
          v-model="TEspeed"
          style="margin-bottom: 15px"
          @change="changSpeed"
        >
          <el-option label="4 m/s" value="0.02"></el-option>
          <el-option label="8 m/s" value="0.04"></el-option>
          <el-option label="10 m/s" value="0.05"></el-option>
          <el-option label="12 m/s" value="0.06"></el-option>
        </el-select>
        <span style="margin: 10px 26px">改变风向：</span>
        <el-tooltip
          class="item"
          effect="dark"
          content="风机最大可转动正负60度"
          placement="top"
        >
          <el-input
            v-model="changAngle"
            placeholder="请输入角度"
            style="width: 222px"
            @change="changAngleFun"
          ></el-input
        ></el-tooltip>
        <span style="margin: 10px 26px">风机阵列：</span>
        <el-select v-model="title" style="margin-top: 20px" @change="openShow">
          <el-option label="单风机运行" value="单风机运行"></el-option>
          <el-option label="多风机阵列一" value="多风机阵列一"></el-option>
          <el-option label="多风机阵列二" value="多风机阵列二"></el-option>
        </el-select>
        <span style="margin: 10px 26px">场景更换：</span>
        <el-select v-model="scene" style="margin-top: 20px" @change="changScen">
          <el-option label="草场" value="草场"></el-option>
          <el-option label="网格场景" value="网格场景"></el-option>
        </el-select>
      </el-card>
      <el-button class="stepStyle" @click="dialogTableVisible = true"
        >查看得分情况</el-button
      >
      <el-dialog title="得分情况" :visible.sync="dialogTableVisible">
        <score-table style="width: 100% !important"></score-table>
      </el-dialog>
    </div>
    <div class="showBox" v-show="!isShow">
      <el-card class="box-card2">
        <div style="margin: 10px 30px 20px 20px">
          转机转速：<el-tag style="margin-left: 20px; width: 80px"
            >{{ fanSpeed }} m/s</el-tag
          >
        </div>
        <div style="margin: 10px 30px 20px 20px">
          转机角度：<el-tag style="margin-left: 20px; width: 80px"
            >{{ fanAngle }} 度</el-tag
          >
        </div>
        <div style="margin: 10px 30px 10px 20px">
          叶片角度：<el-tag style="margin-left: 20px; width: 80px">{{
            bladeAngle
          }} 度</el-tag>
        </div>
      </el-card>
    </div>
    <div class="showBox" v-show="!isShow">
      <el-card class="box-card3">
        <line-chart title="转速变化" :chartData="chartDataArr"></line-chart>
      </el-card>
      <el-card class="box-card4">
        <line-chart title="转化效率(%)" :chartData="chartDataArr2"></line-chart>
      </el-card>
      <el-card class="box-card5">
        <area-chart :chartData="chartDataArr3"></area-chart>
      </el-card>
    </div>

    <div class="openObj">
      <el-button
        type="primary"
        size="medium"
        style="margin-right: 20px"
        @click="$router.go(-1)"
      >
        退出实验
      </el-button>
      <el-button
        type="success"
        size="medium"
        style="margin-right: 20px"
        @click="openElectric"
        >{{ electricTitle }}</el-button
      >
    </div>
  </div>
</template>

<script>
// import { Material, Mesh, WebGLRenderer } from 'three'
import { TEngine } from "../assets/js/TEngine.js";
import { basicObjectList } from "../assets/js/TBasicObject";
import { LightsList } from "../assets/js/Tlights";
import { helperList } from "../assets/js/THelper";
import {
  setInterCamera,
  setStorage,
  getStorage,
  putScore,
  updateSpeed,
} from "../assets/js/utils";
import {
  framePromise,
  framePromise2,
  framePromise3,
  grassPromise,
} from "../assets/js/TLoadModel";

import { Object3D } from "three";
import scoreTable from "../components/scoreTable.vue";
import LineChart from "../components/LineChart.vue";
import areaChart from "../components/areaChart.vue";

export default {
  components: { scoreTable, LineChart, areaChart },
  data() {
    return {
      title: "单风机运行",
      isShow: false,
      electricTitle: "开始实验",
      changAngle: 0,
      TE: null,
      TEspeed: "4 m/s",
      dialogTableVisible: false,
      scene: "草场",
    };
  },
  mounted() {
    this.grassArr = [];

    const threeTarget = this.$refs.threeTarget;
    const TE = new TEngine(threeTarget);
    this.TE = TE;
    TE.addObject(...basicObjectList);
    TE.addObject(...LightsList);
    TE.addObject(...helperList);

    // this.frameArr = [];
    this.addFrames(0, 0, 0);
    // this.addGrass(250, 250,{})

    setTimeout(() => {
      this.$EventBus.$emit("changLoad", false);
    }, 2000);
  },
  computed: {
    fanSpeed: function () {
      try {
        if (this.TE.openElectric)
          return (
            this.TE.speed *
            Math.cos(this.TE.angle - this.TE.angle60) *
            200
          ).toFixed(2);
        else {
          return 0;
        }
      } catch (error) {
        return 0;
      }
    },
    fanAngle: function () {
      try {
        return ((this.TE.angle60 * 180) / Math.PI).toFixed(2);
      } catch (e) {
        return 0;
      }
    },
    bladeAngle: function () {
      try {
        return (this.fanAngle - this.changAngle + 90).toFixed(2);
      } catch (e) {
        return 90;
      }
    },
    chartDataArr: function () {
      try {
        return this.TE.speedArr;
      } catch (e) {
        return 0;
      }
    },
    chartDataArr2: function () {
      try {
        return this.TE.transformArr;
      } catch (e) {
        return 0;
      }
    },
    chartDataArr3: function () {
      try {
        return (
          this.TE.openElectric *
          Math.pow(this.TE.speed * 200-2, 3) *
          (Math.cos(this.TE.angle - this.TE.angle60).toFixed(2) - 0.1)
        );
      } catch (e) {
        return 0;
      }
    },
  },
  watch: {},
  methods: {
    // 改变旋转中心
    changePoint(x, y, z, obj) {
      let wrapper = new Object3D();
      wrapper.position.set(x, y, z);
      wrapper.add(obj);
      obj.position.set(-x, -y, -z);
      return wrapper;
    },
    // 改变风速
    changSpeed(val) {
      this.TE.speed = parseFloat(val);
      if (this.TE.openElectric) updateSpeed(this.TE);
      if (!this.$EventBus.tableData[2].isComplete) {
        setStorage("score", getStorage("score") + 10, 0.5);
        putScore(this.$axios, () => {
          this.$EventBus.tableData[2].isComplete = true;
        });
      }
    },
    // 改变风向
    changAngleFun() {
      this.changAngle = parseFloat(this.changAngle);
      if (typeof this.changAngle === "number" && !isNaN(this.changAngle)) {
        this.TE.angle = (Math.PI / 180) * this.changAngle;
        this.TE.changAngle = true;
        if (this.TE.openElectric) updateSpeed(this.TE);
        if (!this.$EventBus.tableData[3].isComplete) {
          setStorage("score", getStorage("score") + 20, 0.5);
          putScore(this.$axios, () => {
            this.$EventBus.tableData[3].isComplete = true;
          });
        }
      }
    },
    changScen(val) {
      console.log(val, this.grassArr.length);
      if (val == "草场") {
        this.grassArr.forEach((item) => {
          item.visible = true;
        });
      } else {
        this.grassArr.forEach((item) => {
          item.visible = false;
        });
      }
    },
    // 启动电机
    openElectric() {
      if (!this.TE.openElectric) {
        this.electricTitle = "停止实验";
        this.TE.openElectric = true;
        updateSpeed(this.TE);
        if (!this.$EventBus.tableData[1].isComplete) {
          setStorage("score", getStorage("score") + 10, 0.5);
          putScore(this.$axios, () => {
            this.$EventBus.tableData[1].isComplete = true;
          });
        }
      } else {
        this.electricTitle = "开始实验";
        this.TE.openElectric = false;
        this.TE.speedArr.push(...new Array(5).fill(0));
        this.TE.transformArr.push(...new Array(5).fill(0));
      }
    },
    // 多风机运行
    openShow(val) {
      if (val !== "单风机运行") {
        this.isShow = true;
        // this.TE.camera.position.set(190, 130, -190)
        setInterCamera(190, 150, -200, this.TE.camera);
        this.TE.Fanblades.forEach((item) => {
          item.visible = true;
        });
        this.TE.cylinder.forEach((item) => {
          item.visible = true;
        });
        this.TE.fanBox.forEach((item) => {
          item.visible = true;
        });
        if (val == "多风机阵列二") {
          this.TE.Fanblades[1].position.z = 200;
          this.TE.cylinder[1].position.z = 200;
          this.TE.fanBox[1].position.z = 200;
          this.TE.Fanblades[5].position.z = 200;
          this.TE.cylinder[5].position.z = 200;
          this.TE.fanBox[5].position.z = 200;
          this.TE.Fanblades[10].position.z = -150;
          this.TE.cylinder[10].position.z = -150;
          this.TE.fanBox[10].position.z = -150;
          this.TE.Fanblades[14].position.z = -150;
          this.TE.cylinder[14].position.z = -150;
          this.TE.fanBox[14].position.z = -150;
          for (let i of [3, 7, 8, 12]) {
            this.TE.Fanblades[i].visible = false;
            this.TE.cylinder[i].visible = false;
            this.TE.fanBox[i].visible = false;
          }
        } else {
          this.TE.Fanblades[1].position.z = 100;
          this.TE.cylinder[1].position.z = 100;
          this.TE.fanBox[1].position.z = 100;
          this.TE.Fanblades[5].position.z = 100;
          this.TE.cylinder[5].position.z = 100;
          this.TE.fanBox[5].position.z = 100;
          this.TE.Fanblades[10].position.z = -100;
          this.TE.cylinder[10].position.z = -100;
          this.TE.fanBox[10].position.z = -100;
          this.TE.Fanblades[14].position.z = -100;
          this.TE.cylinder[14].position.z = -100;
          this.TE.fanBox[14].position.z = -100;
        }
        if (!this.$EventBus.tableData[4].isComplete) {
          setStorage("score", getStorage("score") + 10, 0.5);
          putScore(this.$axios, () => {
            this.$EventBus.tableData[4].isComplete = true;
          });
        }
      } else {
        this.isShow = false;
        this.TE.camera.position.set(15, 91, -100);
        // setInterCamera(20, 90, -100, this.TE.camera)
        this.TE.Fanblades.forEach((item, index) => {
          if (index == 0) item.visible = true;
          else {
            item.visible = false;
          }
        });
        this.TE.cylinder.forEach((item, index) => {
          if (index == 0) item.visible = true;
          else {
            item.visible = false;
          }
        });
        this.TE.fanBox.forEach((item, index) => {
          if (index == 0) item.visible = true;
          else {
            item.visible = false;
          }
        });
      }
    },
    // 草地
    addGrass(x, z, obj) {
      obj.position.set(x, 0, z);
      this.grassArr.push(obj);
      this.TE.addObject(obj);
      if (x - 10 < -250) {
        x = 260;
        z = z - 10;
        if (z < -250) return;
      }
      this.addGrass(x - 10, z, obj.clone());
    },
    // 加载风电模型
    addFrames(x, y, z) {
      let line1Obj = {
        frame1: null,
        frame2: null,
        frame3: null,
      };
      let line2Obj = {
        frame1: null,
        frame2: null,
        frame3: null,
      };
      let line3Obj = {
        frame1: null,
        frame2: null,
        frame3: null,
      };

      framePromise.then((frame) => {
        // 改变转机旋转中心
        let obj1 = this.changePoint(0.3, 45.9, 0, frame);
        obj1.position.set(x + 0.25, y + 45.9, z);
        // obj1.rotation.y = Math.PI / 180 * 40

        line1Obj.frame1 = obj1.clone();
        line2Obj.frame1 = obj1.clone();
        line3Obj.frame1 = obj1.clone();

        // obj1.visible = false
        this.TE.Fanblades.push(obj1);
        this.TE.addObject(obj1);
      });
      // 柱
      framePromise2.then((frame) => {
        frame.position.set(x, y, z + 2.5);
        // frame.rotation.y = 45

        line1Obj.frame2 = frame.clone();
        line2Obj.frame2 = frame.clone();
        line3Obj.frame2 = frame.clone();

        this.TE.cylinder.push(frame);
        this.TE.addObject(frame);
      });
      framePromise3.then((frame) => {
        frame.position.set(x, y, z);
        // frame.rotation.y = 45

        line1Obj.frame3 = frame.clone();
        line2Obj.frame3 = frame.clone();
        line3Obj.frame3 = frame.clone();
        this.TE.fanBox.push(frame);
        this.TE.addObject(frame);

        this.line1 = 5;
        this.createFramesLine1(160, 0, 100, line1Obj);
        this.line2 = 4;
        this.createFramesLine2(160, 0, 0, line2Obj);
        this.line3 = 5;
        this.createFramesLine3(160, 0, -100, line3Obj);
      });
      // 加载草地
      grassPromise.then((frame) => {
        frame.position.set(250, 0, 250);
        let obj = frame.clone();
        this.grassArr.push(frame);
        this.TE.addObject(frame);
        this.addGrass(250 - 10, 250, obj);
      });
    },

    createFramesLine2(x, y, z, obj) {
      if (this.line2 <= 0) return;
      if (x == 0) x = -80;
      obj.frame1.position.set(x + 0.25, y + 45.9, z);
      obj.frame1.visible = false;
      let obj1 = obj.frame1.clone();
      this.TE.Fanblades.push(obj.frame1);
      this.TE.addObject(obj.frame1);

      obj.frame2.position.set(x, y, z + 2.5);
      obj.frame2.visible = false;
      let obj2 = obj.frame2.clone();
      this.TE.cylinder.push(obj.frame2);
      this.TE.addObject(obj.frame2);

      obj.frame3.position.set(x, y, z);
      obj.frame3.visible = false;
      let obj3 = obj.frame3.clone();
      this.TE.fanBox.push(obj.frame3);
      this.TE.addObject(obj.frame3);

      let frame = {
        frame1: obj1,
        frame2: obj2,
        frame3: obj3,
      };
      this.line2--;

      this.createFramesLine2(x - 80, y, z, frame);
    },
    createFramesLine1(x, y, z, obj) {
      if (this.line1 <= 0) return;
      obj.frame1.position.set(x + 0.25, y + 45.9, z);
      obj.frame1.visible = false;
      let obj1 = obj.frame1.clone();
      this.TE.Fanblades.push(obj.frame1);
      this.TE.addObject(obj.frame1);

      obj.frame2.position.set(x, y, z + 2.5);
      obj.frame2.visible = false;
      let obj2 = obj.frame2.clone();
      this.TE.cylinder.push(obj.frame2);
      this.TE.addObject(obj.frame2);

      obj.frame3.position.set(x, y, z);
      obj.frame3.visible = false;
      let obj3 = obj.frame3.clone();
      this.TE.fanBox.push(obj.frame3);
      this.TE.addObject(obj.frame3);

      let frame = {
        frame1: obj1,
        frame2: obj2,
        frame3: obj3,
      };
      this.line1--;
      this.createFramesLine1(x - 80, y, z, frame);
    },
    createFramesLine3(x, y, z, obj) {
      if (this.line3 <= 0) return;
      obj.frame1.position.set(x + 0.25, y + 45.9, z);
      obj.frame1.visible = false;
      let obj1 = obj.frame1.clone();
      this.TE.Fanblades.push(obj.frame1);
      this.TE.addObject(obj.frame1);

      obj.frame2.position.set(x, y, z + 2.5);
      obj.frame2.visible = false;
      let obj2 = obj.frame2.clone();
      this.TE.cylinder.push(obj.frame2);
      this.TE.addObject(obj.frame2);

      obj.frame3.position.set(x, y, z);
      obj.frame3.visible = false;
      let obj3 = obj.frame3.clone();
      this.TE.fanBox.push(obj.frame3);
      this.TE.addObject(obj.frame3);

      let frame = {
        frame1: obj1,
        frame2: obj2,
        frame3: obj3,
      };
      this.line3--;
      this.createFramesLine3(x - 80, y, z, frame);
    },
  },
};
</script>

<style scoped>
.main {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  user-select: none !important;
}
.openObj {
  position: absolute;
  left: 50px;
  bottom: 15px;
  z-index: 100;
  color: red;
}
.showBox {
  position: absolute;
}
.stepStyle {
  background: rgba(255, 255, 255, 0.8);
  color: #409eff;
  position: absolute;
  top: 8px;
  left: calc(100vw - 250px);
}
.box-card {
  width: 400px;
  position: absolute;
  top: 100px;
  left: 20px;
  /* opacity: 0.8; */
  background: rgba(255, 255, 255, 0.8);
}
.box-card2 {
  width: 300px;
  position: absolute;
  top: 430px;
  left: 80px;
  text-align: center;
  /* opacity: 0.8; */
  background: rgba(255, 255, 255, 0.8);
}
.box-card3 {
  width: 400px;
  position: absolute;
  top: 90px;
  left: calc(100vw - 440px);
  /* opacity: 0.8; */
  background: rgba(255, 255, 255, 0.8);
}
.box-card4 {
  width: 400px;
  position: absolute;
  top: 430px;
  left: calc(100vw - 440px);
  /* opacity: 0.8; */
  background: rgba(255, 255, 255, 0.8);
}
.box-card5 {
  width: 400px;
  position: absolute;
  top: 430px;
  left: calc(50vw - 200px);
  /* opacity: 0.8; */
  background: rgba(255, 255, 255, 0.8);
}
::v-deep .el-select,
.el-input,
.el-input__inner {
  opacity: 0.8;
}
.schoolLogo {
  width: 250px;
  position: absolute;
  top: 10px;
  left: 10px;
}
</style>