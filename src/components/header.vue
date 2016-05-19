<template>
	<div class="global-nav">
		<div>
			<ul class="left-nav">
				<li v-for="sub in leftTitles">
					<a href="#">{{sub}}</a>
				</li>
			</ul>
		</div>
		<div>
			<ul class="right-nav">
				<li v-for="sub in rightTitles">
					<a href="#">{{sub}}</a>
				</li>
			</ul>
		</div>
	</div>
	<div class="nav-wrap">
		<div class="nav-top">
			<div>
				<span>豆瓣电影</span>
				<div class="search">
					<input type="text" placeholder="电影、影人、影院、电视剧">
					<div class="submit"></div>
				</div>
			</div>
		</div>
		<div class="nav-bottom">
			<ul>
				<li v-for="item in items">
					<a href="#">{{item}}</a>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
module.exports = {
	ready: function() {
		// GET request
		
	},
	data: function() {
		return {
			leftTitles: ['豆瓣', '读书', '电影', ' 音乐', '同城', '小组', '阅读', 'FM', '东西', '市集', '更多'],
			rightTitles: ['下载豆瓣客户端', '登录', '注册'],
			items: ['影讯&购票', '选电影', '电视剧', '排行榜', '分类', '影评', '2015年度榜单', '豆瓣观影报告'],
		}
	}
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
.global-nav{
	height: 28px;
	background-color: #545652;
	.left-nav{
		float: left;
	}
	.right-nav{
		float: right;
	}
	li{
		display: inline-block;
		line-height: 28px;
		padding: 0 12px;
		a{
			color: #ccc;
			text-decoration: none;
			&:hover{
				color: #fff;
			}
		}
	}
}

.nav-wrap{
	background-color: #f0f3f5;
	height: 115px;
	.nav-top{
		line-height: 70px;
		border-bottom: 1px #e3ebec solid;
		padding-left: 200px;
		.search{
			margin-left: 40px;
			line-height: 76px;
			display: inline-block;
			input{
				border-radius: 3px;
				width: 450px;
				height: 32px;
				border: 0;
				border-bottom: 1px #ccc solid;
				outline: none;
				padding: 0 10px;
				margin-bottom: -5px;
				vertical-align: text-bottom;
			}
			.submit{
				display: inline-block;
				width: 40px;
				height: 40px;
				background-image: url('../image/nav_mv_bg.png');
				background-position: 0% 100%;
				margin-left: -7px;
				margin-bottom: -10px;
			}
		}
		span{
			font-family: "Microsoft Yahei";
			font-weight: bold;
			font-size: 30px;
			color: #258dcd;
		}
	}
	.nav-bottom{
		padding-left: 200px;
		line-height: 38px;
		li{
			display: inline-block;
			margin-right: 35px;
			.blue-a
		}
	}
}
	
</style>