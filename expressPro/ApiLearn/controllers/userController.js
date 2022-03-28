function rand(min, max){
    return Math.floor(Math.random()*(max-min)) + min
}
var validatePhoneCode = []
let sendCodeP = (phone)=>{
    for(let item of validatePhoneCode){
        if(phone == item.phone)return true
    }
    return false
}

let findCodeAndPhone = (phone, code)=>{
    for(let item of validatePhoneCode){
        if(phone == item.phone && code == item.code){
            return 'login'
        }
    }
    return 'error'
}

const sendCode = (req, res)=>{
    let phone = req.query.phone
    console.log(phone)
    if(sendCodeP(phone)){
        res.send({
            'code': 400,
            'msg': '已经发送过验证码，稍后再试'
        })
    }else{
       let code = rand(1000,9999)
        validatePhoneCode.push({
            'phone': phone,
            'code': code
        })
        console.log(code)
        res.send({
            'code': 200
        }) 
    }
}

// 验证码登录
const codePhoneLogin = (req, res)=>{
    let {phone, code} = req.query
    if(sendCodeP(phone)){
        // console.log(phone,code, validatePhoneCode)
        let status = findCodeAndPhone(phone, code)
        if(status == 'login'){
            res.send({
                'code': 200
            })
        }else if(status == 'error'){
            res.send({
                'code': 200,
                'msg': '登录失败'
            })
        }
    }else{
        res.send({
            'code': 400,
            'msg': '未发送验证码'
        })
    }
}

module.exports = {
    sendCode,
    codePhoneLogin
}