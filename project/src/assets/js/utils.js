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

export const setInterCamera = (x , y, z, obj) => {
  // obj.position.set(20, 50, -50)
  let timer = setInterval(()=>{
    obj.position.x += obj.position.x<x? 20: 0
    obj.position.y += obj.position.y<y? 10: 0
    obj.position.z += obj.position.z>z? -15: 0
    if(obj.position.x>=x && obj.position.y>=y && obj.position.z<=z){
      // console.log(1231231)
      clearInterval(timer)
    }
  }, 100)
}