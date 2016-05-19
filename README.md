# douban-movies

一个模仿豆瓣电影的小项目，是通过后台爬虫抓取数据，前端实时渲染的。
所以运行后看到的页面 和 打开豆瓣电影页面看到的没什么区别哦！


效果图1
![效果图](http://img2.ph.126.net/OWrFgzlApRgH15zqPVKsCA==/6598234149532355762.jpg)

效果图2
![效果图](http://img0.ph.126.net/KG6kVtRN16d91aHoY3VDKw==/6598208860764912195.jpg)

#说明
后台用的是nodejs+[express](http://www.expressjs.com.cn/)框架+[superagent](http://visionmedia.github.io/superagent/)抓取数据+[cheerio](https://www.npmjs.com/package/cheerio)分析数据。（cheerio用起来跟jquery没什么区别的，api都一样）。

前端是用vue+webpack+[vue-resource](https://github.com/vuejs/vue-resource)
（在这里不得不安利下vue大法，vue真是好用啊，api清析，文档友好，配合webpack+vue-loader，一个组件一个.vue文件，叫人怎么不喜欢）

#用法
先装好依赖模块(推荐用[cnpm](https://npm.taobao.org/)，快得一比)
```
npm install
```
然后运行webpack
```
webpack
```
最后再运行
```
node douban.js 
//或者
node run douban
```
在浏览里打开http://localhost:8888就看得到了

 
PS:滑动的动画我是用CSS3实现的，也没有加自动定时滑动，头尾相接那里跟原版不同
还有一些小地方没有完全实现
