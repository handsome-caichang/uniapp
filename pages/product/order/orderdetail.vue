<template>
	<view class="orderdetail">
		
		<view class="header">
			订单编号：{{orderdetail.matchId}}
		</view>
		
		<view class="uni-flex content">
			<view class="right">
				<image src="/static/img/goods/p8.jpg" class="headerimg" ></image>
				<view class="title" style="font-weight: 500;">
					<text>{{orderdetail.sellUserName}}</text>
					<text style="margin-left: 10upx;">{{orderdetail.count}}吨</text>
				</view>
				<view class="title">
					{{orderdetail.buyUserName}}
				</view>
				<view class="title">
					{{orderdetail.createTime}}
				</view>
				<view class="address">
					<text style="margin-right: 20upx;">{{orderdetail.sellDistrict}}</text>
				</view>
			</view>
			<image class="jiaoyiimg" src="/static/img/jiaoyi.png" ></image>
			<view class="left">
				<image :src="orderdetail.buyUserHeadImage" class="headerimg" ></image>
				<view class="title" style="font-weight: 500;">
					{{orderdetail.buyUserName}}
				</view>
				<view class="title">
					从业年限：{{orderdetail.buyUserYear}}年
				</view>
				<view class="title pinfen">
					信誉评分：<uni-rate class="rate" :size="12" :value="orderdetail.star" />
				</view>
				<view class="address">
					<text style="margin-right: 20upx;">{{orderdetail.buyDistrict}}</text>
				</view>
			</view>
		</view>
		
		<view class="towbtn">
			<view class="error-btn" @tap="clearbtn">
				取消匹配
			</view>
			<view class="primary-btn" @tap="jiaoyi">
				联系回收人
			</view>
			<view class="primary-btn" @tap="luru">
				录入订单
			</view>
		</view>
	
	</view>
</template>

<script>
	import uniRate from '@/components/uni-rate/uni-rate.vue'
	export default {
		components: {
			uniRate
		},
		data() {
			return {
				orderdetail: {},
			}
		},
		created() {
			this.orderdetail = getApp().globalData.orderdetail;
		},
		methods: {
			jiaoyi() {
				this.orderdetail.sourcetype = 0;
				this.orderdetail.userId = this.orderdetail.buyUserId;
				getApp().globalData.customerdata = this.orderdetail;
				uni.navigateTo({
					url: '/pages/customer/customerdetail'
				})
			},
			luru(){
				uni.navigateTo({
					url: '/pages/product/importorder'
				})
			},
			clearbtn() {
				uni.showModal({
					title: '确认取消匹配吗？',
					content: '取消后此匹配将不存在',
					confirmText: '我再想想',
					cancelText: '确认取消',
					success: function(res) {
						if (res.confirm) {
							this.api.home.cancelMatching({
								userId: getApp().globalData.userdata.userId,
								matchId: this.customerdata.matchId
							}).then(res => {
								uni.showModal({
									title: "提示",
									content: '取消成功',
									showCancel: false,
								});
							})
						} else if (res.cancel) {
							uni.navigateBack();
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.orderdetail {
		.header {
			color: #575757;
			font-size: 28upx;
			margin-left: 54upx;
			margin-top: 20upx;
		}
		.content {
			padding: 0 20upx;
			margin-top: 100upx;
			justify-content: center;
			align-items: center;
			.jiaoyiimg{
				width: 80upx;
				height: 40upx;
			}
			.left,
			.right{
				flex:1;
				width: 298upx;
				height: 371upx;
				border-radius: 12upx;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				border: 1upx solid #717171;
				.headerimg {
					height: 150upx;
					width: 150upx;
					border-radius: 50%;
				}
				.title {
					height: 46upx;
					font-size: 34upx;
				}
				.pinfen {
					display: flex;
					align-items: center;
				}
				.address {
					width: 100%;
					color: #575757;
					text-align: right;
				}
			}
		}
		
		.towbtn {
			margin-top: 100upx;
			display: flex;
			justify-content: space-between;
			padding: 0 30upx;
			.primary-btn {
				width: 230upx;
				height: 104upx;
				line-height: 104upx;
				font-size: 38upx;
				text-align: center;
				border-radius: 5px;
				color: $font-color-withe;
				background-color: $uni-bg-color-grey;
			}
			.error-btn {
				width: 230upx;
				height: 104upx;
				line-height: 104upx;
				font-size: 38upx;
				text-align: center;
				border-radius: 5px;
				color: $font-color-withe;
				background-color: #E7211A;
			}
		}
	
	}
</style>
