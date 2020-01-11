<template>
	<view class="tuijian-box">
		<view class="example-box" v-for="(item,index) in productList" :key="index" @tap="clickitem(item)">
			<view class="uni-flex uni-row item-box">
				<view class="text uni-flex" style="width: 160rpx;height: 130rpx;justify-content: center;align-items: center;">
					<image :src="item.img" style="width: 160rpx;height: 130rpx;"></image>
				</view>
				<view class="uni-flex uni-column" style="flex: 1;justify-content: center;margin-left: 20upx;">
					<view class="uni-flex" style="justify-content: space-between;align-items: center;height: 40upx;">
						<view style="color: #343434;font-weight: 500;font-size: 34upx;">废铁 | 10000吨</view>
						<text class="time" style="color: #575757;font-size: 20upx;">更新时间：2019/12/6</text>
					</view>
					<view class="uni-flex" style="justify-content: space-between;align-items: center;height: 40upx;">
						<view style="color: #212121;font-size: 28upx;">宁波****有限公司</view>
						<text class="detail-btn" :class="novip?'noclick':''">查看详情</text>
					</view>
					<view class="vipmore" v-if="novip">
						<icon type="warn" size="12"></icon>
						<text style="margin-left: 10upx;">注册会员才能查看详情喔！</text>
					</view>
					<view class="uni-flex" style="justify-content: space-between;align-items: center;">
						<view class="price" style="font-size: 28upx;font-weight: 500;">价格面议</view>
						<text class="time" style="color: #343434;font-size: 22upx;">宁波镇海</text>
					</view>

				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				productList: [],
				novip: true,
			}
		},
		created() {
			this.loadData();
		},
		methods: {
			clickitem(item) {
				let id = item.goods_id;
				uni.navigateTo({
					url: `/pages/product/productdetail?id=${id}`
				})
			},
			async loadData() {
				this.productList = await this.$api.json('productList');
			},
			getmore() {
				console.log('more')
				let len = this.productList.length;
				if (len >= 20) {
					return false;
				}
				// 演示,随机加入商品,生成环境请替换为ajax请求
				let end_goods_id = this.productList[len - 1].goods_id;
				for (let i = 1; i <= 10; i++) {
					let goods_id = end_goods_id + i;
					let p = {
						goods_id: goods_id,
						img: '/static/img/goods/p' + (goods_id % 10 == 0 ? 10 : goods_id % 10) + '.jpg',
						name: '商品名称商品名称商品名称商品名称商品名称',
						price: '￥168',
						slogan: '1235人付款'
					};
					this.productList.push(p);
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.tuijian-box {
		margin: 0 -40upx;
		padding-bottom: 20upx;

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
