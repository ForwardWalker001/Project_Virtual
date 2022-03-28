var dbConfig = require('../util/dbconfig.js')


const getCate = (req, res)=>{
    var sql = 'select id,category from tabletest'
    var sqlArr = []
    var callBack = (err, data)=>{
        if(err){
        console.log('连接出错了')
        }else{
        res.send({
            'list': data
        })
        }

    }
    dbConfig.sqlConnect(sql, sqlArr, callBack)
}

const getPostCate = (req, res)=>{
    let {id} = req.query
    var sql = 'select * from post where cate_id=?';
    var sqlArr = [id]
    var callBack = (err, data)=>{
        if(err){
        console.log('连接出错了')
        }else{
        res.send({
            'list': data
        })
        }

    }
    dbConfig.sqlConnect(sql, sqlArr, callBack)
}
module.exports = {
    getCate,
    getPostCate
}