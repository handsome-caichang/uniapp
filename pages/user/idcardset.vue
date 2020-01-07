<template>
	<view class="uni-page-body">
		<view class="header-box">
			<text style="color: #212121;font-size: 38upx;margin-right: 20upx;">我的卡</text>
			<text style="color: #575757;font-size: 28upx;">共2张</text>
		</view>
		<view class="body-box">
			<view class="carditem">
				<view class="left">
					<image src="/static/img/idcard.png" class="img" mode=""></image>
				</view>
				<view class="center">
					<view class="title">
						中国农业银行
					</view>
					<view class="point">
						储蓄卡
					</view>
				</view>
				<view class="right">
					****5776
				</view>
			</view>
			<view class="carditem postion">
				<view class="left">
					<image src="/static/img/idcard.png" class="img" mode=""></image>
				</view>
				<view class="center">
					<view class="title">
						中国农业银行
					</view>
					<view class="point">
						储蓄卡
					</view>
				</view>
				<view class="right">
					****5776
				</view>
			</view>
		</view>
		<view class="btn">
			添加银行卡
		</view>
	</view>
</template>

<script>
</script>

<style scoped lang="scss">
	.uni-page-body {
		.btn {
			background-color: #18C02C;
			color: #fff;
			margin: 0 64upx;
			margin-top: 120upx;
			text-align: center;
			line-height: 86upx;
			height: 86upx;
			border-radius: 6upx;
		}
		.header-box {
			padding: 20upx
		}
		.body-box {
			padding: 0 20upx;
			position: relative;
			.carditem {
				// position: absolute;
				// top: 0upx;
				// left: 20upx;
				// right: 20upx;
				&.postion {
					transform: translateY(-50%);
				}
				background:linear-gradient(174deg,rgba(40,173,178,1) 0%,rgba(43,140,144,1) 100%);
				border-radius:24upx;
				height: 265upx;
				display: flex;
				justify-content: space-between;
				padding: 20upx;
				padding-left: 50upx;
				.left {
					background-color: #fff;
					border-radius: 50%;
					height: 70upx;
					width: 70upx;
					display: flex;
					justify-content: center;
					align-items: center;
					margin-right: 20upx;
					.img {
						width: 60upx;
						height: 60upx;
						border-radius: 50%;
					}
				}
				.center {
					flex: 1;
					text-align: left;
					.title{
						font-size: 38upx;
						color: #fff;
						font-weight: bold;
					}
					.point {
						font-size: 28upx;
						color: #fff;
					}
				}
				.right {
					font-size: 28upx;
					color: #fff;
				}
			}
		}
	}
</style>
