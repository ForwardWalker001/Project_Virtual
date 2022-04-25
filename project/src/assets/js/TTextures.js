import {  TextureLoader } from "three";

const textureLoader = new TextureLoader()

export const pictureTexture = textureLoader.load('/1.jpg')
pictureTexture.center.set(0.5,0.5)
pictureTexture.rotation = Math.PI/180 * 90

export const frameColorTexture = textureLoader.load('/GrassColor.jpg')
export const frameRoughnessTexture = textureLoader.load('/GrassRoughness.jpg')
export const frameDispTexture = textureLoader.load('/GrassDisplacement.jpg')