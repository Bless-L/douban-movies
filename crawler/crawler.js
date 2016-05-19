var cheerio = require('cheerio');
var request = require('superagent');


function Crawler() {
	//先用superagent抓取到页面信息，然后保存到this.$中
	request.get('https://movie.douban.com/')
		.end(function(err, sres) {
			// 常规的错误处理
			if (err) {
				return next(err);
			}
			var $ = cheerio.load(sres.text);
			//保存
			this.$ = $;
		}.bind(this));
}

Crawler.prototype.getHotMoive = function() {
	var res = [];
	//数据抓取逻辑处理
	this.$('#screening').find('.ui-slide-item').each(function(idx, element) {

		var el = this.$(element);
		res.push({
			title: el.attr('data-title'),
			release: el.attr('data-release'),
			rate: el.attr('data-rate'),
			star: el.attr('data-star'),
			trailer: el.attr('data-trailer'),
			ticker: el.attr('data-ticker'),
			duration: el.attr('data-duration'),
			region: el.attr('data-region'),
			director: el.attr('data-director'),
			actors: el.attr('data-actors'),
			rater: el.attr('data-rater'),
			picSrc: el.find('img').attr('src'),
			subTitle: el.find('.title').find('a').text(),
		});
	}.bind(this));
	return res;
}

Crawler.prototype.getRepution = function() {
	var res = [];
	//数据抓取逻辑处理
	this.$('.billboard-bd').find('.title').each(function(idx, el) {
		var el = this.$(el).find('a');
		res.push({
			'name': el.text(),
		})
	}.bind(this))
	return res;
}

Crawler.prototype.getHotRecommend = function(){
	var res = [];
	//数据抓取逻辑处理
	this.$('#hot-gallery').find('.gallery-frame').each(function(idx, el){
		var el = this.$(el);
		res.push({
			'src' : el.find('img').attr('src'),
			'title': el.find('img').attr('alt'),
			'info': el.find('.gallery-bd').find('p').text().replace(/(^\s*)|(\s*$)/g,""),
		})
	}.bind(this))

	return res;
}

Crawler.prototype.getReviews = function(){

	var res = [];
	//数据抓取逻辑处理
	this.$('.reviews-bd').find('.review').each(function(idx, el){
		var el = this.$(el);
		res.push({
			'src' : el.find('.review-hd').find('img').attr('data-original'),
			'title': el.find('.review-bd').find('h3').text(),
			'author': el.find('.review-meta').find('a').eq(0).text(),
			'name': el.find('.review-meta').find('a').eq(1).text(),
			'content': el.find('.review-content').text().replace('(全文)','').replace(/(^\s*)|(\s*$)/g,""),
		})
	}.bind(this))

	return res;	
}

module.exports = new Crawler();