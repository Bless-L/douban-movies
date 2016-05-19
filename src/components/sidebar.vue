<template>
	<div class="sidebar">
		<div class="answer-rate">
			<ul>
				<li>
					<a href="#">豆瓣电影评分八问</a>
				</li>
			</ul>
		</div>
		<div class="search">
			<select name="city" id="city">
				<option value="guangzhou">广州</option>
			</select>
			<input type="text" placeholder="搜索本地影院"></div>
		<div class="antivities-now">
			<p>电影活动····</p>
			<ul>
				<li>
					<a href="#">#我话中医药#</a>
				</li>
				<li>
					<a href="#">有奖活动丨每个人心中都有一个分歧者</a>
				</li>
				<li>
					<a href="#">资讯 |《分歧者:忠诚世界》5.20登陆</a>
				</li>
			</ul>
		</div>
		<div class="reputation">
			<p>
				本周口碑榜
				<a href="#">更多榜单»</a>
			</p>
			<ul>
				<li v-for="movie in reputionMoives">
					<a href="#">{{movie.name}}</a>
				</li>
			</ul>
		</div>
		<div class="change-ticket">
			<a href="#">>通兑券换票</a>
		</div>
		<div class="hot-doulie">
			<p>热门豆列</p>
			<p>
				<a href="#">2010豆瓣评选·100部绝佳恐怖电影</a>
				<span>2420推荐</span>
			</p>
			<p>
				<a href="#">历届日剧学院赏（1~50回）</a>
				<span>2253推荐</span>
			</p>
		</div>
		<div class="cooperate">
			<p>合作联系</p>
			<div>
				<p>
					<a href="#">申请开通影片小站</a>
				</p>
				<p>
					<a href="#">申请开通电影院小站</a>
				</p>
				<p>咨询通兑券合作及购买</p>
				<p>邮箱：Bless_L@126.com</p>
			</div>
		</div>
		<div class="contact">
			<p>关注我们</p>
			<img src="https://movie.douban.com/pics/qrcode_app.png" alt="豆瓣APP下载"></div>
	</div>
</template>

<script>
module.exports = {

	data:function(){
		return {
			reputionMoives: [],
		}
	},
	ready: function() {
		//抓取豆瓣数据
		this.$http.get('/getRepution').then(
			function(response){
				if (response.status >= 200 && response.status <= 304) {

					this.$set('reputionMoives',response.data);
				}
			},
			function(response){
				console.log('出现错误');
			});
		
	},
}
</script>

<style scope lang="less">
.blue-a{
	a{
		color: #27a;
		font-size: 12px;
		text-decoration: none;
		&:hover{
			color: #fff;
			background-color: #27a;
		}
	}
}
.sidebar{
	.blue-a;
	ul{
		list-style-type: none;
	}
	float: right;
	width: 320px;
	.answer-rate{
		border-radius: 4px;
		background-color: #f2f7f6;
		line-height: 1.5;
		padding:12px 0 12px 18px;
		margin-bottom: 20px;
		ul{
			list-style: disc inside;
			color: #cedcd9;
			a{font-size: 14px;}
		}
	}
	.search{
		border-radius: 3px;
		background-color: #f6f3d3;
		padding: 12px;
		margin-bottom: 20px;
		input{
			margin-left: 20px;
		}
	}
	.antivities-now{
		border-radius: 4px;
		background-color: #f2f7f6;
		padding:12px 0 12px 18px;	
		font-size: 14px;
		line-height: 2;
		color: #072;
		margin-bottom: 15px;
		ul{
			list-style: disc inside;
			color: #cedcd9;
			a{font-size: 14px;}
		}
	}
	.reputation{
		line-height: 45px;
		p{font-size: 14px; border-bottom: 1px solid #e3ebec;a{margin-left: 10px;}}
		ul{
			list-style: decimal inside;
			li{
				line-height: 35px;
				padding-left: 5px;
				border-bottom: 1px solid #e3ebec;
			}
		}
	}
	.change-ticket{
		margin-top: 60px;
		background-color: #e3ebec;
		line-height: 40px;
		padding-left: 20px;
		margin-bottom: 15px;
	}
	.hot-doulie{
		margin-bottom: 30px;
		p{
			font-size: 14px;
			border-bottom: 1px solid #e3ebec;
			line-height: 40px;
			span{
				float: right;
				font-size: 13px;
				color: #999;
			}
		}
	}
	.cooperate{
		p{
			font-size: 14px;
			border-bottom: 1px solid #e3ebec;
			line-height: 40px;
		}
		div{
			margin: 20px 0;
			p{
			border: 0;
			line-height: 24px;
			font-size: 12px;
			}
		}
	}
	.contact{
		p{	
			font-size: 14px;
			border-bottom: 1px solid #e3ebec;
			line-height: 40px;
			margin-bottom: 40px;
		}
	}
}
</style>