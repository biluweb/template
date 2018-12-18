// Object.assign(this.$data.bbb, this.$options.data().bbb);  vue 重置数据
exports.install = function (Vue, options) {
    Vue.prototype.setCookie = function (name,value,time){//写cookies 
        /*  这是有设定过期时间的使用示例：
            s20是代表20秒
            h是指小时，如12小时则是：h12
            d是天数，30天则：d30
        setCookie("name","hayden","s20");*/
        function getsec(str){
            var str1=str.substring(1,str.length)*1;
            var str2=str.substring(0,1);
            if (str2=="s"){
                return str1*1000;
            }else if (str2=="h"){
                return str1*60*60*1000;
            }else if (str2=="d"){
                return str1*24*60*60*1000;
            }
        }

        var strsec = getsec(time);
        var exp = new Date();
        exp.setTime(exp.getTime() + strsec*1);
        document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString() + ";path=/"; //   path=/设置root目录
    }
    Vue.prototype.delCookie=function(name){//删除cookies 
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval=this.getCookie(name);
        if(cval!=null)
            document.cookie= name + "="+cval+";expires="+exp.toGMTString()+ ";path=/";
    }
    Vue.prototype.getCookie=function(name){//读取cookies
        var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
        if(arr=document.cookie.match(reg))
            return unescape(arr[2]);
        else
            return null;
    }
    Vue.prototype.bool=function(t){//str转布尔
        return (/^true$/i).test(t);
    }
    Vue.prototype.myBrowser=function(){
        var userAgent =navigator.userAgent; //取得浏览器的userAgent字符串
        if (!!window.ActiveXObject || "ActiveXObject" in window||userAgent.indexOf("Edge") > -1) {
            return "IE";
        }; //判断是否IE浏览器
        if (userAgent.indexOf("Opera") > -1) {
            return "Opera"
        }; //判断是否Opera浏览器
        if (userAgent.indexOf("Firefox") > -1) {
            return "Firefox";
        } //判断是否Firefox浏览器
        if (userAgent.indexOf("Chrome") > -1){
            return "Chrome";
        }
        if (userAgent.indexOf("Safari") > -1) {
            return "Safari";
        } //判断是否Safari浏览器
    }
    Vue.prototype.getUser=function(callback){//获取用户信息
        var self=this,user;
        var Data = {
            UserCode:self.getCookie('OperCode2'),
        };
        self.$http.post(self.global.testLogin_port,Data).then(function (res) {
            if(res.data.errorCode == 1){
                user = res.data.result;
                if(typeof callback == "function") callback(user);//回调函数
            }
        });
    }
    Vue.prototype.pastcookie=function(callback){//验证cookie是否过期
//      var self=this,userf;
//      function showbar(u){
//      	userf=u;
////          self.setCookie('loginShow',true,'d365');
////          self.global.loginShow=self.bool(self.getCookie('loginShow'));
//          if(typeof callback == "function") callback(userf);
//      }
//      function delinfor(){
//          self.delCookie('token');
//          console.log(self.getCookie('token'))
////          self.delCookie('loginShow');
////          self.global.loginShow=self.bool(self.getCookie('loginShow'));
////          self.$router.push({path:'/'});
//			//window.location.href=self.global.loginPage;
//      }
//      if(this.getCookie('token')){
//          this.getUser(showbar,delinfor);
//      }else{
////          this.setCookie('loginShow',false,'d365');
////          this.global.loginShow=this.bool(this.getCookie('loginShow'));
////          this.$router.push({path:'/'});
//			//window.location.href=this.global.loginPage;
//      }
    }
    Vue.prototype.timeUserFun=function(time,callback){//超时设置
        /*time参数代表分钟数,可以有一位小数;*/
        var time = time || 2;
        var userTime = time * 60;
        var objTime = {
            init: 0,
            time: function() {
                objTime.init += 1;
                if(objTime.init == userTime) {
                    /* 用户到达未操作事件 做一些处理console.log(111) */
                    if(typeof callback == "function") callback();//回调函数
                }
            },
            eventFun: function(){
                clearInterval(testUser);
                objTime.init = 0;
                testUser = setInterval(objTime.time, 1000);
            }
        }
        var testUser = setInterval(objTime.time, 1000);
        var body = document.querySelector('html');
        body.addEventListener("click", objTime.eventFun);
        body.addEventListener("keydown", objTime.eventFun);
        body.addEventListener("mousemove", objTime.eventFun);
        body.addEventListener("mousewheel", objTime.eventFun);
    }
    Vue.prototype.MathRand=function(n){//随机数几位
        if(n){
            var Num="";
            for(var i=0;i<n;i++){
                Num+=Math.floor(Math.random()*10);
            }
            return Num
        }
    }
    Vue.prototype.getVCode=function(){//获取验证码
        /*
         ip  js获取的ip
         Randb  注意 data 声明Randb变量
         * */
        var imgsr='';
        this.Randb=this.MathRand(8);
        imgsr=this.global.getVCode_port+'?random8='+this.Randb+'&width=113'+'&height=36'+'&fontsize=20';
        if(this.$refs.vcode){
            this.$refs.vcode.setAttribute('src',imgsr);
        }else{
            console.log('this.$refs.vcode:'+this.$refs.vcode);
        }
    }
    Vue.prototype.objArrdis=function(arr,key){// 对象数组去重
        //key  检查的key值  string
        var res = [];
        var obj = {};
        for(var i in arr){
            // var b=JSON.stringify(arr[i]);
            var b=arr[i][key];
            if(!obj[b]){
                obj[b]=true;
                res.push(arr[i]);
            }
        }
        return res;
    }
    Vue.prototype.isVcode=function(randb,vCode,callback){//验证码比对
        /*
         ip  js获取的ip
         randb  传入的随机数
         vCode  输入的验证码
         callback  验证码比对成功的回调函数
         */
        var fomedata=new FormData();
        var self=this;
//		console.log(ip,randb,vCode);
        if(randb&&vCode){
            fomedata.append('random8',randb);
            fomedata.append('vCode',vCode);
            this.$http.post(this.global.isVCodeRight_port,fomedata,this.global.config).then(function(res){
                if(res.data.state=='success'){
                    console.log(res.data.message);
                    if(typeof callback == "function") callback();//回调函数
                }else{
                    self.viewAlert('infor',res.data.message);
                }
            }).catch(function(err){
            	self.viewAlert('err','网络错误！');
            })
        }
    }
    Vue.prototype.getVCode2=function(expTime,width,height,fontSize){//获取验证码
        /*
         expTime  过期时间
         imgKey  注意 data 声明imgKey变量
         * */
        var opt={
                expTime:expTime||120,
                width:width||113,
                height:height||36,
                fontSize:fontSize||20,
            },
            self=this;
        var imgsr='data:image/png;base64,';
        rqs=this.global.getVCode2_port+'?expTime='+opt.expTime+'&width='+opt.width+'&height='+opt.height+'&fontSize='+opt.fontSize+'&t='+ (new Date()).valueOf();
        this.$http.get(rqs).then(function(res){
            if(res.data.statu=='success'){
                self.imgKey=res.data.key;
                imgsr+=res.data.jpePic;

                if(self.$refs.vcode){
                    self.$refs.vcode.setAttribute('src',imgsr);
                    self.$refs.vcode.setAttribute('data-bd-imgshare-binded',1);//兼容ie
                }else{
                    console.log('this.$refs.vcode:'+self.$refs.vcode);
                }
            }
        }).catch(function(err){
//      	self.viewAlert('err','网络错误！');
        })
    }
    Vue.prototype.isVcode2=function(key,vCode,success,erro){
        /*
       key   get的key值
       vCode  输入的验证码
       callback  验证码比对成功的回调函数
       */
        var fomedata=new FormData();
        var self=this;
        if(key&&vCode){
            fomedata.append('key',key);
            fomedata.append('vCode',vCode);
            this.$http.post(this.global.isVCodeRight2_port,fomedata,this.global.config).then(function(res){
                if(typeof success == "function") success(res);//回调函数
            }).catch(function(err){
            	self.viewAlert('err','网络错误！',erro);
            })
        }
    }
    Vue.prototype.getPhoneVCode=function(id,phone,name,newdata){//获取手机验证码
        var adb=new Object;
        var nm=name||'FindTelTransactionPasswordRequest';//默认获取交易密码的认证码
        var self=this;
        if(id&&phone){
            adb={
                name:nm,
                Data:{
                    Id:id,
                    Tel:phone
                }
            }
			if(newdata){
				for(var i in newdata){
				    adb.Data[i]=newdata[i];
				}
			}
            this.$http.post(this.global.HandlerAsync_port,adb).then(function(res){
                if(res.data.errorCode==1){
                    self.viewAlert('success','短信验证码发送成功！');
                }else{
                	self.viewAlert('infor',res.data.errorInfo);
                }
            }).catch(function(err){
            	self.viewAlert('err','网络错误！');
            })
        }
    }
    Vue.prototype.isPhoneVCode=function(tel,vcd,success,callback,type){//手机验证码验证
        /* tel,vcd 必传*/
        var adb=new Object;
        var self=this;
        var tp=type||0;// :0交易密码验证,1:IP策略验证 2:找回密码 3修改手机号
        if(tel&&vcd){
            adb={
                name:'TelTransactionVerificationRequset',
                Data:{
                    Tel:tel,
                    ValidateCode:vcd,
                    type:tp
                }
            }
            this.$http.post(this.global.HandlerAsync_port,adb).then(function(res){
                if(res.data.errorCode==1){
                    if(typeof success == 'function') success(res);
                }else{
                    self.viewAlert('infor',res.data.errorInfo);
                    if(typeof callback == 'function') callback();
                }
            }).catch(function(err){
            	self.viewAlert('err','网络错误');
            	if(typeof callback == 'function') callback();
            })
        }
    }
    Vue.prototype.GetRequest=function(){ //取url传值
        var url = location.search;//获取url中"?"符后的字串
        var theRequest = new Object();
        if(url.indexOf("?") != -1) {
            var str = url.substr(url.indexOf("?"));
            strs = str.split("&");
            for(var i = 0; i < strs.length; i++) {
                theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
            }
        }
        return theRequest;
    }
    Vue.prototype.getQueryString=function(name) {
        var reg = new RegExp(name +"=([^&]*)");
        var r = window.location.href.match(reg);
        if(r!=null)return  unescape(r[1]); return null;
    }
    Vue.prototype.getUserIP=function(onNewIP){//获取本地ip地址
        /*-----------调用方法------------*/
        /*		getUserIP(function(ip){
                 alert("Got IP! :" + ip);
             });
        */
        var myPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
        var pc = new myPeerConnection({
                iceServers: []
            }),
            noop = function() {},
            localIPs = {},
            ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g,
            key;

        function iterateIP(ip) {
            if (!localIPs[ip]) onNewIP(ip);
            localIPs[ip] = true;
        }
        //create a bogus data channel
//      pc.createDataChannel("");		ie is not exp

        // create offer and set local description
        pc.createOffer().then(function(sdp) {
            sdp.sdp.split('\n').forEach(function(line) {
                if (line.indexOf('candidate') < 0) return;
                line.match(ipRegex).forEach(iterateIP);
            });

            pc.setLocalDescription(sdp, noop, noop);
        }).catch(function(reason) {
            // An error occurred, so handle the failure to connect
        });

        //sten for candidate events
        pc.onicecandidate = function(ice) {
            if (!ice || !ice.candidate || !ice.candidate.candidate || !ice.candidate.candidate.match(ipRegex)) return;
            ice.candidate.candidate.match(ipRegex).forEach(iterateIP);
        };
    }
    Vue.prototype.getTab=function(name){  //根据名称查找对应的Tab页。  
        //warp  是否取外层name
        for(var i=0; i<this.mainTabs.length; i++){  
            if(this.mainTabs[i].childTxt==name)return this.mainTabs[i];
        }  
        return null;//没有找到  
    }
    Vue.prototype.pageJumps=function(name,path,dat){//tab页跳转页面
        /*
            name(必传)--跳转页名称 类型：string       path(必传)--跳转页路由地址  类型：string
            dat--路由传值
            mainTabs 同步状态(必须添加以下代码)
            export default { 
                props:{//接收 传值
                    tabary: Array,
                    required: true
                },
                data(){
                    return{
                        mainTabs:this.tabary,
                    }
                }
            }
        */
        var tab = this.getTab(name);
        if(tab==null){  
            var mi ={
                childTxt:name,
                path:path,
            };
            var oj={};
            var mi=Object.assign(oj,mi,{show:true,spin:true});
            this.mainTabs.push(mi);
        }  
        else{
            tab.show=true;
        }
        this.$emit('dataChanged',this.mainTabs,name);
        this.$router.push({path:path,query:dat?dat:{}});
    }
    Vue.prototype.reqMes=function(content){//变量存调       关闭调变量
        var content=content||'请求中...',
            self=this;
        this.$emit('comtion',false);
    	this.$Message.destroy();
        this.$Message.config({top: 200});
        this.$Message.loading({
            top: 50,
            content:content,
            duration: 0
        })
        const mes2=function(){
            self.$emit('comtion',true);
            self.$Message.destroy();
        };
        return mes2;
    }
    Vue.prototype.psdChange=function(id,oldpsd,newpsd,success,erro){//密码修改
        var self=this;
        var Data=new Object;
        if(id&&oldpsd&&newpsd){
            Data={
                name:'UpdateLoginPasswordRequset',
                Data:{
                    Id:id,	//guid
                    OldPassword:oldpsd,
                    NewPassword:newpsd
                }
            }
            var reqms=this.reqMes();
            this.$http.post(this.global.HandlerAsync_port,Data).then(function(res){
                if(res.data.errorCode==1){
                	self.viewAlert('success','修改密码成功！',success);
                }else{
                	self.viewAlert('infor',res.data.errorInfo);
                }
                reqms();
            }).catch(function(err){
            	reqms();
            	self.viewAlert('err','网络错误！',erro);
            })
        }else{
            console.log('id:'+id,'oldpsd:'+oldpsd,'newpsd:'+newpsd);
        }
    }
    Vue.prototype.viewAlert=function(type,infor,success){
        var title = '消息提示';
        var content =infor;
        switch (type) {
            case 'infor':
            var res=this.$Modal.info({
                title: title,
                content: content,
                onOk:function(){
                	if(typeof success == "function") success();
                }
            });
            break;
            case 'success':
                var res=this.$Modal.success({
                    title: title,
                    content: content,
                    onOk:function(){
                    	if(typeof success == "function") success();
                    }
                });
                break;
            case 'err':
                var res=this.$Modal.error({
                    title: title,
                    content: content,
                    onOk:function(){
                    	if(typeof success == "function") success();
                    }
                });
                break;
            case 'confirm':
                var res=this.$Modal.confirm({
                    title:title,
                    content:content,
                    onOk: () => {
                        if(typeof success == "function") setTimeout(success,300);
                    },
                    onCancel: () => {
                        // this.$Message.info('Clicked cancel');
                    }
                });
                break;        
        }
    }
    Vue.prototype.accAdd=function(arg1,arg2){
    	var r1, r2, m, c;
	    try {
	        r1 = arg1.toString().split(".")[1].length;
	    }
	    catch (e) {
	        r1 = 0;
	    }
	    try {
	        r2 = arg2.toString().split(".")[1].length;
	    }
	    catch (e) {
	        r2 = 0;
	    }
	    c = Math.abs(r1 - r2);
	    m = Math.pow(10, Math.max(r1, r2));
	    if (c > 0) {
	        var cm = Math.pow(10, c);
	        if (r1 > r2) {
	            arg1 = Number(arg1.toString().replace(".", ""));
	            arg2 = Number(arg2.toString().replace(".", "")) * cm;
	        } else {
	            arg1 = Number(arg1.toString().replace(".", "")) * cm;
	            arg2 = Number(arg2.toString().replace(".", ""));
	        }
	    } else {
	        arg1 = Number(arg1.toString().replace(".", ""));
	        arg2 = Number(arg2.toString().replace(".", ""));
	    }
	    return (arg1 + arg2) / m;
    }
    Vue.prototype.lengAuth=function(v){
    	//6>&<20
		if(typeof v == 'object'){
			if(v.value){
				if(v.value.length>=6&&v.value.length<=20){
					
			  	}else{
			  		this.viewAlert('infor',"密码长度必须大于5位,小于21位!",function(){
			  			v.value='';
			  		});
			  	}
			}
		}else if(typeof v == 'string'){
			if(v.length>=6&&v.length<=20){
		  		return true;
		  	}else{
		  		this.viewAlert('infor',"密码长度必须大于5位,小于21位!");
		  		return false;
		  	}
		}
    }
    Vue.prototype.accMul=function(arg1,arg2){//小数乘法
        var m=0,s1=arg1.toString(),s2=arg2.toString();
        try{m+=s1.split(".")[1].length}catch(e){}
        try{m+=s2.split(".")[1].length}catch(e){}
        return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m)
    }
    Vue.prototype.accDiv=function(arg1,arg2) {//小数除法
        var t1 = 0, t2 = 0, r1, r2;
        try { t1 = arg1.toString().split(".")[1].length } catch (e) { }
        try { t2 = arg2.toString().split(".")[1].length } catch (e) { }
        r1 = Number(arg1.toString().replace(".", ""))
        r2 = Number(arg2.toString().replace(".", ""))
        return this.accMul((r1 / r2),Math.pow(10, t2 - t1));
    }
    Vue.prototype.calUnit=function(val,type){//进位 保留2位小数 不4舍5入
        var y=100000000,qw=10000000,w=10000,g=0;
        var rst={
            price:0,
            unit:''
        };
        if(val){
            if(parseInt(val)>=y){
                var run=this.accDiv(Number(val),y);
                rst.price= Math.floor(run * 100) / 100;
                rst.unit='亿';
            }else if(parseInt(val)>=w){
                var run=this.accDiv(Number(val),w);
                rst.price= Math.floor(run * 100) / 100;
                rst.unit='万';
            }else if(parseInt(val)>=g){
                var run=this.accDiv(Number(val),1);
                rst.price= Math.floor(run * 100) / 100;
                rst.unit='';
            }
        }
        return rst;
    }
    Vue.prototype.psdInsity=function(put,show){
		this.input=typeof put=='object'?put:document.querySelector(put),
		this.show =typeof show=='object'?show:document.querySelectorAll(show),
		this.name = "current",
		this.name1 = "current1",
		this.name2 = "current2",
		this.vailded = function() {
			var _this = this;
			this.input.addEventListener("keyup", function(){
				// var div=$("#fen");
				//var tips=$("#tips");
				var f = 0; //每次都清空
				var vals =this.value;
				//数组
				var num;
				var en;
				var fh;
				var jl;
				//得分
				var lenF;
				var numF;
				var enF;
				var fhF;
				var jlF;
				//判断长度
				if(vals.length > 0 && vals.length <= 4) {
					lenF = 5;
				} else if(vals.length > 4 && vals.length <= 7) {
					lenF = 10;
				} else if(vals.length >= 8) {
					lenF = 25;
				}
				//判断数字
				num = vals.match(/\d/g) ? vals.match(/\d/g) : 0;
				if(num == 0) {
					numF = 0;
				} else if(num.length == 1) {
					numF = 10;
				} else if(num.length >= 2) {
					numF = 20;
				}
				//判断字母长度
				en = vals.match(/[A-Za-z_]/g) ? vals.match(/[A-Za-z_]/g) : 0;
				if(en == 0) {
					enF = 0;
				} else if(en.length == 1) {
					enF = 10;
				} else if(en.length >= 2) {
					enF = 20;
				}
				//匹配符号
				fh = vals.match(/\W/g) ? vals.match(/\W/g) : 0;
				if(fh == 0) {
					fhF = 0;
				} else if(fh.length == 1) {
					fhF = 10;
				} else if(fh.length >= 2) {
					fhF = 25;
				}
				//奖励
				if(/\d+/g.test(vals) && /[a-z_]+/g.test(vals)) {
					jlF = 2;
				}
				if(/\d+/g.test(vals) && /[a-z_]+/g.test(vals) && /\W+/g.test(vals)) {
					jlF = 3;
				}
				if(/\d+/g.test(vals) && /[A-Z]+/g.test(vals) && /[a-z_]+/g && /\W+/g.test(vals)) {
					jlF = 5;
				}
				if(jlF == undefined || jlF == "NaN" || jlF == "undefined") {
					jlF = 0;
				}
				var count = Number(lenF) + Number(numF) + Number(enF) + Number(fhF) + Number(jlF);
				//切换“弱” “中” “强”
				if(count >= 0 && count < 60) {
					for(var i=0;i<_this.show.length;i++){
						_this.show[i].className='';
						_this.show[0].className=_this.name;
					}
				} else if(count < 90 && count >= 60) {
					for(var i=0;i<_this.show.length;i++){
						_this.show[i].className='';
						_this.show[0].className=_this.name1;
						_this.show[1].className=_this.name1;
					}
				} else if(count > 90) {
					for(var i=0;i<_this.show.length;i++){
						_this.show[i].className='';
						_this.show[i].className=_this.name2;
					}
				} else {
					for(var i=0;i<_this.show.length;i++){
						_this.show[i].className='';
					}
				}
			},false)
		};
    }
    Vue.prototype.tallGeese=function(fn,idx,tim){
		var tim=tim||500;
		clearTimeout(this.isPage);
		this.isPage=setTimeout(function(){
    		if(typeof fn=='function')fn(idx);
    		console.log('1:'+idx);
    	},tim);
	}
    Vue.prototype.tabSize=function(xscl){//tab 拖动列宽
        // 调用 this.tabSize().init('tabSize');
        // xscl 是否有横向滚动条  true false;
        var tabSize = tabSize || {},
            xscl=xscl?xscl:true;
        tabSize.init = function (dom) {
            var i,
                self,
                domid=document.querySelector(dom);
            table = domid.querySelectorAll('table'),
                header = table[0].rows[0],
                length = header.cells.length,
                cgp= table[0].querySelectorAll('colgroup col');
            cgp2=table[1].querySelectorAll('colgroup col');
            for (i = 0; i < length; i++){
                header.cells[i].index=i;
                header.cells[i].onmousedown = function (event) {
                    self = this;
                    if (event.offsetX > self.offsetWidth - 10) {
                        self.mouseDown = true;
                        self.oldX = event.x;
                        self.oldWidth = self.offsetWidth;
                        cgp[length-1].oldWidth=cgp[length-1].width;
                    }
                };
                header.cells[i].onmousemove = function (event) {
                    if (event.offsetX > this.offsetWidth - 10) {
                        this.style.cursor = 'col-resize';
                    } else {
                        this.style.cursor = 'default';
                    }
                    if (self == undefined) {
                        self = this;
                    }
                    if (self.mouseDown != null && self.mouseDown == true) {
                        self.style.cursor = 'default';
                        if (self.oldWidth + (event.x - self.oldX) > 0){
                            cgp[self.index].width=self.oldWidth + (event.x - self.oldX);
                            cgp2[self.index].width=self.oldWidth + (event.x - self.oldX);
                            if(!xscl){
                                cgp[length-1].width= Number(cgp[length-1].oldWidth)-(event.x - self.oldX);
                                cgp2[length-1].width= Number(cgp[length-1].oldWidth)-(event.x - self.oldX);
                            }
                        }
                        self.style.width = self.width;
                        self.style.cursor = 'col-resize';
                    }
                    return false;
                };
            }
            document.onmouseup = function () {
                if(self){
                    self.mouseDown = false;
                    self.style.cursor = 'default';
                }
            };
        };
        return tabSize;
    }
    Vue.prototype.closeModal=function(v){//关闭model   v 变量 类型string
        // @click="closeModal('addBankcard.bindBank')"   @click="closeModal('addPass')"  
        var b=v.split('.');
        if(b.length>1){
            //组装js语句
            var str='this[b[0]]';
            for(var i=0;i<b.length;i++){
                if(i>0){
                    str+='[b['+i+']]';
                }
            }
            str+='=false';
            eval(str);
        }else{
            this[v]=false;
        }
    }
    Vue.prototype.showModal=function(v){//打开model   v 变量 类型string 
        // this.showModal('addBankcard.bindBank')  this.showModal('addPass')
        var b=v.split('.');
        if(b.length>1){
            //组装js语句
            var str='this[b[0]]';
            for(var i=0;i<b.length;i++){
                if(i>0){
                    str+='[b['+i+']]';
                }
            }
            str+='=true';
            eval(str);
        }else{
            this[v]=true;
        }
    }
    Vue.prototype.lengAuth=function(v,success,callback){//密码长度验证
    	//6>&<20
		if(typeof v == 'object'){
			if(v.value){
				if(v.value.length>=6&&v.value.length<=20){
                    if(typeof success=='function')success();
			  	}else{
			  		this.viewAlert('infor',"密码长度必须大于5位,小于21位!",function(){
			  			// v.value='';
                      });
                      if(typeof callback=='function')callback();
			  	}
			}
		}else if(typeof v == 'string'){
			if(v.length>=6&&v.length<=20){
		  		return true;
		  	}else{
		  		this.viewAlert('infor',"密码长度必须大于5位,小于21位!");
		  		return false;
		  	}
		}
    }
    Vue.prototype.tallBtn=function(tim,fn){//按钮 函数防抖
		var tim=tim||500;
		clearTimeout(this.button);
		this.button=setTimeout(function(){
    		if(typeof fn=='function')fn();
    	},tim);
    }
    Vue.prototype.psdView=function(e){//查看密码
        var tar=e.target||e.srcElement,
            put=tar.parentNode.querySelector('.ivu-input-wrapper input');
        tar.className=tar.className=='shmg'?'hdmg':'shmg';
        if(put.getAttribute('type')=='password'){
            put.setAttribute('type','text');
        }else{
            put.setAttribute('type','password');
        }
    }
};