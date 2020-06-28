# git 分布式版本控制工具

## config
- local 本地仓库级别【优先级最高】
- global 全局级别【次之】
- system 系统级别【末位】

本地仓库的配置文件是仓库根目录下 `.git` 文件夹下的 `config`文件。可直接文本打开编辑也可通过命令编辑。
### 查看git全局配置信息&本地仓库信息

```
git config --[global | local | system] [--list | -l]
```

### 编辑git配置文件

```
git config --[global | local | system] -e
```

### 配置信息

```
git config --[global | local | system] user.name "xxx"
git config --[global | local | system] user.email "xxx@xxx.com"
```

### 添加配置信息(默认添加local)

```
git config --[global | local | system] --add section.key value
```

### 获取配置信息(默认获取local)

```
git config --[global | local | system] --get section.key
```

### 删除配置项

```
git config [--local|--global|--system] --unset section.key
```

## 配置公钥私钥

```
ssh-keygen -t rsa -C "xxx@xxx.com"
```
### 是否配置成功

```
ssh -T git@github.com
```

## 操作流程
重要概念：
- 工作区 git可以追踪到工作区修改的文件
- 暂存区 
- 仓库区