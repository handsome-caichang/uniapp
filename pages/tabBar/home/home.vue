<template>
	<view class="index-content">
		<!-- banner板块 -->
		<view class="index-banner">
			<view class="swiper" v-if="bannerlist.length > 0">
				<swiper
					class="swiper-container"
					:autoplay="true"
					:interval="4000"
					:circular="true"
					:indicator-dots="true"
					indicator-active-color="#18C02C"
					indicator-color="#FFFFFF"
				>
					<block v-for="(item, index) in bannerlist" :key="index">
						<swiper-item class="swiper-wrapper" @tap="previewImage(index, bannerlist)"><image :src="item" mode="widthFix"></image></swiper-item>
					</block>
				</swiper>
			</view>
			
			<view class="tianqi-po">
				<view class="tianqi">
					<image :src="'/static/img/peartianqi/'+tianqi.wea_img+'.png'" class="tianqiimg" ></image>
					<text class="tem">{{tianqi.tem}}&#8451;</text>
					<text class="address">{{tianqi.city}}</text>
					<text class="wea">{{tianqi.wea}}</text>
				</view>
			</view>
			
		</view>
		<!-- banner -->
		<view class="seckill-section m-t">
			<view class="s-header"><text class="title">VIP用户</text></view>
			<scroll-view class="floor-list" scroll-x>
				<view class="scoll-wrapper">
					<view v-for="(item, index) in goodsList" :key="index" class="floor-item" @click="navToDetailPage(item, index)">
						<image class="img" :src="item.image" mode="aspectFill"></image>
						<text class="name">黄先生</text>
						<text class="name">从业3年</text>
						<uni-rate class="rate" :value="5" />
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="seckill-section m-t">
			<view class="s-header"><text class="title">货物</text></view>
			<scroll-view class="floor-list" scroll-x>
				<view class="scoll-wrapper">
					<view v-for="(item, index) in goodsList" :key="index" class="floor-item pro-box" @click="navToDetailPagepro(item, index)">
						<view class="box">
							<text>废铁</text>
							<text>3吨</text>
						</view>
						<view class="box"><text>宁波****有限公司</text></view>
						<view class="box">
							<text>12/12</text>
							<text>镇海</text>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>

		<view class="border-top border-bottom notice-box">
			<image class="img" src="/static/img/gongkao.png"></image>

			<view class="content-box">
				<view class="sw-con">
					<swiper class="swiper" :autoplay="true" :vertical="true" :circular="true" :display-multiple-items="2" :interval="3000" :duration="1000">
						<swiper-item><view class="swiper-item uni-ellipsis">11扩展：现在需要在应用到选择老师的时候，也希望根据当</view></swiper-item>
						<swiper-item><view class="swiper-item uni-ellipsis">222扩展：现在需要在应用到选择老师的时候，也希望根据当</view></swiper-item>
						<swiper-item><view class="swiper-item uni-ellipsis">333扩展：现在需要在应用到选择老师的时候，也希望根据当</view></swiper-item>
						<swiper-item><view class="swiper-item uni-ellipsis">444扩展：现在需要在应用到选择老师的时候，也希望根据当</view></swiper-item>
						<swiper-item><view class="swiper-item uni-ellipsis">555扩展：现在需要在应用到选择老师的时候，也希望根据当</view></swiper-item>
					</swiper>
				</view>
			</view>
		</view>

		<!-- 商品列表 -->
		<view class="seckill-section m-t news">
			<view class="s-header"><text class="title">预览</text></view>
			<scroll-view id="tab-bar" class="scroll-h" :scroll-x="true" :show-scrollbar="false">
				<view v-for="(tab, index) in tabBars" :key="tab.id" class="uni-tab-item" :id="tab.id" :data-current="index" @click="ontabtap(tab, index)">
					<text class="uni-tab-item-title" :class="tabIndex == index ? 'uni-tab-item-title-active' : ''">{{ tab.name }}</text>
				</view>
			</scroll-view>

			<view class="product-list">
				<view class="uni-flex uni-row  border-bottom" v-for="product in productList" :key="product.goods_id" @tap="toGoods(product)">
					<view class="text uni-flex" style="width: 180rpx;height: 180rpx;justify-content: center;align-items: center;">
						<image :src="product.img" style="width: 150rpx;height: 150rpx;"></image>
					</view>
					<view class="uni-flex uni-column" style="flex: 1;justify-content: center;padding-right:30rpx">
						<view class="text title" style="text-align: left;padding-top: 10rpx;">BP开发出PET塑料废料回收新技术</view>
						<view class="text point" style="text-align: left;padding-left: 20rpx;padding-top: 10rpx;">
							废品回收在资源再生领域的前端，起着非常重要的作用。可以将废塑料......
						</view>
					</view>
				</view>
				<view class="loading-text">{{ loadingText }}</view>
			</view>
		</view>
	</view>
</template>
<script>
import uniRate from '@/components/uni-rate/uni-rate.vue';
import { mapMutations } from 'vuex';
import permision from "@/common/permission.js"
export default {
	components: {
		uniRate
	},
	data() {
		return {
			arrayText: [],
			bannerlist: [],
			goodsList: [],
			tabBars: [],
			tabIndex: 0,
			headerPosition: 'fixed',
			productList: [],
			loadingText: '正在加载...',
			tianqi: {
				"cityid": "101250101",
				"date": "2020-01-04",
				"week": "星期六",
				"update_time": "21:00",
				"city": "长沙",
				"cityEn": "changsha",
				"country": "中国",
				"countryEn": "China",
				"wea": "阴",
				"wea_img": "yin",
				"tem": "7",
				"tem1": "8",
				"tem2": "6",
				"win": "西北风",
				"win_speed": "1级",
				"win_meter": "小于12km/h",
				"humidity": "91%",
				"visibility": "1.36km",
				"pressure": "1020",
				"air": "178",
				"air_pm25": "178",
				"air_level": "中度污染",
			},
			tianqiimg: '',
			locations: {}
		};
	},
	onLoad() {
		this.loadData();
		// this.doGetLocation();
	},
	onPageScroll(e) {
		//兼容iOS端下拉时顶部漂移
		if (e.scrollTop >= 0) {
			this.headerPosition = 'fixed';
		} else {
			this.headerPosition = 'absolute';
		}
	},
	//上拉加载，需要自己在page.json文件中配置"onReachBottomDistance"
	onReachBottom() {
		let len = this.productList.length;
		if (len >= 40) {
			this.loadingText = '到底了';
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
	onShow() {},
	methods: {
		ontabtap(tap, index) {
			this.tabIndex = index;
		},
		toGoods(tap) {
			uni.navigateTo({
				url: '/pages/product/newsdetail?post_id=' + tap.goods_id + '&title=' + tap.name
			});
		},
		previewImage(current, imageList) {
			uni.previewImage({
				current: current,
				urls: imageList
			});
		},
		async loadData() {
			this.arrayText = await this.$api.json('arrayText');
			this.bannerlist = await this.$api.json('bannerlist');
			this.goodsList = await this.$api.json('goodsList');
			this.tabBars = await this.$api.json('tabList');
			this.productList = await this.$api.json('productList');
		},
		//详情页
		navToDetailPage(item, index) {
			let id = item.id;
			uni.navigateTo({
				url: `/pages/customer/customerdetail?id=${index}`
			});
		},
		navToDetailPagepro(item, index) {
			let id = item.id;
			uni.navigateTo({
				url: `/pages/product/productdetail?id=${index}`
			});
		},
		async checkPermission() {
			let status = permision.isIOS ? await permision.requestIOS('location') :
				await permision.requestAndroid('android.permission.ACCESS_FINE_LOCATION');
			if (status === null || status === 1) {
				status = 1;
			} else {
			}
			return status;
		},
		async doGetLocation() {
			uni.getLocation({
				geocode: true,
				success: res => {
					uni.setStorageSync('_location', res);
					let city = res.address.city.slice(0, res.address.city.length-1);
					uni.request({
						url: 'https://www.tianqiapi.com/api/',
						data: {
							appid: '34831141',
							appsecret: 'xxRnF4E2',
							version: 'v6',
							city: city,
							vue: 1,
						},
						success: rest=> {
							this.tianqi = rest.data;
						}
					})
				},
				fail: err => {
				}
			});
		},
	}
};
</script>
<style lang="scss" scoped>
.index-content {
	overflow: hidden;
	.notice-box {
		padding: 20upx;
		display: flex;
		margin-bottom: 20upx;
		.img {
			height: 80upx;
			width: 80upx;
			margin-right: 10upx;
		}
		.swiper {
			height: 80upx;
		}
		uni-swiper {
			height: 80upx;
		}
		.content-box {
			flex: 1;
			.sw-con {
				height: 40upx;
				.swiper-item {
					height: 40upx;
					color: #575757;
					font-size: 24upx;
				}
			}
		}
	}

	.index-banner {
		width: 100%;
		position: relative;
		.tianqi-po {
			position: absolute;
			z-index: 99;
			width: 50%;
			right: 0;
			top: 0;
			/*  #ifdef  APP-PLUS  */
			top: var(--status-bar-height); //覆盖样式
			/*  #endif  */
			.tianqi {
				margin-top: 12upx;
				width: 100%;
				height: 84upx;
				background-color: rgba($color: #fff, $alpha: 0.83);
				display: flex;
				align-items: center;
				justify-content: center;
				border-radius:42upx 0px 0px 42upx;
				font-size: 34upx;
				color: #000000;
				.tianqiimg {
					height: 54upx;
					width: 54upx;
					margin-right: 20upx;
				}
				.tem {
					margin-right: 20upx;
				}
				.address {
					font-size: 28upx;
					margin-right: 20upx;
				}
				.wea {
					font-size: 28upx;
					margin-right: 20upx;
				}
			}
		}
		swiper-item {
			height: 350px;

			image {
				width: 100%;
			}
		}
	}

	.m-t {
		margin-top: 10upx;
	}

	/* 秒杀专区 */
	.seckill-section {
		padding: 4upx 30upx 24upx;
		background: #fff;

		.s-header {
			display: flex;
			align-items: center;
			height: 92upx;
			line-height: 1;

			.title {
				color: #212121;
				font-size: 33upx;
				padding-bottom: 10upx;
				border-bottom: 2px solid $font-color-light;
			}

			.s-img {
				width: 140upx;
				height: 30upx;
			}

			.tip {
				font-size: $font-base;
				color: $font-color-light;
				margin: 0 20upx 0 40upx;
			}

			.timer {
				display: inline-block;
				width: 40upx;
				height: 36upx;
				text-align: center;
				line-height: 36upx;
				margin-right: 14upx;
				font-size: $font-sm + 2upx;
				color: #fff;
				border-radius: 2px;
				background: rgba(0, 0, 0, 0.8);
			}

			.icon-you {
				font-size: $font-lg;
				color: $font-color-light;
				flex: 1;
				text-align: right;
			}
		}

		.floor-list {
			white-space: nowrap;
		}

		.scoll-wrapper {
			display: flex;
			align-items: flex-start;
		}

		.floor-item {
			width: 200upx;
			margin-right: 20upx;
			font-size: $font-sm + 2upx;
			color: $font-color-withe;
			display: flex;
			flex-direction: column;
			align-items: center;

			.img {
				border-radius: 50%;
				width: 100upx;
				height: 100upx;
			}

			.name {
				color: #303030;
				font-size: 24upx;
				height: 30upx;
			}

			&.pro-box {
				width: 300upx;
				background-color: #18c02c;
				border-radius: 10upx;
				padding: 0 10upx;

				.box {
					width: 220upx;
					display: flex;
					justify-content: space-around;
				}

				text {
					color: #fff;
				}
			}
		}
	}

	.news {
		padding: 0px;

		.title {
			margin-left: 30upx;
		}

		.scroll-h {
			padding: 0upx 30upx;
			width: 100%;
			height: 80upx;
			flex-direction: row;
			white-space: nowrap;

			.uni-tab-item {
				display: inline-block;
				flex-wrap: nowrap;
				padding-right: 16upx;
			}

			.uni-tab-item-title {
				color: #575757;
				font-size: 30upx;
				height: 80upx;
				line-height: 80upx;
				flex-wrap: nowrap;
				white-space: nowrap;
			}

			.uni-tab-item-title-active {
				color: $font-color-light;
			}
		}
	}

	.product-list {
		.title {
			font-size: 22upx;
			color: #212121;
		}

		.point {
			text-indent: 48upx;
			font-size: 20upx;
			color: #575757;
		}
	}
}
</style>
