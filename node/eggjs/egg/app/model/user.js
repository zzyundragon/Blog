module.exports = app => {
    const { STRING, INTEGER, DATE } = app.Sequelize
    const User = app.model.define('user',
        {
            id: { type: INTEGER, primaryKey: true, autoIncrement: true },
            name: STRING(30),
            age: INTEGER,
            created_at: DATE,
            updated_at: DATE
        }
    )
    // 数据库同步
    User.sync({ force: true })
    return User
}