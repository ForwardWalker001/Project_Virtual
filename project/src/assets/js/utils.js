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