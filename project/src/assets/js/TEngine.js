import {

  PerspectiveCamera,
  Scene,
  Vector3,
  WebGLRenderer,
  // MOUSE,
  // Vector2,
  // Raycaster
} from "three"

import Stats from 'three/examples/jsm/libs/stats.module'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// import { TransformControls } from 'three/examples/jsm/controls/TransformControls'

export class TEngine {

  constructor(dom) {
    this.dom = dom
    const renderer = new WebGLRenderer({
      antialias: true
    })

    renderer.shadowMap.enabled = true

    const scene = new Scene()
    this.camera = new PerspectiveCamera(45, dom.offsetWidth / dom.offsetHeight, 1, 1000)

    this.camera.position.set(15, 91, -100)
    this.camera.lookAt(new Vector3(0, 50, 0))
    this.camera.up = new Vector3(0, 1, 0)

    // 风速
    this.speed = 0.02
    // 历史转机速度
    this.speedArr = new Array(5).fill(0)
    // 风向
    this.angle = 0
    // 转机角度
    this.angle60 = 0
    // 扇叶
    this.Fanblades = []
    // 扇枉
    this.cylinder = []
    // 扇箱
    this.fanBox = []
    // 是否改变风机朝向
    this.changAngle = false
    // 是否启动电机
    this.openElectric = false
    // 是否多风机展示
    this.isShow = false

    renderer.setSize(dom.offsetWidth, dom.offsetHeight, true)

    // 初始性能监视器
    const stats = Stats()
    const statsDom = stats.domElement
    statsDom.style.position = 'fixed'
    statsDom.style.top = '0'
    statsDom.style.right = '5px'
    statsDom.style.left = 'unset'

    // 初始orbitControls
    const orbitControls = new OrbitControls(this.camera, renderer.domElement)
    // orbitControls.mouseButtons = {
    //   LEFT: null ,
    //   MIDDLE: MOUSE.DOLLY,
    //   RIGHT: MOUSE.ROTATE
    // }
    // this.num1 = 0
    // this.num2 = 0
    const renderFun = () => {
      orbitControls.update()
      let temp = this.speed * Math.cos(this.angle - this.angle60)
      // this.num2++
      // 扇叶转动
      if (this.Fanblades.length >= 1 && this.openElectric) {
        this.Fanblades.forEach((item) => {
          item.rotation.z += temp
        })
        // if (this.num2>=20) {
        //   this.num2 = 0
        //   if (temp.toFixed(4) * 200 == (this.speedArr[this.speedArr.length - 1])) this.num1++
        //   else {
        //     this.num1 = 0
        //   }
        //   if (this.num1 <= 5) {
        //     this.speedArr.push(temp.toFixed(4) * 200)
        //   }
        //   if (this.speedArr.length >= 30) {
        //     this.speedArr.shift()
        //   }
        // }
      }

      // 角度转动
      if (this.changAngle) {
        if (this.fanBox[0].rotation.y > this.angle) {
          for (let i = 0; i < this.Fanblades.length; i++) {
            this.Fanblades[i].rotation.y += Math.PI / 180 * -0.1
            this.fanBox[i].rotation.y += Math.PI / 180 * -0.1
          }
          if (this.fanBox[0].rotation.y < this.angle) this.changAngle = false
        } else {
          for (let i = 0; i < this.Fanblades.length; i++) {
            this.Fanblades[i].rotation.y += Math.PI / 180 * 0.1
            this.fanBox[i].rotation.y += Math.PI / 180 * 0.1
          }
          if (this.fanBox[0].rotation.y > this.angle) this.changAngle = false
        }
        // 最大只能转动60度
        if (Math.abs(this.fanBox[0].rotation.y) >= Math.PI / 180 * 60) this.changAngle = false
        this.angle60 = this.fanBox[0].rotation.y
      }


      renderer.render(scene, this.camera)
      stats.update()
      requestAnimationFrame(renderFun)
    }

    renderFun()

    dom.appendChild(renderer.domElement)
    dom.appendChild(statsDom)


    this.renderer = renderer
    this.scene = scene
    // this.transformControls = transformControls
    // this.mouse = mouse
    // this.raycaster = raycaster
  }
  addObject(...object) {
    object.forEach(elem => {
      this.scene.add(elem)
    })
  }
}