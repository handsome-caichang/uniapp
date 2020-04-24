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
		<view class="uni-page-footer">
			<uni-icons type="info-filled" class="icon" style="margin-right: 10upx;"></uni-icons>
			 废品帮仅为信息展示服务平台，不参与任何交易，无法对所有用户使用废品帮平台服务的过程及行为进行事前及实时审查。我们倡导长期稳定、诚信交易。买卖双方自行承担交易过程中的一切责任，平台对此交易不承担责任。
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
		.uni-page-footer{
			position: fixed;
			bottom: 50upx;
			left: 0upx;
			right: 0upx;
			text-align: center;
			color: #666;
			font-size: 22upx;
			padding: 0 80upx;
		}
	}
</style>
