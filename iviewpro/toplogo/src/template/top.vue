<template>
    <div class="navga">
        <div class="navBar">

            <!-- logo在top栏 -->
            <div class="alft">
                <div class="logo">
                    <img src="../assets/jiemianlogo.png" class="img"/>
                </div>
            </div>
            <div class="aright">
                <!--<p class="navBarTitle">您上次登录的IP为{{IP}} IP所在地位重庆市</p>-->
                <div class="navBarContext">
                    <div class="innavbc">
                        <div class="ordercms">
                            <a class="order">工&nbsp;&nbsp;单</a>
                        </div>
                        <div class="msg">
                            <Icon class="" type="android-notifications"></Icon>
                        </div>
                        <div class="myAccontWidth">
                            <a class="flt" @click="logout">退&nbsp;&nbsp;出</a>
                            <i class="accountIcon"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                IP:'',
                city:'',
            };
        },
        methods:{
            getLastLoginInfo(){
                // this.$http.post(this.global.GetLastLoginInfo,{"UserCode":this.getCookie('OperCode')}).then(function(res){
                //     if(res.data.errorCode==1){
                //         this.IP=res.data.result.ipAddress;
                //         this.city=res.data.result.address;
                //     }else{
                //         console.log(res.data.errorInfo);
                //     }
                // }).catch(function(err){
                //     console.log(err);
                // })
            },
            logout(){
                var self=this;
                this.viewAlert('confirm','确定退出吗？',function(){
                    // self.delCookie('OperCode');
                    // window.location.href=self.global.loginPage;
                })
            }
        },
        created(){
            // this.getLastLoginInfo(); 
        },
    };
</script>

<style lang="less" scoped>
    .navga{
        .alft,.aright{height: 100%;}
        .alft{
            min-width:12%;
            width:12%;
            .logo{text-align:center;
                img{width:122px;margin-top:7px;}
            }
        }
        .aright{
            width:100%;
            .navBarTitle{float: left;}
            .navBarContext{float: right;}
        }

        .flt{float: left;}
        .msg{
            width: 60px;text-align: center;
        }
        .ordercms,.myAccontWidth,.msg{
            float: left;
            height: 40px;line-height: 40px;
        }
        .accountIcon{
            position: relative;
            top:2px;
            display: inline-block;
            width: 35px;
            height: 35px;
            border-radius: 50%;
            border: 1px solid #75b3f5;
            background-image: url('../assets/touxiang.jpg');
            background-size: cover;
            cursor: pointer;
        }
        .navBarContext{
            a,.msg{color: #cccccc;}
        }
        .myAccontWidth{
            a{margin-right: 5px;}
        }
        .navBar{
            background: #36404e;
            height: 40px;
            display: flex;
            flex-direction: row;
            align-items: center;
        }
        .navBarContext{
            padding-right: 40px;
            overflow: hidden;
        }
        .innavbc{float: right;}
        .navBarTitle{
            color: #cccccc;
            padding-left: 40px;
            line-height: 40px;
        }
    }
</style>
