<template>
	<view class="uni-page-body login-body">
		<view class="describe">
			<text class="msg">登录/注册</text>
			<view class="agreement">
				<text>登录注册表示同意</text>
				<text class="navigate">隐私政策</text>
				<text>及</text>
				<text class="navigate">平台使用协议</text>
			</view>
		</view>
		<!-- 切换登录方式 -->
		<view class="account">
			<view class="section">
				<text class="hot">+86 |</text>
				<input class="phone" type="number" :maxlength="11" v-model="phoneNum" placeholder="请输入手机号" placeholder-class="p-active" />
			</view>
			<view class="section" v-if="isShow || wangjimima">
				<input class="pwd" type="password" :maxlength="18" v-model="password" :placeholder="wangjimima?'请输入新密码':'请输入密码'"  placeholder-class="p-active" />
			</view>
			<view class="section" v-if="!isShow || wangjimima">
				<input class="pwd" type="number" :maxlength="6" v-model="yzm" placeholder="请输入短信验证码" placeholder-class="p-active" />
				<text class="btns" type="default" @tap="getCode" :class="{ isColor: disable != true }">{{ count }}{{ btnMsg }}</text>
			</view>
		</view>
		<view class="box">
			<view class="box-one" @tap="login"><text class="one">登录</text></view>
			<view class="box-two" @tap="loginChange">
				<text class="two">{{ isShow ? '验证码登录' : '密码登录' }}</text>
			</view>
			<view class="point" @tap="passwordold">{{ isShow ? '忘记密码' : '收不到验证码？' }}</view>
		</view>
	</view>
</template>

<script>
export default {
	components: {},
	data() {
		return {
			phoneNum: '',
			yzm: '',
			password: '',
			btnMsg: '',
			isShow: false,
			disable: true,
			count: '获取验证码',
			timer: null,
			isRotate: false,
			wangjimima: false,
		};
	},
	onLoad() {},
	mounted() {},
	methods: {
		passwordold() {
			if (this.isShow) {
				this.wangjimima = true;
			}else {
				this.isShow = true;
				this.wangjimima = false;
			}
		},
		login() {
			//登录
			if (this.isRotate) {
				//判断是否加载中，避免重复点击请求
				return false;
			}
			if (this.phoneNum.length == '') {
				uni.showToast({
					icon: 'none',
					position: 'bottom',
					title: '手机号不能为空'
				});
				return;
			}
			if (this.isShow) {
				if (this.password.length == '') {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: '密码不能为空'
					});
					return;
				}
			} else {
				if (this.yzm.length == '') {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: '验证码不能为空'
					});
					return;
				}
			}

			this.isRotate = true;

			uni.showLoading({
				title: '登录中'
			});
			
			if (this.wangjimima) {
				// forgetPayPassword  forgetPassword
				this.api.home.forgetPassword({
					mobilePhone: this.phoneNum,
					code: this.yzm,
					password: this.password
				}).then( res => {
					this.api.home.login({
						mobilePhone: this.phoneNum,
						code: this.yzm
					}).then(res => {
						console.log(res)
						uni.setStorageSync('userdata', res.data); //存入缓存
						getApp().globalData.userdata = res.data;
						uni.showToast({
							icon: 'success',
							position: 'bottom',
							title: '登录成功'
						});
						uni.$emit('_updatehome');
						uni.hideLoading();
						uni.reLaunch({
							url: '/pages/tabBar/home/home'
						});
					}, rej => {
						console.log(rej)
						this.isRotate = false;
						uni.hideLoading();
					})
				}, rej => {
					this.isRotate = false;
					uni.hideLoading();
				})
			}else {
				if (this.isShow && !this.wangjimima) {
					this.api.home.loginByPassword({
						mobilePhone: this.phoneNum,
						password: this.password
					}).then(res => {
						console.log(res)
						uni.setStorageSync('userdata', res.data); //存入缓存
						getApp().globalData.userdata = res.data;
						uni.showToast({
							icon: 'success',
							position: 'bottom',
							title: '登录成功'
						});
						uni.$emit('_updatehome');
						uni.hideLoading();
						uni.reLaunch({
							url: '/pages/tabBar/home/home'
						});
					}, rej => {
						console.log(rej)
						this.isRotate = false;
						uni.hideLoading();
					})
				}else {
					this.api.home.login({
						mobilePhone: this.phoneNum,
						code: this.yzm
					}).then(res => {
						console.log(res)
						uni.setStorageSync('userdata', res.data); //存入缓存
						getApp().globalData.userdata = res.data;
						uni.showToast({
							icon: 'success',
							position: 'bottom',
							title: '登录成功'
						});
						uni.$emit('_updatehome');
						uni.hideLoading();
						uni.reLaunch({
							url: '/pages/tabBar/home/home'
						});
					}, rej => {
						console.log(rej)
						this.isRotate = false;
						uni.hideLoading();
					})
				}
			}
		},
		// 登录方式切换
		loginChange() {
			this.isShow = !this.isShow;
			this.wangjimima = false;
		},
		// 账号登录获取验证码
		getCode() {
			const TIME_COUNT = 60;
			if (!this.timer) {
				this.api.home.sendVerificationCode({
					mobilePhone: this.phoneNum
				}).then(res => {
					uni.showToast({
						title: "发送成功",
						icon:  'success',
						position: 'bottom',
					});
					this.count = TIME_COUNT;
					this.btnMsg = 's重发';
					this.disable = false;
					this.timer = setInterval(() => {
						if (this.count > 0 && this.count <= TIME_COUNT) {
							this.count--;
						} else {
							clearInterval(this.timer);
							this.timer = null;
							this.disable = true;
							this.count = '重新获取';
							this.btnMsg = '';
						}
					}, 1000);
				},rej => {
					clearInterval(this.timer);
					this.timer = null;
					this.disable = true;
					this.count = '重新获取';
					this.btnMsg = '';
				})
			}
		},
	}
};
</script>

<style scoped lang="scss">
.login-body {
	.describe {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-top: 200upx;
		.msg {
			text-align: center;
			color: #212121;
			font-size: 56upx;
		}
		.agreement {
			text-align: center;
			color: #575757;
			font-size: 28upx;
			.navigate {
				color: #18c02c;
			}
		}
	}

	.account {
		margin: 40upx 60upx;
		.section {
			font-size: 34upx;
			color: #575757;
			display: flex;
			align-items: center;
			height: 100upx;
			.phone {
				flex: 1;
				height: 80upx;
				padding: 0 10upx;
			}
			.pwd {
				flex: 1;
				height: 80upx;
			}
			.btns {
				line-height: 80upx;
				font-size: 28upx;
				color: #18c02c;
				&.isColor {
					color: #575757;
				}
			}
		}
	}
	.box {
		margin: 0upx 60upx;
		.box-one {
			height: 86upx;
			line-height: 86upx;
			width: 100%;
			text-align: center;
			color: #fff;
			font-size: 38upx;
			background-color: #18c02c;
			margin-top: 20upx;
			border-radius: 6upx;
		}
		.box-two {
			height: 86upx;
			line-height: 86upx;
			width: 100%;
			text-align: center;
			font-size: 38upx;
			color: #18c02c;
			margin-top: 20upx;
			border: 2upx solid #18c02c;
			border-radius: 6upx;
		}
		.point {
			color: #18c02c;
			font-size: 28upx;
			margin-top: 10upx;
		}
	}
}
</style>
