import Vue from 'vue';
import iView from 'iview';
import VueRouter from 'vue-router';
import Routers from './router';
import md5 from 'js-md5';
import Util from './libs/util';
import App from './app.vue';
import 'iview/dist/styles/iview.css';
import global from './static/Global';
import echarts from 'echarts';
import base from './base';

import axios from 'axios';
axios.defaults.headers['Content-Type'] = 'application/json';
Vue.prototype.$http = axios
Vue.prototype.$md5 = md5;
Vue.prototype.$echarts = echarts
Vue.prototype.global=global

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
});

router.afterEach(() => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});



new Vue({
    el: '#app',
    router: router,
    render: h => h(App)
});