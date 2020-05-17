- Nginx
  - 静态资源location
  - 动态数据请求proxy
  - 负载均衡
- 了解cluster原理
- 掌握pm2部署nodejs服务

## 如何构建一个高可用的node环境
主要解决的问题：
- 故障恢复
- 多核利用（node单进程）
- 多进程共享端口

守护进程：起得比鸡早，睡得比狗晚。

`cluster` app启动多个进程，如果有一个进程出错，app能从故障中恢复出来。

`cluster` 端口不冲突，node判断如果是cluster的进程中，http的底层实现了共用一个端口

## pm2
- 内建负载均衡（使用node cluster集群模块、子进程，可参考朴灵的《深入浅出node.js》第九章）
- 线程维护，keep alive
- 0秒停机重载，维护升级的时候不需要停机
- 现在linux、macos、windows多平台支持
- 停止不稳定的进程（避免无限循环）
- 控制台检测
- 提供http api

pm2配置文件 process.yml


## nginx

一般 nginx 的主配置文件`nginx.conif`在根目录的`etc/nginx`下，配置网站一般在etc下建立一个`sites-enabled`的文件夹，一个网站建立一个配置文件

配置静态服务

      server
        listen 80;
        server_name xxx.xxx.com;
        location / {
          root /root/source/node-server/dist;
          index index.html index.htm;
        }
        # 配置后端服务
        location ~\.(gif|jpg|png)$ {
          root /root/source/node-server/server/static;
        }
        location /api {
          proxy_pass http://127.0.0.1:3000;
          proxy_redirect off;
          proxy_set_header Host             $host;
          proxy_set_header X-Real-IP        $remote_addr;
          proxy_set_header X-Forwarded-For  $proxy_add_x_forwarded_for;
        }
        

- nginx -t 检测配置是否正常
- service nginx restart 重启配置 nginx -s reload 

fiddler http调试抓包工具