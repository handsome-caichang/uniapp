<template>
	<view class="container">

		<view class="list-cell border-bottom" @click="navTo('/pages/user/safeset')" >
			<text class="cell-tit">安全设置</text>
			<view class="cell-more">
				<text style="color:#575757 ;">手机号、密码</text>
				<uni-icons class="icon" type="arrowright"></uni-icons>
			</view>
		</view>
		<view class="list-cell  border-bottom" @click="navTo('/pages/user/payset')" >
			<text class="cell-tit">收款方式</text>
			<view class="cell-more">
				<uni-icons class="icon" type="arrowright"></uni-icons>
			</view>
		</view>
		<view class="list-cell"  >
			<text class="cell-tit">关于</text>
			<text class="cell-more ">版本号 {{enableMinVersionCode}} </text>
		</view>
		<view class="list-cell log-out-btn" @click="toLogout">
			<text class="cell-tit">退出登录</text>
		</view>
		
		<view class="floor-list">
			2019-2020&copy;宁波软媒信息技术有限公司 版权所有
		</view>
	</view>
</template>

<script>
	import {  
	    mapMutations  
	} from 'vuex';
	import uniIcons from '@/components/uni-icons/uni-icons.vue'
	export default {
		components: {
			uniIcons,
		},
		data() {
			return {
				enableMinVersionCode: 0,
			};
		},
		onLoad() {
			this.api.home.getAppVersion().then(res => {
				console.log(res.data);
				this.enableMinVersionCode = res.data.enableMinVersionCode;
				// "enableMinVersionCode": 1,
				// "createTime": null,
				// "appDescribe": null,
				// "appUrl": "www.baiduc.om",
				// "appSize": null,
				// "versionCode": null
			})
		},
		methods:{

			navTo(url){
				uni.navigateTo({
					url
				})
				// this.$api.msg(`跳转到${url}`);
			},
			//退出登录
			toLogout(){
				uni.showModal({
				    content: '确定要退出登录么',
				    success: (e)=>{
				    	if(e.confirm){
							uni.removeStorageSync('userdata');
							uni.reLaunch({
								url: '/pages/login/login'
							})
							
				    	}
				    }
				});
			},
			//switch
			switchChange(e){
				let statusTip = e.detail.value ? '打开': '关闭';
				this.$api.msg(`${statusTip}消息推送`);
			},

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
	.floor-list {
		position: fixed;
		bottom: 50upx;
		text-align: center;
		padding: 0 25%;
		font-size: 24upx;
	}
</style>
