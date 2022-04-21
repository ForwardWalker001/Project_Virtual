<template>
  <div class="main" ref="threeTarget">
    <img src="/schoolLogo.svg" alt="logo" class="schoolLogo">
    <div class="showBox">
      <el-card class="box-card">
        <span style="margin:10px 10px;">选择环境风速：</span>
        <el-select v-model="TEspeed"
        @change="(val)=>{TE.speed = parseFloat(val);}">
          <el-option label="一级" value="0.01"></el-option>
          <el-option label="二级" value="0.03"></el-option>
          <el-option label="三级" value="0.05"></el-option>
        </el-select>
      </el-card>
    </div>
    <div class="openObj">
      <el-button
        type="primary"
        size="medium"
        style="margin-right: 20px"
        @click="openShow"
      >
        {{ title }}
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
import { setInterCamera } from "../assets/js/utils"
import {
  framePromise,
  framePromise2,
  framePromise3,
} from "../assets/js/TLoadModel";

import { Object3D } from "three";

export default {
  data() {
    return {
      title: "多风机展示",
      isShow: false,
      electricTitle: "启动电机",
      TE: null,
      TEspeed: '一级'
    };
  },
  mounted() {
    const threeTarget = this.$refs.threeTarget;
    const TE = new TEngine(threeTarget);
    this.TE = TE;
    TE.addObject(...basicObjectList);
    TE.addObject(...LightsList);
    TE.addObject(...helperList);

    this.frameArr = [];
    this.addFrames(0, 0, 0);
  },
  watch: {},
  methods: {
    // 改变旋转中心
    changePivot(x, y, z, obj) {
      let wrapper = new Object3D();
      wrapper.position.set(x, y, z);
      wrapper.add(obj);
      obj.position.set(-x, -y, -z);
      return wrapper;
    },
    openElectric() {
      if (!this.TE.openElectric) {
        this.electricTitle = "关闭电机";
        this.TE.openElectric = true;
      } else {
        this.electricTitle = "启动电机";
        this.TE.openElectric = false;
      }
    },
    openShow() {
      if (!this.isShow) {
        this.title = "单风机展示";
        this.isShow = true;
        
        // this.TE.camera.position.set(190, 130, -190)
        setInterCamera(190, 150, -200, this.TE.camera)
        this.TE.Fanblades.forEach((item) => {
          item.visible = true;
        });
        this.TE.cylinder.forEach((item) => {
          item.visible = true;
        });
        this.TE.fanBox.forEach((item) => {
          item.visible = true;
        });
      } else {
        this.title = "多风机展示";
        this.isShow = false;
        this.TE.camera.position.set(15, 91, -100)
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
        let obj1 = this.changePivot(0.25, 45.9, 0, frame);
        obj1.position.set(x, y + 45.9, z);

        line1Obj.frame1 = obj1.clone();
        line2Obj.frame1 = obj1.clone();
        line3Obj.frame1 = obj1.clone();

        // obj1.visible = false
        this.TE.Fanblades.push(obj1);
        this.TE.addObject(obj1);
      });
      framePromise2.then((frame) => {
        frame.position.set(x, y, z);

        line1Obj.frame2 = frame.clone();
        line2Obj.frame2 = frame.clone();
        line3Obj.frame2 = frame.clone();

        this.TE.cylinder.push(frame);
        this.TE.addObject(frame);
      });
      framePromise3.then((frame) => {
        frame.position.set(x, y, z);
        // frame.visible = false
        line1Obj.frame3 = frame.clone();
        line2Obj.frame3 = frame.clone();
        line3Obj.frame3 = frame.clone();
        this.TE.fanBox.push(frame);
        this.TE.addObject(frame);

        this.line1 = 5;
        this.createFramesLine1(160, 0, 100, line1Obj);
        this.line2 = 5;
        this.createFramesLine2(160, 0, 0, line2Obj);
        this.line3 = 5;
        this.createFramesLine3(160, 0, -100, line3Obj);
      });
    },

    createFramesLine2(x, y, z, obj) {
      if (this.line2 <= 0) return;
      obj.frame1.position.set(x, y + 45.9, z);
      obj.frame1.visible = false;
      let obj1 = obj.frame1.clone();
      this.TE.Fanblades.push(obj.frame1);
      this.TE.addObject(obj.frame1);

      obj.frame2.position.set(x, y, z);
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
      obj.frame1.position.set(x, y + 45.9, z);
      obj.frame1.visible = false;
      let obj1 = obj.frame1.clone();
      this.TE.Fanblades.push(obj.frame1);
      this.TE.addObject(obj.frame1);

      obj.frame2.position.set(x, y, z);
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
      obj.frame1.position.set(x, y + 45.9, z);
      obj.frame1.visible = false;
      let obj1 = obj.frame1.clone();
      this.TE.Fanblades.push(obj.frame1);
      this.TE.addObject(obj.frame1);

      obj.frame2.position.set(x, y, z);
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
  user-select: none!important;
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
.box-card {
  width: 400px;
  position: absolute;
  top: 100px;
  left: 20px;
  /* opacity: 0.8; */
  background:rgba(255,255,255,0.8);
}
::v-deep .el-select,.el-input,.el-input__inner{
  opacity: 0.8;
}
.schoolLogo {
  width: 200px;
  /* height: 50px; */
  position: absolute;
  top: 10px;
  left: 10px;
}
</style>