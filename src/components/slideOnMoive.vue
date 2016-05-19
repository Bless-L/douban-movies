<template>
	<div class="slide-container">
		<div class="s-nav">
			<div class="s-hot-on">
				<span>正在热映</span>
				<a href="#">全部正在热映»</a>
				<a href="#">即将上映»</a>
			</div>
			<div class="s-control">
				<span class="pre-slide" @click="preSlide"></span>
				<span class="next-slide" @click="nextSlide"></span>
			</div>
			<div class="s-tip">
				<span>{{currentIndex}}</span>
				/
				<span>{{maxIndex}}</span>
			</div>

		</div>
		<div class="s-main">
			<div class="s-container {{classSlide}}">
				<div class="s-sub-movie" v-for='item in movieArray'>
					<template v-if="item.duration" >
						<a class="s-post" href="#" @mouseover="showDetail(item)" @mouseout="hideDetail(item)">
							<img :src="item.picSrc" :alt="item.title"></a>
						<a class="s-href" href="#">{{item.subTitle ? item.subTitle : item.title}}</a>
						<p class="s-rate">
							<span class="rate-post {{item.rateStar}}"></span>
							<span class="{{item.rate ? 'rate' : '' }}">{{item.rate? item.rate : "暂无评分"}}</span>
						</p>
						<a href="#" class="s-seat">选座购票</a>
					</template>
					<template v-else >
						<div></div>
					</template>
				</div>
			</div>
		</div>
		<div class="s-hide">
			<div :class="['s-detail','l-' + $index%4,{'hide': item.hide}]"  v-for='item in movieArray'>
				<p class="title">
					{{item.title}}
					<span>{{item.release}}</span>
				</p>
				<p class="rate">
					<span class="rate-post {{item.rateStar}}"></span>
					<span class="{{item.rate ? 'rate' : '' }}">{{item.rate? item.rate : "暂无评分"}}</span>
					<span class="black">({{item.rater}}人评价)</span>
				</p>
				<p class="time">
					<span>{{item.duration}}</span>
					<span class="region">{{item.region}}</span>
				</p>
				<p class="name">
					<span>导演</span>
					<span>{{item.director}}</span>
				</p>
				<p class="name">
					<span>演员</span>
					<span>{{item.actors}}</span>
				</p>
			</div>
		</div>
</template>

<script>
module.exports = {

	data: function() {
		var index = 1, showNum = 4, allNum ,maxIndex, movieArray,

			//滑动页面对应的样式
			classSlideArray =  ['m-1','m-2','m-3','m-4','m-5','m-6','m-7'],

			//不同评分对应的样式
			rateStartArray = ['rate-10','rate-9','rate-8','rate-7','rate-6','rate-5','rate-4','rate-3','rate-2','rate-1','rate-0'];


			//处理评分数据及隐藏的详情页


		return {
			movieArray: movieArray,
			classSlideArray:classSlideArray,
			classSlide: 'm-1',
			currentIndex: index,
			maxIndex: maxIndex,
			showNum: showNum,
			allNum: allNum,
		}
	},

	ready: function() {
		//抓取豆瓣数据
		this.$http.get('/getHotMoive').then(
			function(response){
				if (response.status >= 200 && response.status <= 304) {

					var res = this.initMovieArray(response.data);

					this.$set('movieArray',res.movieArray);
					this.$set('maxIndex',res.maxIndex);
					this.$set('allNum',res.allNum);
				}
			},
			function(response){
				console.log('出现错误');
			});
		
	},
	methods: {

		//初始化抓取到的数据，并整理
		initMovieArray:function(data){
			var res = {},
				rateStartArray = ['rate-10','rate-9','rate-8','rate-7','rate-6','rate-5','rate-4','rate-3','rate-2','rate-1','rate-0'];

			for(var i = 0 ; i<data.length; i++){
				var star = Math.ceil(data[i].rate - 0.1);
				data[i].rateStar = rateStartArray[10-star];
				data[i].hide = true;
			}
			res.movieArray = data;
			res.allNum = data.length;
			res.maxIndex = Math.ceil( data.length/ 4);

			return res;
		},


		//滑动
		slideChange: function(idx) {
			this.classSlide = this.classSlideArray[idx - 1];
		},

		//下一页
		nextSlide: function() {
			if (this.currentIndex == this.maxIndex) {
				this.currentIndex = 1;
			} else this.currentIndex++;
			this.slideChange(this.currentIndex);
		},
		//上一页
		preSlide: function() {
			if (this.currentIndex == 1) {
				this.currentIndex = this.maxIndex;
			} else this.currentIndex--;
			this.slideChange(this.currentIndex);
		},
		//显示详情页
		showDetail: function(item) {
			item.hide = false;
		},
		//隐藏详情页
		hideDetail: function(item) {
			item.hide = true;
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
.slide-container{
	position: relative;
	.margin-1{margin-left: -590px;}
	.rate-post{
		display: inline-block;
		width: 55px;
		height: 11px;
		background-image: url('../image/ic_rating_s.png');
	}
	.rate{
		margin-left:2px;
		color: #e09015;
	}
	.s-nav{
		line-height: 30px;
		padding-bottom: 10px;
		border-bottom: 1px solid #e3ebec;
		margin-bottom: 15px;
		.s-hot-on{
			display: inline-block;
			span{font-size: 14px; margin-right: 10px;}
			a{margin: 0 5px}
			.blue-a
		}
		.s-tip{float: right; color: #666;}
		.s-control{
			margin:5px 5px 0 15px;
			float: right;
			span{
				cursor: pointer;
				margin: 0 1px;
				width: 18px;
				height: 18px;
				display: inline-block;
			}
			.pre-slide{background-image: url('../image/slide_swithc_2.png');}
			.next-slide{
				background-image: url('../image/slide_swithc_2.png');
				background-position: 100% 200%;
				}
		}
	}
	.s-main{
		.m-left(@num : 1){margin-left: (@num * -590px);}
		.m-1{.m-left(1)}.m-2{.m-left(2)}.m-3{.m-left(3)}.m-4{.m-left(4)}.m-5{.m-left(5)}.m-6{.m-left(6)}.m-7{.m-left(7)}
		width: 590px;
		text-align: center;
		overflow: hidden;
		.s-container{width: 4720px;	transition: margin-left 1s ease;}
		.s-sub-movie{
			vertical-align: text-top;
			margin: 0 10px 0 9.5px;
			display: inline-block;
			width: 128px;
			img{
				width: 128px;
				height: 180px;
			}
			.s-href{
				margin-top: 12px;
				display: inline-block;
				width: 120px;
				height: 16px;
				overflow: hidden;
				font-size: 14px;
				color: #000;
			}
			.s-rate{
				margin: 5px 0 8px 0;
			}
			.s-seat{
				display: inline-block;
				border-radius: 3px;
				width: 90px;
				line-height: 24px;
				background-color: #268dcd;
				color: #fff;
			}
		}
	}
	.s-hide{
		position: absolute;
		bottom:265px;
		.mleft(@left: 1;){left: (@left*147.5px)}
		.l-0{.mleft(1)}.l-1{.mleft(2)}.l-2{.mleft(3)}.l-3{.mleft(4)}
		.s-detail{
			position: absolute;
			text-align: left;
			width: 200px;
			padding: 20px;
			border:1px solid #ccc;
			background-color: #fff;
			.title{
				font-size: 16px;
				line-height: 24px;
				margin-bottom: 10px;
				span{
					font-size: 12px;
					color: #aaa;
				}
			}
			.black{
				margin-left: 3px;
				color:#000;
			}
			.time{margin: 12px 0;.region{margin-left: 10px;}}
			.name{line-height: 18px;span{margin-right: 5px;}}
		}
	}
}	
</style>