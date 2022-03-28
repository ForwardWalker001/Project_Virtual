<template>
    <div class="main" ref='threeTarget'>
        <!-- <iframe src="static/hightopo/demo2/Fan3d-magic.html" frameborder="0" width="100%" height="100%"></iframe> -->
        <!-- 123123 -->
        <div class="openObj">
            <!-- <span>123</span> -->
            <el-button type="success" size="medium" style="margin-right:20px" @click="openElectric ">启动电机</el-button>
            <el-button type="warning" size="medium" @click="()=>{TE.openElectric=false}">关闭电机</el-button>
        </div>
    </div>
</template>

<script>
// import { Material, Mesh, WebGLRenderer } from 'three'
import { TEngine } from '../assets/js/TEngine.js'
import { basicObjectList } from '../assets/js/TBasicObject'
import { LightsList } from '../assets/js/Tlights'
import { helperList } from '../assets/js/THelper'

import { framePromise, framePromise2, framePromise3 } from '../assets/js/TLoadModel'

import { Object3D } from 'three'

export default {
    data(){
        return {
            TE : null
        }
    },
    mounted(){
        const threeTarget = this.$refs.threeTarget
        const TE = new TEngine(threeTarget)
        this.TE = TE
        TE.addObject(...basicObjectList)
        TE.addObject(...LightsList)
        TE.addObject(...helperList)
        
        framePromise.then(frame => {
            let obj1 = this.changePivot(0.25,45.9,0, frame)
            TE.Fanblade = obj1
            TE.addObject(obj1)
        })
        framePromise2.then(frame => {
            // TE.cylinder = frame
            TE.addObject(frame)
        })
        framePromise3.then(frame => {
            TE.cylinder = frame
            TE.addObject(frame)
        })
    },
    methods: {
        // 改变旋转中心
        changePivot(x,y,z,obj){
            let wrapper = new Object3D();
            wrapper.position.set(x,y,z);
            wrapper.add(obj);
            obj.position.set(-x,-y,-z);
            return wrapper;
        },
        openElectric() {
            this.TE.openElectric = true
        }
    }
}
</script>

<style scoped>
.main {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
}
.openObj {
    position: absolute;
    left: 100px;
    bottom: 15px;
    z-index: 100;
    color: red;
}
</style>