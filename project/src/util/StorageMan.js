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