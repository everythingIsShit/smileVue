## 1、安装node和mongoDB
node安装：http://www.runoob.com/nodejs/nodejs-install-setup.html
mongodb安装：https://www.cnblogs.com/GainLoss/p/6906937.html

## 2、启动mongoDB数据库
  启动可参考mongoDB安装中的启动介绍

## 3、启动后台服务
a、进入根目录中的serice目录下，运行npm install

b、运行npm run serve 启动node服务

c、依次进入localhost:3001/insertAllGoodsInfo、localhost:3001/insertAllCategory、localhost:3001/insertAllCategorySub、localhost:3001/getGoodsJson生成本地数据（其实就是往数据库中去插入一些mock数据）


## 4、启动前端工程

回到项目根目录运行 npm install，然后npm run dev,浏览器打开localhost:8080
