// 转换时间为 "2022-03-30 14:16" 格式
const changDate = ()=> {
    let date = new Date()
    var year = date.getFullYear(); 
    var month =func1((date.getMonth() + 1).toString())
    var day = func1((date.getDate()).toString())  
    var hours = func1((date.getHours()).toString())
    var minutes = func1((date.getMinutes()).toString())
    // if (month.length == 1) { 
    //     month = "0" + month; 
    // } 
    // if (day.length == 1) { 
    //     day = "0" + day; 
    // }
    var dateTime = year + "-" + month + "-" + day + ' ' + hours + ':' + minutes
    return dateTime; 
}
const func1 = (str) => {
    if (str.length == 1) { 
        str = "0" + str; 
    }
    return str 
}

module.exports = {
    changDate
}