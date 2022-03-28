var dbConfig = require('../util/dbconfig.js')

// 登录
const login = (req, res)=>{
    let {studentnumber, password} = req.body
    var sql = 'select * from usertable where studentnumber=? and password=? ';
    var sqlArr = [studentnumber, password]
    console.log(sqlArr)
    var callBack = (err, data)=>{
        if(err){
            console.log('连接出错了',err)
            res.send({
                'code':400,
                'msg': '登录失败'
            })
        }else{
            if(data.length == 0 ){
                res.send({
                    'code':400,
                    'msg': '学号或密码错误'
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
module.exports = {
    login
}