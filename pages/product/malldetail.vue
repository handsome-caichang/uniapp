<template>
	<view class="uni-page-body">

		<view class="carousel">
			<swiper indicator-dots circular=true duration="400">
				<swiper-item class="swiper-item" v-for="(item,index) in imgList" :key="index">
					<view class="image-wrapper">
						<image :src="item.src" class="loaded" mode="aspectFill"></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<view class="example-box">
			<view class="uni-flex header-box">
				<view class="uni-flex">
					<image src="../../static/img/arc.png" class="headerimg"></image>
					<view class="name">
						张三回收站
					</view>
					<uni-rate class="rate" :size="12" :value="5" />
				</view>
				<view class="address">
					宁波镇海
				</view>
			</view>

			<view class="content-box">
				<view class="title">
					<text>废铁</text>
					<text class="price">2000-2150元/吨（预估运费40元/吨）</text>
				</view>
				<view class="uni-flex address">
					<view class="text">
						<view class="a">宁波市镇海团桥菜场对面张三废品回收</view>
						<view class="b">
							<uni-icons type="location-filled"></uni-icons> 距我直线2.9km，驾车约12分钟
						</view>
					</view>
					<view class="iconbox">
						<uni-icons type="paperplane" color="#1F96F7" size="32"></uni-icons>
					</view>
				</view>
			</view>

			<view class="uni-flex text-box">
				<text style="color: #18C02C;">已验证</text>
			</view>

			<view class="fo-box">
				<view class="item">
					<text>诚信经营</text>
				</view>
				<view class="item">
					<text>诚信经营</text>
				</view>
				<view class="item">
					<text>诚信经营</text>
				</view>
				<view class="time">
					更新时间：2019/12/6
				</view>
			</view>

			<view class="border-top detailbox">
				<view class="title">
					详情展示
				</view>
				<view class="s-container">
					<scroll-view class="scroll-view_H" scroll-x="true" scroll-left="120">
						<image class="img" v-for="(item,index) in prolist" :key="index" :src="item" mode="scaleToFill"></image>
					</scroll-view>
				</view>
			</view>

		</view>
		<view class="example-box detailbox" style="border: none;">
			<view class="title" style="#212121">
				其他商品
			</view>
		</view>

		<view class="cont-box" style="margin-bottom: 120upx;">
			<view class="example-box" v-for="(item,index) in prolist" :key="index" @tap="nvto(index, item)">
				<view class="uni-flex uni-row item-box">
					<view class="text uni-flex" style="width: 180rpx;height: 180rpx;justify-content: center;align-items: center;">
						<image :src="item" style="width: 180rpx;height: 180rpx;"></image>
					</view>
					<view class="uni-flex uni-column" style="flex: 1;justify-content: center;margin-left: 20upx;">
						<view class="uni-flex" style="justify-content: space-between;align-items: center;height: 40upx;">
							<text style="color: #212121;font-weight: 500;font-size: 32upx;">张三</text>
							<text class="time" style="color: #575757;font-size: 20upx;">更新时间：2019/12/6</text>
						</view>
						<view class="uni-flex title" style="align-items: center;height: 40upx;">
							<text style="width:80upx;color: #212121;font-weight: 500;font-size: 28upx;">废铁</text>
							<text class="price uni-ellipsis" style="width:350upx;font-size: 24upx;">2000-2150元/吨（预估运费40元/吨）</text>
						</view>
						<view class="address uni-ellipsis" style="width: 100%;font-size: 20upx;margin-bottom: 10upx;">
							宁波市镇海团桥菜场对面张三废品回收
						</view>
						<uni-rate class="rate" :size="12" :value="5" />
					</view>
				</view>
			</view>
		</view>
		<view class="goods-carts">
			<view class="container-box">
				<view class="border-top left-box" @tap="shouc">
					<uni-icons type="star" size="20" :color="haveac?'#F4EA2A':'#717171'"></uni-icons>
					<text style="margin-top: -20upx;" :style="{color:haveac?'#F4EA2A':'#717171'}">{{haveac?'取消收藏':'收藏'}}</text>
				</view>
				<view class="right-box" @tap="call">
					<uni-icons size="20" type="phone-filled" color="#ffffff"></uni-icons>
					<text style="margin-top: -20upx;">联系回收站</text>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import uniRate from '@/components/uni-rate/uni-rate.vue'
	import uniIcons from '@/components/uni-icons/uni-icons.vue'
	import uniGoodsNav from '@/components/uni-goods-nav/uni-goods-nav.vue'
	export default {
		components: {
			uniRate,
			uniIcons,
			uniGoodsNav
		},
		data() {
			return {
				haveac: false,
				lefttext: '收藏',
				imgList: [{
					src: 'https://gd3.alicdn.com/imgextra/i3/0/O1CN01IiyFQI1UGShoFKt1O_!!0-item_pic.jpg_400x400.jpg',
					src: 'https://gd3.alicdn.com/imgextra/i3/0/O1CN01IiyFQI1UGShoFKt1O_!!0-item_pic.jpg_400x400.jpg'
				}],
				prolist: [
					'http://img001.hc360.cn/y5/M00/1B/45/wKhQUVYFE0uEZ7zVAAAAAMj3H1w418.jpg',
					'http://img001.hc360.cn/y5/M00/1B/45/wKhQUVYFE0uEZ7zVAAAAAMj3H1w418.jpg',
					'http://img001.hc360.cn/y5/M00/1B/45/wKhQUVYFE0uEZ7zVAAAAAMj3H1w418.jpg',
					'http://img001.hc360.cn/y5/M00/1B/45/wKhQUVYFE0uEZ7zVAAAAAMj3H1w418.jpg',
					'http://img001.hc360.cn/y5/M00/1B/45/wKhQUVYFE0uEZ7zVAAAAAMj3H1w418.jpg'
				]
			}
		},
		//上拉加载，需要自己在page.json文件中配置"onReachBottomDistance"
		onReachBottom() {
			let len = this.prolist.length;
			if (len >= 25) {
				return false;
			}
			for (let i = 1; i <= 10; i++) {
				this.prolist.push('http://img001.hc360.cn/y5/M00/1B/45/wKhQUVYFE0uEZ7zVAAAAAMj3H1w418.jpg');
			}
		},
		methods: {
			shouc() {
				this.haveac = !this.haveac;
			},
			nvto(index) {
				// item
				uni.navigateTo({
					url: `/pages/product/malldetail?id=${index}`
				})
			},
			call() {
				// 直接拨打电话
			}
		}
	}
</script>

<style lang="scss" scoped>
	.uni-page-body {
		.goods-carts {
			/* #ifndef APP-NVUE */
			display: flex;
			/* #endif */
			flex-direction: column;
			position: fixed;
			left: 0;
			right: 0;
			bottom: 0;

			.container-box {
				height: 100upx;
				width: 100%;
				display: flex;

				.left-box,
				.right-box {
					flex: 1;
					height: 100upx;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
				}

				.left-box {
					background-color: #FDFEFF;
				}

				.right-box {
					background-color: #18C02C;
					color: $font-color-withe;
				}
			}
		}

		.detailbox {
			margin-top: 20upx;

			.title {
				color: #575757;
				font-size: 30upx;
			}

			.s-container {
				margin-top: 30upx;

				.scroll-view_H {
					white-space: nowrap;
					width: 100%;

					.img {
						display: inline-block;
						width: 160upx;
						height: 202upx;
						margin-right: 30upx;
						border-radius: 10upx;
					}
				}
			}
		}

		.fo-box {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 50upx;
			.item {
				width: 100upx;
				height: 50upx;
				line-height: 50upx;
				padding: 0 10upx;
				border: 1upx solid #1F96F7;
				color: #575757;
				font-size: 20upx;
				margin-right: 18upx;
				border-radius: 4upx;
				text-align: center;
			}

			.time {
				font-size: 20upx;
				color: #575757;
				text-align: right;
			}
		}

		.carousel {
			height: 360upx;
			position: relative;

			swiper {
				height: 100%;
			}

			.image-wrapper {
				width: 100%;
				height: 100%;
			}

			.swiper-item {
				display: flex;
				justify-content: center;
				align-content: center;
				height: 360upx;
				overflow: hidden;

				image {
					width: 100%;
					height: 100%;
				}
			}
		}

		.example-box {
			margin: 20upx;
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

			.text-box {
				justify-content: flex-end;
				margin-top: -20upx;
			}
		}
	}
</style>
