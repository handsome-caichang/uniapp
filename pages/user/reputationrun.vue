<template>
	<view class="uni-page-body">
		<view class="run">
			<view style="font-size: 34upx;margin-bottom: 20upx;">
				信誉值评估
			</view>
			<view class="title">1.实名认证：总分2分。默认0分 </view>
			<view class="title">2.从业年限：总分0.5分。默认0分</view>
			<view class="text"> 得分=从业年数x0.05 </view>
			<view class="title"> 3.保证金：总分0.5分。默认0分</view>
			<view class="text"> 得分=缴纳保证金金额x0.05%</view>
			<view class="title"> 4.服务评价综合：总分2分 默认2分</view>
			<view class="text"> (1)加分项：</view>
			<view class="text"> ·交易成功0.01分/笔</view>
			<view class="text"> ·匹配成功0.01分/笔</view>
			<view class="text"> (2)减分项</view>
			<view class="text"> ·取消匹配0.05分/次</view>
			<view class="text"> ·未在3个工作日内支付已完成交易订单0.05分/次</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		}
	}
</script>

<style lang="scss" scoped>
	.run {
		padding: 38upx;

		.title {
			color: #212121;
			font-size: 30upx;
		}

		.text {
			color: $font-color-base;
		}
	}
</style>
