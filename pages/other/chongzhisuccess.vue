<template>
	<view class="uni-page-body">
		<view class="flex-center">
			<uni-icons type="checkbox-filled" color="#18C02C" size="120"></uni-icons>
		</view>
		<view class="text">
			充值成功
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
