import Vue from 'vue';
import iView from 'iview';
import VueRouter from 'vue-router';
import Routers from './router';
import md5 from 'js-md5';
import axios from 'axios';

import base from './base';

import Util from './libs/util';
import App from './app.vue';
import 'iview/dist/styles/iview.css';
import global from './static/Global';
import echarts from 'echarts';

import 'vue-happy-scroll/docs/happy-scroll.css';// 引入滚动条css。
import './static/base.css';
import './static/media.css'; //引入全局适配样式

Vue.prototype.eventBus = new Vue();


// axios 配置
axios.defaults.headers['Content-Type'] = 'application/json';
//axios.defaults.headers['Authorization']=getCookie('token')==null?'':getCookie('token');
//axios.defaults.timeout = 5000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
//axios.defaults.baseURL = 'http://localhost:8008';

Vue.prototype.$http = axios;

/*------------拦截器---------*/
//POST传参序列化
axios.interceptors.request.use((config) => {
	for(var key in config.headers){
		if(key=='Content-Type'){
			if(config.headers[key]!='multipart/form-data'){
				if(config.method  === 'post'){
				    config.data = JSON.stringify(config.data);     //qs.stringify();
				      console.log(config.data)
				}
			}
		}
	}
	return config;
},(error) =>{
//	return Promise.reject(error);
	return error;
});

//返回状态判断
axios.interceptors.response.use((res) =>{
//	if(!res.data.success){
//	    return Promise.reject(res);
//	}
	return res;
}, (error) => {
	//404等问题可以在这里处理
	if (error.response){
        // switch (error.response.status) {
        //     case 401:
        //     // 返回 401 清除token信息并跳转到登录页面
		// 	delCookie('token');
		// 	//window.location.href=global.loginPage
		// 	window.location.href=global.homePage
        // }
    }
	return error
//	return Promise.reject(error);
});

Vue.prototype.$echarts = echarts
Vue.prototype.global=global
Vue.prototype.$md5 = md5

Vue.use(VueRouter);
Vue.use(iView);
Vue.use(base);


// 路由配置
const RouterConfig = {
    routes: Routers
};
const router = new VueRouter(RouterConfig);
router.beforeEach((to, from, next) => {
	iView.LoadingBar.start();
	Util.title(to.meta.title);
	next();
}) 

router.afterEach(() => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});


new Vue({
    el: '#app',
    router: router,
    render: h => h(App)
});