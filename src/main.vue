<template>
	<header>
		<header-nav></header-nav>
	</header>
	<div id="wrapper">
		<div class="clearfix">
			<div class="content">
				<slide-on-movie></slide-on-movie>
				<gaia-moives></gaia-moives>
				<hot-recommend></hot-recommend>
				<reviews></reviews>
			</div>
			<sidebar></sidebar>
		</div>
		<footer-nav></footer-nav>
	</div>
</template>

<script>
var slideOnMoive = require('./components/slideOnMoive.vue');
var header = require('./components/header.vue');
var sidebar = require('./components/sidebar.vue');
var gaiaMoives = require('./components/gaiaMoives.vue');
var hotRecommend = require('./components/hotRecommend.vue');
var reviews = require('./components/reviews.vue');
var footer = require('./components/footer.vue');


module.exports = {
	components:{
		'slide-on-movie' : slideOnMoive,
		'header-nav': header,
		'sidebar': sidebar,
		'gaia-moives': gaiaMoives,
		'hot-recommend': hotRecommend,
		'reviews': reviews,
		'footer-nav': footer,
	}
}
</script>

<style scope lang="less">
*{
	margin: 0;
	padding: 0
}
body{
	font-size: 12px;
	font-family: Helvetica, Arial, sans-serif;
}
a{
	text-decoration: none;
}
#wrapper{
	width:950px;
	margin:40px auto 0 auto;	
}
.clearfix{
	zoom: 1;
	&:after { content:"."; display:block; height:0; visibility:hidden; clear:both; }
}
.rate-start(@x: 1 , @y: 1){
	background-position: (100% * @x) (100% * @y);
}
.hide{display: none;}
.rate-10{.rate-start(1,11)}
.rate-9{.rate-start(1,10)}
.rate-8{.rate-start(1,9);}
.rate-7{.rate-start(1,8)}
.rate-6{.rate-start(1,7)}
.rate-5{.rate-start(1,6)}
.rate-4{.rate-start(1,5)}
.rate-3{.rate-start(1,4)}
.rate-2{.rate-start(1,3)}
.rate-1{.rate-start(1,2)}
.rate-0{.rate-start(1,1)}


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

.content{
	float: left;
	width: 590px;
	padding-right: 40px;
}
</style>