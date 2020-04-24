<template>
	<view class="uni-page-body payorderdetail">
		<view class="uni-flex content">
			<view class="left">
				<image :src="orderdetail.buyUserHeadImage" class="headerimg"></image>
				<view class="title" style="font-weight: 500;">
					{{orderdetail.buyUserName}}
				</view>
				<view class="title">
					从业年限：{{orderdetail.buyUserYear}}年
				</view>
				<view class="title pinfen">
					信誉评分：
					<uni-rate class="rate" :size="12" :value="orderdetail.star" />
				</view>
				<view class="address">
					<text style="margin-right: 20upx;">{{orderdetail.buyDistrict}}</text>
				</view>
			</view>
			<image class="jiaoyiimg" src="/static/img/jiaoyi.png"></image>
			<view class="right">
				<image src="/static/img/goods/p8.jpg" class="headerimg"></image>
				<view class="title" style="font-weight: 500;">
					<text>{{orderdetail.sellUserName}}</text>
					<text style="margin-left: 10upx;">{{orderdetail.count}}吨</text>
				</view>
				<view class="title">
					{{orderdetail.buyUserName}}
				</view>
				<view class="title">
					{{ utils.timeTodate('Y m-d', orderdetail.createTime)}}
				</view>
				<view class="address">
					<text style="margin-right: 20upx;">{{orderdetail.sellDistrict}}</text>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	export default {
		components: {
			uniIcons
		},
		created() {
		},
		data() {
			return {
				orderdetail: {},
			}
		},
		methods: {
		},
	}
</script>

<style scoped lang="scss">
	.payorderdetail {
		
		.content {
			padding: 0 20upx;
			justify-content: center;
			align-items: center;
		
			.jiaoyiimg {
				width: 80upx;
				height: 40upx;
			}
		
			.left,
			.right {
				flex: 1;
				width: 298upx;
				height: 371upx;
				border-radius: 12upx;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				border: 1upx solid #717171;
		
				.headerimg {
					height: 150upx;
					width: 150upx;
					border-radius: 50%;
				}
		
				.title {
					height: 46upx;
					font-size: 34upx;
				}
		
				.pinfen {
					display: flex;
					align-items: center;
				}
		
				.address {
					width: 100%;
					color: #575757;
					text-align: right;
				}
			}
		}
	}
</style>
