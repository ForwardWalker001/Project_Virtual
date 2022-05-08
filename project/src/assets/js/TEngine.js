import {

  PerspectiveCamera,
  Scene,
  Vector3,
  WebGLRenderer,
  PMREMGenerator,
  SphereBufferGeometry,
  Mesh,
  MeshBasicMaterial,
  ReinhardToneMapping,
  // BackSide
} from "three"

import Stats from 'three/examples/jsm/libs/stats.module'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { EXRLoader } from 'three/examples/jsm/loaders/EXRLoader';
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

    this.camera.position.set(15, 80, -130)
    // this.camera.lookAt(0,100,0)
    this.camera.up = new Vector3(0, 1, 0)

    // 风速
    this.speed = 0.02
    // 历史转机速度
    this.speedArr = new Array(5).fill(0)
    // 历史转化效率
    this.transformArr = new Array(5).fill(0)
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
    orbitControls.target = new Vector3(0,10,0);

    const renderFun = () => {
      orbitControls.update()
      // this.camera.update()
      // 扇叶转动
      if (this.Fanblades.length >= 1 && this.openElectric) {
        this.Fanblades.forEach((item) => {
          item.rotation.z += this.speed * Math.cos(this.angle - this.angle60)
        })
      }
      // 角度转动
      // 最大只能转动60度
      if (this.changAngle) {
        if (this.angle60 > this.angle) {
          for (let i = 0; i < this.Fanblades.length; i++) {
            this.Fanblades[i].rotation.y += Math.PI / 180 * -0.1
            this.fanBox[i].rotation.y += Math.PI / 180 * -0.1
            if (this.fanBox[i].rotation.y <= Math.PI / 180 * -60) {
              this.Fanblades[i].rotation.y = Math.PI / 180 * -60
              this.fanBox[i].rotation.y = Math.PI / 180 * -60
              this.changAngle = false
            }
          }
          if (this.fanBox[0].rotation.y <= this.angle) this.changAngle = false
        } else if (this.angle60 < this.angle) {
          for (let i = 0; i < this.Fanblades.length; i++) {
            this.Fanblades[i].rotation.y += Math.PI / 180 * 0.1
            this.fanBox[i].rotation.y += Math.PI / 180 * 0.1
            if (this.fanBox[i].rotation.y >= Math.PI / 180 * 60) {
              this.Fanblades[i].rotation.y = Math.PI / 180 * 60
              this.fanBox[i].rotation.y = Math.PI / 180 * 60
              this.changAngle = false
            }
          }
          if (this.fanBox[0].rotation.y >= this.angle) this.changAngle = false
        }
        this.angle60 = this.fanBox[0].rotation.y
      }
      // this.camera.position.x += 0.1
      // console.log(this.camera.position)
      renderer.render(scene, this.camera)
      stats.update()
      requestAnimationFrame(renderFun)
    }

    renderFun()

    dom.appendChild(renderer.domElement)
    dom.appendChild(statsDom)


    this.renderer = renderer
    this.scene = scene
    
    const pmremGenerator = new PMREMGenerator(this.renderer); // 使用hdr作为背景色
    pmremGenerator.compileEquirectangularShader();
    new EXRLoader()
      .load('/OutdoorHDRI019_4K-HDR.exr', function (texture) {
        var material = new MeshBasicMaterial({
          map: texture,
        });
        var geo = new SphereBufferGeometry(300);
        //反转球，使贴图贴在球内侧而不在外侧
        geo.scale(-1, 1, 1);
        var mesh = new Mesh(geo, material);
        scene.add(mesh)
      });
      renderer.toneMapping = ReinhardToneMapping;
      renderer.toneMappingExposure = 3;
  }

  addObject(...object) {
    object.forEach(elem => {
      this.scene.add(elem)
    })
  }
}