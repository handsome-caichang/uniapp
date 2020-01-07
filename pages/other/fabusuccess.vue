<template>
	<view class="uni-page-body">
		<view class="flex-center">
			<uni-icons type="checkbox-filled" color="#18C02C" size="120"></uni-icons>
		</view>

		<view class="point">
			货物信息提交成功，正在为您审核......
		</view>

		<view class="text">
			<text> 您提交的货物信息，将会尽快为您审核，审核结果可在 </text>
			<text style="color: #212121;">我的—我的发布</text>
			<text>中查看，审核通过后您将获得鼓励金奖励，奖励可在</text>
			<text style="color: #212121;">我的余额—收支明细</text>
			<text>中查看</text>
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
