<template>

</template>
<script>
    /*接口*/
    //http://192.168.2.239:29484/api/Handler/HandlerAsync
    ////192.168.100.66:10022/api/file/uploadfile/
    const ip='http://192.168.100.67',   //api http://192.168.100.66    http://192.168.2.238:29485
        port=':10012', //端口号10012
        port1=':10011',
        port2=':10015',
        port3=':10022',
        port5=':9000',
        getVCode2_port=ip+port5+'/api/tools/getVCode2',//获取base64验证码
        isVCodeRight2_port=ip+port5+'/api/tools/isVCodeRight2',//对比base64验证码
        getipcity_port=ip+port+'/api/account/lastLoginLog',   //获取用户上传登陆ip、地点

        uploadfile_port=ip+port3+'/api/file/uploadfile/',    //上传文件
        getfile_port=ip+port3+'/api/file/';    //获取文件

    //正则表达式
    const ipregex=/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/,// ip正则  ///((25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))/
        emailRex=/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,//邮箱正则
        phoneNum=/^[1][3,4,5,7,8,9][0-9]{9}$/,//手机号
        identityCard=/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;//身份证号

    const timer='30',  //超时设置 单位分钟
        loginPage='http://localhost:8081/#/';

        /*-----------------打包替换以下------------------------*/
        //	   loginPage='http://192.168.100.66:9003/agtlogin#/' 	//发布
        //loginPage='http://localhost:8080/#/'  				//测试

    export default{
        getVCode2_port,isVCodeRight2_port,getipcity_port,uploadfile_port,getfile_port,
        ipregex,emailRex,phoneNum,identityCard,
    };
</script>

<style scoped>

</style>