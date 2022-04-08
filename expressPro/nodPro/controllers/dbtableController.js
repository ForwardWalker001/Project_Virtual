var dbConfig = require('../util/dbconfig.js')
var changDate = require('../util/dateUtil.js')
// 登录
const login = (req, res) => {
    let { school, studentnumber, password } = req.body
    var sql = 'select * from usertable where school=? and studentnumber=? and password=? ';
    var sqlArr = [school, studentnumber, password]
    console.log(sqlArr)
    var callBack = (err, data) => {
        if (err) {
            console.log('连接出错了', err)
            res.send({
                'code': 400,
                'msg': '登录出错了'
            })
        } else {
            if (data.length == 0) {
                res.send({
                    'code': 400,
                    'msg': '输入信息错误'
                })
            } else {
                res.send({
                    'code': 200,
                    'msg': '登录成功',
                    'id': data[0].id,
                    'power': data[0].power
                })
            }

        }
    }
    dbConfig.sqlConnect(sql, sqlArr, callBack)
}

// 注册
const register = (req, res) => {
    let { school, studentnumber, name, password, power } = req.body

    // 判断用户是否是第一次登录
    var sql1 = 'select * from usertable where school=? and studentnumber=? ';
    var sqlArr1 = [school, studentnumber]
    var callBack1 = (err, data) => {
        if (err) {
            res.send({
                'code': 400,
                'msg': '注册出错了'
            })
        } else {
            if (data.length == 1) {
                res.send({
                    'code': 400,
                    'msg': '用户信息已经在存在，请返回登录'
                })
            } else if (data.length == 0) {
                if (power == '学生') power = 2
                else if (power == '教师') power = 1
                var sql = 'insert into usertable ( school, studentnumber,name,password,power ) value ( ?,?,?,?,?);';
                var sqlArr = [school, studentnumber, name, password, power]
                var callBack = (err, data) => {
                    if (err) {
                        console.log('连接出错了', err)
                        res.send({
                            'code': 400,
                            'msg': '注册出错了'
                        })
                    } else {
                        if (data.affectedRows == 1) {
                            // 注册时新增分数用户信息
                            addScore(data.insertId, school, studentnumber, name, power)

                            res.send({
                                'code': 200,
                                'msg': '注册成功',
                                'id': data.insertId,
                                'power': power
                            })
                        } else {
                            res.send({
                                'code': 400,
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
// 新增分数用户
const addScore = (user_id, school, studentnumber, name, power ) => {
    var sql = 'insert into userscore ( user_id, school, studentnumber, name, power,score, scoredate ) value ( ?,?,?,?,?,?,?)';
    var sqlArr = [user_id, school, studentnumber, name, power,0 , changDate.changDate()]
    var callBack = (err, data) => {
        if (err) {
            console.log('注册时新增分数用户出错了', err)
        }else{
            console.log('注册时新增分数用户成功')
        }
        
    }
    dbConfig.sqlConnect(sql, sqlArr, callBack)
}

// 根据用户id 分数查询
const scoreSearch = (req, res) => {
    let { id } = req.query
    id = parseInt(id)
    var sql = 'select * from userscore where user_id=? ';
    var sqlArr = [id]
    console.log(sqlArr)
    var callBack = (err, data) => {
        if (err) {
            console.log('连接出错了', err)
            res.send({
                'code': 400,
                'msg': '查询出错了'
            })
        } else {
            if (data.length == 0) {
                res.send({
                    'code': 400,
                    'msg': '没有数据'
                })
            } else {
                res.send({
                    'code': 200,
                    'msg': '查询成功',
                    'data': data
                })
            }

        }
    }
    dbConfig.sqlConnect(sql, sqlArr, callBack)
}

// 修改分数
const changScore = (req, res) => {
    let { user_id, score } = req.query
    var sql = "UPDATE userscore SET score = ?, scoredate=? WHERE user_id = ? and score<?";
    var sqlArr = [score, changDate.changDate(), user_id,score ]
    console.log(sqlArr)
    var callBack = (err, data) => {
        if (err) {
            console.log('连接出错了', err)
            res.send({
                'code': 400,
                'msg': '修改失败了'
            })
        } else {
            res.send({
                'code': 200,
                'msg': '修改成功',
                // 'data': data
            })

        }
    }
    dbConfig.sqlConnect(sql, sqlArr, callBack)
}
module.exports = {
    login,
    register,
    scoreSearch,
    changScore,
}