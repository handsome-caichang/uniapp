<template>
	<view class="uni-page-body">
		<view class="flex-center">
			<uni-icons type="checkbox-filled" color="#18C02C" size="120"></uni-icons>
		</view>
		<view class="text" style="width: 50%;margin: 0 auto;">恭喜匹配成功，详情可到
			
		</view>
		<view class="text">
			<text style="color: #212121;">
				匹配订单管理-匹配成功
			</text>
			查看
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
			text-align: center;
			color: #767676;
		}
	}
</style>
