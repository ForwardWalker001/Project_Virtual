import {
  AxesHelper,
  GridHelper,
  // Object3D,
  PointLightHelper,
  SpotLightHelper
} from 'three'

import { pointLight, spotLight } from './Tlights'

export const helperList = []

const axesHelper = new AxesHelper(500)
axesHelper.raycast = () => {}

const gridHelper = new GridHelper(500, 20, 'rgb(200, 200, 200)', 'rgb(100, 100, 100)')
gridHelper.raycast = () => {}

const pointLightHelper = new PointLightHelper(pointLight, pointLight.distance, pointLight.color)
pointLightHelper.raycast = () => {}

const spotLightHelper = new SpotLightHelper(spotLight, spotLight.color)
spotLightHelper.raycast = () => {}

// helperList.push(axesHelper, spotLightHelper, gridHelper)
helperList.push(axesHelper, gridHelper)