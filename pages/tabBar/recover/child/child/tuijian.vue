<template>
	<view class="tuijian-box">
		<view class="example-box" v-for="(item,index) in productList" :key="index" @tap="clickitem(item)">
			<view class="uni-flex uni-row item-box">
				<view class="text uni-flex" style="width: 160rpx;height: 130rpx;justify-content: center;align-items: center;">
					<image :src="item.img" style="width: 160rpx;height: 130rpx;"></image>
				</view>
				<view class="uni-flex uni-column" style="flex: 1;justify-content: center;margin-left: 20upx;">
					<view class="uni-flex" style="justify-content: space-between;align-items: center;height: 40upx;">
						<view style="color: #343434;font-weight: 500;font-size: 34upx;">{{item.classifyName}} | {{item.count}}吨</view>
						<text class="time" style="color: #575757;font-size: 20upx;">更新时间：{{utils.timeTodate('m-d', item.createTime)}}</text>
					</view>
					<view class="uni-flex" style="justify-content: space-between;align-items: center;height: 40upx;">
						<view style="color: #212121;font-size: 28upx;">{{item.name}}</view>
						<text class="detail-btn" :class="novip?'noclick':''">查看详情</text>
					</view>
					<view class="vipmore" v-if="novip">
						<icon type="warn" size="12"></icon>
						<text style="margin-left: 10upx;">注册会员才能查看详情喔！</text>
					</view>
					<view class="uni-flex" style="justify-content: space-between;align-items: center;">
						<view class="price" style="font-size: 28upx;font-weight: 500;">{{item.bedrockPrice}}-{{item.outsidePrice}}</view>
						<text class="time" style="color: #343434;font-size: 22upx;">{{item.address}}</text>
					</view>

				</view>
			</view>
		</view>
		<view class="no-pro" v-if="!productList.length">
			<icon type="warn" size="80" color="#F8B551"></icon>
			<view class="text">暂无数据</view>
		</view>
	</view>
</template>

<script>
	import utils from '@/components/shoyu-date/utils.filter.js';
	export default {
		data() {
			return {
				productList: [],
				novip: true,
				utils,
				userdata: {}
			}
		},
		created() {
			this.userdata = getApp().globalData.userdata;
			if (this.userdata.isVip == 1) {
				this.novip = false;
			}
			this.getdata();
		},
		methods: {
			clickitem(item) {
				item.sourcetype = 1;
				getApp().globalData.productdetail = item;
				uni.navigateTo({
					url: `/pages/product/productdetail`
				})
			},
			getdata() {
				let res = uni.getStorageSync('_location');
				this.api.home.goodsRecommend({
					data: {
						userId: getApp().globalData.userdata.userId,
						lat: "" + res.latitude,
						lng: "" + res.longitude,
					}
				}).then(res => {
					console.log(res);
					this.productList = res.data;
				})
			},
			getmore() {
				this.getdata();
			},
		}
	}
</script>

<style lang="scss" scoped>
	.tuijian-box {
		margin: 0 -40upx;
		padding-bottom: 20upx;

		.no-pro {
			display: flex;
			flex-direction: column;
			justify-content: center;
			text-align: center;
			color: #767676;
			margin-top: 100upx;

			.text {
				margin-top: 30upx;
			}
		}

		.example-box {
			margin-top: 20upx;
			border: 1px solid $border-color-base;
			border-radius: 8upx;
			padding: 20upx;

			.header-box {
				justify-content: space-between;
				align-items: center;

				.uni-flex {
					flex: 1;
					align-items: center;
					margin-right: 40upx;
				}

				.headerimg {
					height: 80upx;
					width: 80upx;
					border-radius: 50%;
					margin-right: 20upx;
				}

				.name {
					color: #212121;
					font-size: 36upx;
					font-weight: 500;
					margin-right: 10upx;
				}
			}

			.content-box {
				.title {
					font-weight: 500;
					color: #212121;
					font-size: 32upx;

					.price {
						margin-left: 10upx;
					}
				}

				.address {}
			}

			.detail-btn {
				color: #FFFFFF;
				font-size: 22upx;
				background-color: #18C02C;
				border-radius: 10upx;
				padding: 0 10upx;
				margin-right: 30upx;

				&.noclick {
					background-color: #AAAAAA;
				}
			}

			.vipmore {
				display: flex;
				justify-content: flex-end;
				align-items: center;
				color: #767676;
				font-size: 22upx;
			}
		}
	}
</style>
