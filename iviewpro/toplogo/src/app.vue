<template>
    <!-- v-if="valid" -->
    <div class="app_wrap root" :class="{'IE':haypsc,'Firefox':haypsc}"> 
        <navBar ></navBar>
        <div class="content" id='content' :style="{height:cantlh+'px' }">
            <pageNav v-on:dataChanged="onChange"></pageNav>
            <div class="router" :class="prohibit?'':'disabled'">
                <Tabs ref='tabs' class="mytab" type="card" @on-tab-remove="removeTab" @on-click="clickTab" :value="activeTab" :animated="false">
                    <template v-for="(item,index) in mainTabs">
                        <TabPane :label="item.childTxt" closable :name="item.childTxt" v-if="item.show" >
                            <keep-alive>
                                <router-view v-if="!$route.meta.nokeepAlive&&$route.path==item.path"  v-on="{comtion:comtion,dataChanged:onChange}" :tabary="tabary"></router-view>
                            </keep-alive>
                            <router-view v-if="$route.meta.nokeepAlive&&$route.path==item.path"  v-on="{comtion:comtion,dataChanged:onChange}" :tabary="tabary"></router-view>
                            <Spin size="large" fix v-if="item.spin"></Spin>
                        </TabPane>
                    </template>
                </Tabs>
            </div>
        </div>
    </div>
</template>

<style lang='less'>
    html,body{
        width: 100%;
        height:100%;
    }
    li{list-style-type: none;}
    body{
        background-color:#fff;
        overflow: hidden;
    }

    .root .content{
        overflow: hidden;
        .router{float: left;width: 88%;height: 100%;
            overflow:hidden;
            background: #f0f0f2;
        }
        .mytab{
            >.ivu-tabs-bar{margin-bottom: 0;background: #E6F3F9;}
            >.ivu-tabs-content{overflow: hidden;;overflow-y: auto;
                position:relative;
            }
            >.ivu-tabs-bar .ivu-tabs-tab{
                background:#d8e7f0;color:#81888c;
            }
            >.ivu-tabs-bar .ivu-tabs-tab.ivu-tabs-tab-active{
                background:#fff;color:#2d8cf0;
            }
            >.ivu-tabs-bar .ivu-tabs-tab-active i{
                color: #2D8CF0;
            }

            >.ivu-tabs-bar .ivu-tabs-tab:hover{
                background:#fff;color:#2d8cf0;
                i{
                    color: #2D8CF0;
                }
            }
        }
    }
    .app_wrap.IE .happy-scroll-strip.happy-scroll-strip--horizontal,.app_wrap.IE .happy-scroll-strip.happy-scroll-strip--vertical{
         display: none;
     }
</style>
<script>
    import pageNav from './template/sideBar.vue';
    import navBar from './template/top.vue';

    const dat=pageNav.data();
    export default {
        data() {
            return {
                cantlh:'',
                tabcontDom:null,
                topDom:null,
                tabarDom:null,

                haypsc:false,

                activeTab:null,
                mainTabs:dat.mainTabs,
                prohibit:true,
                tabary:dat.mainTabs,

                valid:this.getCookie('OperCode'),//身份信息
                notips:false,

            };
        },
        methods:{
            removeTab:function (name) {
                var tab = this.getTab(name);
                if(tab!=null)tab.show=false;
                if(this.activeTab==name){
                    for(var i in this.mainTabs){
                        if(this.mainTabs[i].show){
                            var ary=[];
                            ary.push(this.mainTabs[i]);
                        }
                    }
                    var last=ary[ary.length-1]
                    this.activeTab=last.childTxt;
                    this.$router.push(last.path);
                }
            },
            clickTab:function(name){
                var self=this;
                this.activeTab=name;
                this.$router.push({name:name});
                console.log(name);
            },
            onChange:function(roter,name){
                if(roter){
                    this.mainTabs=roter;
                    this.tabary=roter;//向子组件传值
                }
                this.activeTab=name;

                console.log(roter,name);
            },
            comtion(s){//监听请求
                this.prohibit=s;
            },
            contHeight(tpdm,tabarDom,tabcontDom){
                this.vih=document.documentElement.clientHeight;
                this.toph=tpdm.clientHeight;
                this.barh=tabarDom.clientHeight;
                this.cantlh= this.vih- this.toph;
                this.tabch= this.vih- this.toph-this.barh;

                tabcontDom.setAttribute('style', 'height:'+this.tabch+'px');
            },
        	
        },
        computed:{
            actTab(){
                this.activeTab;
                return Date.now();
            },
        },
        watch: {
            actTab(){
                if(this.activeTab){//切换页闪烁
                    var self=this;
                    setTimeout(function(){
                        var tab = self.getTab(self.activeTab);
                        for(var i in self.mainTabs){
                            self.mainTabs[i].spin=true;
                        }
                        console.log(tab);
                        setTimeout(function(){
                            tab.spin=false;
                        },250)
                    },306);

                    this.eventBus.$emit('updata','当前页面',this.activeTab);//发送通知
                }
            },
        },
        mounted(){
            var self=this;
            this.tabcontDom=document.querySelector('.mytab>.ivu-tabs-content');
            this.tabarDom=document.querySelector('.mytab>.ivu-tabs-bar');
            this.topDom=document.querySelector('.navga');

            this.contHeight(this.topDom,this.tabarDom,this.tabcontDom);


            var bw=this.myBrowser();
            console.log(bw+'浏览器');
            if(bw=='IE'||bw=='Firefox'){
                this.haypsc=true;
            }

        	function resizeFn(){
                if (!this.timerapp){
                    this.timerapp = true;
                    let that=this;
                    setTimeout(function(){
                        that.timerapp = false;
                        self.contHeight(self.topDom,self.tabarDom,self.tabcontDom);
                    },150);
                }
            }

            window.addEventListener('resize',resizeFn,false);
        },
        components:{
            pageNav,
            navBar
        },
        created(){
            var self=this;
            if(this.valid){
                this.$router.push('/');
                this.timeUserFun(this.global.timer,function(){
                    // self.delCookie('OperCode');
                });
            }else{
                //this.notips=true;
                // window.location.href=this.global.loginPage;
            }

            this.$router.push('/merchantManagement');
            
        },
        beforeUpdate(){
            var self=this;
            // if(this.valid!==this.getCookie('OperCode')){
            //     this.valid=this.getCookie('OperCode');
            // }
            // if(!this.valid&&!this.notips){
            //     this.viewAlert('infor','您30分钟未操作，需要重新登陆',function () {
            //         window.location.href=self.global.loginPage;
            //     });
            // }
        },  
    }
</script>