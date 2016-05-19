var express = require('express');
var port = process.env.PORT || 8888;
var app = express();
var request = require('superagent');

//引入爬虫豆瓣电影首页的模块
var crawler = require('./crawler/crawler');


app.set('views', './views');
app.set('view engine', 'jade');
app.use(express.static('build'));

app.listen(port);

console.log('你启动了豆瓣电影');


//载入视图
app.get('/', function(req, res) {
	res.render("index")
});


//获取热映电影数据
app.get('/getHotMoive', function(req, res) {
	res.send(crawler.getHotMoive());
});

//获取口碑榜数据
app.get('/getRepution', function(req, res) {
	res.send(crawler.getRepution());
});

//获取热门推荐数据
app.get('/getHotRecommend', function(req, res) {
	res.send(crawler.getHotRecommend());
});

//获取热门评论数据
app.get('/getReviews', function(req, res) {
	res.send(crawler.getReviews());
});


//获取页面中部的电影，电视剧数据

//原网页是通过AJax获取数据的，所以我直接爬接口来获得数据了
app.get('/search_subjects', function(req, res) {

	var date = {
		type: req.query.type || 'movie',
		tag : req.query.tag || "热门",
		sort: req.query.sort || 'recommend',
		page_limit: 20,
		page_start : req.query.page_start,
	},
	url =  "https://movie.douban.com/j/search_subjects";

	request.get(url)
		.query(date)
		.end(function(err, sres) {
			// 常规的错误处理
			if (err) {
				return next(err);
			}
			res.send(sres.text);
		});	
});