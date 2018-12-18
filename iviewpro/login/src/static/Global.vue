<template>

</template>
<script>
    /*接口*/
    //http://192.168.2.239:29484/api/Handler/HandlerAsync
    ////192.168.100.66:10022/api/file/uploadfile/
    const ip='http://192.168.100.67',   //api http://192.168.100.66    http://192.168.2.238:29485
        port=':10012', 
        port2=':10015',
        port3=':10022',
        port5=':9000',
        port6=':10011',
        login_port=ip+port+'/api/User/UserLogin', //登录接口
        RegisterMail_port=ip+port+'/api/user/RegisterMail',//注册接口 http://192.168.100.66:10011/api/user/RegisterMail  2.238 29485    http://192.168.2.238:29485/api/handler/HandlerAsync
        HandlerAsync_port=ip+port6+'/api/handler/HandlerAsync', //接口集合
        getVCode_port=ip+port2+'/api/tools/getVCode',     // 获取验证码
        isVCodeRight_port=ip+port2+'/api/tools/isVCodeRight', //对比验证码
        getVCode2_port=ip+port5+'/api/tools/getVCode2',//获取base64验证码
        isVCodeRight2_port=ip+port5+'/api/tools/isVCodeRight2',//对比base64验证码
        testLogin_port=ip+port+'/api/account/testLogin',  //获取用户数据

        EncryptionPassword=ip+port+'/api/User/EncryptionPassword',//jm

        submit_port=ip+port+'/api/ask/submit',  //提交新工单
        search_port=ip+port+'/api/ask/search',   //工单列表与搜索
        close_port=ip+port+'/api/ask/closeWorkOrder',  //关闭自己的工单
        del_port=ip+port+'/api/ask/delWorkOrder',  //逻辑删除自己的工单
        workOrderDetail_port=ip+port+'/api/ask/workOrderDetail',      //获取工单详情页所有信息
        merchantResponse_port=ip+port+'/api/ask/merchantResponse',           //商户对工单回复
        merchantFinish_port=ip+port+'/api/ask/merchantFinish',  //商户手动完结或到期自动完结
        upload_port=ip+port2+'/api/file/upload',   //上传文件
        uploadfile_port=ip+port3+'/api/file/uploadfile/',    //上传文件
        getfile_port=ip+port3+'/api/file/';    //获取文件

    const title=true,
        step=-1,//步骤状态
        config={headers:{'Content-Type':'multipart/form-data'}}, //请求头  application/json data application/x-www-form-urlencoded
        timer='30',  //超时设置 单位分钟
        homePage='http://192.168.100.66:9002/operator/#/';
		
		//			http://192.168.100.66:9002/operator/#/   http://localhost:8080/#/
		
    export default{
        merchantResponse_port,
        merchantFinish_port,
        HandlerAsync_port,
        RegisterMail_port,
        isVCodeRight_port,
        isVCodeRight2_port,
        workOrderDetail_port,
        EncryptionPassword,
        uploadfile_port,
        testLogin_port,
        upload_port,
        search_port,
        submit_port,
        getVCode_port,
        getVCode2_port,
        getfile_port,
        homePage,
        login_port,
        config,
        title,
        step,
        timer,
    };
</script>

<style scoped>

</style>