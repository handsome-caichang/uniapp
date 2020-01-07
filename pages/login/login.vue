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
			<view class="section" v-if="isShow">
				<input class="pwd" type="password" :maxlength="18" v-model="password" placeholder="请输入密码" placeholder-class="p-active" />
			</view>
			<view class="section" v-if="!isShow">
				<input class="pwd" type="number" :maxlength="6" v-model="yzm" placeholder="请输入短信验证码" placeholder-class="p-active" />
				<text class="btns" type="default" @tap="getCode" :class="{ isColor: disable != true }">{{ count }}{{ btnMsg }}</text>
			</view>
		</view>
		<view class="box">
			<view class="box-one" @tap="login"><text class="one">登录</text></view>
			<view class="box-two" @tap="loginChange">
				<text class="two">{{ isShow ? '验证码登录' : '密码登录' }}</text>
			</view>
			<view class="point" @tap="loginChange">{{ isShow ? '忘记密码' : '收不到验证码？' }}</view>
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
			isRotate: false
		};
	},
	onLoad() {},
	mounted() {},
	methods: {
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
			setTimeout(() => {
				// getLogin().then(res => {
				//console.log(res)
				let res = {
					data: {
						username: '张三',
						phoneNum: '12345678910',
						accesstoken: '12ddfg3fsfzsdf343r'
					}
				};
				let userdata = {
					username: res.data.username,
					phoneNum: res.data.phoneNum,
					accesstoken: res.data.accesstoken
				}; //保存用户信息和accesstoken
				// 	_this.$store.dispatch("setUserData",userdata); //存入状态
				// 	try {
				uni.setStorageSync('userdata', userdata); //存入缓存
				// } catch (e) {
				// 	// error
				// }
				uni.showToast({
					icon: 'success',
					position: 'bottom',
					title: '登录成功'
				});
				uni.reLaunch({
					url: '/pages/tabBar/home/home'
				});
				// }else{
				// 	_this.passData=""
				// 	uni.showToast({
				// 		icon: 'error',
				// 		position: 'bottom',
				// 		title: '账号或密码错误，账号admin密码admin'
				// 	});
				// }
				uni.hideLoading();
			}, 1000);
			// }).catch(err => {
			// 	uni.hideLoading();
			// })

			// console.log('1')
			// uni.switchTab({
			// 	url: '/pages/tabBar/home/home'
			// });
		},
		// 登录方式切换
		loginChange() {
			this.isShow = !this.isShow;
		},
		// 账号登录获取验证码
		getCode() {
			this.btnMsg = 's重发';
			this.disable = false;
			const TIME_COUNT = 60;
			if (!this.timer) {
				this.count = TIME_COUNT;
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
				this.showToast('发送成功', 'success');
			}
		},
		// 消息弹框
		showToast(title, icon) {
			uni.showToast({
				title: String(title),
				icon: String(icon)
			});
		}
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
