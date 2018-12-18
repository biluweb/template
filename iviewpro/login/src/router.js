const routers = [{
        path: '/',
        meta: {
            title: '登录'
        },
        component: (resolve) => require(['./views/login.vue'], resolve)
    },
    {
	    path: '/register',
	    meta: {
	        title: '邮箱注册',
	         requiresAuth: false
	    },
	    component: (resolve) => require(['./views/register.vue'], resolve)
	},
	{
		path: '/findPassword',
		meta: {
	        title: '邮件找回密码',
	        requiresAuth: false
	    },
	    component: (resolve) => require(['./views/findPassword.vue'], resolve)
	},
];
export default routers;
