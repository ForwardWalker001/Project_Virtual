import {  TextureLoader } from "three";

const textureLoader = new TextureLoader()

export const pictureTexture = textureLoader.load('/1.jpg')

export const frameColorTexture = textureLoader.load('/WoodFloor024_1K_Color.jpg')
export const frameRoughnessTexture = textureLoader.load('/WoodFloor024_1K_Roughness.jpg')
export const frameDispTexture = textureLoader.load('/WoodFloor024_1K_Displacement.jpg')