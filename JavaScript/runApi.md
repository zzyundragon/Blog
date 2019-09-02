RunApi 让接口测试更简单高效，让接口的设计与管理更具可读性、可维护性，让团队协作更合理。
## 节点管理
一个节点即为一个接口。

添加测试接口的地址，描述，请求方法以及出入参数说明等信息。可用于场景测试中单个执行也可集合依赖测试。
### 节点列表
进入项目后本地 localStorage 存有项目当前版本号 `currentVersion` 及项目Id `projectId` ，入参 `/rapi/tag/getLists` 接口获取列表信息。
### 节点编辑
编辑 `button` 进入后带入当前列表项信息
- 节点类别

    `sort` 值为dubbo时，节点方法由http接口下拉选择的post/get转变为可多次输入添加，存储数组。
- 节点mock

    `nodeMockData` 长度为0，默认switch关闭；长度不为0，switch开启，数据格式同场景编辑处的入参格式一致。

    节点mock数据类型 `paramsType` 支持string、number、object、array和regexp。第二列信息填写入参名称 `paramsName` ，第三列填写默认值 `initial` ，第四列填写数据生成规则 `dataRule` 。后面查询引用入参值时，如若 `dataRule` 判断为空字符串，则使用其默认值 `initial` 。

    节点信息以及场景编辑处的入参使用同一组件 `NodeMock` 展示

- 节点入参预览

    获取localStorage存储的 `treeData` 当前节点信息，调用 common 方法 `previewDataFunc` 本地预览刷新。

    `previewDataFunc` 引用mockjs，遍历数据格式，调用 `Mock.mock` 将对应的入参规则按照生成公式生成返回值，其中regexp类型使用 `safeEval` 执行正则语句。

    [点击查看mock语法规范](https://github.com/nuysoft/Mock/wiki/Syntax-Specification)

- 可引用数据地址

    `NodeMock` 组件内数据地址点击事件，路由拼接当前节点Id跳转 `/rapi/mock/data/` ，get请求数据。数据生成规则同节点入参预览逻辑，每次刷新更新数据。

## 场景管理
场景是一个业务需求的测试集合，由单个独立或着多个具有依赖关系的节点组成。
## 监控任务
为一些需要定时监控的场景任务定制，选择服务器，配置运行的时间，以及邮件通知类型，通知对象。
## 测试报告
测试报告收纳了监控任务和jenkens调用任务的结果报告。可查看任务内每个测试节点的情况，右上角筛选可帮助你在大量的报告数据中筛选到你想要的数据。
## 项目配置

- header配置：可自定义请求头信息，例如设置Content-type头。

![](https://note.youdao.com/yws/api/personal/file/WEB0c25916d77fe9fd6ea75dc9cace3339b?method=download&shareKey=3202404fc5e0e64d8c076b2380d978a0)

- 标签配置：为测试场景的设置添加标签类。
- 服务器设置：设置相应的请求服务器地址，请求链接的前缀，请求协议，以及默认入参设置。例如灰度环境下，请求前端mserver接口对应设置为：

![服务器配置](https://note.youdao.com/yws/api/personal/file/WEB4cd6f0f47d82c5ea1a7ef91cb39afd7d?method=download&shareKey=f7bfbc916592049cf1813c31fb1bae34)
- 参数预处理：主要针对请求接口的出入参数做处理。
- jekins配置：提供了命令行调用场景任务的方式。配置服务器与测试场景，以及通知方式，便可生成命令行可调用的命令。

![](https://note.youdao.com/yws/api/personal/file/WEB602d2516f16dbe5d9e48da28a502911a?method=download&shareKey=36e09dfd11256a4444c3c1640bfaf933)
## 项目版本
