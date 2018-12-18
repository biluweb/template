<template>
    <div class="register_form_setPass_display">
        <form action="" class="register_form">
            <div class="form_title_wrap">
                <p class="form_title">设置信息</p>
            </div>
            <p class="register_setPass_title">完成以下信息并确定即可完成注册</p>
            <div class="form_input_wrap psdInsity">
                <div class="form_input">
                    <img src="../assets/pass_icon.png" alt="">
                    <p>请输入新密码</p>
                </div>
                <Input type="password" @on-blur="psdlver" @on-keyup="show" placeholder="请输入新密码" class="form_input_context psdlver" v-model="user.zcPass" />
                <!--psdver-->
                <p class="txtvai trow" v-show="vadtrue">长度为6-20位,字母(区分大小写),数字,符号。</p>
                <div class="vaild" v-show="vadtrue">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
            <div class="form_input_wrap">
                <div class="form_input">
                    <img src="../assets/pass_icon.png" alt="">
                    <p>请确定新密码</p>
                </div>
                <Input type="password" @on-blur="psdlver" placeholder="请再次输入新密码" class="form_input_context" v-model="user.zcPassAffirm" />
            </div>
            <button class="login_btn login_btn_setPass" type="button" @click="submitPass()">提交</button>
        </form>
    </div>
</template>

<script>
	export default {
		data() {
			return {
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
					backPwdSecurity: '',
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
				mail_change3: false,
				vadtrue:false,
			};
		},
		mounted(){//挂载结束
			var psdyz=new this.psdInsity('.psdlver input','.vaild span');
        	psdyz.vailded();
        },
		methods: {
			show(e){
        		var evtTarget = e.target || e.srcElement;
				if(evtTarget.value.length!=0){
					this.vadtrue=true;
				}else{
					this.vadtrue=false;
				}
        	},
			psdlver(e){
				var evtTarget = e.target || e.srcElement;
				this.lengAuth(evtTarget);
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
							Password:self.$md5(self.user.zcPassAffirm)
						}
					};
					var reqms=self.reqMes();
					self.$http.post(self.global.HandlerAsync_port,Data).then(function(res){
	                   if(res.data.errorCode==1){
							self.viewAlert('infor','注册成功！',function(){
								self.$router.push({
									path: '/'
								});
							});
						}else{
							self.viewAlert('infor',res.data.errorInfo);
						}
						reqms();
					}).catch(function(err){
						reqms();
						self.viewAlert('err','网络错误！');
					})
				}
			}
		},
		created() {
			var self = this;
			if(this.getQueryString('id')){//url id值
				this.Emaid=this.getQueryString('id').replace(/[/#\|\\\*^%$#@\-]/g,""); //   正则替换 /#
			}
		},
		updated(){

		}
};
</script>