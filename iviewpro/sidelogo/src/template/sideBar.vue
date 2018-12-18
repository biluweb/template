<template>
    <div class="page_nav">
        <div class="left_nav_logo">
            <img src="../assets/jiemianlogo.png"/>
        </div>
    	<happy-scroll resize size="3" class="hapyscrol" hide-horizontal color="rgba(26,119,243,0.3)">
	    	<div class="scrol">
				<ul class="left_nav">
		            <template v-for="(item,index) in data">
                        <li @click="path_click(item.path,index)">
                            <div class="parent_item" :class="{ 'zzz' : index==parent_index ,'nav_parent_item_ac' : index==parent_index}" @click="routerJump2(item.path,index,item.txt)" >
                                <div class="lefnavw">
                                    <p class="navtxt">{{ item.txt }}</p>
                                    <Icon type="chevron-right" :class="{ 'nav_jt_icon' : index==parent_index}"></Icon>
                                </div>
                            </div>
                            <ul class="ilist" v-if="item.pathClick">
                                <li class="nav_item" v-for="(child,index) in item.child" @click.stop="routerJump(child.path,index,child.childTxt)" :id="child.path" :class="{ 'nav_child_item_ac' : actilist(index)}">
                                    <div class="lefnavw">
                                        <p class="navtxt">{{ child.childTxt }}</p>
                                    </div>
                                </li>
                            </ul>
                        </li>
		            </template>
		        </ul>
	        </div>
        </happy-scroll>
    </div>
</template>

<script>
    import { HappyScroll } from 'vue-happy-scroll';

    let data=[
        {
            txt:'主页',
            path:'/',
            pathClick:false,
            child:[],
        },
        {
            txt:'商户管理',
            path:'/merchantManagement',
            pathClick:false,
            child:[
                // {
                //     childTxt:'商户资金统计',
                //     path:'/merchantCapitalStatistics'
                // },
            ]
        },
        
    ]

    export default {
        data:function () {
            return {
                data,
                parent_index:0,
                child_index:0,
                child_index2:0,

                activeTab:null,
                mainTabs:[//tab页 默认页面
                    {
                        childTxt:"主页",
                        path:'/',
                        show:true,
                        spin:false,
                    },
                    // {
                    //     childTxt:"商户管理",
                    //     path:'/merchantManagement',
                    //     show:true,
                    //     spin:false,
                    // },
                ]
            };
        },
        computed:{

        },
        components: {HappyScroll}, //在组件内注册
        methods:{
            path_click(path,index){
                for(let i=0; i<this.data.length ;i++){
                    this.data[i].pathClick=false;
                    this.data[index].pathClick=true;
                }
                this.parent_index=index;
                this.child_index=null;
            },
            actilist(index){
                 if(this.child_index!=null){
                     return this.child_index==index;
                 }else{
                     return false;
                 }
            },
            routerJump(path,index,name){
                this.$router.push(path);
                this.child_index=index;
                this.menuSelect(name,path);
            },
            routerJump2(path,index,name){
                if(name=='安全中心'||name=='商户管理'||name=='主页'||name=='订单管理'){
                    this.$router.push(path);
                    this.child_index2=index;
                    this.menuSelect(name,path,true);
                }
            },
            menuSelect(name,path,warp){  //菜单点击
                var tab = this.getTab(name);  
                if(tab==null){  
                    var mi = this.getMenuItem(name,warp);
                    var oj={};
                    var mi=Object.assign(oj,mi,{show:true,spin:true});
                    this.mainTabs.push(mi);
                }
                else{
                    tab.show=true;
                }
                this.$emit('dataChanged',this.mainTabs,name,path);
            },
            getMenuItem(name,warp){  //根据名称来查找对应的菜单条目
                for(var sm=0; sm<this.data.length;sm++){
                    if(warp){
                        if(this.data[sm].txt==name) return {childTxt:name,path:this.data[sm].path};
                    }else{
                        for(var mi=0; mi<this.data[sm].child.length; mi++){  
                            if(this.data[sm].child[mi].childTxt==name) return this.data[sm].child[mi];  
                        }  
                    }
                }  
                return {};
            },  
            hapysHeight(pageDom,ctarDom,hapyDom){
                this.wlbox=pageDom.clientWidth;
                this.hlbox=pageDom.clientHeight;
                ctarDom.setAttribute('style', 'width: '+this.wlbox+'px;height:'+this.hlbox+'px');
                hapyDom.setAttribute('style','height:'+this.hlbox+'px');
            }
        },
        mounted(){
            var self=this;

            var pageDom=document.querySelector('.page_nav'),
                ctarDom=document.querySelector('.happy-scroll-container'),
                hapcl=pageDom.querySelector('.hapyscrol'),
                lftbox=pageDom.querySelector('.left_nav'),
                strip=pageDom.querySelector('.happy-scroll-strip--vertical');

            //timer 800
            setTimeout(function(){
                self.hapysHeight(pageDom, ctarDom,hapcl);
            },750);

            //滚动条 show hiden
            hapcl.addEventListener('mouseenter',function(){
                if(lftbox.clientHeight>hapcl.clientHeight){
                    strip.style.display='block';
                }else{
                    strip.style.display='none';
                }
            },false);
            hapcl.addEventListener('mouseleave',function(){
                 strip.style.display='none';
            },false);

            function resizeFn(){
                if (!this.timernav){
                    this.timernav = true;
                    let that = this;

                    //此处的延时必须大于 app.vue 的延时 否则取不到动态高度 导致高度不一致
                    setTimeout(function(){
                        that.timernav = false;
                        self.hapysHeight(pageDom, ctarDom,hapcl);
                    }, 650)
                }
            }

            window.addEventListener('resize',resizeFn,false);
        },
        created(){

        },
    };
</script>

<style lang='less' scoped>
    .page_nav{
        width:12%;
            height:100%;
            float:left;
            border-right: 1px solid #f3f3f3;
        .left_nav_logo{
            padding: 30px 0;
            padding-bottom:10px;
        }
        .left_nav_logo img{display: block;margin: 0 auto;}

        .parent_item{
            cursor: pointer;
            text-align:left;
            padding: 20px 0;
            font-size: 14px;
            transition: all 0.5s;
            color: #4c4c4c;
        }
        .nav_item{
            text-align:left;
            padding: 15px 0;
            cursor: pointer;
            transition: all 0.5s;
            border-right: 1px solid transparent;
            color:#8c8c8c;
        }
        .nav_parent_item_ac{
            /*border-left: 10px solid #1a77f3 !important;*/
            font-weight: bolder;
        }
        .nav_jt_icon{
            transform: rotate(90deg)
        }
        .navtxt{text-align: left;display: inline-block;}

        .nav_child_item_ac{
            color: #1976d2;
            border-right-color: #1a77f3;
        }
        .lefnavw{padding-left: 22%;}

        .ilist .lefnavw{
            padding-left: 26%;
        }
        .lefnavw i{float: right;position: relative;right: 15px;top:4px;}
    }
</style>