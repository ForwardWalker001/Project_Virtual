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

// 位置移动
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
// 更新转机速度
export const updateSpeed = (TE) =>{
  let num2 = 0,num1 = 0
  let temp
  let timer = setInterval(() => {
    temp = TE.speed * Math.cos(TE.angle - TE.angle60)
    num2 ++
    if (num2>=10) {
      num2 = 0
      if (temp.toFixed(4) * 200 == (TE.speedArr[TE.speedArr.length - 1])) num1++
      else {
        num1 = 0
      }
      if (num1 <= 5) {
        TE.speedArr.push(temp.toFixed(4) * 200)
        TE.transformArr.push(Math.abs(Math.cos(TE.angle - TE.angle60).toFixed(2)*100-30))
      }else{
        clearInterval(timer)
      }
      // if (TE.speedArr.length >= 30) {
      //   TE.speedArr.shift()
      //   TE.transformArr.shift()
      // }
    }
  }, 100);
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
// 修改成绩
export const putScore = (obj,Callback)=>{
  obj
  .get(`/changScore?user_id=${getStorage("userInfo").id}&score=${getStorage("score")}`)
  .then((res) => {
    let { code } = res.data;
    if (code == 200) {
      Callback()
    }
  })
}
// storage
export let setStorage = (key, value, expire) => {
  let obj = {
      data: value,
      time: Date.now(),
      // 输入天数，保存为秒数
      expire: expire * 60 * 60 * 24 * 1000
  }
  localStorage.setItem(key, JSON.stringify(obj))
}
export let getStorage = (key) => {
  let obj = localStorage.getItem(key)
  if(!obj)return false
  obj = JSON.parse(obj)
  if (Date.now() - obj.time > obj.expire) {
      localStorage.removeItem(key);
      return null;
  }
  return obj.data;
}