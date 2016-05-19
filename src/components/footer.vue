<template>
	<div class="footer">
		<span>© 2016.5.18 made by Bless_L</span>
		<ul>
			<li><a href="https://github.com/Bless-L">Github</a></li>
			<li><a href="http://bless-l.github.io/">My Blog</a></li>
			<li><a href="http://weibo.com/u/1902368857?is_all=1">Weibo</a></li>
			<li><a href="https://www.zhihu.com/people/liang-wei-19-34">Zhihu</a></li>
		</ul>
	</div>
</template>

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
.footer{
	text-align: center;
	color: #999;
	padding: 6px 0;
	margin-top: 40px;
	border-top:1px dashed #ddd;
	ul{
		margin-left: 40px;
		display: inline-block;
		list-style-type: none;
		li{
			margin: 0 5px;
			display: inline-block;
			.blue-a
		}
	}
}
</style>