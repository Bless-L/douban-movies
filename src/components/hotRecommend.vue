<template>
	<div class="recommend-wp">
		<div class="r-nav">
			<div class="r-hot-on">
				<span>热门推荐</span>
			</div>
			<div class="r-control">
				<span class="pre-slide" @click="preSlide"></span>
				<span class="next-slide" @click="nextSlide"></span>
			</div>
			<div class="r-tip">
				<span>{{currentIndex}}</span>
				/
				<span>{{maxIndex}}</span>
			</div>
		</div>
		<div class="r-content">
			<div class="subjects-wp {{classSlide}}">
				<div class="subject" v-for="item in subjects">
					<a href="#"><img :src="item.src" :alt="item.title"></a>
					<div class="info">
						<a href="#"><h2>{{item.title}}</h2></a>
						<p>{{item.info}}</p>
					</div>
				</div>
			</div>
		</div>
	</div>	
</template>

<script>
module.exports = {
	data:function(){
		var index = 1, maxIndex,

			//滑动页面对应的样式
			classSlideArray =  ['m-1','m-2','m-3','m-4','m-5','m-6','m-7'],

			subjects = [];

		return {
			classSlideArray:classSlideArray,
			classSlide: 'm-1',
			currentIndex: index,
			maxIndex: maxIndex,
			subjects:subjects,
		}
	},

	ready: function() {
		//抓取豆瓣数据
		this.$http.get('/getHotRecommend').then(
			function(response){
				if (response.status >= 200 && response.status <= 304) {
					this.$set('subjects',response.data);
					this.$set('maxIndex',response.data.length);

				}
			},
			function(response){
				console.log('出现错误');
			});
		
	},
	
	methods:{
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
.recommend-wp{
	width: 590px;
	.r-nav{
		border-bottom: 1px solid #e3ebec;
		line-height: 40px;
		margin-bottom: 20px;
		.r-hot-on{
			display: inline-block;
			font-size: 14px;
		}
		.r-control{
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
		.r-tip{
			float: right;
			color: #666;
		}
	}
	.r-content{
		.m-left(@num : 1){margin-left: ( (@num - 1) * -590px);}
		.m-1{.m-left(1)}.m-2{.m-left(2)}.m-3{.m-left(3)}.m-4{.m-left(4)}.m-5{.m-left(5)}.m-6{.m-left(6)}.m-7{.m-left(7)}
		width: 590px;
		overflow: hidden;
		.subjects-wp{
			width: 4720px;
			transition: margin-left 1s ease;
			.subject{
				font-size: 0;
				display: inline-block;
				vertical-align: top;
				img{width: 350px;}
				.info{
					width: 192px;
					height: 168px;
					background-color: #f9f9f9;
					vertical-align: top;
					padding: 48px 24px 24px 24px;
					display: inline-block;
					h2{
						font-size: 18px;
						font-weight: normal;
						color: #111;
						line-height: 28px;
					}
					p{
						margin-top: 18px;
						font-size: 13px;
						color: #999;
						line-height: 20px;
					}
				}
			}
		}
	}
}
</style>