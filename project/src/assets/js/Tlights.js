import {
  AmbientLight,
  PointLight,
  SpotLight
} from 'three'
import { stage } from './TBasicObject'

export const LightsList = []

const ambientLight = new AmbientLight('rgb(255, 255, 255)',0.4)

export const pointLight = new PointLight(
  'rgb(255, 0, 0)',
  0.7,
  50,
  0.1
)

pointLight.position.set(20, 20, -20)

export const spotLight = new SpotLight(
  'rgb(255, 255, 255)',
  1,
  200,
  Math.PI / 180 * 30,
  0,
  0
)

spotLight.castShadow = true

spotLight.position.set(0, 100, -400)

spotLight.target = stage

LightsList.push(ambientLight, spotLight)