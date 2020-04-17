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
						<swiper-item class="swiper-wrapper" @tap="previewImage(item.url)"><image :src="item.image" mode="aspectFit"></image></swiper-item>
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
			<swiper style="height: 200upx" :autoplay="true" :interval="2000" :duration="2000" :circular="true">
				<block v-for="(item, index) in vipusers" :key="index">
					<swiper-item class="swiper-item-width">
						<view class="floor-item" @click="navToDetailPage(item, index)">
							<image class="img" :src="item.headImage" mode="aspectFill"></image>
							<text class="name">{{ item.nickName }}</text>
							<text class="name">从业{{ item.years }}年</text>
							<text class="name uni-line-text">保证金：{{ item.depositMoney ? item.depositMoney/100 : 0}}</text>
							<uni-rate class="rate" :size="32" :value="item.star" />
						</view>
					</swiper-item>
				</block>
			</swiper>
		</view>
		<view class="seckill-section m-t huowubox">
			<view class="s-header"><text class="title">货物</text></view>
			<swiper  style="height: 160upx"  :autoplay="true" :interval="2000" :duration="2000" :circular="true">
				<block v-for="(item, index) in huowulist" :key="index">
					<swiper-item class="swiper-item-width">
						<view class="pro-box" @click="navToDetailPagepro(item, index)">
							<view class="box" >
								<text>{{ item.classifyName }}</text>
								<text>{{ item.count }}吨</text>
							</view>
							<text class="uni-ellipsis" style="font-size: 32upx;">{{ item.nickName }}</text>
							<view class="box" style="display: flex;">
								<text>{{ utils.timeTodate('m-d', item.createTime)}}</text>
								<text class="uni-ellipsis" style="width: 90upx;text-align: right;font-size: 28upx;padding: 0;">{{ item.address }}</text>
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
					:key="index"
					@tap="tonot(product)"
					:class="{'border-bottom':index != productList.length-1 }"
				>
					<view class="text uni-flex" style="width: 180rpx;height: 180rpx;justify-content: center;align-items: center;">
						<image :src="product.image" style="width: 150rpx;height: 150rpx;"></image>
					</view>
					<view class="uni-flex uni-column" style="flex: 1;padding-right:30upx">
						<view class="text title" style="text-align: left;padding-top: 10upx;">{{product.title}}</view>
						<view class="text point" style="text-align: left;padding-left: 20upx;padding-top: 1urpx;text-overflow:ellipsis;" v-html="product.content">
							<!-- {{product.content}} -->
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
import utils from '@/components/shoyu-date/utils.filter.js';
export default {
	components: {
		uniRate,
		qianDaopop,
		uniPopup
	},
	data() {
		return {
			utils,
			bannerlist: [],
			vipusers: [],
			huowulist: [],
			gonkaolist: [],
			tabBars: [],
			productList: [],
			tabIndex: 0,
			headerPosition: 'fixed',
			tianqi: {
			
			},
			tianqiimg: '',
			locations: {}
		};
	},
	computed: {
		...mapState(["userInfo","goodtypelist"]),
	
	},
	onLoad() {
		// this.api.home.getRealseSellInfo({
		// 	userId: getApp().globalData.userdata.userId
		// }).then(res => {
		// 	this.setuserInfo(res.data);
		// })
		this.loadData();
		this.doGetLocation();
	},
	onShow() {
		this.loadData();
	},
	created() {
		uni.$on('_updatehome',function(data){
			this.loadData();
			this.doGetLocation();
		})
	},
	onPageScroll(e) {
		//兼容iOS端下拉时顶部漂移
		if (e.scrollTop >= 0) {
			this.headerPosition = 'fixed';
		} else {
			this.headerPosition = 'absolute';
		}
	},
	methods: {
		...mapMutations(['setuserInfo', 'setProvinceList', "setgoodtypelist"]),
		closeDrawer() {
			this.showqiandao = false;
		},
		ontabtap(tap, index) {
			this.tabIndex = index;
			this.getIndustryInformationList();
		},
		tonot(product) {
			uni.setStorageSync('_notContent', product)
			uni.navigateTo({
				url: '/pages/tabBar/home/nothtmlvue/nothtmlvue'
			});
		},
		previewImage(url) {
			// 不正确的也不跳转
			var reg=/^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+).)+([A-Za-z0-9-~\/])+$/;
			if (url && reg.test(url)) {
				getApp().globalData.webviewlink = url;
				uni.navigateTo({
					url: '/pages/webviewpage/webviewpage'
				});
			}
		},
		getIndustryInformationList() {
			this.api.home.getIndustryInformationList({
				data: {
					countPerPage: 100,
					pageIndex: 1,
					classify: this.tabBars[this.tabIndex].name
				}
			}).then(res => {
				this.productList = res.data;
			})
		},
		async loadData() {
			await this.api.home.getRecoveryInfo({
				data: {
					userId: getApp().globalData.userdata.userId
				}
			}).then(res => {
				let userdata = uni.getStorageSync('userdata');
				let newuserdata = Object.assign(userdata, res.data);
				uni.setStorageSync('userdata', newuserdata);
				getApp().globalData.userdata = newuserdata;
			})
			// 资讯tab
			await this.api.home.getIndustryInformationClassify().then(res => {
				this.tabBars = res.data;
			})
			// 省份
			// this.api.home.getProvinceList().then(res => {
			// 	this.setProvinceList(JSON.stringify(res.data));
			// })
			// 签到
			this.api.home.checkIn({
				userId: getApp().globalData.userdata.userId
			}).then(res => {
				if (res.data.status == "0") {
					this.$nextTick(() => {
						// this.$refs.showqiandao.open();
					})
				}
			})
			// bannber图
			this.api.home.getAdvertList().then(res => {
				this.bannerlist = JSON.parse(res.data.advertList);
			});
			// 类型
			this.api.home.getClassify().then(res => {
				res.data.forEach(item => {
					item.isactive = false;
				})
				this.setgoodtypelist(res.data);
				// uni.setStorageSync('goodtypelist', res.data); //存入缓存
			})
			// vip用户列表
			this.api.home.getVipList({
				data: {
					countPerPage: 100,
					pageIndex: 1
				}
			}).then(res => {
				this.vipusers = res.data;
			})
			// 公告
			this.api.home.getNoticeList().then(res => {
				this.gonkaolist = res.data;
			})
			// this.api.home.goodsRecommend({
			// 	data: {
			// 		userId: getApp().globalData.userdata.userId,
			// 		lat: "28.22329671223958",
			// 		lng: "112.8799093967014",
			// 	}
			// }).then(res => {
			// 	console.log(res);
			// 	res.data.forEach(item => {
			// 		let time = item.createTime.replace(' ', "T")
			// 		let datetime = new Date(time).getTime();
			// 		item.createTime = datetime;
			// 	})
			// 	this.huowulist = res.data;
			// })
			// 货物推荐
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
						res.data.forEach(item => {
							let time = item.createTime.replace(' ', "T")
							let datetime = new Date(time).getTime();
							item.createTime = datetime;
						})
						this.huowulist = res.data;
					})
				},
				fail: err => {
				}
			});
			this.getIndustryInformationList();
		},
		closepop() {
			this.$nextTick(() => {
				this.$refs.showqiandao.close();
			});
		},
		//详情页
		navToDetailPage(item, index) {
			item.sourcetype = 1;
			getApp().globalData.customerdata = item;
			uni.navigateTo({
				url: `/pages/customer/customerdetail`
			});
		},
		navToDetailPagepro(item, index) {
			item.sourcetype = 1;
			getApp().globalData.productdetail = item;
			uni.navigateTo({
				url: `/pages/product/productdetail`
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
		doGetLocation() {
			uni.getLocation({
				geocode: true,
				success: res => {
					uni.setStorageSync('_location', res);
					let city = res.address.city.slice(0, res.address.city.length - 1);
					uni.request({
						url: 'https://www.tianqiapi.com/api/',
						data: {
							appid: '34831141',
							appsecret: 'xxRnF4E2',
							version: 'v6',
							city: city,
							vue: 1
						},
						success: rest => {
							this.tianqi = rest.data;
						}
					});
				},
				fail: err => {
				}
			});
		}
	}
};
</script>
<style lang="scss" scoped>
.index-content {
	overflow: hidden;
	.index-banner {
		uni-swiper {
			height: 580upx !important;
		}
	}
	.vipuser {
		margin-top: 10upx;
		uni-swiper {
			height: 220upx !important;
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
				line-height: 1;
				.img {
					border-radius: 50%;
					width: 100upx;
					height: 100upx;
				}

				.name {
					color: #303030;
					font-size: 28upx;
					height: 30upx;
				}
			}
		}
	}
	.huowubox {
		margin-top: 10upx;
		uni-swiper {
			height: 160upx !important;
		}
		.swiper-item-width {
			width: 340upx !important;
			border-radius: 10upx;
			.pro-box {
				width: 260upx;
				background-color: #18c02c;
				border-radius: 10upx;
				padding: 10upx;
				padding-left: 20upx;
				padding-right: 20upx;
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
				.uni-ellipsis {
					padding: 20upx;
					font-size: 24upx;
				}
				.name {
					color: #303030;
					font-size: 24upx;
					height: 30upx;
				}
				.box {
					display: flex;
					justify-content: space-between;
					width: 230upx;
				}
				text {
					color: #fff;
					line-height: 1;
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
			height: 40upx;
			text-overflow:ellipsis;
		}
	}
}
</style>
