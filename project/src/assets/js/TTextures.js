import {  TextureLoader, MeshStandardMaterial} from "three";


const textureLoader = new TextureLoader()

// export const pictureTexture = textureLoader.load('/hs1.jpg')
// pictureTexture.center.set(0.5,0.5)
// pictureTexture.rotation = Math.PI/180 * 90

export const frameColorTexture = textureLoader.load('/GrassColor.jpg')
export const frameRoughnessTexture = textureLoader.load('/GrassRoughness.jpg')
export const frameDispTexture = textureLoader.load('/GrassDisplacement.jpg')

const color =  textureLoader.load('/Plastic008_2K_Color.jpg')
const Roughness = textureLoader.load('/PaintedBricks001_2K_Roughness.jpg')
const DispTexture = textureLoader.load('/Foam003_1K_Displacement.jpg')

export const hsmaterial = new MeshStandardMaterial({
    map: color,
    roughnessMap: Roughness,
    bumpMap: DispTexture
  })
