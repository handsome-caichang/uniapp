<template>
	<view class="uni-page-body">
		<view class="flex-center">
			<uni-icons type="checkbox-filled" color="#18C02C" size="120"></uni-icons>
		</view>
		<view class="text">
			订单信息可在 <text style="color: #212121;">首页轮播</text> 展示
		</view>
		<view class="text">
			进入<text style="color: #212121;">我的—我的发布</text> 查询详情
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
			return {
			}
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
