<template>
	<view class="container">
		<!-- <view class="list-cell m-t border-bottom" @click="navTo('/pages/user/userinfo/userinfo')" >
			<text class="cell-tit">支付宝支付</text>
			<text class="cell-more">
				<text>13297088016</text>
				<uni-icons class="icon" type="arrowright"></uni-icons>
			</text>
		</view> -->
		<view class="list-cell border-bottom" @click="tologin" >
			<text class="cell-tit">微信支付</text>
			<text class="cell-more">
				<text>{{isbandingweixin?'已绑定':'未绑定'}}</text>
				<uni-icons class="icon" type="arrowright"></uni-icons>
			</text>
		</view>
		<!-- <view class="list-cell" @click="navTo('/pages/user/idcardset')" >
			<text class="cell-tit">银行卡支付</text>
			<text class="cell-more">
				<uni-icons class="icon" type="arrowright"></uni-icons>
			</text>
		</view> -->
	</view>
</template>

<script>
	import {  
	    mapMutations,
		mapState
	} from 'vuex';
	import uniIcons from '@/components/uni-icons/uni-icons.vue'
	var paysetCreate = null;
	export default {
		components: {
			uniIcons,
		},
		data() {
			return {
				isbandingweixin: false
			};
		},
		computed: {
			...mapState(['hasLogin','weixindata'])
		},
		onLoad() {
			uni.getProvider({
				service: 'oauth',
				success: (result) => {
					this.providerList = result.provider.map((value) => {
						let providerName = '';
						switch (value) {
							case 'weixin':
								providerName = '微信登录'
								break;
						}
						return {
							name: providerName,
							id: value
						}
					});
				},
				fail: (error) => {
					console.log('获取登录通道失败', error);
				}
			});
		},
		created() {
			paysetCreate = this;
			this.isbandingweixin =  getApp().globalData.userdata.isbandingweixin;
		},
		methods:{
			...mapMutations(['logintest','setWeixindata']),
			tologin() {
				var _that = this;
				console.log(_that.api);
				uni.login({
					provider: 'weixin',
					success: (res) => {
						console.log('login success:', res);
						// 更新保存在 store 中的登录状态
						_that.logintest('weixin');
						// 	"authResult": {
						// 		"access_token": "32_ynr4NzZziYNjZQnE8c1h9I09YXBsPIlpg8R0BiRzm_DMaQsCtvMPrB8G9Vuoy76CtykgAegQe6h22TXvzLZ1ObxFPOwr3wqRTNlaN2ZVhGI",
						// 		"code": "081U3nPT04hfR22HpNNT0DDgPT0U3nPa",
						// 		"expires_in": 7200,
						// 		"openid": "op6OAwk9bPPFby2XcKsUzjIRpPVA",
						// 		"refresh_token": "32_HMhIXiLqG6asdDbdCXwjy6j-vXm_3XHN6ZmPZhw7RlUr4xgkYVA6gKfN1p1zdLSCQ6WA-sDt5YEOpZF3pf0AzIjICR8wUh9uTbUBrr0bCJ4",
						// 		"scope": "snsapi_userinfo",
						// 		"unionid": "opwAvt4uNEQ4RGc6oQPSCRf4dCU8"
						// 	},
						_that.setWeixindata(res.authResult);
						_that.setweixin(res.authResult);
					},
					fail: (err) => {
						console.log('login fail:', err);
					}
				});
			},
			setweixin(weixindata) {
				this.api.home.setWeixinAccount({
					userId: getApp().globalData.userdata.userId,
					weixinAccount: weixindata.access_token,
					weixinOpenId: weixindata.openid,
					weixinName: weixindata.scope,
				}).then(res => {
					console.log(res);
					let userdata = getApp().globalData.userdata;
					userdata.isbandingweixin = true;
					getApp().globalData.userdata = userdata;
					this.isbandingweixin = true;
					uni.showModal({
						showCancel: false,
						content: '绑定成功',
						title: "提示",
					})
				})
			},
		},
		watch: {
			"weixindata": (newdata, old) => {
				console.log(newdata);
				// paysetCreate.setweixin(newdata);
			}
		}
	}
</script>

<style lang='scss' scoped>
	page{
		background: $page-color-base;
	}
	.list-cell{
		display:flex;
		align-items:baseline;
		padding: 20upx $page-row-spacing;
		line-height:60upx;
		position:relative;
		background: #fff;
		justify-content: center;
		&.log-out-btn{
			margin-top: 40upx;
			.cell-tit{
				color: $uni-color-primary;
				text-align: center;
				margin-right: 0;
			}
		}
		&.cell-hover{
			background:#fafafa;
		}
		&.b-b:after{
			left: 30upx;
		}
		&.m-t{
			margin-top: 16upx; 
		}
		.cell-more{
			align-self: baseline;
			font-size:$font-lg;
			color: #575757;
			margin-left:10upx;
		}
		.cell-tit{
			flex: 1;
			font-size: $font-base + 2upx;
			color: $font-color-dark;
			margin-right:10upx;
		}
		.cell-tip{
			font-size: $font-base;
			color: $font-color-light;
		}
		switch{
			transform: translateX(16upx) scale(.84);
		}
	}
</style>
