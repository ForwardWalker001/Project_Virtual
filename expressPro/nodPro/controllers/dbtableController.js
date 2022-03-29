var dbConfig = require('../util/dbconfig.js')

// 登录
const login = (req, res)=>{
    let {school, studentnumber, password} = req.body
    var sql = 'select * from usertable where school=? and studentnumber=? and password=? ';
    var sqlArr = [school, studentnumber, password]
    console.log(sqlArr)
    var callBack = (err, data)=>{
        if(err){
            console.log('连接出错了',err)
            res.send({
                'code':400,
                'msg': '登录出错了'
            })
        }else{
            if(data.length == 0 ){
                res.send({
                    'code':400,
                    'msg': '输入信息错误'
                })
            }else{
               res.send({
                    'code': 200,
                    'msg': '登录成功',
                    'power': data[0].power
                }) 
            }
            
        }
    }
    dbConfig.sqlConnect(sql, sqlArr, callBack)
}

const register = (req, res)=>{
    let {school, studentnumber,name,password,power} = req.body

    // 判断用户是否是第一次登录
    var sql1 = 'select * from usertable where school=? and studentnumber=? ';
    var sqlArr1 = [school, studentnumber]
    var callBack1 = (err, data) => {
        if(err){
            res.send({
                'code':400,
                'msg': '注册出错了'
            })
        }else{
            if(data.length==1){
                res.send({
                    'code':400,
                    'msg': '用户信息已经在存在，请返回登录'
                })
            }else if(data.length == 0){
                if(power == '学生')power = 2
                else if(power == '教师')power = 1
                var sql = 'insert into usertable ( school, studentnumber,name,password,power ) value ( ?,?,?,?,? );';
                var sqlArr = [school, studentnumber,name,password,power]
                var callBack = (err, data)=>{
                    if(err){
                        console.log('连接出错了',err)
                        res.send({
                            'code':400,
                            'msg': '注册出错了'
                        })
                    }else{
                        if(data.affectedRows == 1 ){
                            res.send({
                                'code': 200,
                                'msg': '注册成功',
                                'power': power
                            }) 
                        }else{
                            res.send({
                                'code':400,
                                'msg': '注册出错'
                            })
                        }
                    }
                }
                dbConfig.sqlConnect(sql, sqlArr, callBack)
            }
        }
    }
    dbConfig.sqlConnect(sql1, sqlArr1, callBack1)
    
}

module.exports = {
    login,
    register
}