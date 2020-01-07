<template>
	<view class="container">
		<view class="list-cell m-t border-bottom" @click="navTo('/pages/user/userinfo/userinfo')" >
			<text class="cell-tit">支付宝支付</text>
			<text class="cell-more">
				<text>13297088016</text>
				<uni-icons class="icon" type="arrowright"></uni-icons>
			</text>
		</view>
		<view class="list-cell border-bottom" @click="navTo('/pages/user/userinfo/userinfoset')" >
			<text class="cell-tit">微信支付</text>
			<text class="cell-more">
				<text>小牛犊</text>
				<uni-icons class="icon" type="arrowright"></uni-icons>
			</text>
		</view>
		<view class="list-cell" @click="navTo('/pages/user/idcardset')" >
			<text class="cell-tit">银行卡支付</text>
			<text class="cell-more">
				<uni-icons class="icon" type="arrowright"></uni-icons>
			</text>
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
				
			};
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
				    		setTimeout(()=>{
				    			uni.navigateBack();
				    		}, 200)
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
</style>
