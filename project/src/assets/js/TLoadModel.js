import {  MeshStandardMaterial} from 'three'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { frameColorTexture, frameDispTexture, frameRoughnessTexture } from './TTextures'

const objLoader = new OBJLoader()


export const grassPromise = new Promise((resolve, reject) => {
  objLoader.loadAsync('/grass.obj').then(group => {
    const frame = group.children[0]

    frame.material = new MeshStandardMaterial({
      map: frameColorTexture,
      roughnessMap: frameRoughnessTexture,
      bumpMap: frameDispTexture
    })
    // frame.position.y = 0
    // frame.position.z = 0
    // frame.position.x = 0
    frame.scale.set(10, 10, 10)
    resolve(frame)
  }).catch(err => {
    reject(err)
  })
})
export const framePromise = new Promise((resolve, reject) => {
  objLoader.loadAsync('/转头.obj').then(group => {
    const frame = group.children[0]

    frame.material = new MeshStandardMaterial({
      // map: frameColorTexture,
      // roughnessMap: frameRoughnessTexture,
      // bumpMap: frameDispTexture
    })

    resolve(frame)
  }).catch(err => {
    reject(err)
  })
})

export const framePromise2 = new Promise((resolve, reject) => {
  objLoader.loadAsync('/柱.obj').then(group => {
    const frame = group.children[0]

    frame.material = new MeshStandardMaterial({
      // map: frameColorTexture,
      // roughnessMap: frameRoughnessTexture,
      // bumpMap: frameDispTexture
    })

    resolve(frame)
  }).catch(err => {
    reject(err)
  })
})

export const framePromise3 = new Promise((resolve, reject) => {
  objLoader.loadAsync('/转机.obj').then(group => {
    const frame = group.children[0]

    frame.material = new MeshStandardMaterial({
      // map: frameColorTexture,
      // roughnessMap: frameRoughnessTexture,
      // bumpMap: frameDispTexture
    })

    // frame.position.y = 0
    // frame.position.z = 0
    // frame.position.x = 0
    // frame.rotation.x = Math.PI / 180 * -90
    // frame.scale.set(2, 2, 2)

    resolve(frame)
  }).catch(err => {
    reject(err)
  })
})



