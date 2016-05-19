var Vue = require('vue');
var vue_resource = require('vue-resource');
var app = require('./main.vue');

Vue.use(vue_resource);


new Vue({
	el:'body',
	components:{
		douban : app,
	}
})