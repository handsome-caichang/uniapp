<template>
	<view class="uni-page-body">
		<view class="flex-center">
			<uni-icons type="checkbox-filled" color="#18C02C" size="120"></uni-icons>
		</view>

		<view class="point">
			提现资料提交成功，正在为您审核......
		</view>

		<view class="text">
			<text> 您提交的提现资料，将会尽快为您审核，审核成功将在1-3个工作日内日到账</text>
		</view>

	</view>
</template>

<script>
	import uniIcons from '@/components/uni-icons/uni-icons.vue'
	export default {
		components: {
			uniIcons,
		},
		data() {
			return {}
		},
	}
</script>

<style lang="scss" scoped>
	.uni-page-body {
		.text {
			margin-top: 30upx;
			padding: 0 50upx;
			font-size: 22upx;
			text-align: center;
			color: #767676;
		}

		.point {
			text-align: center;
			color: #555555;
			font-size: 34upx;
		}
	}
</style>
