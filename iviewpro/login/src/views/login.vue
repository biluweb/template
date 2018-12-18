<template>
    <div>
    <div class="login_display" v-show="dl_Show">
                <form action="" class="login_form">
                    <div class="form_title_wrap">
                <p class="form_title">登录</p>
            </div>
            <div class="form_input_wrap">
                <div class="form_input">
                    <img src="../assets/user_icon.png">
                    <p>请输入您的邮箱</p>
                </div>
                <Input placeholder="请输入..." class="form_input_context" v-model="user.dlLoginEmailTwo"/>
            </div>
            <div class="form_input_wrap">
                <div class="form_input">
                    <img src="../assets/pass_icon.png">
                    <p>密码</p>
                </div>
                        <Input type="password" element-id="form_input_psd" placeholder="请输入..." @on-blur="psdlver" class="form_input_context" v-model="user.dlLoginPwdTwo"/>
            </div>
					<div class="form_input_wrap">
                <div class="form_input">
                    <img src="../assets/code_icon.png">
                    <p>验证码</p>
                </div>
                <div class="form_input_button">
                    <Input placeholder="请输入..." class="form_input_context_YZM" v-model="user.dlLoginAuthCodeTwo"/>
							<Tooltip content="看不清换一张" placement="right">
				                <img ref="vcode" @click="getVCode2()" class="form_img vcode"/>
				            </Tooltip>
							<!--<button class="form_img" @click="getVCode()"></button>-->
							<!--<button class="form_img" v-if="mail_change1" @click="mailTimerStart()">{{mail_ctext}}</button>-->
                    <input type="button" class="backPassBtn" disabled v-model="mail_s" v-if="mail_change2"/>
                </div>
            </div>
            <div class="remember_pass_wrap">
                    	<!-- <Checkbox v-model="rememberPassword" @on-change='remember'>记住密码</Checkbox> -->
            </div>
            <button class="login_btn" type="button" @click="submitForm">立即登录</button>
            <div class="login_more_forgetPass">
                <a class="grey_link" @click="passChange">忘记密码?</a>
            </div>
        </form>
        <div class="form_enroll login_display">
            <span class="form_enroll_no">还未注册账号，</span><a class="form_enroll_now" @click="loginChange()">立即注册></a>
        </div>
    </div>

    <div class="register_form_display" v-if="zc_Show">
            
                <form action="" class="register_form register_form_Update" @submit.prevent="submit">
                    <div class="form_title_wrap">
                <p class="form_title">注册</p>
            </div>
            <div class="merchant_type_No" v-if="mail_change1">
                <p class="merchant_type_On">口袋支付将发送一封验证邮件到你的邮</p>
                <div class="merchant_type_Nex">
                    <p class="merchant_type_font">箱，此邮箱将作为登录用户名</p>
                </div>
            </div>
                   
                    <div class="merchant_type"  v-if="mail_change2">
						<p class="merchant_type_firstLine a">注册验证邮件已发送<span class="merchant_type_Color">{{ user.mail }}</span></p>
                        <p class="merchant_type_fontTwo a">如果没有收到,请检查垃圾邮件</p>
                        <p class="merchant_type_fontTwo a">如果还没收到,请重新填写邮件</p>
                    </div>
                    <div class="form_input_wrap" v-if="mail_change1">
                        <div class="form_input">
                            <img src="../assets/user_icon.png" alt="">
                            <p>请输入邮箱地址</p>
                        </div>
						<Input placeholder="请输入..." class="form_input_context" v-model="user.mail" />
                    </div>
                    <div class="form_input_zc" v-if="mail_change2">
						<Input placeholder="请输入..." class="form_input_context" disabled v-model="user.mail" />
                    </div>
                    <div class="agree_register">
                        <Checkbox :checked.sync="rememberPassword">我已阅读并同意<a class="agree_register_a" href="javascript:;">《服务协议》</a>和<a class="agree_register_a" href="javascript:;">《隐私权协议》</a></Checkbox>
                    </div>
					<input type="submit" class="login_btn" v-model="sendmailstatus" v-if="mail_change1" />
                    <input type="button" class="Disabel_btn" disabled v-model="mail_s" v-if="mail_change2"/>
                </form>
                <div class="login_more" v-if="mail_change1">
                    <p href=""></p>
                    <p href="" class="blue_link" @click="yetUserLog">已有账号 ? <a href="javascript:;" class="login_more_Register">点击登录 ></a></p>
                </div>
            </div>

			<div class="back_pass_form1_display" v-if="backPwdOne_show">
				<form action="" class="back_pass_form1 back_pass_form_update">
                    <div class="form_title_wrap">
					<p class="form_title">找回密码</p>
				</div>
					<div class="form_input_wrap">
						<div class="form_input">
							<img src="../assets/user_icon.png" alt="">
							<p>请输入您的邮箱地址</p>
						</div>
						<div class="form_input_button">
							<Input placeholder="请输入..." class="form_pass_input" v-model="user.backPwdSecurity" />
						</div>
					</div>
					<input type="button" class="login_btn login_btn_backPass" @click="backpwdNextOne()" value="下一步">
				</form>
			</div>

			<div class="back_pass_form2_display" v-if="backPwdTwo_show">
				<form action="" class="back_pass_form1 back_pass_form_update">
                    <div class="form_title_wrap">
					<p class="form_title">找回密码</p>
				</div>
					<div class="a">
						<p class="register_backPass_title">Hi,<span class="register_backPass_space">{{user.backPwdSecurity}}</span></p>
						<p class="register_backPass_SecondLine">验证邮件已成功发送，请登入邮箱查收邮件进行确认操作</p>
					</div>
					<!--<a class="register_backPass_email">没有收到?</a>-->
					<!--<input type="submit" class="login_btn login_btn_BackPass2" @click="mailTimerStart()" value="发送">-->
					<input type="button" class="login_btn login_btn_BackPass2" v-model="sendmailstatus" @click="resendtmail()" v-if="mail_change1" />
					<input type="button" class="Disabel_btn backPassTwoBtn" disabled v-model="mail_s" v-if="mail_change2" />
				</form>
			</div>
    </div>
    </div>
</template>

<style>
   .login_back_logo{
       background-image: url("../assets/login_back_logo.png");
       width: 250px;
       height: 250px;
       position: absolute;
       right: 58px;
       bottom: 170px;
       -webkit-animation:start 10s infinite linear;
       animation:start 10s infinite linear;
       /*-webkit-animation-name: start;*/
       /*-webkit-animation-duration: 1s; !*动画持续时间*!*/
   }
   @-webkit-keyframes start{
       0%{ transform:rotate(0deg); }
       100%{ transform:rotate(-360deg); }
   }
   @keyframes start{
       0%{ transform:rotate(0deg); }
       100%{ transform:rotate(-360deg); }
   }
   .form_img{
       background-color: white;
       color: #65778a;
		margin-left: 10px;
		/*border: 0px;*/
		/*width: 50%;*/
   }
	.form_img.vcode{
		padding: 0;
		height: 32px;
		width: 113px;
		/*padding-left:2px;*/
		    border: 1px solid #dddee1;
	}
   .backPassTwoBtn{
       margin-top: 10px;
   }
   .a{
       float: left;
   }
    .login{
        width: 100%;
        height: 100vh;
        background-image: url("../assets/login_back.png");
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        background-size: cover;
    }
    .login_inner_wrap{
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
    }
    .login_form,.register_form,.back_pass_form1{
        background-color: #fff;
        box-shadow: 0px 0px 16px rgba(0,0,0,0.12);
        padding: 40px 40px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        width: 340px;
        box-shadow: 0px 0px 80px #176dc1;
    }
   .register_setPass_title{
       color: #a5a5a5;
   }
   .register_backPass_title{
       color: #a5a5a5;
       font-size: 15px;
       font-family: Microsoft Accor black;
   }
   .register_backPass_space{
       padding-left: 10px;
   }
   .register_backPass_email{
       color: #a6b5c6;
       text-align: left;
       width: 100%;
       padding-top: 45px;
   }
   .register_backPass_SecondLine{
       color: #999999;
       padding-top: 20px;
   }
   .register_form_Update{
   }
    .form_title{
        font-size: 28px;
        color: #465f78;
        text-align: center;
    }
    .merchant_type{
        width: 100%;
        margin-bottom: 10px;
        color: #b2b2b2;
        text-align: center;
        font-size: 13px;
        padding-left: 20px;
    }
    .merchant_type_No{
        width: 100%;
		margin-bottom: 10px;
        color: #b2b2b2;
        text-align: center;
        font-size: 13px;
    }
    .merchant_type_On{
        padding-left: 12px;
    }
    .merchant_type_Color
    {
        color: #4287d7;
    }
    .merchant_type_Nex{
    }
    .merchant_type_font{
        font-size: 13px;
        width: 222px;
    }
   .merchant_type_fontTwo{
       font-size: 14px;
   }
   .merchant_type_firstLine{
       text-align: left;
   }
    .merchant_type div{
        width: 50%;
        text-align: center;
        font-size: 16px;
        cursor: pointer;
    }
    .form_input_wrap{
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        padding-top: 10px;
    }
   .form_input{
        width: 410px;
         }
    .form_input_button{
        display: flex;
        flex-direction: row;
        width: 100%;
        justify-content: space-between;
    }
    .form_input_button_dl{
        display: flex;
        flex-direction: row;
        width: 100%;
        justify-content: space-between;
    }
    .form_input{
        display: flex;
        flex-direction: row;
        align-items: center;
		padding-left: 100px;
        color: #a6b5c6;
    }
    .form_input_zc{
        display: flex;
        flex-direction: row;
        align-items: center;
        color: #a6b5c6;
        width: 100%;
    }
    .form_input_wrap img{
        padding-right: 5px;
    }
    .form_input_wrap p{
        padding: 10px 10px;
        width: 300px;
    }
    .form_input_context{
    }
    .form_input_context_YZM{
        width: 65%;
    }
    .remember_pass_wrap{
        /* width: 93%;
        color: #65778a; */
        margin:10px 0 10px 0;
    }
    .agree_register{
        width: 280px;
        margin:10px 0 10px 20px;
        color: #65778a;
        font-size: 10px;
    }
    .agree_register_a{
        color:#35c8e6;
    }
    .login_btn{
        width: 100%;
        padding: 5px 0;
        background-color: #1976d2;
        border-radius: 3px;
        border: none;
        color: #fff;
        font-size: 15px;
    }
   .login_btn_backPass{
		margin-top: 40px;
   }
   .login_btn_BackPass2{
       margin-top: 10px;
   }
    .login_btn_setPass{
        margin-top: 35px;
    }
    .Disabel_btn{
        width: 99%;
        padding: 5px 0;
        background-color: #eee;
        border-radius: 3px;
        border: none;
        color: #333;
        font-size: 15px;
        cursor:not-allowed;
    }
    .backPassBtn{
		cursor:not-allowed;
		border: none;
		width: 153px;
		padding: 5px 0;
		background-color: #eee;
		border-radius: 3px;
		margin-left: 10px;
		color: #333;
		font-size: 15px;
    }
    .login_more_forgetPass{
        width: 95%;
        text-align: right;
        padding-top: 10px;
        font-family: Microsoft Accor black;
    }
    .login_more_opacity{
        opacity:0;
    }
    .login_more_Register{
        color: white;
		font-size: 12px;
    }
    .login_more .blue_link{
        color: #a6b5c6;
        cursor: pointer;
        padding-top: 20px;
    }
    .login_more{
        color: #a6b5c6;
        cursor: pointer;
        text-align: center;
    }
   .grey_link{
       color: #b3bfce;
   }
    .form_enroll{
        padding-top: 25px;
        text-align: center;
    }
    .form_enroll_no{
        color: #96a4bd;
    }
    .form_enroll_now{
        color: white;
    }
    .BackPass{
        margin-top: 30px;
    }
</style>

<script>
	export default {
		name: 'login',
		data() {
			return {
				mail_s: '60s后重新发送',
				loginShow: true,
				falg:0,
				checked:'',
				rememberPassword: false,
				typeIndex: 0,
				sendmailstatus:'发送验证邮箱',
				imgKey:'',
				Emaid:'',
				user: {
					mail: '',
					zcPass: '',
					zcPassAffirm: '',
					dlLoginEmailOne: '',
					dlLoginPwdOne: '',
					dlLoginAuthCodeOne: '',
					dlLoginEmailTwo: '',
					dlLoginPwdTwo: '',
					dlLoginAuthCodeTwo: '',
					passwordEnroll: '',
					passwordAffirm: '',
					backPwdUsername: '',
					importOldPwd: '',
					affirmNewPwd: '',
					importSecurityCode: '',
					backPassPhone: '',
					backPssSecurityCode: '',
					backPassImportNewPwd: '',
					backPassAffirmNewPwd: '',
				},
				userinfor:null,
				mail_change1: true,
				mail_change2: false,
				mail_ctext:'获取验证码',
				dl_Show: true,
				zc_Show: false,
				setinf:false,
				psdset:false,
				backPwdOne_show: false,
				backPwdTwo_show: false,
				backPwdFour_show: false,
			};
		},
		computed:{
            // subval(){
            //     return this.loginNum;
            // }
        },
        watch:{
        	subval(val){
        		// if(val==3){//登录次数
				// 	this.loginNum+=1;
				// 	this.getVCode2();
				// }
        	}
        },
		mounted(){//挂载结束
			var self=this;
			var apt=document.querySelector('#form_input_psd');
			var isEnter;
			apt.addEventListener('keydown',function(event){
				var e = event || window.event || arguments.callee.caller.arguments[0];
				clearTimeout( isEnter );
		        isEnter = setTimeout(function () {
					if(e && e.keyCode==13){//回车登陆
						self.submitForm();
					}
		        }, 500);
			},false)
		},
		methods: {
			psdlver(e){
				var evtTarget = e.target || e.srcElement;
				this.lengAuth(evtTarget);
			},
			remember(){
				if(this.rememberPassword){
        			this.setCookie('rememberPsd',true,'d7');
        		}else{
        			this.setCookie('rememberPsd',false,'d7');
        			if(this.getCookie('uEMail')&&this.getCookie('uPwd')){
						this.delCookie('uEMail');this.delCookie('uPwd');
						this.user.dlLoginEmailTwo='';this.user.dlLoginPwdTwo='';
					}
        		}
			},
			findpsd(type,val,success){
				var find=type,self=this,cont=val;
				var dat={
					name:'FindPasswordRequest',
					Data:{
						'Content':val,
						'FindWay':find //0:邮箱,1:手机
					}
				};
				
				this.$http.post(this.global.HandlerAsync_port,dat).then(function(res){
					if(res.data.errorCode==1){
						if(find==1){
							self.viewAlert('success','验证码已发送!');
						}else{
							self.viewAlert('success','邮件已发送!',success);
						}
					}else{
						self.viewAlert('infor',res.data.errorInfo);
					}
				}).catch(function(err){
					self.viewAlert('err','网络错误！');
				})
			},
			emailsend(){//登录
				var self=this;
				var reqms=self.reqMes();
				self.$http.post(self.global.login_port, {"Mail":self.user.dlLoginEmailTwo,"UserType":1,"Password":this.$md5(this.user.dlLoginPwdTwo)}).then(function(res){
					if(res.data.errorCode ==1){
						//用户编号 or 运营商编号
						self.viewAlert('success','登录成功！',function(){
							self.setCookie('OperCode', res.data.result.superiorCode, 'd1');
							window.location.href=self.global.homePage;
						});
					} else {
						self.viewAlert('infor',res.data.errorInfo);
					}
					reqms();
				}).catch(function(err){
					reqms();
					self.viewAlert('err','网络错误！');
				});
				// this.saveAdb();         
			},
			submitForm: function() {
				//登陆
				var self=this;
				if(this.user.dlLoginPwdTwo.replace(/\s+/g,"")){
					if(/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(this.user.dlLoginEmailTwo.replace(/\s+/g,""))){//邮箱正则
						if(this.user.dlLoginAuthCodeTwo){
							this.isVcode2(this.imgKey,this.user.dlLoginAuthCodeTwo,function(res){
								if(res.data.state=='success'){
									self.emailsend();
								}else{
									self.viewAlert('infor',res.data.message);
								}
							});
						}else{
							self.viewAlert('infor','请填写验证码！')
						}
					}else{
						self.viewAlert('infor','请确认邮箱格式！')
					}
				}else{
					self.viewAlert('infor','密码不能为空');
				}
			},
			toggleType(index) {
				this.typeIndex = index;
			},
			psdchange(){	
				//密码修改
				var self=this;
				if(this.user.importOldPwd&&this.user.affirmNewPwd&&this.userinfor.id){
					this.psdChange(this.userinfor.id,this.user.importOldPwd,this.user.affirmNewPwd,function(){
						self.psdset=false;
						self.dl_Show=true;
						self.delCookie('token');
					});
					
					//*-----验证码-------*//
					if(this.user.importSecurityCode){
						this.isVcode2(this.imgKey,this.user.importSecurityCode,function(){
							if(res.data.state=='success'){
								console.log(res.data.message);
							}else{
								self.viewAlert('infor',res.data.message);
							}
						});
					}else{
						self.viewAlert('infor','请输入验证码！');
					}
					
				}else{
					self.viewAlert('infor','信息不完整！');
					console.log('this.userinfor.id:'+this.userinfor.id);
				}
	
			},
			submitPass() {
				//确认注册邮箱
				var self=this;
				if(this.user.zcPass&&this.user.zcPassAffirm&&this.user.zcPass===this.user.zcPassAffirm){
					okpsd();
				}else{
					self.viewAlert('infor','请确认密码是否正确！');
				}
				
				function okpsd(){
					var Data ={
						name:"RegisterConfirmRequest",
						Data:{
							ValidateCode:self.Emaid,
							Password:self.user.zcPassAffirm
						}
					};
					var reqms=self.reqMes();
					self.$http.post(self.global.HandlerAsync_port,Data).then(function(res){
	                   if(res.data.errorCode==1){
							self.viewAlert('infor','注册成功！');
							self.zc_Show = false;
							self.setinf=false;
							self.dl_Show=true;
						}else{
							self.viewAlert('infor',res.data.errorInfo);
						}
						reqms();
					}).catch(function(err){
						reqms();
						self.viewAlert('err','网络错误！');
					})
				}
			},
			loginChange() {
				this.zc_Show = true;
				this.dl_Show = false;
			},
			passChange() {
				this.backPwdOne_show = true;
				this.dl_Show = false;
			},
			yetUserLog() {
				this.dl_Show = true;
				this.zc_Show = false;
			},
			resendtmail(){
				var self=this;
				this.findpsd(0,this.user.backPwdSecurity,function(){
					self.mailTimerStart();
				});
			},
			backpwdNextOne() {
				/*--找回密码--*/
				var self=this;
				if(/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(this.user.backPwdSecurity)) {//mail
					this.findpsd(0,this.user.backPwdSecurity,showmail);
				} else{
					this.viewAlert('infor','输入的格式错误');
					this.user.backPwdSecurity = '';
				}
				function showmail(){
					self.backPwdTwo_show = true;
					self.backPwdOne_show = false;
					self.mailTimerStart();
				}
			},
			submit() {
				//注册
				var self = this;			
				if(/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(this.user.mail)) {
					var Data ={
						name:"RegisterMailRequest",
						Data:{mail:this.user.mail}
					};
					//					debugger;
					/*----------Tips: this.HOME为代理请求  此接口存在跨域问题 发布需注意-----------*/
					var reqms=self.reqMes();
					this.$http.post(this.global.HandlerAsync_port,Data).then(function(res){
                       if(res.data.errorCode==1){
							self.viewAlert('success','邮件发送成功请注意查收！');
							self.mailTimerStart();
						}else{
							self.viewAlert('infor',res.data.errorInfo);
						}
						reqms();
					}).catch(function(err){
						reqms();
						self.viewAlert('err','网络错误！');
					})

				} else {
					self.viewAlert('infor','请确认邮箱格式！');
				}

			},
			mailTimerStart() {
				//计时
				var self = this;
				var timeNum = 60;
	              self.mail_change1=false;
	              self.mail_change2=true;
	              this.sendmailstatus="发送验证邮箱";
	              this.mail_ctext='验证码';
				var timer = setInterval(function(){
					timeNum--;
					self.mail_s=timeNum+'s后重新发送';
					if(timeNum == 0) {
						self.mail_s = 60+'s后重新发送';
						clearInterval(timer);
                      self.mail_change1=true;
                      self.mail_change2=false;
                      self.sendmailstatus="重新发送验证邮箱";
                      self.mail_ctext='重新发送验证码';
					}
				}, 1000);
			},
		},
		created: function() {
			
			
		},
		mounted(){
			this.getVCode2();
		},
		updated:function(){

		}
};
</script>