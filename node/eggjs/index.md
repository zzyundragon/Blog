# Egg.js

创建项目：

- `npm i egg-init -g`
- `egg-init egg --type=simple`
- `cd egg-example`
- `npm i`

启动项目：

- `npm run dev`
- `open http://localhost:7001`


根据约定自动加载controller


controller  一般来做业务的维护
service 共用的业务逻辑 例如用户登录态是否过期 

egg约定路由的实现：

- 获取绝对路径
- 读取文件，去掉扩展名