import {
  Mesh,
  BoxBufferGeometry,
  MeshStandardMaterial,


} from 'three'

// import { pictureTexture } from './TTextures'

export const basicObjectList = []

export const stagematerial = new MeshStandardMaterial({
  color: 'rgb(0, 75, 75)',
  roughness: 0,
})
// 地面
export const stage = new Mesh(
  new BoxBufferGeometry(800, 10, 800),
  stagematerial
)
stage.castShadow = true
stage.receiveShadow = true

stage.position.y = -5

basicObjectList.push(stage)