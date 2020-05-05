<template>
	<view class="detail">
		<view class="uni-flex uni-row item">
			<view class="text uni-flex" style="width: 230rpx;height: 230rpx;justify-content: center;align-items: center;">
				<image :src="prolist[0]" mode="aspectFit" style="width: 210rpx;height: 210rpx;" @tap="headtap"></image>
			</view>
			<view class="uni-flex uni-column" style="flex: 1;justify-content: center;margin-left: 30upx;">
				<view class="text title" style="text-align: left;padding-top: 10rpx;color: #212121;">
					类别：{{detail.classifyName}}  
				</view>
				<view class="text title" style="text-align: left;padding-top: 10rpx;color: #212121;">
					 <text>数量：{{detail.count}}吨</text> 
				</view>
				<view class="price" v-if="detail.bedrockPrice">价格：{{detail.bedrockPrice}}元/吨</view>
				<view class="price" v-if="!detail.bedrockPrice">价格：面议</view>
				<!-- <view style="color: #212121;" v-if="detail.nickName">称呼1：{{ hidenickname(detail.nickName) }}</view> -->
				<view style="color: #212121;" v-if="productdetail.nickName">称呼：{{ hidenickname(productdetail.nickName) }}</view>
				<view class="uni-flex" style="color: #212121;">
					<text>时间：{{detail.createTime}}</text>
				</view>
				<view class="uni-flex" style="color: #212121;">
					<text>地址：{{detail.address}}</text>
				</view>
			</view>
		</view>
		<view class="text-box">
			<view class="uni-text">
				备注：{{detail.remark}}
			</view>
			<!-- <view class="uni-text" @tap="gotomap" v-if="productdetail.sourcetype == 3" >
				详细地址：
			</view> -->
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
		
		<view class="uni-page-footer" v-if="productdetail.sourcetype == 1" >
			<uni-icons type="info-filled" class="icon" style="margin-right: 10upx;"></uni-icons>
			此货物信息由货主自主编辑发布至平台，平台仅为其提供展示服务，平台审核，尽量保证其准确性，回收人慎重辨别该货物信息真实性，因此信息造成的损失责任自负，平台对此不承担责任。
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
				<text>联系货主</text>
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
				orderdetail: {},
			}
		},
		created() {
			this.productdetail = getApp().globalData.productdetail;
			this.api.home.getRealseGoodsInfo({
				data: {
					realseId: this.productdetail.realseId,
					userId: getApp().globalData.userdata.userId
				}
			}).then(res => {
				console.log(res);
				this.detail = res.data;
				this.prolist = this.detail.images;
				if (this.productdetail.sourcetype == 3) {
					this.getcustomercont();
				}
			})
		},
		methods: {
			hidenickname(names) {
				console.log(names);
				let testname = "";
				if (names.length <= 4) {
					let guolv = "";
					for (var i = 0; i < names.length - 1; i++) {
						guolv += "*";
					}
					testname = names.substr(0, 1) + guolv;
				}else {
					let guolv = "";
					for (var i = 0; i < names.length - 2; i++) {
						guolv += "*";
					}
					testname = names.substr(0, 1) + guolv + names.substr(names.length-1);
				}
				return testname ? testname : '';
			},
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
				// if (getApp().globalData.userdata.isVip != 1) {
				// 	uni.showModal({
				// 		title: "提示",
				// 		content: '该操作需要开通VIP，请先前往我的->废品帮VIP，开通VIP服务',
				// 		success: function (res) {
				// 			if (res.confirm) {
				// 				console.log('用户点击确定');
				// 				uni.navigateTo({
				// 					url: "/pages/user/vipsend"
				// 				})
				// 			}
				// 		}
				// 	});
				// 	return;
				// }
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
		.uni-page-footer{
			position: fixed;
			bottom: 50upx;
			left: 0upx;
			right: 0upx;
			text-align: center;
			color: #666;
			font-size: 22upx;
			padding: 0 80upx;
		}
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
			margin-top: 50upx;
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
