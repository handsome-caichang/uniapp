<template>
	<view class="container">
		<view class="vip-box">
			<view class="uni-flex" style="justify-content: space-around;"  @tap="tovipsend">
				<view class="userbox">
					<image :src="userdata.headImage" class="img" ></image>
					<view class="kaitong" v-if="!isvip">
						立即开通会员
					</view>
				</view>
				<view class="viptext">
					VIP  <view class="viptext" style="color: #09BB07;display: inline-block;">{{vipLevel}}</view>
				</view>
			</view>
			
			<view class="uni-flex" style="font-size: 28upx;color: #FEFEFE;margin-top: 20upx;">
				货物推荐 &bull; 首页展示 &bull; 发布求购
			</view>
		</view>
		
		<view class="header-box">
			<view class="item" :class="isactive?'active':''"  @tap="changepage(true)" >
				发布求购
			</view>
			<view class="item" :class="!isactive?'active':''"  @tap="changepage(false)" >
				货物推荐
			</view>
		</view>
		<view class="tablebox">
			<fa-bu v-if="isactive" ></fa-bu>
			<tui-jian ref="tuijian" v-if="!isactive" ></tui-jian>
		</view>
		
	</view>
</template>

<script>
	import faBu from "./child/fabu.vue"
	import tuiJian from "./child/tuijian.vue"
	export default {
		components: {
			faBu,
			tuiJian
		},
		data() {
			return {
				headerimg: '/static/img/user-bg.jpg',
				isvip: false,
				isactive: true,
				vipLevel: '',
				userdata: {}
			}
		},
		created() {
			this.userdata = getApp().globalData.userdata;
			if (this.userdata.isVip == 1) {
				this.isvip = true;
				this.vipLevel = this.userdata.vipLevel === 1 ? '黄金' : ( this.userdata.vipLevel === 2 ? '钻石' : '' );
			}
		},
		methods: {
			changepage(flag) {
				this.isactive = flag;
			},
			getmore() {
				if (!this.isactive) {
					this.$nextTick(()=>{
						this.$refs.tuijian.getmore();
					})
				}
			},
			tovipsend() {
				uni.navigateTo({
					url: "/pages/user/vipsend"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		padding: 40upx 60upx 0upx;
	}
	.vip-box {
		padding: 50upx 30upx 20upx;
		background:linear-gradient(128deg,rgba(255,204,60,1) 0%,rgba(254,229,172,1) 100%);
		border-radius: 10upx;
		.userbox {
			display: flex;
			align-items: center;
			.img {
				border-radius: 50%;
				width: 100upx;
				height: 100upx;
			}
			.kaitong {
				color: #FEFEFE;
				font-size: 28upx;
				padding: 0 10upx;
				border-radius: 6upx;
				background-color: #AAAAAA;
				margin-left: 20upx;
			}
		}
		.viptext {
			margin-left: 10upx;
			font-size: 100upx;
			color: #FEFEFE;
			line-height: 50px;
		}
	}
	
	.header-box {
		height: 100upx;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		.item {
			color: #212121;
			font-size: 32upx;
			padding: 0 20upx;
			margin-right: 30upx;
			&.active {
				border-bottom: 4upx solid $font-color-light;
			}
		}
		
	}
	
</style>
