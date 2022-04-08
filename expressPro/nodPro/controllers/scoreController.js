var dbConfig = require('../util/dbconfig.js')
var changDate = require('../util/dateUtil.js')

// 根据条件筛选分数
const conditionScore = (req, res) => {
    var { currentPage, school, name, studentnumber } = req.query
    let pageSize = 10
    var indexPage = (currentPage - 1) * pageSize
    let sql1 = ''
    let sql2 = ''
    let sql3 = ''

    var sqlArr = []
    if (school) {
        sqlArr.push(school)
        sql1 = 'school=?'
        if (name || studentnumber) {
            sql1 = sql1 + ' and '
        }
    }
    if (name) {
        sqlArr.push(name)
        sql2 = 'name=?'
        if (studentnumber) {
            sql2 = sql2 + ' and '
        }
    }
    if (studentnumber) {
        sqlArr.push(studentnumber)
        sql3 = 'studentnumber=? '
    }
    let sql0 = ''
    if (sqlArr.length != 0) sql0 = 'where '
    var sql = `select * from userscore ` + sql0 + sql1 + sql2 + sql3 + ` order by cast(scoredate as datetime) desc ` + `limit ${indexPage},${pageSize}`
    // console.log(sql)

    // 筛选的总条数 total
    function numCondition(sqlNum, sqlArr) {
        let callBack = async (err, data) => {
            let total = await data[0]["count(*)"]
            console.log(total)
            var callBack1 = (err, data) => {
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
                            'total': total,
                            'length': data.length,
                            'data': data
                        })
                    }

                }
            }
            dbConfig.sqlConnect(sql, sqlArr, callBack1)
        }
        dbConfig.sqlConnect(sqlNum, sqlArr, callBack)
    }
    // var total = 10
    let sqlNum = `select count(*) from userscore ` + sql0 + sql1 + sql2 + sql3

    numCondition(sqlNum, sqlArr)


}

module.exports = {
    conditionScore,
}