<template>
	<view class="uni-page-body">
		<view class="header-box">
			<image :src="userdata.headImage" class="img"></image>
			<view class="uni-flex pinfen">
				<uni-rate class="rate" :size="12" :value="xinyuzhi.star" />
				<text class="list-succ" style="margin-left: 20upx;">{{xinyuzhi.star}}分</text>
			</view>
		</view>
		<uni-list>
			<uni-list-item title="个人资料" :showArrow="false" :showBadge="true">
				<text>{{xinyuzhi.realReputationValue }}分 </text>
			</uni-list-item>
			<uni-list-item title="从业年限" :showArrow="false" :showBadge="true">
				<text>{{xinyuzhi.depostiReputationValue }}分 </text>
			</uni-list-item>
			<uni-list-item title="保证金" :showArrow="false" :showBadge="true">
				<text>{{xinyuzhi.serviceReputationValue }}分</text>
			</uni-list-item>
			<uni-list-item title="服务综合评价" :showArrow="false" :showBadge="true">
				<text>{{xinyuzhi.yearReputationValue }}分 </text>
			</uni-list-item>
		</uni-list>

		<view class="uni-page-footer">
			<view style="display: inline-block;" @tap="nto">评定方法</view>
			<view style="display: inline-block;"> | </view>
			<view style="display: inline-block;" @tap="dianhua">联系客服</view>
		</view>

	</view>
</template>
<script>
	import uniRate from '@/components/uni-rate/uni-rate.vue'
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	import uniList from '@/components/uni-list/uni-list.vue'
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue'
	export default {
		components: {
			uniList,
			uniListItem,
			uniIcons,
			uniRate
		},
		data() {
			return {
				userdata: {},
				xinyuzhi: {
					realReputationValue: 0,
					serviceReputationValue: 0,
					depostiReputationValue: 0,
					yearReputationValue: 0,
					star: 0,
				},
			}
		},
		computed: {},
		created() {
			this.userdata = getApp().globalData.userdata;
			this.api.home.getReputationValue({
				data: {
					userId: this.userdata.userId
				}
			}).then(res => {
				this.xinyuzhi.realReputationValue = res.data.realReputationValue / 100;
				this.xinyuzhi.serviceReputationValue = res.data.serviceReputationValue / 100;
				this.xinyuzhi.depostiReputationValue = res.data.depositReputationValue / 100;
				this.xinyuzhi.yearReputationValue = res.data.yearReputationValue / 100;
				this.xinyuzhi.star = res.data.star / 100;
			})
		},
		methods: {
			nto() {
				uni.navigateTo({
					url: '/pages/user/reputationrun'
				})
			},
			dianhua() {
				uni.makePhoneCall({
					phoneNumber: '0574-5533-6130' //仅为示例
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.uni-page-body {
		.header-box {
			background: linear-gradient(175deg, rgba(61, 140, 243, 1) 0%, rgba(116, 227, 255, 1) 100%);
			padding: 40upx;
			margin-bottom: 24upx;
			position: relative;

			.xingyu {
				position: absolute;
				right: 18upx;
				bottom: 58upx;
				height: 148upx;
				width: 275upx;
			}

			.pinfen {
				align-items: center;
				background-color: rgba($color: #ffffff, $alpha: 0.7);
				padding: 0px 10upx;
				border-radius: 10upx;
				width: 300upx;
				display: flex;
				justify-content: space-around;
			}

			.img {
				height: 142upx;
				width: 142upx;
				margin-bottom: 8upx;
				border-radius: 50%;
			}

			.price-box {
				color: #FFFFFF;
				font-size: 56upx;

			}

			.uni-icon-clear,
			.uni-icon-eye {
				color: #999;
			}
		}

		.uni-page-footer {
			position: fixed;
			bottom: 50upx;
			left: 0upx;
			right: 0upx;
			text-align: center;
			color: #1F96F7;
			font-size: 22upx;

			.icon {
				margin-right: 10upx
			}
		}
	}
</style>
