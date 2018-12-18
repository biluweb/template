<template>
	<div class="back_pass_form4_display">
		<form action="" class="login_form">
			<div class="form_title_wrap">
				<p class="form_title">密码找回</p>
			</div>
			<div class="form_input_wrap psdInsity">
				<div class="form_input">
					<img src="../assets/pass_icon.png" alt="">
					<p>请输入新密码</p>
				</div>
				<Input placeholder="请输入..." type="password" @on-keyup="show" @on-blur="psdlver" class="psdlver form_input_context" v-model="user.backPassImportNewPwd"/>
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
					<p>请确认新密码</p>
				</div>
				<Input placeholder="请输入..." type="password" class="form_input_context" @on-blur="psdlver" v-model="user.backPassAffirmNewPwd"/>
			</div>
			<button class="login_btn BackPass" type="button" @click="submitBackPwdFinish()">完成</button>
		</form>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				vadtrue:false,
				varId:'',
				varId2:'',
				user: {
					backPassImportNewPwd: '',
					backPassAffirmNewPwd: '',
				}
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
			emailGetpsd(){//邮件找回  submitBackPwdFinish
				var self=this;
				if(this.user.backPassImportNewPwd&&this.user.backPassAffirmNewPwd){
					if(this.user.backPassImportNewPwd===this.user.backPassAffirmNewPwd){
						var dat={
							name:"UpdatePasswordByFindRequest",
							Data:{
								ValidateCode:this.varId,
								Password:this.$md5(this.user.backPassAffirmNewPwd)
							}
						}
						this.$http.post(this.global.HandlerAsync_port,dat).then(function(res){
							if(res.data.errorCode==1){
								self.viewAlert('success','密码设置成功！',function(){
									self.$router.push({path: '/'});
								});
							}else{
								self.viewAlert('infor',res.data.errorInfo);
							}
						}).catch(function(err){
							self.viewAlert('err','网络错误！');
						})
					}else{
						self.viewAlert('infor','两次密码不一致！');
					}
				}else{
					self.viewAlert('infor','信息不完整！');
				}
			},
			phoneGetpsd() {//确认找回密码
				var self=this;
				if(this.user.backPassImportNewPwd&&this.user.backPassAffirmNewPwd){
					if(this.user.backPassImportNewPwd===this.user.backPassAffirmNewPwd){
						var dat={
							name:"UpdatePasswordByFindRequest",
							Data:{
								ValidateCode:this.varId2,
								Password:this.$md5(this.user.backPassAffirmNewPwd)
							}
						}
						this.$http.post(this.global.HandlerAsync_port,dat).then(function(res){
							if(res.data.errorCode==1){
								self.viewAlert('success','密码设置成功！',function(){
									self.$router.push({path: '/'});
								});
							}else{
								self.viewAlert('infor',res.data.errorInfo);
							}
						}).catch(function(err){
							self.viewAlert('err','网络错误！');
						})
					}else{
						self.viewAlert('infor','两次密码不一致！');
					}
				}else{
					self.viewAlert('infor','信息不完整！');
				}
			},
			submitBackPwdFinish(){
				if(this.varId2){//手机找回
					this.phoneGetpsd();
				}else if(this.varId){
					this.emailGetpsd();
				}	
			}
		},
		created: function() {
			//邮件确认传值
			if(this.getQueryString('id')){//url id值
				this.varId=this.getQueryString('id').replace(/[/#}\|\\\*^%$}#@\-]/g,""); //   正则替换 /#}
			}
			if(this.getQueryString('phone')){//手机找回
				this.varId2=this.getQueryString('phone').replace(/[/#}\|\\\*^%$}#@\-]/g,""); //   正则替换 /#}
				console.log(this.varId2);
			}
			
		},
		updated:function(){

		}
};
</script>