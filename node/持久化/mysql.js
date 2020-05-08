(async () => {
    const mysql = require('mysql2/promise')
    const cfg = {
        host: 'localhost',
        user: 'root',
        password: 'abc123',
        database: 'node_test'
    }
    const connection = await mysql.createConnection(cfg)
    let ret = await connection.execute(`
        CREATE TABLE IF NOT EXISTS test(
            id INT NOT NULL AUTO_INCREMENT,
            name VARCHAR(50) NULL,
            PRIMARY KEY (id)
        )
    `)
    console.log('ret =', ret)
    // 插入数据
    // ret = await connection.execute(`
    //     INSERT INTO test(name) VALUE(?)
    // `, ['jerry'])
    // console.log('insert', ret)
    // 查询
    ret = await connection.execute(`
        SELECT * FROM test
    `)
    console.log('insert', ret)
})()