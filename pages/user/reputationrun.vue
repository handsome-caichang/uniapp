<template>
	<view class="uni-page-body">
		<view class="run">
			<view style="font-size: 34upx;margin-bottom: 20upx;">
				信誉值总分5分，平台将对您使用平台过程中
				的行为作出考核，考核明细具体如下：
			</view>
			<view class="title">1.个人资料：总分2分。 </view>
			<view class="text"> 填写个人信息（姓名、身份证号码、电话号码、绑定支付宝、银行卡、车牌号等） </view>
			<view class="title">2.从业年限：总分0.5分。 </view>
			<view class="text"> 得分=从业年数x0.05（上限0.5分） </view>
			<view class="title"> 3.保证金：总分0.5分</view>
			<view class="text"> 得分=缴纳保证金金额x0.05%（上限0.5分） </view>
			<view class="title"> 4.服务评价综合：总分2分</view>
			<view class="text"> (1)加分项：</view>
			<view class="text"> ·交易成功0.01分/笔</view>
			<view class="text"> ·交易好评0.02分/次</view>
			<view class="text"> ·匹配成功0.01分/笔</view>
			<view class="text"> ·签到打卡0.01分/次</view>
			<view class="text"> (2)减分项</view>
			<view class="text"> ·取消匹配0.05分/次</view>
			<view class="text"> ·骚扰投诉0.2分/次</view>
			<view class="text"> ·交易差评0.2分/次</view>
			<view class="text"> ·恶意逃单1分/次</view>
			<view class="text"> ·未在3个工作日内支付已完成交易订单0.05分/次</view>
			<view class="text"> ·恶意录入错误订单0.05分/次</view>

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
