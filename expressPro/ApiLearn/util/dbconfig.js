const mysql = require('mysql')
module.exports = {
    // 数据库配置
    config: {
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: '1732589810',
        database: 'apilearn'
    },

    // 连接池对象
    sqlConnect: function(sql, sqlArr, callBack){
        var pool = mysql.createPool(this.config)
        pool.getConnection((err, conn) =>{
            console.log('pool')
            if(err){
                console.log('连接失败')
                return
            }
            conn.query(sql, sqlArr, callBack);
            conn.release()
        })
    }
}