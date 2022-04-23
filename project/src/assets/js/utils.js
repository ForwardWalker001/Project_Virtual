// 深拷贝
export const deep = (obj) => {
  if (obj === null) return obj;
  if (obj.constructor != Object) return obj;
  let newObj = new obj.constructor();
  for (let key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      newObj.key = deep(obj.key);
    }
  }
  return newObj;
}

// 移动摄像头
export const setInterCamera = (x, y, z, obj) => {
  // obj.position.set(20, 50, -50)
  let timer = setInterval(() => {
    obj.position.x += obj.position.x < x ? 10 : 0
    obj.position.y += obj.position.y < y ? 5 : 0
    obj.position.z += obj.position.z > z ? -8 : 0
    if (obj.position.x >= x && obj.position.y >= y && obj.position.z <= z) {
      clearInterval(timer)
    }
  }, 60)
}

// 防抖
export const debounce = (fn, delay) => {
  let timer = null;
  return function () {
    if (timer) {
      clearTimeout(timer); // 如果计时器存在，清除计时器
    }
    timer = setTimeout(fn, delay); // 重新开始计时
  };
}