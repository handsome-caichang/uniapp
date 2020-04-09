<template>
	<view class="pop-box">
		<view class="text-box">佣金计算规则</view>
		<view class="rul-box">
			<view class="tab-box">
				<view class="rul-set">
					<text>称重</text>
				</view>
				<view class="right">
					<view class="tab">
						<text class="tab-item">3吨及以下</text>
						<text class="tab-item">成交金额x1.5%</text>
					</view>
					<view class="tab">
						<text class="tab-item">3吨以上</text>
						<text class="tab-item">成交金额x2%</text>
					</view>
				</view>
			</view>
			<view class="guzhi">
				<text class="left">估值</text>
				<view class="right">
					成交金额x2.5%
				</view>
			</view>
		</view>
		
		<view class="fot">注：佣金支付后货主将在3个工作日内收到鼓励金，支付记录可在我的余额-收支明细</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
	}
</script>

<style lang="scss" scoped>
	.pop-box {
		margin: 0 60upx;
		background:rgba(41,41,41,0.8);
		border-radius:20px;
		color: #fff;
		font-size: 28upx;
		.fot {
			margin: 0upx 8upx;
			color: #fff;
			font-size: 22upx;
			margin-top: 18upx;
			padding-bottom: 40upx;
		}
		.text-box {
			text-align: center;
			color: #fff;
		}
		.rul-box {
			margin: 0upx 8upx;
			border: 1upx solid #fff;
			.guzhi {
				display: flex;
				.left {
					width: 70upx;
					text-align: center;
				}
				.right {
					flex: 1;
					text-align: center;
				}
			}
			.tab-box {
				display: flex;
				.rul-set {
					// height: 94upx;
					// line-height: 94upx;
					width: 70upx;
					text-align: center;
					border-right: 1upx solid #fff;
					border-bottom:  1upx solid #fff;
					display: flex;
					align-items: center;
					justify-content: center;
				}
				.right {
					flex: 1;
					.tab {
						display: flex;
						.tab-item {
							flex: 1;
							text-align: center;
							border-bottom: 1upx solid #fff;
							border-right: 1upx solid #fff;
						}
					}
				}
			}
		}
	}
</style>
