<template>
	<view class="detail">
		<view class="uni-flex uni-row item">
			<view class="text uni-flex" style="width: 230rpx;height: 230rpx;justify-content: center;align-items: center;">
				<image :src="prolist[0]" mode="aspectFit" style="width: 210rpx;height: 210rpx;" @tap="headtap"></image>
			</view>
			<view class="uni-flex uni-column" style="flex: 1;justify-content: center;margin-left: 30upx;">
				<view class="text title" style="text-align: left;padding-top: 10rpx;color: #212121;">
					{{detail.classifyName}}    <text>{{detail.count}}吨</text>
				</view>
				<view class="price" v-if="detail.bedrockPrice">{{detail.bedrockPrice}}-{{detail.outsidePrice}}元/吨</view>
				<view class="price" v-if="!detail.bedrockPrice">面议</view>
				<view style="color: #212121;">{{detail.name}}</view>
				<view class="uni-flex" style="justify-content:space-between;color: #575757;">
					<text>{{detail.createTime}}</text>
					<text>{{detail.address}}</text>
				</view>
			</view>
		</view>
		<!-- v-if="productdetail.sourcetype == 3" -->
		<view class="text-box" v-if="productdetail.sourcetype == 3" >
			<view class="uni-text">
				联系人：{{customercont.nickName}}
			</view>
			<!-- <view class="uni-text" @tap="gotomap" v-if="productdetail.sourcetype == 3" >
				详细地址：
			</view> -->
		</view>
		
		<view class="item" style="margin-top: 30upx;color: #212121;font-size: 36upx;">
			货物详情：
		</view>
		<view class="s-container">
			<scroll-view class="scroll-view_H" scroll-x="true" scroll-left="120">
				<image class="img" v-for="(item,index) in prolist" :key="index" :src="item" mode="aspectFit" @tap="listimgtap(index)"></image>
			</scroll-view>
		</view>
		<!-- 首页进来，实名认证  -->
		<view class="btn-container" v-if="productdetail.sourcetype == 1">
			<!-- <button type="primary">申请匹配</button> -->
			<view class="primary-btn" @tap="popbtn">
				申请匹配
			</view>
		</view>
		
		<view class="towbtn"  v-if="productdetail.sourcetype == 2">
			<view class="error-btn" @tap="clearbtn">
				拒绝
			</view>
			<view class="primary-btn" @tap="tongyi">
				同意
			</view>
		</view>
	
		<view class="btn-container contact" v-if="productdetail.sourcetype == 3">
			<view class="primary-btn" @tap="dianhua">
				<uni-icons type="phone" size="18" color="#fff" ></uni-icons>
				<text>联系回收人</text>
			</view>
		</view>
	
	</view>
</template>

<script>
	import uniIcons from "@/components/uni-icons/uni-icons.vue";
	import utils from '@/components/shoyu-date/utils.filter.js';
	export default {
		components: {
			uniIcons
		},
		data() {
			return {
				utils,
				times: '',
				items: [
				],
				detail: {
				},
				prolist: [
				],
				productdetail: {},
				customercont: {},
			}
		},
		created() {
			this.productdetail = getApp().globalData.productdetail;
			this.api.home.getRealseGoodsInfo({
				data: {
					realseId:this.productdetail.realseId,
					userId: getApp().globalData.userdata.userId
				}
			}).then(res => {
				this.detail = res.data;
				this.prolist = this.detail.images;
				if (this.productdetail.sourcetype == 3) {
					this.getcustomercont();
				}
			})
		},
		methods: {
			getcustomercont() {
				this.api.order.getSellUserContact({
					data: {
						matchId: this.productdetail.matchId,
						userId: getApp().globalData.userdata.userId
					}
				}).then(res => {
					console.log(res);
					this.customercont = res.data;
				})
			},
			gotomap() {
				var url = "";
				let latitude = 28.226670107377178;
				let longitude = 112.87434613749419;
				if (plus.os.name=="Android") {
					var hasBaiduMap = plus.runtime.isApplicationExist({pname:'com.baidu.BaiduMap',action:'baidumap://'});
					var hasAmap = plus.runtime.isApplicationExist({pname:'com.autonavi.minimap',action:'androidamap://'});
					var urlBaiduMap = "baidumap://map/marker?location=39.968789,116.347247&title=DCloud&src=Hello%20uni-app";
					var urlAmap = "androidamap://viewMap?sourceApplication=Hello%20uni-app&poiname=DCloud&lat=39.9631018208&lon=116.3406135236&dev=0"
					if (hasAmap && hasBaiduMap) {
						plus.nativeUI.actionSheet({title:"选择地图应用",cancel:"取消",buttons:[{title:"百度地图"},{title:"高德地图"}]}, function(e){
							switch (e.index){
								case 1:
									plus.runtime.openURL(urlBaiduMap);
									break;
								case 2:
									plus.runtime.openURL(urlAmap);
									break;
							}
						})
					}
					else if (hasAmap) {
						plus.runtime.openURL(urlAmap);
					}
					else if (hasBaiduMap) {
						plus.runtime.openURL(urlBaiduMap);
					}
					else{
						url = "geo:39.96310,116.340698?q=%e6%95%b0%e5%ad%97%e5%a4%a9%e5%a0%82";
						plus.runtime.openURL(url); //如果是国外应用，应该优先使用这个，会启动google地图。这个接口不能统一坐标系，进入百度地图时会有偏差
					}
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
								// let url = `iosamap://viewMap?sourceApplication=Hello%20uni-app&poiname=DCloud&lat=${latitude}&lon=${longitude}&dev=0`;
						// 		break;
						// 	default:
						// 		break;
						// }
					// if (url!="") {
						plus.runtime.openURL( `iosamap://viewMap?sourceApplication=uniapp &lat=${latitude}&lon=${longitude}&dev=0`, function( e ) {
							plus.nativeUI.alert("本机未安装指定的地图应用");
						});
					// }
					// })
				}
			},
			dianhua() {
				uni.makePhoneCall({
					 phoneNumber: this.customercont.mobilePhone //仅为示例
				})
			},
			headtap() {
				uni.previewImage({
					current: 0,
					urls: [this.detail.headImage],
					indicator: 'none'
				})
			},
			listimgtap(current) {
				uni.previewImage({
					current: current,
					urls: this.prolist,
				})
			},
			tongyi() {
				this.api.home.recoverysureMatching({
					userId: getApp().globalData.userdata.userId,
					matchId: this.productdetail.matchId
				}).then(res => {
					console.log(res);
					uni.navigateTo({
						url: '/pages/other/pipeisuccess'
					})
				})
			},
			clearbtn() {
				this.api.home.recoverycancelMatching({
					userId: getApp().globalData.userdata.userId,
					matchId: this.productdetail.matchId
				}).then(res => {
					uni.showModal({
						title: "提示",
						content: '成功拒绝',
						showCancel: false,
					});
				})
			},
			checkbtn() {
				this.$refs.showtip.close();
				console.log(this.items.filter(item=>item.checked)[0])
			},
			popbtn() {
				if (getApp().globalData.userdata.isReal !== 2) {
					uni.showModal({
						title: "提示",
						content: '该操作需要实名，请先前往我的->点击头像->实名认证，进行实名认证',
						showCancel: false,
					});
					return;
				}
				this.api.home.recoveryAddMatching({
					realseId: this.productdetail.realseId,
					userId: getApp().globalData.userdata.userId,
					toUserId:  this.detail.userId,
				}).then(res => {
					uni.showModal({
						title: "提示",
						content: '申请匹配成功，等待卖家确认。',
						showCancel: false,
					});
				})
			}
		}
	}
</script>

<style lang="scss">
	.detail {
		overflow: hidden;
		padding: 0 20upx;
		.scroll-box{
			height: 800upx;
		}
		
		.towbtn {
			margin-top: 100upx;
			display: flex;
			justify-content: space-around;
			padding: 0 100upx;
			.primary-btn {
				margin-right: 0;
				width: 204upx;
				height: 104upx;
				line-height: 104upx;
				font-size: 38upx;
				text-align: center;
				border-radius: 5px;
				color: $font-color-withe;
				background-color: $uni-bg-color-grey;
			}
			.error-btn {
				width: 204upx;
				height: 104upx;
				line-height: 104upx;
				font-size: 38upx;
				text-align: center;
				border-radius: 5px;
				color: $font-color-withe;
				background-color: #E7211A;
			}
		}
		.pop-container {
			background-color: #EBEBEB;
			.top-box {
				text-align: center;
				height: 60upx;
				line-height: 60upx;
				font-size: 32upx;
			}
			.uni-list {
				.right {
					flex: 1;
					margin-left: 30upx;
				}
			}
		}
		.btn-container {
			margin-top: 200upx;
			&.contact {
				.primary-btn {
					height: 100upx;
					display: flex;
					justify-content: center;
					align-items: center;
					// flex-direction: column;
					width: 60%;
					.uni-icons {
						margin-left: 10upx;
						// height: 60upx;
					}
				}
			}
		}
		.primary-btn {
			position: relative;
			display: block;
			margin-left: auto;
			margin-right: auto;
			padding-left: 14px;
			padding-right: 14px;
			box-sizing: border-box;
			font-size: 18px;
			text-align: center;
			text-decoration: none;
			line-height: 2.55555556;
			border-radius: 5px;
			overflow: hidden;
			color: $font-color-withe;
			background-color: $uni-bg-color-grey;
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
				}
			}
		}
		.item {
			color: $font-color-dark;
			.btn {
				padding: 0 20upx;
				border-radius: 10upx;
				margin-left: 20upx;
				color: #007aff;
				border: 1upx solid #007aff;
			}
			.title {
				font-size: 36upx;
			}
			.address {
				text-indent: 20upx;
			}
			.listbox {
				flex-wrap: wrap;
				.pro-type-item {
					margin-top: 20upx;
					margin-right: 20upx;
				}
			}
		}
	}
</style>
