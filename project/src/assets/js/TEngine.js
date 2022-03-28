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


  constructor (dom) {
    this.dom = dom
    const renderer = new WebGLRenderer({
      antialias: true
    })

    renderer.shadowMap.enabled = true

    const scene = new Scene()
    this.camera = new PerspectiveCamera(45, dom.offsetWidth / dom.offsetHeight, 1, 1000)

    this.camera.position.set(50, 100 ,-50)
    this.camera.lookAt(new Vector3(0, 0, 0))
    this.camera.up = new Vector3(0, 1, 0)

    // 扇叶
    this.Fanblade = null
    // 扇枉
    // this.cylinder = null
    this.openElectric = false

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

    
    const renderFun = () => {
      orbitControls.update()
      if(this.Fanblade && this.openElectric){
        this.Fanblade.rotation.z += 0.01
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
  addObject (...object) {
    object.forEach(elem => {
      this.scene.add(elem)
    })
  }
}