<template>
	<div class="fliter-wp">

		<div class="fliter-type">
			<span :class="[ isMovie ? '' : 'type-active']" @click="changeType('movie')">选电影</span>
			/
			<span :class="[ isMovie ? 'type-active' : '']" @click="changeType('tv')">选电视剧</span>
		</div>
		<div class="fliter-tag">
			<template v-if='isMovie'>
				<span v-for="ctag in moviesTags" :class="[tag == ctag ? 'tag-active' : 'tag']" @click="changeTag(ctag)">{{ctag}}</span>
			</template>
			<template v-else>
				<span v-for="ctag in tvTags" :class="[tag == ctag ? 'tag-active' : 'tag']" @click="changeTag(ctag)">{{ctag}}</span>
			</template>
		</div>
		<div class="fliter-sort">
			<label for="sort">
				<input type="radio" name="sort" value="recommend" checked="checked" v-model="sort" @click="changeSort('recommend')">按热度排序</label>
			<label for="sort">
				<input type="radio" name="sort" value="time" v-model="sort" @click="changeSort('time')">按时间排序</label>
			<label for="sort">
				<input type="radio" name="sort" value="rank" v-model="sort" @click="changeSort('rank')">按评价排序</label>
			<label for="watched" class="watched">
				<input type="checkbox" name="watched" value="online">可在线播放的</label>
			<label for="watched" class="watched">
				<input type="checkbox" name="watched" value="nosee">我没看过的</label>
		</div>
		<template v-if='loading'>
			<a href="#" class="more">载入中...</a>
		</template>
		<template v-else>
			<div class="subjects-wp">
				<a href="#" class="item" v-for="item in subjects">
					<img :src="item.cover" :alt="item.title">
					<span v-if="item.is_new">
						<img src="https://img3.doubanio.com/f/movie/caa8f80abecee1fc6f9d31924cef8dd9a24c7227/pics/movie/ic_new.png" alt="#" class="new"></span>
					{{item.title}}
					<span>{{item.rate}}</span>
				</a>
			</div>
			<a href="javascript:;" class="more" @click="getMore()">{{gettingMore ? '载入中...' : '加载更多' }}</a>
		</template>
	</div>
</template>

<script>
module.exports = {

	data: function() {
		var type = 'movie',
			tag = '热门',
			page_start = 0, 
			sort = 'recommend';

		return {
			gettingMore: false,
			loading:false,
			isMovie: true,
			type: type,
			tag: tag,
			page_start: page_start,
			sort: sort,
			moviesTags: ["热门", "最新", "经典", "可播放", "豆瓣高分", "冷门佳片", "华语", "欧美", "韩国", "日本", "动作", "喜剧", "爱情", "科幻", "悬疑", "恐怖", "动画"],
			tvTags: ["热门", "美剧", "英剧", "韩剧", "日剧", "国产剧", "港剧", "日本动画"],
			subjects: [],
		}
	},
	ready: function() {
		this.getDate();
	},
	methods: {

		getDate: function() {

			this.loading = true;

			var data = {};

			data.type = this.type;
			data.tag = this.tag;
			data.page_start = this.page_start;
			data.sort = this.sort;
			//抓取豆瓣数据
			this.$http.get('/search_subjects', data).then(
				function(response) {
					if (response.status >= 200 && response.status <= 304) {

						this.$set('subjects', response.data.subjects);
						this.loading = false;
					}
				},
				function(response) {
					console.log('出现错误');
				});
		},

		changeType: function(type) {
			if (type == 'tv') {
				this.isMovie = false;
			} else {
				this.isMovie = true;
			}
			this.page_start = 0;
			this.tag = "热门";
			this.sort = 'recommend';
			this.type = type;
			this.getDate();
		},

		changeTag: function(tag) {
			this.tag = tag;
			this.sort = 'recommend';
			this.page_start = 0;
			this.getDate();
		},	

		changeSort: function(sort) {
			this.sort = sort;
			this.page_start = 0;
			this.getDate();
		},

		getMore :function(){

			this.gettingMore = true;
			this.page_start += 20;

			var data = {};
			data.type = this.type;
			data.tag = this.tag;
			data.page_start = this.page_start;
			data.sort = this.sort;
			//抓取豆瓣数据
			this.$http.get('/search_subjects', data).then(
				function(response) {
					if (response.status >= 200 && response.status <= 304) {

						var subjects = this.subjects.concat(response.data.subjects);
						this.$set('subjects', subjects);
						this.gettingMore = false;
					}
				},
				function(response) {
					console.log('出现错误');
				});
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
.fliter-wp{
	margin: 40px 0;
	.type-active{
		cursor: pointer;
		color:#27a;
		&:hover{
			background-color: #37a;
			color: #fff;
		}
	}
	.fliter-type{
		font-size: 17px;
		line-height: 50px; 
		border-bottom: 1px solid #e3ebec;
	}
	.fliter-tag{
		color:#666;
		padding: 20px 0;
		font-size: 14px;
		line-height: 1.62; 
		border-bottom: 1px solid #e3ebec;
		.tag-active{
			cursor: pointer;
			display: inline-block;
			padding: 1px 10px;
			margin:0 5px 5px 0;
			border-radius: 3px;
			background-color: #4b8ccb;
			color: #fff;
		}
		.tag{
			cursor: pointer;
			display: inline-block;
			padding: 1px 10px;
			margin:0 5px 5px 0;
			border-radius: 3px;
			&:hover{background-color: #eee;} 
		}	
	}
	.fliter-sort{
		padding: 10px 0;
		line-height: 30px;
		color:#666;
		label{
			font-size: 13px;
			margin-right: 20px;
			input{
				margin-right: 2px;
				vertical-align: text-top;
			}
		}
		.watched{
			float: right;
			margin: 0 0 0 20px;
		}
	}
	.subjects-wp{
		text-align: center;
		width: 605px;
		.item{
			font-size: 13px;
			vertical-align: top;
			line-height: 1.3;
			display: inline-block;
			width: 140px;
			margin: 0 11.25px 30px 0; 
			color:#27a;
			span{color:#e09015;margin-left: 3px;}
			img{width: 100%; height: 200px;}
			.new{top:3px; width: 16px;height: 16px; position: relative;}
		}
	}
	.more{
		display: block;
		text-align: center;
		background-color: #f7f7f7;
		font-size: 14px;
		color:#27a;
		line-height: 34px;
		&:hover{background-color: #eee;}
	}
}
</style>