<template>
	<view class="index-content">
		<!-- banner板块 -->
		<view class="index-banner">
			<view class="swiper">
				<swiper
					class="swiper-container"
					:autoplay="true"
					:interval="3000"
					:circular="true"
					:indicator-dots="true"
					indicator-active-color="#18C02C"
					indicator-color="#FFFFFF"
				>
					<block v-for="(item, index) in bannerlist" :key="index">
						<swiper-item class="swiper-wrapper" @tap="previewImage(item.url)"><image :src="item.image" mode="widthFix"></image></swiper-item>
					</block>
				</swiper>
			</view>
			<view class="tianqi-po">
				<view class="tianqi">
					<image :src="'/static/img/peartianqi/' + tianqi.wea_img + '.png'" class="tianqiimg"></image>
					<text class="tem">{{ tianqi.tem }}&#8451;</text>
					<text class="address">{{ tianqi.city }}</text>
					<text class="wea">{{ tianqi.wea }}</text>
				</view>
			</view>
		</view>
		<!-- 自动滚动 -->
		<view class="seckill-section m-t vipuser ">
			<view class="s-header"><text class="title">VIP用户</text></view>

			<swiper :autoplay="true" :interval="2000" :duration="2000" :circular="true">
				<block v-for="(item, index) in vipusers" :key="index">
					<swiper-item class="swiper-item-width">
						<view class="floor-item" @click="navToDetailPage(item, index)">
							<image class="img" :src="item.image" mode="aspectFill"></image>
							<text class="name">{{ item.name }}</text>
							<text class="name">从业{{ item.age }}年</text>
							<uni-rate class="rate" :value="item.rate" />
						</view>
					</swiper-item>
				</block>
			</swiper>
		</view>
		<view class="seckill-section m-t huowubox">
			<view class="s-header"><text class="title">货物</text></view>
			<swiper :autoplay="true" :interval="2000" :duration="2000" :circular="true">
				<block v-for="(item, index) in huowulist" :key="index">
					<swiper-item class="swiper-item-width">
						<view class="pro-box" @click="navToDetailPagepro(item, index)">
							<view class="box">
								<text>{{ item.type }}</text>
								<text>{{ item.num }}吨</text>
							</view>
							<view class="box uni-ellipsis">
								<text class="uni-ellipsis">{{ item.campusname }}</text>
							</view>
							<view class="box">
								<text>{{ item.time }}</text>
								<text>{{ item.address }}</text>
							</view>
						</view>
					</swiper-item>
				</block>
			</swiper>
		</view>

		<view class="border-top border-bottom notice-box">
			<image class="img" src="/static/img/gongkao.png"></image>
			<view class="content-box">
				<swiper class="swiper" :autoplay="true" :vertical="true" :circular="true" :display-multiple-items="2" :interval="3000" :duration="1000">
					<block v-for="(item, index) in gonkaolist" :key="index">
						<swiper-item>
							<view class="swiper-item uni-ellipsis">{{ item.content }}</view>
						</swiper-item>
					</block>
				</swiper>
			</view>
		</view>

		<!-- 商品列表 -->
		<view class="seckill-section m-t news">
			<view class="s-header"><text class="title">行业资讯</text></view>
			<scroll-view id="tab-bar" class="scroll-h" :scroll-x="true" :show-scrollbar="false">
				<view v-for="(tab, index) in tabBars" :key="tab.id" class="uni-tab-item" :id="tab.id" :data-current="index" @click="ontabtap(tab, index)">
					<text class="uni-tab-item-title" :class="tabIndex == index ? 'uni-tab-item-title-active' : ''">{{ tab.name }}</text>
				</view>
			</scroll-view>

			<view class="product-list">
				<view
					class="uni-flex uni-row"
					v-for="(product, index) in productList"
					:key="product.goods_id"
					@tap="previewImage(product.url)"
					:class="{'border-bottom':index != productList.length-1 }"
				>
					<view class="text uni-flex" style="width: 180rpx;height: 180rpx;justify-content: center;align-items: center;">
						<image :src="product.image" style="width: 150rpx;height: 150rpx;"></image>
					</view>
					<view class="uni-flex uni-column" style="flex: 1;justify-content: center;padding-right:30rpx">
						<view class="text title" style="text-align: left;padding-top: 10rpx;">{{product.title}}</view>
						<view class="text point" style="text-align: left;padding-left: 20rpx;padding-top: 10rpx;">
							{{product.content}}
						</view>
					</view>
				</view>
			</view>
		</view>

		<uni-popup ref="showqiandao" type="center">
			<view class="uni-pup"><qian-daopop @closepop="closepop"></qian-daopop></view>
		</uni-popup>
		
	</view>
</template>
<script>
import uniPopup from '@/components/uni-popup/uni-popup.vue';
import uniRate from '@/components/uni-rate/uni-rate.vue';
import { mapMutations,mapState } from 'vuex';
import permision from '@/common/permission.js';
import qianDaopop from './qiandaopop.vue';
export default {
	components: {
		uniRate,
		qianDaopop,
		uniPopup
	},
	data() {
		return {
			bannerlist: [],
			vipusers: [],
			huowulist: [],
			gonkaolist: [],
			tabBars: [],
			productList: [],
			tabIndex: 0,
			headerPosition: 'fixed',
			tianqi: {
				cityid: '101250101',
				date: '2020-01-04',
				week: '星期六',
				update_time: '21:00',
				city: '长沙',
				cityEn: 'changsha',
				country: '中国',
				countryEn: 'China',
				wea: '阴',
				wea_img: 'yin',
				tem: '7',
				tem1: '8',
				tem2: '6',
				win: '西北风',
				win_speed: '1级',
				win_meter: '小于12km/h',
				humidity: '91%',
				visibility: '1.36km',
				pressure: '1020',
				air: '178',
				air_pm25: '178',
				air_level: '中度污染'
			},
			tianqiimg: '',
			locations: {}
		};
	},
	computed: {
		...mapState(["userInfo","goodtypelist"])
	},
	onLoad() {
		// this.api.home.getRealseSellInfo({
		// 	userId: getApp().globalData.userdata.userId
		// }).then(res => {
		// 	this.setuserInfo(res.data);
			this.loadData();
			this.doGetLocation();
		// })
	},
	onPageScroll(e) {
		//兼容iOS端下拉时顶部漂移
		if (e.scrollTop >= 0) {
			this.headerPosition = 'fixed';
		} else {
			this.headerPosition = 'absolute';
		}
	},
	onShow() {},
	methods: {
		...mapMutations(['setuserInfo', 'setProvinceList', "setgoodtypelist"]),
		closeDrawer() {
			this.showqiandao = false;
		},
		ontabtap(tap, index) {
			this.tabIndex = index;
			this.getIndustryInformationList(index);
		},
		previewImage(url) {
			uni.navigateTo({
				url: '/pages/webviewpage/webviewpage?url=' + encodeURIComponent(url)
			});
		},
		getIndustryInformationList(id="") {
			this.api.home.getIndustryInformationList({
				data: {
					countPerPage: 100,
					pageIndex: 1,
					// classify: id
				}
			}).then(res => {
				console.log(res)
				// this.productList = res.data;
			})
		},
		async loadData() {
			// 省份
			await this.api.home.getProvinceList().then(res => {
				this.setProvinceList(JSON.stringify(res.data));
			})
			// 签到
			await this.api.home.checkIn({
				userId: getApp().globalData.userdata.userId
			}).then(res => {
				if (res.data.status == "0") {
					this.$nextTick(() => {
						// this.$refs.showqiandao.open();
					})
				}
			})
			// 公告
			await this.api.home.getAdvertList().then(res => {
				this.bannerlist = JSON.parse(res.data.advertList);
			});
			// 类型
			await this.api.home.getClassify().then(res => {
				res.data.forEach(item => {
					item.isactive = false;
				})
				console.log(res)
				this.setgoodtypelist(res.data);
				// uni.setStorageSync('goodtypelist', res.data); //存入缓存
			})
			this.api.home.getVipList({
				data: {
					countPerPage: 100,
					pageIndex: 1
				}
			}).then(res => {
				console.log(res)
				// this.vipusers = res.data;
			})
			await this.api.home.getNoticeList().then(res => {
				this.gonkaolist = res.data;
			})
			this.api.home.getIndustryInformationClassify().then(res => {
				this.tabBars = res.data;
			})
			uni.getLocation({
				geocode: true,
				success: res => {
					this.api.home.goodsRecommend({
						data: {
							userId: getApp().globalData.userdata.userId,
							lat: ""+res.latitude,
							lng: ""+res.longitude,
						}
					}).then(res => {
						console.log(res);
						// this.huowulist = JSON.parse(res.data)
					})
				},
				fail: err => {}
			});
			this.getIndustryInformationList();
			// this.bannerlist = await this.api.home.getAdvertList;
			// this.this.vipusers =  = await this.$api.json('vipusers');
			// this.huowulist = await this.$api.json('huowulist');
			// this.gonkaolist = await this.$api.json('gonkaolist');
			// this.tabBars = await this.$api.json('tabList');
			// this.productList = await this.$api.json('productList');
			
		},
		closepop() {
			this.$nextTick(() => {
				this.$refs.showqiandao.close();
			});
		},
		//详情页
		navToDetailPage(item, index) {
			let id = item.id;
			uni.navigateTo({
				url: `/pages/customer/customerdetail?id=${index}&sourcetype=1`
			});
		},
		navToDetailPagepro(item, index) {
			let id = item.id;
			uni.navigateTo({
				url: `/pages/product/productdetail?id=${index}`
			});
		},
		async checkPermission() {
			let status = permision.isIOS ? await permision.requestIOS('location') : await permision.requestAndroid('android.permission.ACCESS_FINE_LOCATION');
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
					let city = res.address.city.slice(0, res.address.city.length - 1);
					// uni.request({
					// 	url: 'https://www.tianqiapi.com/api/',
					// 	data: {
					// 		appid: '34831141',
					// 		appsecret: 'xxRnF4E2',
					// 		version: 'v6',
					// 		city: city,
					// 		vue: 1
					// 	},
					// 	success: rest => {
					// 		this.tianqi = rest.data;
					// 	}
					// });
				},
				fail: err => {}
			});
		}
	}
};
</script>
<style lang="scss" scoped>
.index-content {
	overflow: hidden;
	.vipuser {
		margin-top: 10upx;
		uni-swiper {
			height: 200upx;
		}
		.swiper-item-width {
			width: 220upx !important;
			.floor-item {
				width: 220upx;
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
			}
		}
	}
	.huowubox {
		margin-top: 10upx;
		uni-swiper {
			height: 160upx;
		}
		.swiper-item-width {
			width: 300upx !important;
			.pro-box {
				width: 240upx;
				background-color: #18c02c;
				border-radius: 10upx;
				padding: 0 10upx;
				margin-right: 10upx;
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
				.box {
					display: flex;
					justify-content: space-around;
					padding: 0 20upx;
				}
				text {
					color: #fff;
					line-height: 1.5;
				}
			}
		}
	}
	.notice-box {
		padding: 20upx;
		display: flex;
		margin-bottom: 20upx;

		.img {
			height: 80upx;
			width: 120upx;
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
			height: 40upx;
			.swiper-item {
				height: 40upx;
				color: #575757;
				font-size: 24upx;
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
				border-radius: 42upx 0px 0px 42upx;
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
		margin-bottom: 20upx;
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
