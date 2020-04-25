<template>
	<view class="container-box" >
		<view class="text" style="color: #575757;">
			选择分类
		</view>
		<view class="uni-flex item-box">
			<view class="_itemtype" :class="activeindex===index?'active':''" v-for="(item, index) in  goodtypelist" :key="index" @tap="clickitem(index)" >
				{{item.name}}
			</view>
		</view>
		
		<view class="uni-flooter-box">
			<view class="checked-box" >
				<checkbox :checked="ischeck" color="#E7211A" :disabled="userdata.vipLevel != 2" />
				<text style="color: #E7211A;">加急</text>
			</view>
			<view class="btn" :class="btnactive?'active':''" @tap="fabucur" >
				确认发布
			</view>
		</view>
		
		<view class="point-box" v-if="userdata.isVip != 1">
			<icon type="warn" size="20" ></icon>
			<text style="margin-left: 10upx;">开通会员才能发布求购喔！钻石级别会员可加急</text>
		</view>
		<view class="uni-page-footer">
			<uni-icons type="info-filled" class="icon" style="margin-right: 10upx;"></uni-icons>
			用户发布求购信息，平台将推荐相应货物，提高匹配效率。
		</view>
	
		
	</view>
</template>

<script>
	import { mapMutations,mapState } from 'vuex';
	export default {
		data() {
			return {
				activeindex: 0,
				ischeck: false,
				userdata: {},
				btnactive: false, // 如果不是vip 不能发布
			}
		},
		computed: {
			...mapState(['goodtypelist'])
		},
		created(){
			this.userdata = getApp().globalData.userdata;
			if (this.userdata.isVip == 1 ) {
				this.btnactive = true;
			}
		},
		methods: {
			clickitem(index) {
				this.activeindex = index;
			},
			fabucur() {
				if (getApp().globalData.userdata.isReal !== 2) {
					uni.showModal({
						title: "提示",
						content: '该操作需要实名，请先前往我的->点击头像->实名认证，进行实名认证',
						success: function (res) {
							if (res.confirm) {
								console.log('用户点击确定');
								uni.navigateTo({
									url: "/pages/user/userinfo/setuserinfopoint"
								})
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
					return;
				}
				if (!this.btnactive) {
					uni.showModal({
						title: "提示",
						content: '该操作需要开通VIP，请先前往我的->废品帮VIP，开通VIP服务',
						success: function (res) {
							if (res.confirm) {
								console.log('用户点击确定');
								uni.navigateTo({
									url: "/pages/user/vipsend"
								})
							}
						}
					});
					return;
				}
				let address = uni.getStorageSync('_location');
				this.api.home.realseRecovery({
					classify: this.goodtypelist[this.activeindex].name,
					urgent: this.ischeck ? 1 : 0,
					userId: getApp().globalData.userdata.userId,
					province: address.address.province,
					city: address.address.city,
					district: address.address.district,
					lat: ""+address.latitude,
					lng: ""+address.longitude,
				}).then(res => {
					uni.showModal({
						title: "提示",
						content: '发布成功',
						showCancel: false,
					});
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container-box {
		.uni-page-footer{
			position: fixed;
			bottom: 100upx;
			left: 0upx;
			right: 0upx;
			text-align: center;
			color: #666;
			font-size: 22upx;
			padding: 0 100upx;
		}
		.item-box {
			flex-wrap: wrap;
		}
		.uni-flooter-box {
			margin-top: 100upx;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			position: relative;
			height: 100upx;
			.checked-box {
				padding-left: 20upx;
			}
			.btn {
				position: absolute;
				left: 50%;
				transform: translateX(-50%);
				width:  332upx;
				height: 100upx;
				line-height: 100upx;
				background:rgba(170,170,170,1);
				border-radius:8px;
				text-align: center;
				color: #fff;
				font-size: 38upx;
				&.active {
					background-color: #18C02C;
				}
			}
		}
		.point-box {
			text-align: center;
			display: flex;
			align-items: center;
			padding: 0 18%;
		}
	}
</style>
