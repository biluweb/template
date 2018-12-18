<template>
    <div class="home">
        <Row class="oderhd">
            <Col span="5">
                <div class="mtile">
                    <p class="tel">已结算金额</p>
                    <div class="flx">
                        <span class="sprhome ic1"></span>
                        <Tooltip :content="mtile.cont.price+mtile.cont.unit+'元'" placement="top">
                            <h1>{{mtile.cont.price}}</h1>
                        </Tooltip>
                        <p>{{mtile.cont.unit}}元</p>
                    </div>
                </div>
            </Col>
            <Col span="5">
                <div class="mtile">
                    <p class="tel">可结算金额</p>
                    <div class="flx">
                        <span class="sprhome ic2"></span>
                        <Tooltip :content="mtile.sucont.price+mtile.sucont.unit+'元'" placement="top">
                            <h1>{{mtile.sucont.price}}</h1>
                        </Tooltip>
                        <p>{{mtile.sucont.unit}}元</p>
                    </div>
                </div>
            </Col>
            <Col span="5">
                <div class="mtile">
                    <p class="tel">冻结金额</p>
                    <div class="flx">
                        <span class="sprhome ic3"></span>
                        <Tooltip :content="mtile.sucrate.price+mtile.sucrate.unit+'元'" placement="top">
                            <h1>{{mtile.sucrate.price}}</h1>
                        </Tooltip>
                        <p>{{mtile.sucrate.unit}}元</p>
                    </div>
                </div>
            </Col>
            <Col span="5">
                <div class="mtile">
                    <p class="tel">今日收入金额</p>
                    <div class="flx">
                        <span class="sprhome ic4"></span>
                        <Tooltip :content="mtile.balance.price+mtile.balance.unit+'元'" placement="top">
                            <h1>{{mtile.balance.price}}</h1>
                        </Tooltip>
                        <p>{{mtile.balance.unit}}元</p>
                    </div>
                </div>
            </Col>
            <!-- <Col span="4">
                <div class="mtile">
                    <p class="tel">今日出款总计</p>
                    <div class="flx">
                        <span class="sprhome ic5"></span>
                        <Tooltip :content="'-'+mtile.sysprofit.price+mtile.sysprofit.unit+'元'" placement="top">
                            <h1 v-if="mtile.sysprofit.price>0">-{{mtile.sysprofit.price}}</h1>
                            <h1 v-else>{{mtile.sysprofit.price}}</h1>
                        </Tooltip>
                        <p>{{mtile.sysprofit.unit}}元</p>
                    </div>
                </div>
            </Col> -->
        </Row>

        <!-- <div class="charthd flx size">
            <div class="hdlft chatra">
                <!-- 近7日入出款统计
                <div id="turnover"></div>
            </div>
            <div  class="hdrt">
                <!-- 通道统计
                <div class="cantleh flx">
                    <h1>通道统计</h1>
                    <RadioGroup class="canbtnact" v-model="mrado1" @on-change="selcant" type="button"  size="small">
                        <Radio v-for="(item,index) in datal1" :label="item.label">{{item.name}}</Radio>
                    </RadioGroup>
                    <Button class="xalview" type="primary" size='small' @click="pageJumps('通道支付统计','/aislePayStatistics')">更多</Button>
                </div>
                <div class="tableLayout">
                    <Table height='292' :columns="canlcol" :loading="cantshow" :data="canldata"></Table>
                </div>
            </div>
        </div> -->

        <div class="charthd flx chartfd" :style="{height:cantlh+'px' }">
            <div class="hdlft">
                <!-- 商户交易统计TOP -->
                <div class="cantleh flx" >
                    <h1>商户交易统计TOP10</h1>
                    <p style="margin-left:15px;color:#2D8CF0;cursor:pointer;line-height: 23px;" @click="reload(1)">刷新</p>
                    <RadioGroup  v-model="mrado2" class="canbtnact" @on-change="selnact" type="button"  size="small">
                        <Radio v-for="(item,index) in datal2" :label="item.label" >{{item.name}}</Radio>
                    </RadioGroup>
                    <Button class="xalview" type="primary" size='small' @click="pageJumps('订单管理','/dealOrder')">更多</Button>
                </div>
                <div class="tableLayout">
                    <Table :height='tabh' :columns="shjycol" :loading="nactshow" :data="shjydata"></Table>
                </div>
            </div>
            <div  class="hdrt">
                <!-- 通道统计 -->
                <div class="cantleh flx">
                    <h1>通道统计</h1>
                    <p style="margin-left:15px;color:#2D8CF0;cursor:pointer;line-height: 23px;" @click="reload(2)">刷新</p>
                    <RadioGroup class="canbtnact" v-model="mrado1" @on-change="selcant" type="button" style="margin-left: 28%;" size="small">
                        <Radio v-for="(item,index) in datal1" :label="item.label">{{item.name}}</Radio>
                    </RadioGroup>
                    <Button class="xalview" type="primary" size='small' @click="pageJumps('通道支付统计','/aislePayStatistics')">更多</Button>
                </div>
                <div class="tableLayout">
                    <Table :height='tabh' :columns="canlcol" :loading="cantshow" :data="canldata"></Table>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="less">
    .tableLayout .ivu-table-wrapper{
        margin-top: 10px;
    }
    /*.tableLayout .ivu-progress-success .ivu-progress-text{*/
        /*width: 40px;*/
    /*}*/
    .ivu-progress-text{
        width: 50px;
    }
.home{
    //.happy-scroll-strip--vertical{background: #000;}

    //--------------------------------------
    .mtile{
        border: 1px solid #eeeeee;
        // max-width:370px;
        margin:0 auto;
        width:96%;
        background: #fff;
        
            :hover{
                .sprimti{opacity: 0.8;}
            }
            
            .tel{color: #808080;line-height: 26px;padding-left: 10px;
                border-bottom: 1px solid #eeeeee;font-size: 14px;
            }         
            .flx{
                padding:10px 0px;
                h1,p{color: #666666;font-family: '宋体';}
                h1{
                    font-size: 32px;
                    // max-width:236px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                .ivu-tooltip{
                    max-width:62%;overflow: hidden;
                }
                .ivu-tooltip-rel{width: 100%;}
               p{
                   position: relative;top:17px;font-size: 16px;min-width: 48px;height: 24px;
                } 
            }
        }
        .oderhd{padding-top: 10px;}
        hr{margin: 10px 0;}
        .qrycont{
            .flx{width:76%;max-width:317px;margin: 0 auto;
                p{min-width:48px;
                    margin-right: 10px;text-align: right;
                }
                .tmerScop{width: 100%;}
            }
        }
        .box{overflow: hidden;
            padding:10px 50px;
            padding-bottom: 0px;
            .flx{float: left;width: 20.2%;
                p{min-width:48px;
                    margin-right: 10px;text-align: right;
                }
            }
            .rtbt{float: right;}

        }
        
        .chartbox{
            height:620px;position: relative;
            .Chart{
                height:100%;
            }
            .fbdbluetxt{position: absolute;right:49px;top:3px;z-index: 1;}
            
        }
    

    //----------------------------------------------------------------

    .oderhd{
        .ivu-col{width: 25%;}
    }
    .sprhome{background: url(../assets/homespri.png) -1px -2px;min-width: 54px;min-height:54px;
        border: 1px solid #eeeeee;border-radius:50%;margin: 0 10px;
    }
    .ic2{background-position-x: -56px;}
    .ic3{background-position-x: -110px;}
    .ic4{background-position-x: -164px;}
    // .ic5{background-position-x: -216px;}

    .examine{
        border: 1px solid #eeeeee;padding: 10px 50px;margin-top: 10px;overflow: hidden;
        p{min-width:58px;}
        .selday{width: 318px;}
        .seltyp{width: 187px;margin-left: 40px;}
        .selday,.seltyp,.quy{float: left;}
        .quy{margin-left: 40px;min-width: 80px;}
    }

    .charthd{
        // padding:10px;//374   margin: 10px;
       overflow: hidden;
        background: #fff;
        .hdrt,.hdlft{
            margin-top: 10px;
            margin-bottom: 10px;
            border: 1px solid #eeeeee;width:50%;
        }
        .chatra{
            >div{height: 100%;}
        }
        .hdlft{
            // background: #000;
            margin-right: 5px; 
            margin-left: 10px;
        }
        .hdrt{
            margin-left: 5px;
            margin-right: 10px;
            // background: rebeccapurple;
        }

        h1{font-size: 16px;}

        //tab css
        .ivu-table th{background: #edf5ff!important;}
        tr.ivu-table-row-hover td,.ivu-modal tr.ivu-table-row-hover td{
            background-color: #f8f8f9 !important;
        }
        
        .ivu-table-wrapper{border: 0!important;}
        .ivu-table:after, .ivu-table:before{
            background-color: transparent!important;
        }
        .ivu-table-border .ivu-table-body tr td:last-child, .ivu-table-border .ivu-table-header thead tr th:last-child{
            border-right: 0!important;
        }


        //loading bar
        .ivu-progress-bg{border-radius: 0;}

    }
    .pt0{padding-top: 0}


    .cantleh{position: relative;
        padding: 10px;padding-left: 35px;
        padding-bottom: 0;
        // .canbtnact{margin-left: 30%;}
        .xalview{min-width: 55px;
            position: absolute;right: 20px;top:10px;
        }
    }

    .chartfd{
        // .hdrt,.hdlft{height:400px;}
        .canbtnact{margin-left: 17%;}
    }
    
}

</style>

<script>
    export default {
        props:{//接收 传值
            tabary: Array,
            required: true
        },
        data() {
            return {
                mainTabs:this.tabary,
                today:'',
                yesterday:'',
                bomh:345,
                cantlh:400,
                tabh:'',

                daytime:'',
                seltype:'',
                ctpool:[],
                ctpool1:[],

                mrado1:'',
                mrado2:'',
                cantshow:true,
                nactshow:true,

                canmtshow:true,

                datal1:[
                    {label:'',name:'昨日'},
                    {label:'',name:'今日'},
                ],
                datal2:[
                    {label:'',name:'昨日'},
                    {label:'',name:'今日'},
                ],
                canlcol:[
                    {
                        title: '支付通道',
                        align: 'center',
                        key: 'passName'
                    },
                    {
                        title: '入款金额',
                        align: 'center',
                        key: 'inAmount'
                    },
                    {
                        title: '单笔均额',
                        align: 'center',
                        key: 'singleAmount'
                    },
                    {
                        title: '订单笔数',
                        align: 'center',
                        key: 'orderNumber'
                    },
                    {
                        title: '支付成功率',
                        align: 'center',
                        width:200,
                        render: (h, params) => {
                            //<Progress :percent="45" status="active" /> successRate
                            var srat=params.row.successRate.replace(/\%/g,'');
                            return h('div', [
                                h('Progress', {
                                    props: {
                                        percent:Number(srat),
                                        status:'normal'
                                    },
                                })
                            ]);
                        }
                    },
                ],
                shjycol:[
                    {
                        title: '序号',
                        align: 'center',
                        type:'index'
                    },
                    {
                        title: '商户名称',
                        align: 'center',
                        key: 'shopName'
                    },
                    {
                        title: '入账金额',
                        align: 'center',
                        key: 'inAmount'
                    },
                    {
                        title: '出账金额',
                        align: 'center',
                        key: 'outAmount'
                    },
                ],
                chamentcol:[
                    {
                        title: '序号',
                        align: 'center',
                        type:'index'
                    },
                    {
                        title: '上游名称',
                        align: 'center',
                        key: 'upperName'
                    },
                    {
                        title: '渠道名称',
                        align: 'center',
                        key: 'channelName'
                    },
                    {
                        title: '入账金额',
                        align: 'center',
                        key: 'inAmount'
                    },
                    {
                        title: '出账金额',
                        align: 'center',
                        key: 'outAmount'
                    },
                ],
                shjydata:[],
                chamentdata:[],
                canldata:[],

                mtile:{
                    cont:{
                        price:0,
                        unit:'',
                    },
                    sucont:{
                        price:0,
                        unit:'',
                    },
                    sucrate:{
                        price:0,
                        unit:'',
                    },
                    balance:{
                        price:0,
                        unit:'',
                    },
                },
            }
        },
        watch: {

        },
        mounted() {
            var self=this;

            this.contdom=document.querySelector('.mytab>.ivu-tabs-content');
            this.headom=document.querySelector('.home .oderhd');
            this.cantdom=document.querySelector('.hdlft>.cantleh');

            this.viewResize(this.contdom, this.headom,this.cantdom);
           
            function resizeFn(){
                if (!this.timerindex){
                    this.timerindex = true;
                    let that = this;
                    setTimeout(function () {
                        that.timerindex = false;
                        self.viewResize(self.contdom,self.headom,self.cantdom);
                    },400)
                }
            }

            window.addEventListener('resize',resizeFn,false);
        },
        methods: {
            selcant(s){
                this.getPassAmountStatistics(s);
            },
            selnact(s){
                this.getMerchantAmountList(s);
            },
            viewResize(cont,hd,cant){
                this.conth=cont.clientHeight;
                this.headh=hd.clientHeight;
                this.canth=cant.clientHeight;

                this.cantlh= this.conth- this.headh;
                this.tabh = this.cantlh - this.canth-32;
            },
            reload(t){//刷新 
                switch (t){
                    case 1:
                        this.getMerchantAmountList();
                        break;
                    case 2:
                        this.getPassAmountStatistics();
                        break;
                }
            },
            homeSumstat(){//统计金额
                var self=this;
                var Data = {
                    OperCode:this.getCookie('OperCode2'),
                };
                this.$http.post(this.global.GetAmountStatistics,Data).then(function(res){
                    if(res.data.errorCode==1){
                        self.mtile.cont =self.calUnit(res.data.result.upperAmount);
                        self.mtile.sucont = self.calUnit(res.data.result.agentAmount);
                        self.mtile.sucrate = self.calUnit(res.data.result.profitAmount);
                        self.mtile.balance = self.calUnit(res.data.result.inAmount);
                    }else{
                        self.viewAlert('infor',res.data.errorInfo);
                    }
                })
            },
            getMerchantAmountList(t){//商户 交易统计
                var self=this;
                var dat={
                    OperCode:this.getCookie('OperCode2'),
                    StartTime:t?t:this.today,
                    EndTime:t?t:this.today,
                    Page:1,
                    Rows:10,
                };
                this.nactshow=true;
                this.$http.post(this.global.GetMerchantAmountList,dat).then(function(res){
                    if(res.data.errorCode==1){
                        self.shjydata=res.data.result;
                    }else{
                        self.viewAlert('infor',res.data.errorInfo);
                    }
                    self.nactshow=false;
                }).catch(function(err){
                    self.viewAlert('err', '网络错误！');self.nactshow=false;
                })
            },
            getPassAmountStatistics(t){//通道统计
                var self=this;
                var dat={
                    OperCode:this.getCookie('OperCode2'),
                    StartTime:t?t:this.today,
                    EndTime:t?t:this.today,
                    Page:1,
                    Rows:50
                };
                this.cantshow=true;
                this.$http.post(this.global.GetPassAmountStatistics,dat).then(function(res){
                    if(res.data.errorCode==1){
                        self.canldata=res.data.result.passAmounts;
                    }else{
                        self.viewAlert('infor',res.data.errorInfo);
                    }
                    self.cantshow=false;
                }).catch(function(err){
                    self.viewAlert('err', '网络错误！');self.cantshow=false;
                })
            },
        },
        components: {

        },
        created(){
            //获取当前年月日
            var date = new Date();
            var year = date .getFullYear();
            var month = date.getMonth() + 1;
            var data = date .getDate();
            var data1 = date .getDate()-1;//天数减一
            this.today = year+'-'+month+'-'+data;//今日
            this.yesterday = year+'-'+month+'-'+data1;//昨日

            // //按钮 昨日今日赋值
            this.datal1[0].label=this.yesterday;this.datal2[0].label=this.yesterday;
            this.datal1[1].label=this.today;this.datal2[1].label=this.today;
            // //默认显示 今日
            this.mrado1=this.today;this.mrado2=this.today;
            // this.homeSumstat();
            // this.getPassAmountStatistics();
            // this.getMerchantAmountList();
        },
}
</script>