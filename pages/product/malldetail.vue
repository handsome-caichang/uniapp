<template>
	<view class="uni-page-body">

		<view class="carousel">
			<swiper indicator-dots circular=true duration="400">
				<swiper-item class="swiper-item" v-for="(item,index) in detail.images" :key="index">
					<view class="image-wrapper">
						<image mode="aspectFit" @tap="listimgtap(index)" :src="item" class="loaded" ></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<view class="example-box">
			<view class="uni-flex header-box">
				<view class="uni-flex">
					<image :src="detail.image" class="headerimg"></image>
					<view class="name" style="font-weight: 500;">
						{{detail.name}}
					</view>
					<uni-rate class="rate" :size="12" :value="detail.star" />
				</view>
				<view class="address">
					{{detail.city}}{{detail.district}}
				</view>
			</view>

			<view class="content-box">
				<view class="title">
					<text class="name" style="font-weight: 500;">{{detail.classify}}</text>
					<!-- <text class="price">面议</text> -->
					<!-- {{detail.bedrockPrice}}-{{detail.outsidePrice}}元/吨（预估运费{{detail.freight}}元/吨） -->
				</view>
				<view class="uni-flex address" style="align-items: center;">
					<view class="text">
						<view class="a">{{detail.address}}</view>
						<view class="b">
							<uni-icons type="location-filled"></uni-icons> 距我直线{{detail.distance}}km
						</view>
					</view>
					<view class="iconbox" style="line-height: 1;" @tap="gotomap">
						<uni-icons type="paperplane" color="#1F96F7" size="32"></uni-icons>
					</view>
				</view>
			</view>

			<view class="uni-flex text-box">
				<text style="color: #18C02C;">已验证</text>
			</view>

			<view class="fo-box">
				<view class="item" v-for="(item,index) in detail.label" :key="index" >
					<text>{{item}}</text>
				</view>
				<view class="time">
					更新时间：{{utils.timeTodate( 'Y m-d H:i', detail.createTime)}}
				</view>
			</view>

			<view class="border-top detailbox">
				<view class="title">
					详情展示
				</view>
				<view class="s-container">
					<scroll-view class="scroll-view_H" scroll-x="true" scroll-left="120">
						<image mode="aspectFit" class="img" v-for="(item,index) in detail.images" @tap="listimgtap(index)" :key="index" :src="item"></image>
					</scroll-view>
				</view>
			</view>

		</view>
		<view class="example-box detailbox" style="border: none;">
			<view class="title" style="#212121">
				可回收货物
			</view>
		</view>
		<view class="cont-box" style="margin-bottom: 120upx;">
			<view class="example-box" v-for="(item,index) in huowulist" :key="index">
				<view class="uni-flex uni-row item-box">
					<view class="text uni-flex" style="width: 180rpx;height: 180rpx;justify-content: center;align-items: center;">
						<image :src="item.image" mode="aspectFit" style="width: 180rpx;height: 180rpx;"></image>
					</view>
					<view class="uni-flex uni-column" style="flex: 1;justify-content: center;margin-left: 20upx;">
						<view class="uni-flex" style="justify-content: space-between;align-items: center;height: 40upx;">
							<text style="color: #212121;font-weight: 500;font-size: 32upx;">{{detail.name}}</text>
							<text class="time" style="color: #575757;font-size: 20upx;">更新时间：{{item.createTime}}</text>
						</view>
						<view class="uni-flex title" style="align-items: center;height: 40upx;">
							<text style="width:80upx;color: #212121;font-weight: 500;font-size: 28upx;">{{item.classify}}</text>
							<text class="price uni-ellipsis" style="width:350upx;font-size: 24upx;">{{item.lowPrice}}-{{item.highPrice}}元/吨</text>
						</view>
						<text class="price uni-ellipsis" style="width:350upx;font-size: 24upx;">（预估运费{{item.freight}}元/吨）</text>
						<!-- <view class="address uni-ellipsis" style="width: 100%;font-size: 20upx;margin-bottom: 10upx;">
							宁波市镇海团桥菜场对面张三废品回收
						</view>
						<uni-rate class="rate" :size="12" :value="5" /> -->
					</view>
				</view>
			</view>
			
			<view class="no-pro" v-if="!huowulist.length">
				<icon type="warn" size="80" color="#F8B551"></icon>
				<view class="text">暂无数据</view>
			</view>
		</view>
		<view class="uni-page-footer">
			<uni-icons type="info-filled" class="icon" style="margin-right: 10upx;"></uni-icons>
			此信息资料由该回收站提供，平台仅为其编辑上传，提供展示服务；报价的真实性、准确性等均由该回收站负责。
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
	import utils from '@/components/shoyu-date/utils.filter.js';
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
				utils,
				prolist: [
				],
				detail: {},
				huowulist: [],
			}
		},
		created() {
			this.detail = getApp().globalData.malldetail;
			if (this.detail.isCollect == 1) {
				this.haveac = true;
			}else {
				this.haveac = false;
			}
			this.getdata();
		},
		methods: {
			getdata() {
				this.api.home.getRecycleBinGoodsList({
					data: {
						recycleBinId: this.detail.recycleBinId,
					}
				}).then(res => {
					console.log(res);
					this.huowulist = res.data;
				})
			},
			gotomap() {
				let latitude = this.detail.lat;
				let longitude = this.detail.lng;
				let sourceApplication = encodeURIComponent(this.detail.name);
				let address = encodeURIComponent(this.detail.address);
				if (plus.os.name=="Android") {
					var hasBaiduMap = plus.runtime.isApplicationExist({pname:'com.baidu.BaiduMap',action:'baidumap://'});
					var url = `androidamap://viewMap?sourceApplication=${address}&poiname=${sourceApplication}&lat=${latitude}&lon=${longitude}&dev=0`;
					plus.runtime.openURL(urlAmap);
				} else{
					// iOS上获取本机是否安装了百度高德地图，需要在manifest里配置，在manifest.json文件app-plus->distribute->apple->urlschemewhitelist节点下添加（如urlschemewhitelist:["iosamap","baidumap"]）
					// plus.nativeUI.actionSheet({title:"选择地图应用",cancel:"取消",buttons:[{title:"高德地图"}]}, function(e){
					// 	console.log("e.index: " + e.index);
					// 	switch (e.index){
					// 		case 1:
					// 			url = `http://maps.apple.com/?q=%e6%95%b0%e5%ad%97%e5%a4%a9%e5%a0%82&ll=${latitude},${longitude}&spn=0.008766,0.019441`;
					// 			break;
					// 		case 2:
					// 			url = "baidumap://map/marker?location=39.968789,116.347247&title=DCloud&src=Hello%20uni-app";
					// 			break;
					// 		case 3:
					// 			let url = `iosamap://viewMap?sourceApplication=Hello%20uni-app&poiname=DCloud&lat=${latitude}&lon=${longitude}&dev=0`;
					// 			break;
					// 		default:
					// 		break;
					// 	}	
						// if(url!="") {
					plus.runtime.openURL( `iosamap://viewMap?sourceApplication=${address}&poiname=${sourceApplication}&lat=${latitude}&lon=${longitude}&dev=0`, function( e ) {
						plus.nativeUI.alert(e.message);
					});
						// }
					// })
					// })
				}
			},
			shouc() {
				if (this.haveac) {
					this.api.home.cancelCollectRecycleBin({
						userId: getApp().globalData.userdata.userId,
						recycleBinId: this.detail.recycleBinId,
					}).then(res => {
						this.haveac = !this.haveac;
						this.detail.isCollect = 0;
					})
				}else {
					this.api.home.collectRecycleBin({
						userId: getApp().globalData.userdata.userId,
						recycleBinId: this.detail.recycleBinId,
					}).then(res => {
						this.haveac = !this.haveac;
						this.detail.isCollect = 1;
					})
				}
			},
			listimgtap(current) {
				uni.previewImage({
					current: current,
					urls: this.detail.images,
				})
			},
			call() {
				uni.makePhoneCall({
				    phoneNumber: this.detail.tel 
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	.uni-page-body {
		.uni-page-footer{
			margin: 50upx auto 100upx;
			text-align: center;
			color: #666;
			font-size: 22upx;
			padding: 0 80upx;
		}
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
			justify-content: space-between;
			align-items: center;
			height: 50upx;
			.item {
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
