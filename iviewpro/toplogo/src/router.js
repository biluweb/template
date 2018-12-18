const routers = [
    {
        name:'主页',
        path: '/',
        meta: {
            title: '主页',
            requiresAuth: true,
            nokeepAlive: true // 不需要缓存
        },
        component: (resolve) => require(['./views/index.vue'], resolve)
    },
    {
        name: '商户管理',
        path: '/merchantManagement',
        meta: {
            title: '商户管理',
            requiresAuth: true
        },
        component: (resolve) => require(['./views/merchantManagement.vue'], resolve)
    },
];
export default routers;
