<template>
	<div class="reviews-wp">
		<div class="nav">
			<span>最受欢迎的影评</span>
			<a href="#">更多热门影评»</a>
			<a href="#">新片影评»</a>
		</div>
		<div class="review" v-for="review in reviews">
			<a href="#"><img :src="review.src" :alt="review.name"></a>
			<div class="review-content">
				<p class="r-title"><a href="#">{{review.title}}</a></p>
				<p class="r-more">
					<a href="#">{{review.author}}</a>
					评论
					<a href="#">{{review.name}}</a>
				</p>
				<p class="r-content">
					{{review.content}}
					<a href="#">(全文)</a>
				</p>
			</div>
		</div>
	</div>
</template>

<script>
module.exports = {
	data:function(){
		return {
			reviews:[],
		}
	},
	ready: function() {
		//抓取豆瓣数据
		this.$http.get('/getReviews').then(
			function(response){
				if (response.status >= 200 && response.status <= 304) {

					this.$set('reviews',response.data);
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
.reviews-wp{
	margin-top: 40px;
	.nav{
		line-height: 40px;
		border-bottom: 1px solid #e3ebec;
		margin-bottom: 15px;
		span{font-size: 14px; margin-right: 5px;}
		a{margin: 0 5px;}
		.blue-a		
	}
	.review{
		padding-bottom: 24px;
		border-bottom: 1px solid #e3ebec;
		margin-bottom: 24px;
		img{width: 68px;margin-right: 12px;}
		.review-content{
			display: inline-block;
			width: 507px;
			vertical-align: top;
			.r-title{
				line-height: 1.8;
				a{
					color: #37a;
					font-size: 14px;
					text-decoration: none;
					&:hover{
						color: #fff;
						background-color: #37a;
					}
				}
			}
			.r-more{
				padding: 8px 0;
				color: #666;
				a{
					color: #666;
					text-decoration: none;
					&:hover{
						color: #fff;
						background-color: #27a;
					}
				}				
			}
			.r-content{
				line-height: 18px;
				a{
					color: #37a;
					font-size: 12px;
					text-decoration: none;
					&:hover{
						color: #fff;
						background-color: #37a;
					}
				}
			}
		}
	}
}
</style>